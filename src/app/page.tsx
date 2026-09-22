import { beijingDate, getReadingReports } from '@/lib/reading-reports'
import ReadingPage from '@/components/ReadingPage'
import Nav from '@/components/Nav'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const reports = await getReadingReports()
  const report = reports[0]
  if (!report) return <><Nav /><main className="reading-shell"><header className="reading-hero"><h1>精选，稍后见。</h1><p className="reading-empty">当前数据源还没有日报。</p></header></main></>
  return <ReadingPage report={report} recentReports={reports.slice(1, 4)} title={report.date === beijingDate() ? '今日精选' : '最新精选'} />
}
