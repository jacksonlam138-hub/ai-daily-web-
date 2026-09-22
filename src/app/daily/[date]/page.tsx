import { notFound } from 'next/navigation'
import { getReadingReports } from '@/lib/reading-reports'
import ReadingPage from '@/components/ReadingPage'

export const dynamic = 'force-dynamic'

export default async function DailyPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params
  const reports = await getReadingReports()
  const report = reports.find(report => report.date === date)
  if (!report) notFound()
  return <ReadingPage report={report} recentReports={reports.filter(item => item.date < date).slice(0, 3)} title={report.provider === 'aihot' ? '每日精选' : '往期日报'} />
}
