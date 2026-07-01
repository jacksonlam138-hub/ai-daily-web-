'use client'

import { useState } from 'react'
import type { DailyItem, Role } from '@/types'
import { SourceBadge, ScoreIndicator } from './SourceBadge'

const ROLES: { key: Role; label: string; icon: string; desc: string }[] = [
  { key: 'pm', label: '产品经理', icon: '🎯', desc: '采购选型 / ROI / 工具链' },
  { key: 'investor', label: '投资/战略', icon: '💼', desc: '估值 / 竞争格局 / 监管' },
  { key: 'brand', label: '品牌/市场', icon: '📣', desc: '发布会 / 叙事 / 抄作业' },
  { key: 'beginner', label: 'AI 小白', icon: '🌱', desc: '零术语 / 生活化 / 试一下' },
]

export default function RoleViewer({ items, date }: { items: DailyItem[]; date: string }) {
  const [role, setRole] = useState<Role>('pm')

  return (
    <>
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '12px 0',
        marginBottom: 20,
      }}>
        <div style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
        }}>
          {ROLES.map(r => (
            <button
              key={r.key}
              onClick={() => setRole(r.key)}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid',
                borderColor: role === r.key ? 'var(--accent)' : 'var(--border-subtle)',
                background: role === r.key ? 'rgba(200,149,108,0.08)' : 'transparent',
                color: role === r.key ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>{r.icon}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>
        <div style={{
          maxWidth: 720,
          margin: '6px auto 0',
          padding: '0 24px',
          fontSize: 11,
          color: 'var(--text-muted)',
        }}>
          {ROLES.find(r => r.key === role)?.desc}
        </div>
      </div>

      <div className="surface" style={{ overflow: 'hidden' }}>
        {items.map((item, i) => {
          const insight = item.perspectives?.[role] ?? item.recommendReason ?? ''
          const label = item.perspectives?.[role] ? ROLES.find(r => r.key === role)!.label : 'PM'
          return (
            <div key={item.id} className="news-item" style={{ borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                    <SourceBadge source={item.source} />
                    {item.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <h3 style={{
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: 'var(--text-primary)',
                    marginBottom: 6,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: 13,
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    marginBottom: 8,
                  }}>
                    {item.summary}
                  </p>
                  {insight && (
                    <div style={{
                      fontSize: 12,
                      lineHeight: 1.7,
                      color: 'var(--accent)',
                      padding: '10px 14px',
                      marginBottom: 8,
                      borderRadius: 6,
                      background: 'rgba(200,149,108,0.06)',
                      borderLeft: '2px solid var(--accent)',
                      whiteSpace: 'pre-wrap',
                    }}>
                      <span style={{ fontWeight: 600, marginRight: 4 }}>{label}：</span>
                      {insight}
                    </div>
                  )}
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow"
                  >
                    原文
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <ScoreIndicator score={item.totalScore} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
