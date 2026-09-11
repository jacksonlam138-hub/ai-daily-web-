import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { syncSource } from '../src/lib/aihot-cache.ts'

test('真实 HTTP 同步按索引日期取日报；ETag 304 幂等；临时失败保留最后成功版本', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'ai-daily-test-'))
  let status = 200
  let conditional = ''
  const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json')
    if (request.url?.startsWith('/api/v1/dailies?')) {
      response.end(JSON.stringify({ schemaVersion: 1, items: [{ date: '2026-09-10' }] }))
      return
    }
    conditional = String(request.headers['if-none-match'] ?? '')
    response.statusCode = status
    response.setHeader('ETag', '"daily-v1"')
    response.end(JSON.stringify({ schemaVersion: 1, report: {
      date: '2026-09-10', generatedAt: '2026-09-10T00:00:00Z',
      windowStart: '2026-09-09T00:00:00Z', windowEnd: '2026-09-10T00:00:00Z',
      links: { aihot: 'https://aihot.news/daily/2026-09-10' }, sections: [], flashes: [],
    } }))
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('missing test server address')
  const origin = `http://127.0.0.1:${address.port}`
  try {
    const first = await syncSource(directory, origin)
    assert.equal(first.report.date, '2026-09-10')
    assert.equal(first.report.items.length, 0)
    const before = await readFile(join(directory, '2026-09-10.json'), 'utf8')
    status = 304
    assert.equal((await syncSource(directory, origin)).changed, false)
    assert.equal(conditional, '"daily-v1"')
    assert.equal(await readFile(join(directory, '2026-09-10.json'), 'utf8'), before)
    status = 503
    await assert.rejects(syncSource(directory, origin), /503/)
    assert.equal(await readFile(join(directory, '2026-09-10.json'), 'utf8'), before)
    status = 404
    await assert.rejects(syncSource(directory, origin), /404/)
    await assert.rejects(readFile(join(directory, '2026-09-10.json')), { code: 'ENOENT' })
    assert.equal(await readFile(join(directory, '2026-09-10.withdrawn'), 'utf8'), before)
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
    await rm(directory, { recursive: true })
  }
})
