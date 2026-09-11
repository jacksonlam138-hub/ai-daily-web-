import test from 'node:test'
import assert from 'node:assert/strict'
import { applyInsights, isCompleteAnalysis } from '../src/lib/insights.ts'
import type { ReadingReport } from '../src/types/reading.ts'

const report: ReadingReport = {
  date: '2026-09-11', generatedAt: '2026-09-11T00:00:00Z', provider: 'aihot',
  items: [{ id: 'one', title: '更新', summary: '事实', source: '原文', sourceUrl: 'https://example.com', category: '产品', sourceHash: 'current' }],
}

test('不把产品建议兜底给设计或品牌；缺省和 null 角色保持无建议', () => {
  const result = applyInsights(report, { version: 1, items: [{
    id: 'one', sourceHash: 'current', perspectives: { pm: '可以用一个已有流程小范围验证。', design: null },
  }] })
  assert.equal(result.items[0]?.perspectives?.pm, '可以用一个已有流程小范围验证。')
  assert.equal(result.items[0]?.perspectives?.design, undefined)
  assert.equal(result.items[0]?.perspectives?.brand, undefined)
})

test('完整分析允许主动留空，但不允许重复、遗漏或畸形行被缓存为成功', () => {
  const row = { id: 'one', sourceHash: 'current', perspectives: {} }
  assert.equal(isCompleteAnalysis(report, { version: 1, items: [row] }), true)
  assert.equal(isCompleteAnalysis(report, { version: 1, items: [] }), false)
  assert.equal(isCompleteAnalysis(report, { version: 1, items: [row, row] }), false)
  assert.equal(isCompleteAnalysis(report, { version: 1, items: [{ ...row, perspectives: 'invalid' }] }), false)
  assert.equal(isCompleteAnalysis(report, { version: 1, items: [{ ...row, perspectives: { design: '长'.repeat(241) } }] }), false)
})

test('原文摘要更新后旧建议自动失效，未知条目和未知版本不混入', () => {
  const items = [{ id: 'one', sourceHash: 'old', perspectives: { pm: '过期建议' } }]
  assert.equal(applyInsights(report, { version: 1, items }).items[0]?.perspectives, undefined)
  assert.equal(applyInsights(report, { version: 2, items }).items[0]?.perspectives, undefined)
  assert.deepEqual(applyInsights(report, { version: 1, items: [{ id: 'unknown', sourceHash: 'current', perspectives: { pm: '错误' } }] }), report)
})
