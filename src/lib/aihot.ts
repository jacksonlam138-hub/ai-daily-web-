import { createHash } from 'node:crypto'
import type { ReadingReport } from '../types/reading.ts'

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('AIHOT: expected object')
  return Object.fromEntries(Object.entries(value))
}

function string(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error('AIHOT: expected non-empty string')
  return value.trim()
}

function array(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new Error('AIHOT: expected array')
  return value
}

function url(value: unknown): string {
  const result = new URL(string(value))
  if (result.protocol !== 'https:' && result.protocol !== 'http:') throw new Error('AIHOT: unsafe URL')
  if (result.username || result.password) throw new Error('AIHOT: credential URL')
  return result.href
}

export function parseDate(value: unknown): string {
  const result = string(value)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(result) || Number.isNaN(Date.parse(result)) || new Date(result).toISOString().slice(0, 10) !== result) {
    throw new Error('AIHOT: invalid date')
  }
  return result
}

function timestamp(value: unknown): string {
  const result = string(value)
  if (!/^\d{4}-\d{2}-\d{2}T/.test(result) || Number.isNaN(Date.parse(result))) throw new Error('AIHOT: invalid timestamp')
  return result
}

function entry(value: unknown, flash = false) {
  const item = record(value)
  const links = record(item.links)
  return {
    title: string(item.title),
    // Flashes have no upstream summary; our persisted normalised form uses ''.
    summary: flash && (item.summary === undefined || item.summary === '') ? '' : string(item.summary),
    source: { name: string(record(item.source).name) },
    links: { original: url(links.original), aihot: links.aihot == null ? null : url(links.aihot) },
  }
}

export function parseDaily(value: unknown) {
  const root = record(value)
  if (root.schemaVersion !== 1) throw new Error('AIHOT: unsupported schemaVersion')
  const report = record(root.report)
  const windowStart = timestamp(report.windowStart)
  const windowEnd = timestamp(report.windowEnd)
  if (Date.parse(windowStart) >= Date.parse(windowEnd)) throw new Error('AIHOT: invalid coverage window')
  return {
    schemaVersion: 1,
    report: {
      date: parseDate(report.date), generatedAt: timestamp(report.generatedAt), windowStart, windowEnd,
      links: { aihot: url(record(report.links).aihot) },
      sections: array(report.sections).map(value => {
        const section = record(value)
        return { label: string(section.label), items: array(section.items).map(value => entry(value)) }
      }),
      flashes: array(report.flashes).map(value => entry(value, true)),
    },
  }
}

export function latestDate(value: unknown): string | null {
  const root = record(value)
  if (root.schemaVersion !== 1) throw new Error('AIHOT: unsupported index schemaVersion')
  const dates = array(root.items).map(value => parseDate(record(value).date))
  return dates.sort().at(-1) ?? null
}

export function fingerprint(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 24)
}

export function toReadingReport(daily: ReturnType<typeof parseDaily>): ReadingReport {
  const report = daily.report
  const seen = new Set<string>()
  const sections = [...report.sections, { label: '快讯', items: report.flashes }]
  return {
    date: report.date, generatedAt: report.generatedAt, provider: 'aihot',
    sourceUrl: report.links.aihot, windowStart: report.windowStart, windowEnd: report.windowEnd,
    items: sections.flatMap(section => section.items.flatMap(item => {
      const original = new URL(item.links.original)
      for (const key of [...original.searchParams.keys()]) if (key.startsWith('utm_')) original.searchParams.delete(key)
      if (seen.has(original.href)) return []
      seen.add(original.href)
      return [{
        id: `aihot-${report.date}-${fingerprint(original.href)}`,
        title: item.title, summary: item.summary, source: item.source.name,
        sourceUrl: item.links.original, category: section.label,
        sourceHash: fingerprint(JSON.stringify([item.title, item.summary, item.links.original])),
      }]
    })),
  }
}
