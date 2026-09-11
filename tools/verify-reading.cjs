// Run against a local production build with playwright-cli run-code --filename=tools/verify-reading.cjs.
// This is a dated acceptance run against the real 2026-09-11 private snapshot.
// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright CLI evaluates this function expression directly.
async page => {
  const origin = 'http://127.0.0.1:4328'
  const assert = (condition, message) => { if (!condition) throw new Error(message) }
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(origin)
  const cards = page.locator('.reading-card')
  const count = await cards.count()
  assert(count === 16, 'Expected 16 real AIHOT items')
  const titles = await cards.locator('h2').allTextContents()
  const counts = {}
  for (const role of ['pm', 'design', 'brand', 'investor', 'beginner', 'overview']) {
    await page.getByRole('combobox', { name: '阅读视角' }).selectOption(role)
    assert(JSON.stringify(await cards.locator('h2').allTextContents()) === JSON.stringify(titles), 'Role must not change source order or content')
    counts[role] = await page.locator('.reading-insight').count()
  }
  assert(counts.overview === 0, 'Overview must contain no advice')
  assert(counts.design === 4 && counts.brand === 2, 'Only source-bound relevant advice should appear')
  assert(await page.locator('.reading-card a, .reading-card button').count() === 0, 'No nested links or action buttons inside a news card')
  await page.getByRole('combobox', { name: '阅读视角' }).selectOption('design')
  await page.reload()
  assert(await page.getByRole('combobox', { name: '阅读视角' }).inputValue() === 'design', 'Role preference should survive reload')
  const href = await cards.first().getAttribute('href')
  await cards.first().focus()
  const popupPromise = page.waitForEvent('popup')
  await page.keyboard.press('Enter')
  const popup = await popupPromise
  await popup.waitForLoadState('domcontentloaded').catch(() => {})
  assert(popup.url().startsWith(href.split('#')[0]), 'Whole-card keyboard action should open original source')
  await popup.close()
  const viewports = []
  for (const width of [1440, 1024, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 })
    const result = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      font: getComputedStyle(document.body).fontFamily,
      background: getComputedStyle(document.body).backgroundColor,
      bodyText: getComputedStyle(document.querySelector('.reading-summary')).fontSize,
    }))
    assert(result.scrollWidth <= width, `Horizontal overflow at ${width}px`)
    assert(result.font.startsWith('"PingFang SC"'), 'PingFang SC must be the first font')
    assert(result.background === 'rgb(252, 252, 252)', 'Reading surface must use light palette')
    assert(parseFloat(result.bodyText) >= 16, 'Primary reading text must remain readable')
    viewports.push(result)
  }
  await page.getByRole('link', { name: '往期', exact: true }).click()
  await page.locator('.reading-archive > a').first().waitFor()
  assert(await page.locator('.reading-archive > a').count() > 1, 'Historical reports must remain available')
  await page.locator('.reading-archive > a').nth(1).click()
  await page.waitForURL('**/daily/**')
  await page.getByRole('heading', { level: 1, name: '往期日报。' }).waitFor()
  assert(await page.getByRole('heading', { level: 1 }).textContent() === '往期日报。', 'Legacy report route must remain readable')
  await page.getByRole('link', { name: '搜索', exact: true }).click()
  await page.getByRole('searchbox').fill('DeepSeek')
  await page.getByRole('button', { name: '搜索', exact: true }).click()
  await page.waitForURL('**/search?q=DeepSeek')
  await page.locator('.reading-card').first().waitFor()
  assert(await page.locator('.reading-card').count() > 0, 'Search must find new and historical items')
  await page.getByRole('searchbox').fill('no-result-unique-908713')
  await page.getByRole('button', { name: '搜索', exact: true }).click()
  await page.getByText('没有找到相关消息，试试其他关键词。').waitFor()
  const missing = await page.goto(`${origin}/daily/1900-01-01`)
  assert(missing.status() === 404, 'Missing date should return 404')
  await page.goto(origin)
  await page.getByRole('combobox', { name: '阅读视角' }).selectOption('pm')
  await page.setViewportSize({ width: 1440, height: 1050 })
  await page.screenshot({ path: 'output/desktop.png', scale: 'css' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: 'output/mobile.png', scale: 'css' })
  await page.setViewportSize({ width: 1440, height: 1050 })
  assert(errors.length === 0, `Browser errors: ${errors.join(', ')}`)
  return { items: count, adviceCounts: counts, viewports, pageErrors: errors, result: 'passed' }
}
