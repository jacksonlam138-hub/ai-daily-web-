import Nav from './Nav'
import Link from 'next/link'
import RoleViewer from './RoleViewer'
import { displayDate, getReadingSource } from '@/lib/reading-reports'
import type { ReadingReport } from '@/types/reading'

export function ReadingFooter({ provider = getReadingSource() }: { provider?: 'aihot' | 'legacy' }) {
  return <footer className="reading-footer"><span>{provider === 'legacy' ? '自主采集' : <>精选来源 <a href="https://aihot.news" target="_blank" rel="noopener noreferrer">AIHOT</a></>} · AI Daily</span><span>角色解读由 AI 生成，仅在相关时展示。</span></footer>
}

export default function ReadingPage({ report, title, recentReports = [] }: { report: ReadingReport; title: string; recentReports?: ReadingReport[] }) {
  const windowLabel = (value: string) => new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value))
  return (
    <>
      <Nav />
      <main id="reading-content" className="reading-shell">
        <header className="reading-hero reading-edition-header">
          <h1>{title}</h1>
          <p className="reading-dateline"><time dateTime={report.date}>{report.date.slice(0, 4)} 年 · {displayDate(report.date)}</time><span>·</span>{report.items.length} 条</p>
        </header>
        <div className="reading-layout">
          <RoleViewer items={report.items} />
          <aside className="reading-aside" aria-label="继续阅读">
            <div className="reading-aside-heading"><h2>接着读</h2><Link href="/archive">全部往期</Link></div>
            <nav aria-label="近期日报">
              {recentReports.map(recent => <Link key={recent.date} href={`/daily/${recent.date}`}>
                <span className="reading-recent-date"><time dateTime={recent.date}>{recent.date}</time> · {recent.items.length} 条</span>
                <span className="reading-recent-title">{recent.items[0]?.title ?? '查看本期日报'}</span>
              </Link>)}
            </nav>
            {report.provider === 'aihot' && <div className="reading-source-note">
              <p>本期精选来自 <a href={report.sourceUrl} target="_blank" rel="noopener noreferrer">AIHOT</a></p>
              {report.windowStart && report.windowEnd && <p className="reading-window">覆盖 {windowLabel(report.windowStart)}<br />至 {windowLabel(report.windowEnd)}（北京）</p>}
            </div>}
          </aside>
        </div>
        <ReadingFooter provider={report.provider} />
      </main>
    </>
  )
}
