import 'server-only'
import { join } from 'node:path'
import { getAllItems } from './store'
import { loadReadingReports, readingSource } from './reading-source'
import type { ReadingReport } from '../types/reading'

export async function getReadingReports(): Promise<ReadingReport[]> {
  return loadReadingReports(getReadingSource(), getAllItems(), join(process.cwd(), '.local', 'aihot'))
}

export function getReadingSource() {
  return readingSource(process.env.AI_DAILY_SOURCE)
}

export function beijingDate(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
}

export function displayDate(date: string): string {
  return new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', month: 'long', day: 'numeric', weekday: 'long' }).format(new Date(`${date}T00:00:00+08:00`))
}
