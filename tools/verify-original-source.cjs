// Local or production acceptance for the original-source release, 2026-09-11.
// Open the target origin before running this file with playwright-cli.
// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright CLI evaluates the function expression.
async page => {
  const origin = page.url().split('/').slice(0, 3).join('/')
  const assert = (value, message) => { if (!value) throw new Error(message) }
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(origin)
  await page.locator('.reading-card').first().waitFor()
  const titles = await page.locator('.reading-card h2').allTextContents()
  assert(titles.length === 5 && titles[0].includes('Navier-Stokes'), 'Existing September 9 edition must be retained')
  const verifyOriginal = async () => {
    assert(await page.locator('[id^="news-aihot-"]').count() === 0, 'AIHOT items must not appear in original mode')
    assert(!(await page.locator('body').innerText()).includes('精选来源 AIHOT'), 'Attribution must match the active source')
  }
  await verifyOriginal()
  const roles = {}
  for (const role of ['pm', 'design', 'brand', 'overview']) {
    await page.getByRole('combobox', { name: '阅读视角' }).selectOption(role)
    assert(JSON.stringify(await page.locator('.reading-card h2').allTextContents()) === JSON.stringify(titles), 'Roles must not change news order')
    roles[role] = await page.locator('.reading-insight').count()
  }
  assert(roles.design === 0 && roles.overview === 0, 'Missing design advice must not fall back to product advice')
  const viewports = []
  for (const width of [1440, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 })
    const layout = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, font: getComputedStyle(document.body).fontFamily, background: getComputedStyle(document.body).backgroundColor }))
    assert(layout.scrollWidth <= width, `Overflow at ${width}`)
    assert(layout.font.startsWith('"PingFang SC"') && layout.background === 'rgb(252, 252, 252)', 'New visual style must remain intact')
    viewports.push(layout)
  }
  await page.goto(`${origin}/?source=aihot`)
  await verifyOriginal()
  assert(await page.locator('.reading-card').count() === 5, 'Query string must not enable AIHOT')
  await page.getByRole('link', { name: '往期', exact: true }).click()
  await page.locator('.reading-archive > a').first().waitFor()
  const archiveCount = await page.locator('.reading-archive > a').count()
  assert(archiveCount > 1, 'Original history must remain available')
  await verifyOriginal()
  const unavailable = await page.goto(`${origin}/daily/2026-09-11`)
  assert(unavailable.status() === 404, 'Private AIHOT date must not be exposed by direct URL')
  await page.goto(`${origin}/search?q=DeepSeek%20V4.1-Flash`)
  await page.getByText('没有找到相关消息，试试其他关键词。').waitFor()
  await verifyOriginal()
  await page.goto(`${origin}/search?q=Navier-Stokes`)
  await page.locator('.reading-card').first().waitFor()
  await verifyOriginal()
  await page.goto(origin)
  await page.getByRole('combobox', { name: '阅读视角' }).selectOption('pm')
  await page.setViewportSize({ width: 1440, height: 1050 })
  await page.screenshot({ path: 'output/original-source-desktop.png', scale: 'css' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: 'output/original-source-mobile.png', scale: 'css' })
  await page.setViewportSize({ width: 1440, height: 1050 })
  assert(errors.length === 0, errors.join(', '))
  return { result: 'passed', origin, source: 'legacy', items: titles.length, archiveCount, roles, viewports, pageErrors: errors }
}
