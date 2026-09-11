import 'server-only'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { getAllItems } from './store'
import { readCached } from './aihot-cache'
import { toReadingReport } from './aihot'
import { applyInsights } from './insights'
import type { ReadingReport } from '../types/reading'

export async function getReadingReports(): Promise<ReadingReport[]> {
  const reports = new Map<string, ReadingReport>()
  for (const item of getAllItems()) {
    let report = reports.get(item.date)
    if (!report) {
      report = { date: item.date, generatedAt: item.createdAt, provider: 'legacy', items: [] }
      reports.set(item.date, report)
    }
    report.items.push({
      id: item.id, title: item.title, summary: item.summary, source: item.source,
      sourceUrl: item.sourceUrl, category: item.tags[0] ?? '资讯', sourceHash: '',
      perspectives: item.perspectives,
    })
  }
  const directory = join(process.cwd(), '.local', 'aihot')
  let names: string[] = []
  try { names = await readdir(directory) }
  catch (error) {
    if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error
  }
  for (const name of names.filter(name => /^\d{4}-\d{2}-\d{2}\.json$/.test(name))) {
    const snapshot = await readCached(directory, name.slice(0, 10))
    if (!snapshot) continue
    const report = applyInsights(toReadingReport(snapshot.daily), snapshot.insights)
    reports.set(report.date, report)
  }
  return [...reports.values()].sort((a, b) => b.date.localeCompare(a.date))
}

export function beijingDate(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
}

export function displayDate(date: string): string {
  return new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', month: 'long', day: 'numeric', weekday: 'long' }).format(new Date(`${date}T00:00:00+08:00`))
}
