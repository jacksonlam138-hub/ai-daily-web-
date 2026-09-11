import Link from 'next/link'
import Nav from '@/components/Nav'
import { ReadingFooter } from '@/components/ReadingPage'
import { displayDate, getReadingReports } from '@/lib/reading-reports'

export const dynamic = 'force-dynamic'

export default async function ArchivePage() {
  const reports = await getReadingReports()
  return <><Nav /><main className="reading-shell reading-secondary">
    <header className="reading-hero"><h1>往期日报<span>。</span></h1></header>
    <div className="reading-archive">{reports.map(report => <Link href={`/daily/${report.date}`} key={report.date}>
      <div><span className="reading-archive-date">{report.date.slice(0, 4)} · {displayDate(report.date)}</span><h2>{report.items[0]?.title ?? '本期暂无精选'}</h2></div>
      <span className="reading-archive-count">{report.items.length} 条 · {report.provider === 'aihot' ? 'AIHOT 精选' : '自主采集'}</span>
    </Link>)}</div><ReadingFooter />
  </main></>
}
