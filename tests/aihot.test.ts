import test from 'node:test'
import assert from 'node:assert/strict'
import { latestDate, parseDaily, parseDate, toReadingReport } from '../src/lib/aihot.ts'

const response = {
  schemaVersion: 1,
  report: {
    date: '2026-09-11', generatedAt: '2026-09-11T00:00:30.984Z',
    windowStart: '2026-09-10T00:00:00.000Z', windowEnd: '2026-09-11T00:00:00.000Z',
    links: { aihot: 'https://aihot.news/daily/2026-09-11' }, lead: null,
    sections: [{ label: '产品发布/更新', items: [{
      title: '一个更新', summary: '来自上游的事实摘要。', source: { name: '原始作者' },
      links: { aihot: null, original: 'https://example.com/news' },
    }] }], flashes: [],
  },
}

test('日报不需要上游没有提供的 id、评分或发布时间；没有建议保持缺省', () => {
  const report = toReadingReport(parseDaily(response))
  assert.equal(report.date, '2026-09-11')
  assert.equal(report.items.length, 1)
  assert.equal(report.items[0]?.source, '原始作者')
  assert.equal(report.items[0]?.category, '产品发布/更新')
  assert.equal(report.items[0]?.perspectives, undefined)
  assert.equal('totalScore' in (report.items[0] ?? {}), false)
  assert.deepEqual(toReadingReport(parseDaily(response)), report)
})

test('重复新闻按原文链接合并，空日报和无摘要快讯都是合法结果', () => {
  const item = response.report.sections[0]?.items[0]
  assert.ok(item)
  const duplicated = { ...response, report: { ...response.report, sections: [{ label: '产品', items: [item, { ...item, links: { original: 'https://example.com/news?utm_source=test', aihot: null } }] }] } }
  assert.equal(toReadingReport(parseDaily(duplicated)).items.length, 1)
  assert.equal(toReadingReport(parseDaily({ ...response, report: { ...response.report, sections: [] } })).items.length, 0)
  const flash = { title: '简讯', source: item.source, links: item.links }
  const parsed = parseDaily({ ...response, report: { ...response.report, sections: [], flashes: [flash] } })
  assert.equal(toReadingReport(parsed).items[0]?.summary, '')
  assert.deepEqual(parseDaily(JSON.parse(JSON.stringify(parsed))), parsed)
})

test('不接受危险链接、无效日期、错误版本或缺失必需摘要', () => {
  assert.throws(() => parseDaily({ ...response, schemaVersion: 2 }))
  assert.throws(() => parseDate('2026-02-30'))
  assert.throws(() => parseDate('../../cache'))
  const item = response.report.sections[0]?.items[0]
  assert.ok(item)
  assert.throws(() => parseDaily({ ...response, report: { ...response.report, sections: [{ label: '产品', items: [{ ...item, links: { original: 'javascript:alert(1)', aihot: null } }] }] } }))
  assert.throws(() => parseDaily({ ...response, report: { ...response.report, sections: [{ label: '产品', items: [{ ...item, summary: undefined }] }] } }))
})

test('未发布当天日报时使用索引的真实日期，不猜测今天路径', () => {
  assert.equal(latestDate({ schemaVersion: 1, items: [{ date: '2026-09-09' }, { date: '2026-09-10' }] }), '2026-09-10')
  assert.equal(latestDate({ schemaVersion: 1, items: [] }), null)
})
