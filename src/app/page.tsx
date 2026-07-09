import Link from 'next/link'
import { getAllItems } from '@/lib/store'
import { SourceBadge, ScoreIndicator, NewsItemCard } from '@/components/SourceBadge'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getMonth() + 1}月${d.getDate()}日 周${weekdays[d.getDay()]}`
}

function isToday(dateStr: string): boolean {
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  return dateStr === today
}

export default function Home() {
  const allItems = getAllItems()
  const avgScore = allItems.length > 0
    ? Math.round(allItems.reduce((a, b) => a + b.totalScore, 0) / allItems.length)
    : 0
  const sourceCount = new Set(allItems.map(i => i.source)).size
  const dateCount = new Set(allItems.map(i => i.date)).size

  // Group by date, newest first
  const grouped: Record<string, typeof allItems> = {}
  allItems.forEach(item => {
    if (!grouped[item.date]) grouped[item.date] = []
    grouped[item.date].push(item)
  })
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* ── Header ── */}
      <header className="page-header page-shell-narrow" style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '64px 24px 0',
      }}>
        <div className="anim-fade-up">
          {/* Title */}
          <h1 className="heading-display" style={{ fontSize: 32, marginBottom: 6 }}>
            AI <em>Daily</em>
          </h1>
          <p className="page-subtitle">
            面向低代码 AI 产品经理的每日资讯 · PM 视角甄别筛选
          </p>

          {/* Stats row */}
          <div className="home-stats">
            {[
              { label: '条目', value: allItems.length },
              { label: '日报', value: dateCount },
              { label: '数据源', value: sourceCount },
              { label: '均分', value: avgScore },
            ].map(s => (
              <div key={s.label} className="stat-item">
                <span className="stat-num">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Scoring bar */}
          <div className="scoring-bar">
            <span className="scoring-label">评分</span>
            <div className="scoring-dims">
              {[
                { name: '准确性', pct: '40%', color: '#34d399' },
                { name: '时效性', pct: '30%', color: '#38bdf8' },
                { name: 'PM价值', pct: '30%', color: 'var(--accent)' },
              ].map(dim => (
                <div key={dim.name} className="scoring-dim">
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: dim.color }} />
                  <span className="scoring-dim-name">{dim.name}</span>
                  <span className="scoring-dim-pct" style={{ color: dim.color }}>{dim.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Timeline Feed ── */}
      <section className="page-shell-narrow" style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 60px' }}>
        {sortedDates.map(date => {
          const items = grouped[date]
          const today = isToday(date)
          return (
            <div key={date} style={{ marginBottom: 40 }}>
              {/* Date divider */}
              <div className="date-divider">
                <div className={`date-text ${today ? 'date-text-today' : 'date-text-default'}`}>
                  {today ? `今天 · ${formatDate(date)}` : formatDate(date)}
                </div>
                <div className="date-line" />
                <span className="date-count">{items.length}条</span>
              </div>

              {/* Items */}
              <div className="surface" style={{ overflow: 'hidden' }}>
                {items.map((item, i) => (
                  <NewsItemCard key={item.id} item={item} showReason={true} isLast={i === items.length - 1} />
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* ── Footer ── */}
      <footer className="page-footer page-shell-narrow" style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '24px',
        maxWidth: 720,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span className="page-footer-text">AI 日报 · 自动聚合筛选</span>
        <span className="page-footer-text" style={{ letterSpacing: '0.03em' }}>
          Powered by Brave Search + Claude
        </span>
      </footer>
    </main>
  )
}
