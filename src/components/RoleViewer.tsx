'use client'

import { useSyncExternalStore } from 'react'
import { readingRoles } from '@/types/reading'
import type { ReadingItem, ReadingRole } from '@/types/reading'
import { sourceLabel, splitPerspective } from '@/lib/reading-copy'

type View = ReadingRole | 'overview'
let sessionView: View = 'overview'

function readView(): View {
  try {
    const value = localStorage.getItem('ai-daily-reading-role')
    return value === 'overview' ? 'overview' : readingRoles.find(role => role.value === value)?.value ?? sessionView
  } catch { return sessionView }
}

function subscribe(listener: () => void) {
  window.addEventListener('storage', listener)
  window.addEventListener('daily-role-change', listener)
  return () => {
    window.removeEventListener('storage', listener)
    window.removeEventListener('daily-role-change', listener)
  }
}

function setView(value: string) {
  sessionView = value === 'overview' ? 'overview' : readingRoles.find(role => role.value === value)?.value ?? 'overview'
  try { localStorage.setItem('ai-daily-reading-role', sessionView) } catch { /* Keep this session usable when storage is blocked. */ }
  window.dispatchEvent(new Event('daily-role-change'))
}

export default function RoleViewer({ items }: { items: ReadingItem[] }) {
  const view = useSyncExternalStore<View>(subscribe, readView, () => 'overview')
  const roleLabel = readingRoles.find(role => role.value === view)?.label
  const insightCount = view === 'overview' ? 0 : items.filter(item => splitPerspective(item.perspectives?.[view] ?? '').points.length > 0).length
  return (
    <div>
      <div className="reading-toolbar">
        <p role="status">{view === 'overview' ? '新闻与摘要' : insightCount ? `${insightCount} 条附${roleLabel}解读` : `暂无${roleLabel}解读，仅展示新闻`}</p>
        <label className="reading-role-label">
          <span className="sr-only">阅读视角</span>
          <select aria-label="阅读视角" value={view} onChange={event => setView(event.target.value)}>
            <option value="overview">只看新闻</option>
            {readingRoles.map(role => <option key={role.value} value={role.value}>{role.label}视角</option>)}
          </select>
        </label>
      </div>
      <div className="reading-list">
        {items.map((item, index) => {
          const perspective = view === 'overview' ? undefined : item.perspectives?.[view]
          const insight = splitPerspective(perspective ?? '')
          return (
            <article key={item.id} id={`news-${item.id}`} className="reading-article">
              <a className="reading-card" href={item.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${item.title}（新标签页打开原文）`}>
                <p className="reading-meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{item.category.replace(/^#/, '')}</span><span className="reading-source">{sourceLabel(item.source, item.sourceUrl)}</span></p>
                <h2>{item.title}</h2>
                {item.summary && <p className="reading-summary">{item.summary}</p>}
                {insight.points.length > 0 && <div className="reading-insight">
                  <span>【{roleLabel}视角】<small>AI 解读</small></span>
                  {insight.intro && <p>{insight.intro}</p>}
                  <ol>{insight.points.map((point, index) => <li key={index}>
                    {point.title && <strong>{point.title}：</strong>}{point.text}
                  </li>)}</ol>
                </div>}
              </a>
            </article>
          )
        })}
        {!items.length && <p className="reading-empty">这一期暂无精选内容。</p>}
      </div>
    </div>
  )
}
