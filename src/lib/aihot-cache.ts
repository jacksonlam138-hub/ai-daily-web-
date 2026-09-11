import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { latestDate, parseDaily, parseDate, toReadingReport } from './aihot.ts'
import { applyInsights } from './insights.ts'

export interface CachedDaily {
  daily: ReturnType<typeof parseDaily>
  etag?: string
  insights?: unknown
}

export async function readCached(directory: string, date: string): Promise<CachedDaily | null> {
  let text: string
  try { text = await readFile(join(directory, `${parseDate(date)}.json`), 'utf8') }
  catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return null
    throw error
  }
  const value: unknown = JSON.parse(text)
  if (!value || typeof value !== 'object' || !('daily' in value)) throw new Error('AIHOT: invalid local snapshot')
  const daily = parseDaily(value.daily)
  if (daily.report.date !== date) throw new Error('AIHOT: snapshot date mismatch')
  return {
    daily,
    etag: 'etag' in value && typeof value.etag === 'string' ? value.etag : undefined,
    insights: 'insights' in value ? value.insights : undefined,
  }
}

export async function saveCached(directory: string, snapshot: CachedDaily): Promise<void> {
  await mkdir(directory, { recursive: true })
  const target = join(directory, `${parseDate(snapshot.daily.report.date)}.json`)
  const temporary = `${target}.${randomUUID()}.tmp`
  await writeFile(temporary, JSON.stringify(snapshot, null, 2) + '\n', { mode: 0o600 })
  await rename(temporary, target)
}

async function request(url: string, etag?: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json', ...(etag ? { 'If-None-Match': etag } : {}) },
    signal: AbortSignal.timeout(30_000),
  })
  if (!response.ok && response.status !== 304) {
    const retry = response.headers.get('retry-after')
    throw new Error(`AIHOT HTTP ${response.status}${retry ? `; Retry-After: ${retry}` : ''}`)
  }
  return response
}

export async function syncSource(directory: string, origin = 'https://aihot.news') {
  const index = await request(`${origin}/api/v1/dailies?limit=1`)
  const date = latestDate(await index.json())
  if (!date) throw new Error('AIHOT: no published daily yet')
  const existing = await readCached(directory, date)
  let response: Response
  try {
    response = await request(`${origin}/api/v1/dailies/${date}`, existing?.etag)
  } catch (error) {
    // Explicit withdrawal must not keep displaying a now-disallowed copy.
    if (existing && error instanceof Error && /^AIHOT HTTP (403|404)\b/.test(error.message)) {
      await rename(join(directory, `${date}.json`), join(directory, `${date}.withdrawn`))
    }
    throw error
  }
  if (response.status === 304) {
    if (!existing) throw new Error('AIHOT: 304 without a local snapshot')
    return { report: applyInsights(toReadingReport(existing.daily), existing.insights), snapshot: existing, changed: false }
  }
  const daily = parseDaily(await response.json())
  if (daily.report.date !== date) throw new Error('AIHOT: index/report date mismatch')
  const snapshot: CachedDaily = {
    daily, etag: response.headers.get('etag') ?? undefined, insights: existing?.insights,
  }
  const changed = JSON.stringify(existing?.daily) !== JSON.stringify(daily)
  if (changed || existing?.etag !== snapshot.etag) await saveCached(directory, snapshot)
  return { report: applyInsights(toReadingReport(daily), snapshot.insights), snapshot, changed }
}
