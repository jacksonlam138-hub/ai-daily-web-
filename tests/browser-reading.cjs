// Run with playwright-cli run-code --filename=tests/browser-reading.cjs,
// after opening the candidate site in an isolated browser session.
/* eslint-disable @typescript-eslint/no-unused-expressions -- playwright-cli evaluates this file as a function expression. */
async page => {
  const origin = await page.evaluate(() => location.origin);
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.evaluate(() => localStorage.removeItem('ai-daily-reading-role'));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(origin);
  const role = page.getByRole('combobox', { name: '阅读视角' });
  check(await role.inputValue() === 'overview', '首次阅读应以新闻为主');
  check(await page.locator('.reading-insight').count() === 0, '新闻模式不展示解读');
  const firstTitleTop = await page.locator('.reading-card h2').first().evaluate(el => el.getBoundingClientRect().top);
  check(firstTitleTop < 300, `首条新闻出现太晚：${firstTitleTop}px`);
  const stories = await page.locator('.reading-card').count();
  check(stories > 0, '首页应有已发布资讯');
  const sources = await page.locator('.reading-source').allTextContents();
  check(sources.every(source => source !== '其他' && source.trim()), '显示可识别的来源');
  check(await page.locator('.reading-card').evaluateAll(cards => cards.every(card => card.getAttribute('href')?.startsWith('https://') && card.getAttribute('target') === '_blank')), '整卡保留原文入口');
  await role.selectOption('pm');
  await page.waitForFunction(() => document.querySelector('.reading-insight'));
  check(await page.locator('.reading-insight li').count() > 0, '产品建议应分项展示');
  await page.reload();
  await page.waitForFunction(() => document.querySelector('select')?.value === 'pm');
  await role.selectOption('design');
  check(await page.locator('.reading-card').count() === stories, '无角色建议时仍保留新闻');
  check(await page.locator('.reading-insight').count() === 0, '无设计建议不能替换成产品建议');
  check((await page.getByRole('status').textContent()).includes('暂无设计解读'), '无解读时给出一次明确说明');
  await role.selectOption('overview');
  const layouts = [];
  for (const width of [1440, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 });
    const layout = await page.evaluate(() => {
      const lastCard = [...document.querySelectorAll('.reading-article')].at(-1);
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        asideTop: document.querySelector('.reading-aside').getBoundingClientRect().top,
        lastBottom: lastCard.getBoundingClientRect().bottom,
        font: getComputedStyle(document.body).fontFamily,
      };
    });
    check(!layout.overflow, `${width}px 不应横向溢出`);
    check(layout.font.includes('PingFang SC'), '保留苹方字体优先级');
    if (width < 1024) check(layout.asideTop >= layout.lastBottom, '移动端往期应位于正文之后');
    await role.selectOption('pm');
    const insightLayout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      pointTops: [...document.querySelectorAll('.reading-insight ol')].map(list => [...list.children].map(item => item.getBoundingClientRect().top)),
    }));
    check(!insightLayout.overflow, `${width}px 角色解读不应横向溢出`);
    check(insightLayout.pointTops.every(points => points.every((top, index) => index === 0 || top > points[index - 1])), '建议每项独立换行');
    await role.selectOption('overview');
    layouts.push({ width, ...layout });
  }
  const recent = page.getByRole('navigation', { name: '近期日报' }).getByRole('link').first();
  const recentHref = await recent.getAttribute('href');
  await recent.click();
  await page.waitForURL(`${origin}${recentHref}`);
  check(await page.locator('.reading-card').count() > 0, '往期日报可打开阅读');
  await page.getByRole('navigation', { name: '主导航' }).getByRole('link', { name: '搜索', exact: true }).click();
  await page.getByRole('searchbox', { name: '搜索日报' }).fill('MiMo');
  await page.getByRole('button', { name: '搜索', exact: true }).click();
  await page.waitForURL('**/search?q=MiMo');
  check(await page.locator('.reading-card').count() > 0, '搜索保留已发布新闻');
  check(errors.length === 0, `浏览器错误：${errors.join('; ')}`);
  await page.goto(origin);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.keyboard.press('Tab');
  check(await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle !== 'none'), '键盘焦点必须可见');
  return { firstTitleTop, stories, sources, layouts, pageErrors: errors.length };
}
