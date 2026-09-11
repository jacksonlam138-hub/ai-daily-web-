import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { loadReadingReports, readingSource } from '../src/lib/reading-source.ts'
import type { DailyItem } from '../src/types/index.ts'
import { saveCached } from '../src/lib/aihot-cache.ts'
import { parseDaily } from '../src/lib/aihot.ts'

const item: DailyItem = {
  id: 'original-1', date: '2026-09-09', title: '原采集内容', summary: '已核对的新闻摘要',
  source: 'OpenAI', sourceUrl: 'https://example.com/original', tags: ['产品'],
  accuracyScore: 90, timelinessScore: 90, utilityScore: 90, totalScore: 90,
  createdAt: '2026-09-09T01:00:00Z', perspectives: { pm: '原有产品分析' },
}

test('默认原采集模式，即使存在损坏的 AIHOT 缓存也完全不读取、不混入', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'reading-source-test-'))
  try {
    await writeFile(join(directory, '2026-09-11.json'), 'invalid cache must not be read')
    assert.equal(readingSource(undefined), 'legacy')
    assert.equal(readingSource('unknown'), 'legacy')
    const reports = await loadReadingReports(readingSource(undefined), [item], directory)
    assert.equal(reports.length, 1)
    assert.equal(reports[0]?.provider, 'legacy')
    assert.equal(reports[0]?.items[0]?.title, '原采集内容')
    assert.equal(reports[0]?.items[0]?.perspectives?.pm, '原有产品分析')
    assert.equal(reports[0]?.items[0]?.perspectives?.design, undefined)
  } finally { await rm(directory, { recursive: true }) }
})

test('显式启用 AIHOT 时只读取该源，不把同日期原采集内容混入，空缓存不伪装成原采集日报', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'reading-source-test-'))
  try {
    assert.equal(readingSource('aihot'), 'aihot')
    assert.deepEqual(await loadReadingReports('aihot', [item], directory), [])
    await saveCached(directory, { daily: parseDaily({ schemaVersion: 1, report: {
      date: item.date, generatedAt: '2026-09-09T00:00:00Z',
      windowStart: '2026-09-08T00:00:00Z', windowEnd: '2026-09-09T00:00:00Z',
      links: { aihot: 'https://aihot.news/daily/2026-09-09' },
      sections: [{ label: '产品', items: [{ title: 'AIHOT 独立来源', summary: '上游摘要', source: { name: '原始作者' }, links: { original: 'https://example.com/aihot', aihot: null } }] }], flashes: [],
    } }) })
    const curated = await loadReadingReports('aihot', [item], directory)
    assert.equal(curated.length, 1)
    assert.equal(curated[0]?.provider, 'aihot')
    assert.equal(curated[0]?.items[0]?.title, 'AIHOT 独立来源')
    assert.equal((await loadReadingReports('legacy', [item], directory))[0]?.items[0]?.title, item.title)
  } finally { await rm(directory, { recursive: true }) }
})
