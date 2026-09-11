import Nav from '@/components/Nav'
import RoleViewer from '@/components/RoleViewer'
import { ReadingFooter } from '@/components/ReadingPage'
import { getReadingReports } from '@/lib/reading-reports'

export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams
  const query = typeof q === 'string' ? q.trim().slice(0, 200) : ''
  const reports = query ? await getReadingReports() : []
  const results = reports.flatMap(report => report.items.filter(item => `${item.title} ${item.summary} ${item.source}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())).map(item => ({ ...item, category: `${report.date} · ${item.category}` })))
  return <><Nav /><main className="reading-shell reading-secondary">
    <header className="reading-hero"><h1>搜索日报<span>。</span></h1></header>
    <form className="reading-search" action="/search" role="search">
      <label htmlFor="news-query" className="sr-only">搜索日报</label>
      <input id="news-query" type="search" name="q" defaultValue={query} placeholder="关键词、产品或来源" maxLength={200} />
      <button type="submit">搜索</button>
    </form>
    {query ? <><p className="reading-results">“{query}” · {results.length} 条结果</p>{results.length ? <RoleViewer items={results} /> : <p className="reading-empty">没有找到相关消息，试试其他关键词。</p>}</> : <p className="reading-empty">搜索当前数据源的精选与往期内容。</p>}
    <ReadingFooter />
  </main></>
}
