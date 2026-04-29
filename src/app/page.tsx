import Link from 'next/link'
import { getRecentReports, getAllItems } from '@/lib/store'
import { getSourceCategory, SourceType } from '@/types'
import { SourceBadge, ScoreIndicator, NewsItemCard, CategoryHeader } from '@/components/SourceBadge'

function groupByCategory<T extends { source: SourceType }>(items: T[]): Record<string, T[]> {
  const grouped: Record<string, T[]> = {}
  const order = ['御三家', 'AI Agent生态', 'AI开发工具', '国内大厂', '基础设施', '热门项目', '重点关注', '其他']
  items.forEach(item => {
    const cat = getSourceCategory(item.source)
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(item)
  })
  const sorted: Record<string, T[]> = {}
  order.forEach(cat => { if (grouped[cat]) sorted[cat] = grouped[cat] })
  return sorted
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getMonth() + 1}月${d.getDate()}日 周${weekdays[d.getDay()]}`
}

export default function Home() {
  const reports = getRecentReports(7)
  const allItems = getAllItems()
  const today = new Date().toISOString().split('T')[0]
  const todayReport = reports.find(r => r.date === today)
  const latestReport = todayReport || reports[0]
  const avgScore = allItems.length > 0
    ? Math.round(allItems.reduce((a, b) => a + b.totalScore, 0) / allItems.length)
    : 0

  const grouped = latestReport ? groupByCategory(latestReport.items) : {}
  const sourceCount = new Set(allItems.map(i => i.source)).size

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* ── Header ── */}
      <header style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '80px 24px 0',
      }}>
        <div className="anim-fade-up">
          {/* Date */}
          <div style={{
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            marginBottom: 8,
            letterSpacing: '0.05em',
          }}>
            {latestReport ? formatDate(latestReport.date) : today}
          </div>

          {/* Title */}
          <h1 className="heading-display" style={{ fontSize: 36, marginBottom: 6 }}>
            AI <em>Daily</em> Briefing
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
            面向低代码 AI 产品经理的每日资讯 · PM 视角甄别筛选
          </p>

          {/* Collect button */}
          {!todayReport && (
            <div style={{ marginBottom: 24, padding: '16px 20px', borderRadius: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>今日日报尚未采集</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>在 Claude Code 中运行 <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>/ai-daily</code> 触发采集</div>
                </div>
                <a
                  href="https://ai-daily-web-livid.vercel.app"
                  style={{ fontSize: 12, padding: '8px 16px', borderRadius: 8, background: 'var(--accent-dim)', color: 'var(--accent)', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(200,149,108,0.15)' }}
                >
                  刷新页面
                </a>
              </div>
            </div>
          )}

          {/* Warm accent bar */}
          <div className="warm-bar" style={{ width: 48, marginBottom: 32 }} />
        </div>

        {/* ── Stats ── */}
        <div className="anim-fade-up anim-d1" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          marginBottom: 32,
        }}>
          {[
            { label: '条目', value: allItems.length },
            { label: '日报', value: reports.length },
            { label: '数据源', value: sourceCount },
            { label: '均分', value: avgScore },
          ].map(stat => (
            <div key={stat.label} className="surface" style={{ padding: '16px 20px' }}>
              <div className="stat-value" style={{ color: 'var(--accent)', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Scoring methodology bar ── */}
        <div className="anim-fade-up anim-d2" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: '12px 20px',
          marginBottom: 32,
          borderRadius: 10,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
            评分
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { name: '准确性', pct: '40%', color: '#34d399' },
              { name: '时效性', pct: '30%', color: '#38bdf8' },
              { name: 'PM价值', pct: '30%', color: 'var(--accent)' },
            ].map(dim => (
              <div key={dim.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: dim.color }} />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{dim.name}</span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: dim.color }}>{dim.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Today's Report ── */}
      {latestReport && (
        <section className="anim-fade-up anim-d3" style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <div className="surface" style={{ overflow: 'hidden' }}>
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} style={{ padding: '0 4px' }}>
                <div style={{ padding: '16px 20px 0' }}>
                  <CategoryHeader category={category} />
                </div>
                {items.map(item => (
                  <NewsItemCard key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Recent Reports ── */}
      {reports.filter(r => r.date !== (latestReport?.date)).length > 0 && (
        <section style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px 60px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            marginBottom: 16,
          }}>
            近期日报
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 10,
          }}>
            {reports.filter(r => r.date !== latestReport?.date).map((report, i) => (
              <Link
                key={report.date}
                href={`/search?q=&date=${report.date}`}
                className={`date-card surface anim-fade-up`}
                style={{
                  display: 'block',
                  padding: 16,
                  textDecoration: 'none',
                  animationDelay: `${i * 0.03}s`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'var(--text-primary)',
                  }}>
                    {report.date.slice(5)}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {report.items.length} 条
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {report.items.slice(0, 3).map(item => (
                    <SourceBadge key={item.id} source={item.source} />
                  ))}
                  {report.items.length > 3 && (
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', padding: '2px 6px' }}>
                      +{report.items.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '24px',
        maxWidth: 960,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          AI 日报 · 自动聚合筛选
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
          Powered by Brave Search + Claude
        </span>
      </footer>
    </main>
  )
}
