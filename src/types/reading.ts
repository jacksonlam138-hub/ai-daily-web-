import type { Role } from './index.ts'

export type ReadingRole = Role | 'design'
export type ReadingPerspectives = Partial<Record<ReadingRole, string>>

export interface ReadingItem {
  id: string
  title: string
  summary: string
  source: string
  sourceUrl: string
  category: string
  sourceHash: string
  perspectives?: ReadingPerspectives
}

export interface ReadingReport {
  date: string
  generatedAt: string
  provider: 'aihot' | 'legacy'
  sourceUrl?: string
  windowStart?: string
  windowEnd?: string
  items: ReadingItem[]
}

export const readingRoles: { value: ReadingRole; label: string }[] = [
  { value: 'pm', label: '产品' },
  { value: 'design', label: '设计' },
  { value: 'brand', label: '品牌' },
  { value: 'investor', label: '投资' },
  { value: 'beginner', label: '入门' },
]
