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

// 把"前言 1) xxx 2) yyy ..."格式的 brand 行动指南拆成分行结构
// 每项如果有"关键词：描述"格式（中英冒号），把关键词加粗
function renderStructuredInsight(text: string) {
  // 不限定前导字符（空白或中文冒号都可），匹配 "1) " 这种列表标记
  const matches = [...text.matchAll(/\d+\)\s/g)]
  if (matches.length < 2) {
    return <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>
  }

  const lead = text.slice(0, matches[0].index).trim()
  const items: { num: string; body: string }[] = []
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index! + matches[i][0].length
    const end = i + 1 < matches.length ? matches[i + 1].index! : text.length
    const num = matches[i][0].trim()
    const body = text.slice(start, end).trim()
    items.push({ num, body })
  }

  return (
    <div>
      {lead && (
        <div style={{ marginBottom: 10, color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.6 }}>
          {lead}
        </div>
      )}
      {items.map((item, idx) => {
        const colonIdx = item.body.search(/[：:]/)
        const hasKeyword = colonIdx > 0 && colonIdx <= 18
        const keyword = hasKeyword ? item.body.slice(0, colonIdx) : null
        const colon = hasKeyword ? item.body[colonIdx] : null
        const rest = hasKeyword ? item.body.slice(colonIdx + 1) : item.body
        return (
          <div key={idx} style={{ marginBottom: idx === items.length - 1 ? 0 : 8, lineHeight: 1.7, display: 'flex', gap: 8 }}>
            <span style={{ color: 'var(--text-muted)', flexShrink: 0, fontSize: 'var(--text-xs)' }}>{item.num}</span>
            <span style={{ flex: 1 }}>
              {keyword !== null && (
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{keyword}{colon}</span>
              )}
              {rest}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function RoleViewer({ items, date }: { items: DailyItem[]; date: string }) {
  const [role, setRole] = useState<Role>('pm')
  const activeRole = ROLES.find(r => r.key === role)!

  return (
    <>
      <div className="role-bar">
        <div className="role-bar-inner">
          <div className="role-tabs">
            {ROLES.map(r => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`role-tab ${role === r.key ? 'role-tab-active' : ''}`}
                aria-label={r.desc}
              >
                <span className="role-tab-icon">{r.icon}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="surface" style={{ overflow: 'hidden' }}>
        {items.map((item, i) => {
          const insight = item.perspectives?.[role] ?? item.recommendReason ?? ''
          const label = item.perspectives?.[role] ? activeRole.label : 'PM'
          return (
            <div key={item.id} className="news-item" style={{ borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--border-subtle)' }}>
              <div className="news-item-row">
                <div className="news-item-body">
                  <div className="news-meta">
                    <SourceBadge source={item.source} />
                    {item.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-summary">{item.summary}</p>
                  {insight && (
                    <div className="role-insight">
                      <span className="role-insight-label">{label}：</span>
                      {renderStructuredInsight(insight)}
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
