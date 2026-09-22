import test from 'node:test'
import assert from 'node:assert/strict'
import { sourceLabel } from '../src/lib/reading-copy.ts'

test('无明确来源名称时显示原文域名，不把“其他”当作来源', () => {
  assert.equal(sourceLabel('其他', 'https://mimo.mi.com/docs/en-US/updates/model'), 'mimo.mi.com')
  assert.equal(sourceLabel('', 'https://www.example.com/story?token=private'), 'example.com')
  assert.equal(sourceLabel('OpenAI', 'https://openai.com/news'), 'OpenAI')
  assert.equal(sourceLabel('其他', 'invalid'), '原始来源')
})
