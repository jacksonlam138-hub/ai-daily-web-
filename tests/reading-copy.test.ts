import test from 'node:test'
import assert from 'node:assert/strict'
import { splitPerspective } from '../src/lib/reading-copy.ts'

test('分项解读独立展示短标题与解释，不再挤成分号长段', () => {
  assert.deepEqual(splitPerspective('1. 数据边界：明确训练用途与退出方式。\n2. 结果验证：提供引用和复现步骤。'), {
    intro: '', points: [
      { title: '数据边界', text: '明确训练用途与退出方式。' },
      { title: '结果验证', text: '提供引用和复现步骤。' },
    ],
  })
})

test('兼容旧括号编号与分号，保留前提、小数、模型版本和风险限定', () => {
  for (const [one, two] of [['(1)', '(2)'], ['1)', '2)'], ['（1）', '（2）'], ['1、', '2、']]) {
    assert.deepEqual(splitPerspective(`仅供评估。${one} 先测试：用 V4.1 跑基准，成本 $0.14；${two} 再决定：效果尚未验证，不建议直接迁移。`), {
      intro: '仅供评估。', points: [
        { title: '先测试', text: '用 V4.1 跑基准，成本 $0.14' },
        { title: '再决定', text: '效果尚未验证，不建议直接迁移。' },
      ],
    })
  }
  assert.deepEqual(splitPerspective(''), { intro: '', points: [] })
  assert.deepEqual(splitPerspective('版本 V4.1，成本 0.14；尚未验证。'), {
    intro: '', points: [{ title: undefined, text: '版本 V4.1，成本 0.14；尚未验证。' }],
  })
})
