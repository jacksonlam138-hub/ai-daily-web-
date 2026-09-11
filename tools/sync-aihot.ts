import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { syncSource, saveCached } from '../src/lib/aihot-cache.ts'
import { applyInsights, insightPrompt, insightSchema, insightSnapshot, isCompleteAnalysis } from '../src/lib/insights.ts'
import { toReadingReport } from '../src/lib/aihot.ts'

function generate(prompt: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const child = spawn('claude', [
      '-p', '--output-format', 'json', '--json-schema', JSON.stringify(insightSchema),
      '--tools', '', '--strict-mcp-config', '--mcp-config', '{"mcpServers":{}}',
      '--disable-slash-commands', '--no-session-persistence',
      '--system-prompt', insightPrompt,
    ], { stdio: ['pipe', 'pipe', 'pipe'] })
    let output = ''
    const timer = setTimeout(() => { child.kill('SIGTERM'); reject(new Error('角色分析超时；已保留新闻，可重新同步重试。')) }, 240_000)
    child.stdout.on('data', chunk => { output += chunk.toString() })
    // Do not echo provider diagnostics: they may contain user configuration.
    child.stderr.resume()
    child.on('error', () => { clearTimeout(timer); reject(new Error('无法启动 Claude CLI，请先完成本机登录。')) })
    child.on('close', code => {
      clearTimeout(timer)
      if (code !== 0) return reject(new Error('角色分析失败；已保留新闻，请检查 Claude CLI 登录状态。'))
      try {
        const result: unknown = JSON.parse(output)
        if (!result || typeof result !== 'object' || !('structured_output' in result)) throw new Error('invalid result')
        resolve(result.structured_output)
      } catch { reject(new Error('角色分析未返回有效结构；新闻已保留。')) }
    })
    child.stdin.end(prompt)
  })
}

async function main() {
  const directory = join(process.cwd(), '.local', 'aihot')
  const { report, snapshot, changed } = await syncSource(directory)
  console.log(JSON.stringify({ stage: 'source', date: report.date, items: report.items.length, changed }))
  // A row with an empty perspectives object is an intentional abstention, not a missing job.
  if ((isCompleteAnalysis(report, snapshot.insights) || report.items.length === 0) && !process.argv.includes('--refresh-insights')) {
    console.log(JSON.stringify({ stage: 'insights', status: 'cached', reviewed: report.items.length }))
    return
  }
  const source = toReadingReport(snapshot.daily)
  const result = await generate(JSON.stringify({ date: source.date, items: source.items }))
  if (!isCompleteAnalysis(source, result)) throw new Error('角色分析条目不完整或结构无效；未覆盖已有建议。')
  const analysed = applyInsights(source, result)
  await saveCached(directory, { ...snapshot, insights: insightSnapshot(analysed) })
  console.log(JSON.stringify({ stage: 'insights', status: 'saved', reviewed: analysed.items.length, advisedItems: analysed.items.filter(item => item.perspectives).length }))
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : '同步失败')
  process.exitCode = 1
})
