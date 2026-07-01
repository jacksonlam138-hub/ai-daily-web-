import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDailyReport } from '@/lib/store'
import RoleViewer from '@/components/RoleViewer'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getMonth() + 1}月${d.getDate()}日 周${weekdays[d.getDay()]}`
}

export function generateStaticParams() {
  return []
}

export const dynamicParams = true

export default async function DailyPage({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const { date } = await params
  const report = getDailyReport(date)
  if (!report) notFound()

  const avgScore = report.items.length > 0
    ? Math.round(report.items.reduce((a, b) => a + b.totalScore, 0) / report.items.length)
    : 0

  return (
    <main style={{ minHeight: '100vh' }}>
      <header style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '48px 24px 0',
      }}>
        <div className="anim-fade-up">
          <Link href="/" style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}>
            ← 返回首页
          </Link>
          <h1 className="heading-display" style={{ fontSize: 28, marginBottom: 6, marginTop: 12 }}>
            AI <em>Daily</em>
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
            {formatDate(date)} · {report.items.length} 条 · 均分 {avgScore}
          </p>
        </div>
      </header>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 60px' }}>
        <RoleViewer items={report.items} date={date} />
      </section>

      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '24px',
        maxWidth: 720,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          AI 日报 · 多角色视角
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
          Powered by Brave Search + Claude
        </span>
      </footer>
    </main>
  )
}
