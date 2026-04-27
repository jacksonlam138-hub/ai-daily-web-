import Link from 'next/link'
import { getRecentReports, getAllItems } from '@/lib/store'
import { getSourceCategory, SourceType } from '@/types'
import { SourceBadge, ScoreBar, CategoryHeader } from '@/components/SourceBadge'

const sourceClassMap: Record<string, string> = {
  'OpenAI': 'src-openai',
  'Anthropic': 'src-anthropic',
  'Google': 'src-google',
  'Minimax': 'src-minimax',
  '智谱': 'src-zhipu',
  '字节': 'src-bytedance',
  '阿里': 'src-alibaba',
  'Seedance': 'src-seedance',
  'Hermes': 'src-hermes',
  'Dify': 'src-dify',
  'Cursor': 'src-cursor',
  'Coze': 'src-coze',
  'Windsurf': 'src-windsurf',
  'Bolt': 'src-bolt',
  'v0': 'src-v0',
  'Lovable': 'src-lovable',
  'Replit': 'src-replit',
  'n8n': 'src-n8n',
  'Pencil': 'src-pencil',
  'Lovart': 'src-lovart',
  'Rows': 'src-rows',
  'Atlas': 'src-atlas',
  'Search1': 'src-search1',
  'men.ai': 'src-menai',
  'Microsoft': 'src-microsoft',
  'Meta': 'src-meta',
  'Broadcom': 'src-broadcom',
  'GitHub': 'src-github',
  'MCP': 'src-mcp',
  'OpenClaw': 'src-openclaw',
  'Notebook': 'src-notebook',
  '其他': 'src-other',
}

function groupByCategory<T extends { source: SourceType }>(items: T[]): Record<string, T[]> {
  const grouped: Record<string, T[]> = {}
  const order = ['御三家', 'AI开发工具', '国内大厂', '基础设施', '热门项目', '重点关注', '其他']
  items.forEach(item => {
    const cat = getSourceCategory(item.source)
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(item)
  })
  const sorted: Record<string, T[]> = {}
  order.forEach(cat => {
    if (grouped[cat]) sorted[cat] = grouped[cat]
  })
  return sorted
}

export default function Home() {
  const reports = getRecentReports(7)
  const allItems = getAllItems()
  const today = new Date().toISOString().split('T')[0]
  const todayReport = reports.find(r => r.date === today)
  const avgScore = allItems.length > 0
    ? Math.round(allItems.reduce((a, b) => a + b.totalScore, 0) / allItems.length)
    : 0

  const stats = [
    { label: '总条目', value: allItems.length, color: 'text-violet-400', glow: 'glow-purple' },
    { label: '日报数', value: reports.length, color: 'text-cyan-400', glow: 'glow-cyan' },
    { label: '数据源', value: new Set(allItems.map(i => i.source)).size, color: 'text-emerald-400', glow: 'glow-emerald' },
    { label: '均评分', value: avgScore, suffix: '%', color: 'text-amber-400', glow: 'glow-amber' },
  ]

  const grouped = todayReport ? groupByCategory(todayReport.items) : {}

  return (
    <main className="min-h-screen grid-bg">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
              AI
            </div>
            <span className="text-base font-semibold tracking-tight">
              <span className="gradient-text">AI日报</span>
              <span className="text-zinc-500 text-xs ml-2 font-normal">监测</span>
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium bg-white/[0.08] text-white">
              首页
            </Link>
            <Link href="/search" className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] transition-all">
              搜索
            </Link>
            <Link href="/dashboard" className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] transition-all">
              仪表盘
            </Link>
            <Link href="/settings" className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] transition-all">
              设置
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500" />
              <span className="text-sm text-zinc-500 font-mono tracking-wide">{today}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              <span className="gradient-text">AI日报监测</span>
            </h1>
            <p className="text-zinc-500 text-base">每日AI资讯，自动聚合筛选</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass ${stat.glow} rounded-xl p-5 animate-fade-in-up delay-${i + 1} transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className={`text-3xl font-bold font-mono tabular-nums ${stat.color}`}>
                {stat.value}{stat.suffix || ''}
              </div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring Methodology */}
      <div className="px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-xl p-4 animate-fade-in-up delay-5">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium shrink-0">评分维度</span>
              <div className="flex items-center gap-5 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span className="text-xs text-zinc-400">准确性</span>
                  <span className="text-xs font-mono text-violet-400">40%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-xs text-zinc-400">时效性</span>
                  <span className="text-xs font-mono text-cyan-400">30%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-xs text-zinc-400">PM价值</span>
                  <span className="text-xs font-mono text-amber-400">30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Report */}
      {todayReport && (
        <div className="px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4 animate-fade-in-up delay-5">
              <h2 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                今日日报
              </h2>
              <span className="text-xs text-zinc-600">{todayReport.items.length} 条动态</span>
            </div>

            <div className="glass rounded-xl overflow-hidden animate-fade-in-up delay-6">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="p-5 border-b border-white/[0.04] last:border-0">
                  <CategoryHeader category={category} />
                  <div className="space-y-0">
                    {items.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`group p-4 rounded-lg mb-1 last:mb-0 transition-colors duration-200 hover:bg-white/[0.03] border border-transparent hover:border-white/[0.04]`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <SourceBadge source={item.source} />
                              {item.tags.map(tag => (
                                <span key={tag} className="text-xs text-zinc-600">{tag}</span>
                              ))}
                            </div>
                            <h3 className="text-sm font-medium text-zinc-200 mb-1 leading-relaxed group-hover:text-white transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{item.summary}</p>
                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-violet-400 mt-1.5 transition-colors"
                            >
                              原文链接
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </a>
                          </div>
                          <div className="w-20 shrink-0 pt-1">
                            <ScoreBar score={item.totalScore} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Reports */}
      {reports.filter(r => r.date !== today).length > 0 && (
        <div className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg font-semibold text-zinc-200 mb-4 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-500">
                <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 1V5M11 1V5M1 7H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              历史日报
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {reports.filter(r => r.date !== today).map((report, i) => (
                <Link
                  key={report.date}
                  href={`/search?q=&date=${report.date}`}
                  className={`glass glass-hover rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up delay-${Math.min(i + 5, 8)}`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-mono text-zinc-300">{report.date.slice(5)}</span>
                    <span className="text-xs text-zinc-600">{report.items.length}条</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {report.items.slice(0, 3).map(item => (
                      <span key={item.id} className={`text-[10px] px-1.5 py-0.5 rounded ${sourceClassMap[item.source] || 'src-other'}`}>
                        {item.source}
                      </span>
                    ))}
                    {report.items.length > 3 && (
                      <span className="text-[10px] text-zinc-600">+{report.items.length - 3}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xs text-zinc-600">
            AI日报 · 自动聚合筛选
          </span>
          <span className="text-xs text-zinc-700">
            OpenAI / Anthropic / Google / 智谱 / 字节 / 阿里 / GitHub
          </span>
        </div>
      </footer>
    </main>
  )
}
