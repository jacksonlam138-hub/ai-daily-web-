'use client'

import { useState } from 'react'
import Link from 'next/link'
import { searchItems, getAllTags, getAllSources } from '@/lib/store'
import { SourceType } from '@/types'
import { SourceBadge, ScoreBar } from '@/components/SourceBadge'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<SourceType[]>([])
  const [results, setResults] = useState(searchItems(''))

  const allTags = getAllTags()
  const allSources = getAllSources()

  const handleSearch = () => {
    const items = searchItems(
      query,
      selectedTags.length > 0 ? selectedTags : undefined,
      selectedSources.length > 0 ? selectedSources : undefined
    )
    setResults(items)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const toggleSource = (source: SourceType) => {
    setSelectedSources(prev =>
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    )
  }

  return (
    <main className="min-h-screen grid-bg">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">AI</div>
            <span className="text-base font-semibold tracking-tight">
              <span className="gradient-text">AI日报</span>
              <span className="text-zinc-500 text-xs ml-2 font-normal">监测</span>
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] transition-all">首页</Link>
            <Link href="/search" className="px-4 py-2 rounded-lg text-sm font-medium bg-white/[0.08] text-white">搜索</Link>
            <Link href="/dashboard" className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] transition-all">仪表盘</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              <span className="gradient-text">搜索日报</span>
            </h1>
            <p className="text-zinc-500 text-sm">按关键词、标签、来源搜索</p>
          </div>

          <div className="glass glow-purple rounded-xl p-6 mb-6 animate-fade-in-up delay-1">
            <div className="flex gap-3 mb-5">
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="输入关键词搜索..."
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                搜索
              </button>
            </div>

            <div className="mb-4">
              <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">标签筛选</div>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-violet-600/30 text-violet-300 border border-violet-500/30'
                        : 'bg-white/[0.04] text-zinc-500 border border-transparent hover:text-zinc-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">来源筛选</div>
              <div className="flex flex-wrap gap-1.5">
                {allSources.map(source => (
                  <button
                    key={source}
                    onClick={() => toggleSource(source)}
                    className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${
                      selectedSources.includes(source)
                        ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/30'
                        : 'bg-white/[0.04] text-zinc-500 border border-transparent hover:text-zinc-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-xl overflow-hidden animate-fade-in-up delay-2">
            <div className="px-5 py-3 border-b border-white/[0.04] flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                找到 <span className="text-zinc-300 font-mono">{results.length}</span> 条结果
              </span>
              {(selectedTags.length > 0 || selectedSources.length > 0) && (
                <button
                  onClick={() => { setSelectedTags([]); setSelectedSources([]); setResults(searchItems('')); }}
                  className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  清除筛选
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-zinc-600 text-sm">没有找到匹配的结果</div>
                <div className="text-zinc-700 text-xs mt-1">尝试调整搜索关键词或筛选条件</div>
              </div>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  className="group px-5 py-4 border-b border-white/[0.04] last:border-0 transition-colors duration-200 hover:bg-white/[0.02]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <SourceBadge source={item.source} />
                        <span className="text-[10px] font-mono text-zinc-600">{item.date}</span>
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] text-zinc-600">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-sm font-medium text-zinc-200 mb-1 leading-relaxed group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{item.summary}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-violet-400 transition-colors"
                        >
                          原文链接
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="w-20 shrink-0 pt-1">
                      <ScoreBar score={item.totalScore} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
