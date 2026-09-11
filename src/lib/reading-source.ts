import type { DailyItem } from '../types/index.ts'
import type { ReadingReport } from '../types/reading.ts'
import { readdir } from 'node:fs/promises'
import { readCached } from './aihot-cache.ts'
import { toReadingReport } from './aihot.ts'
import { applyInsights } from './insights.ts'

export type ReadingSource = 'legacy' | 'aihot'

export function readingSource(value: string | undefined): ReadingSource {
  return value === 'aihot' ? 'aihot' : 'legacy'
}

export async function loadReadingReports(source: ReadingSource, items: readonly DailyItem[], directory: string): Promise<ReadingReport[]> {
  const reports = new Map<string, ReadingReport>()
  // This gate is shared by home, archive, search and date routes. In legacy mode
  // even an existing local AIHOT snapshot must never be inspected or exposed.
  if (source === 'aihot') {
    let names: string[]
    try { names = await readdir(directory) }
    catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return []
      throw error
    }
    for (const name of names.filter(name => /^\d{4}-\d{2}-\d{2}\.json$/.test(name))) {
      const snapshot = await readCached(directory, name.slice(0, 10))
      if (!snapshot) continue
      const report = applyInsights(toReadingReport(snapshot.daily), snapshot.insights)
      reports.set(report.date, report)
    }
    return [...reports.values()].sort((a, b) => b.date.localeCompare(a.date))
  }
  for (const item of items) {
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
  return [...reports.values()].sort((a, b) => b.date.localeCompare(a.date))
}
