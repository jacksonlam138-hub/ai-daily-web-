'use client'

import { getStatistics } from '@/lib/store'
import Nav from '@/components/Nav'

export default function DashboardPage() {
  const stats = getStatistics()
  const maxSourceCount = Math.max(...Object.values(stats.sourceDistribution), 1)
  const maxTagCount = Math.max(...Object.values(stats.tagDistribution), 1)
  const maxTrendCount = Math.max(...stats.dailyTrend.map(d => d.count), 1)

  const sourceColors: Record<string, string> = {
    'OpenAI': '#10a37f', 'Anthropic': '#d97706', 'Google': '#4285f4',
    'Minimax': '#a78bfa', '智谱': '#3b82f6', '字节': '#22d3ee', '阿里': '#fb923c',
    'GitHub': '#8b949e', 'MCP': '#a855f7', 'Hermes': '#ec4899', 'Dify': '#6366f1',
    'Cursor': '#06b6d4', 'OpenClaw': '#f97316', 'Coze': '#22d3ee', 'Microsoft': '#0078d4',
    'Meta': '#065fda', 'Broadcom': '#cc0000', '其他': 'var(--text-muted)',
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <Nav />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px 60px' }}>
        {/* Header */}
        <div className="anim-fade-up" style={{ marginBottom: 32 }}>
          <h1 className="heading-display" style={{ fontSize: 28, marginBottom: 4 }}>
            数据<em>分析</em>
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            来源分布 · 趋势分析 · 标签统计 · 质量评分
          </p>
        </div>

        {/* Top Stats */}
        <div className="anim-fade-up anim-d1" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          marginBottom: 24,
        }}>
          {[
            { label: '总条目', value: stats.totalItems, color: 'var(--accent)' },
            { label: '数据来源', value: Object.keys(stats.sourceDistribution).length, color: '#38bdf8' },
            { label: '标签种类', value: Object.keys(stats.tagDistribution).length, color: '#34d399' },
            { label: '覆盖天数', value: stats.dailyTrend.length, color: '#a78bfa' },
          ].map(stat => (
            <div key={stat.label} className="surface" style={{ padding: '16px 20px' }}>
              <div className="stat-value" style={{ color: stat.color, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two column grid */}
        <div className="anim-fade-up anim-d2" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}>
          {/* Source Distribution */}
          <div className="surface" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--accent)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>来源分布</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Object.entries(stats.sourceDistribution)
                .sort((a, b) => b[1] - a[1])
                .map(([source, count]) => (
                  <div key={source} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 56, fontSize: 12, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {source}
                    </span>
                    <div style={{ flex: 1, height: 20, background: 'var(--bg-deep)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        borderRadius: 4,
                        background: sourceColors[source] || 'var(--text-muted)',
                        width: `${(count / maxSourceCount) * 100}%`,
                        opacity: 0.6,
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                    <span style={{ width: 24, textAlign: 'right', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Tag Cloud */}
          <div className="surface" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span style={{ width: 3, height: 16, borderRadius: 2, background: '#38bdf8' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>标签统计</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {Object.entries(stats.tagDistribution)
                .sort((a, b) => b[1] - a[1])
                .map(([tag, count]) => {
                  const ratio = count / maxTagCount
                  const size = ratio > 0.7 ? { fontSize: 13, padding: '5px 12px' } : ratio > 0.4 ? { fontSize: 12, padding: '4px 10px' } : { fontSize: 11, padding: '3px 8px' }
                  const color = ratio > 0.7
                    ? { bg: 'rgba(200, 149, 108, 0.12)', border: 'rgba(200, 149, 108, 0.2)', text: 'var(--accent-bright)' }
                    : ratio > 0.4
                      ? { bg: 'rgba(56, 189, 248, 0.08)', border: 'rgba(56, 189, 248, 0.15)', text: '#38bdf8' }
                      : { bg: 'var(--bg-deep)', border: 'var(--border-subtle)', text: 'var(--text-muted)' }
                  return (
                    <span key={tag} style={{
                      ...size,
                      borderRadius: 6,
                      background: color.bg,
                      border: `1px solid ${color.border}`,
                      color: color.text,
                    }}>
                      {tag} <span style={{ opacity: 0.5, marginLeft: 2 }}>{count}</span>
                    </span>
                  )
                })}
            </div>
          </div>

          {/* Score Analysis */}
          <div className="surface" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span style={{ width: 3, height: 16, borderRadius: 2, background: '#34d399' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>质量评分</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: '准确性', value: stats.avgScores.accuracy, color: '#34d399' },
                { label: '时效性', value: stats.avgScores.timeliness, color: '#38bdf8' },
                { label: '实用性', value: stats.avgScores.utility, color: 'var(--accent)' },
              ].map(score => (
                <div key={score.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{score.label}</span>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: score.color }}>{score.value}%</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--bg-deep)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 2, background: score.color,
                      width: `${score.value}%`, opacity: 0.7, transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16, marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>综合评分</span>
                <span style={{ fontSize: 24, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34d399' }}>{stats.avgScores.total}%</span>
              </div>
            </div>
          </div>

          {/* Daily Trend */}
          <div className="surface" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span style={{ width: 3, height: 16, borderRadius: 2, background: '#a78bfa' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>发布趋势</span>
            </div>
            {stats.dailyTrend.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'flex-end', height: 140, gap: 6 }}>
                {stats.dailyTrend.map(day => {
                  const height = (day.count / maxTrendCount) * 100
                  return (
                    <div key={day.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{day.count}</span>
                      <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        <div
                          style={{
                            width: '100%',
                            borderRadius: '4px 4px 0 0',
                            background: 'linear-gradient(to top, rgba(200, 149, 108, 0.3), rgba(167, 139, 250, 0.3))',
                            height: `${Math.max(height, 4)}%`,
                            transition: 'height 0.6s ease',
                            cursor: 'pointer',
                          }}
                          title={`${day.date}: ${day.count}条`}
                        />
                      </div>
                      <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%', textAlign: 'center' }}>
                        {day.date.slice(5)}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                暂无数据
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
