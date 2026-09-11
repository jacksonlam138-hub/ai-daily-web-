import Nav from './Nav'
import RoleViewer from './RoleViewer'
import { displayDate, getReadingSource } from '@/lib/reading-reports'
import type { ReadingReport } from '@/types/reading'

export function ReadingFooter({ provider = getReadingSource() }: { provider?: 'aihot' | 'legacy' }) {
  return <footer className="reading-footer"><span>{provider === 'legacy' ? '自主采集' : <>精选来源 <a href="https://aihot.news" target="_blank" rel="noopener noreferrer">AIHOT</a></>} · 角色解读 AI Daily</span></footer>
}

export default function ReadingPage({ report, title }: { report: ReadingReport; title: string }) {
  const categories = [...new Set(report.items.map(item => item.category))]
  const windowLabel = (value: string) => new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value))
  return (
    <>
      <Nav />
      <main className="reading-shell">
        <header className="reading-hero">
          <h1>{title}<span>。</span></h1>
          <p className="reading-dateline">{displayDate(report.date)}<span>·</span>{report.items.length} 条精选</p>
        </header>
        <div className="reading-layout">
          <RoleViewer items={report.items} />
          <aside className="reading-aside" aria-label="本期目录">
            <p className="reading-aside-title">本期内容</p>
            <nav aria-label="分类目录">
              {categories.map(category => {
                const first = report.items.find(item => item.category === category)
                return <a key={category} href={`#news-${first?.id}`}><span>{category}</span><span>{report.items.filter(item => item.category === category).length}</span></a>
              })}
            </nav>
            <div className="reading-source-note">
              {report.provider === 'aihot' ? <p>精选来自 <a href={report.sourceUrl} target="_blank" rel="noopener noreferrer">AIHOT</a><br />数字生命卡兹克的 AI 资讯站</p> : <p>自主采集<br />原始来源筛选与角色分析</p>}
              <p>角色解读由 AI 生成，仅在相关时出现。</p>
              {report.windowStart && report.windowEnd && <p className="reading-window">覆盖 {windowLabel(report.windowStart)}<br />至 {windowLabel(report.windowEnd)}（北京）</p>}
            </div>
          </aside>
        </div>
        <ReadingFooter provider={report.provider} />
      </main>
    </>
  )
}
