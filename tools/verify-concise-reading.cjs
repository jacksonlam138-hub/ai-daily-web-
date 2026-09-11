// Open the local or production origin before running with playwright-cli.
// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright CLI evaluates the function expression.
async page => {
  const origin = page.url().split('/').slice(0, 3).join('/')
  const assert = (value, message) => { if (!value) throw new Error(message) }
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(origin)
  await page.locator('.reading-card').first().waitFor()
  const summaries = await page.locator('.reading-summary').allTextContents()
  assert(summaries.length === 5 && summaries.every(text => [...text].length <= 80), 'Current edition summaries must be concise actual copy')
  const roles = {}
  for (const role of ['pm', 'brand', 'investor', 'beginner', 'design', 'overview']) {
    await page.getByRole('combobox', { name: '阅读视角' }).selectOption(role)
    const panels = page.locator('.reading-insight')
    roles[role] = await panels.count()
    if (role === 'design' || role === 'overview') {
      assert(roles[role] === 0, 'No advice must remain no advice')
      continue
    }
    assert(roles[role] === 5, 'Existing relevant roles must remain available')
    for (const panel of await panels.all()) {
      const points = await panel.locator('li').allTextContents()
      assert(points.length >= 1 && points.length <= 2, 'Advice must use 1–2 real list items')
      assert(await panel.locator('strong').count() === points.length, 'Every item needs a short heading')
      assert(points.every(text => [...text].length <= 55), 'Each point should be one concise explanation')
      assert(await panel.locator('p').count() === 0, 'Current edition must not have a redundant preamble')
    }
  }
  await page.getByRole('combobox', { name: '阅读视角' }).selectOption('pm')
  const first = page.locator('.reading-insight').first()
  assert((await first.innerText()).includes('【产品视角】'), 'Role heading must follow requested format')
  const viewports = []
  for (const width of [1440, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 1000 })
    const layout = await first.evaluate(panel => {
      const items = [...panel.querySelectorAll('li')]
      return {
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        listStyle: getComputedStyle(panel.querySelector('ol')).listStyleType,
        tops: items.map(item => item.getBoundingClientRect().top),
      }
    })
    assert(layout.scrollWidth <= width && layout.listStyle === 'decimal', 'No overflow; visible numbered lists')
    assert(layout.tops[1] > layout.tops[0], 'Numbered points must occupy separate lines')
    viewports.push(layout)
  }
  await page.setViewportSize({ width: 1440, height: 1100 })
  await page.screenshot({ path: 'output/concise-reading-desktop.png', scale: 'css' })
  await page.setViewportSize({ width: 390, height: 1000 })
  await page.screenshot({ path: 'output/concise-reading-mobile.png', scale: 'css' })
  await page.goto(`${origin}/daily/2026-09-09`)
  await page.locator('.reading-insight ol').first().waitFor()
  assert((await page.locator('.reading-summary').allTextContents()).every(text => [...text].length <= 80), 'Date route must use the same concise copy')
  await page.goto(`${origin}/search?q=Navier-Stokes`)
  await page.locator('#news-20260909-01 .reading-insight ol').waitFor()
  await page.goto(`${origin}/daily/2026-09-08`)
  await page.locator('.reading-insight ol').first().waitFor()
  assert(await page.locator('.reading-insight').first().locator('li').count() > 1, 'Archived semicolon lists must also render as items')
  assert(errors.length === 0, errors.join(', '))
  await page.goto(origin)
  return { result: 'passed', origin, summaryLengths: summaries.map(text => [...text].length), roles, viewports, pageErrors: errors }
}
