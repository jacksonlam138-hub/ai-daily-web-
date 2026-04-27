'use client'

import Link from 'next/link'
import { getStatistics } from '@/lib/store'
import { SourceBadge } from '@/components/SourceBadge'

const sourceColors: Record<string, string> = {
  'OpenAI': '#34d399',
  'Anthropic': '#fb923c',
  'Google': '#60a5fa',
  'Minimax': '#a78bfa',
  '智谱': '#f87171',
  '字节': '#22d3ee',
  '阿里': '#fbbf24',
  'GitHub': '#9ca3af',
  'ClawHub': '#f472b6',
  '其他': '#a1a1aa',
}

const sourceColorBg: Record<string, string> = {
  'OpenAI': 'bg-emerald-400',
  'Anthropic': 'bg-orange-400',
  'Google': 'bg-blue-400',
  'Minimax': 'bg-violet-400',
  '智谱': 'bg-red-400',
  '字节': 'bg-cyan-400',
  '阿里': 'bg-amber-400',
  'GitHub': 'bg-gray-400',
  'ClawHub': 'bg-pink-400',
  '其他': 'bg-zinc-400',
}

export default function DashboardPage() {
  const stats = getStatistics()
  const maxSourceCount = Math.max(...Object.values(stats.sourceDistribution), 1)
  const maxTagCount = Math.max(...Object.values(stats.tagDistribution), 1)
  const maxTrendCount = Math.max(...stats.dailyTrend.map(d => d.count), 1)

  const topStats = [
    { label: '总条目', value: stats.totalItems, icon: '◆', color: 'text-violet-400', bg: 'from-violet-500/10 to-transparent' },
    { label: '数据来源', value: Object.keys(stats.sourceDistribution).length, icon: '◉', color: 'text-cyan-400', bg: 'from-cyan-500/10 to-transparent' },
    { label: '标签种类', value: Object.keys(stats.tagDistribution).length, icon: '◎', color: 'text-emerald-400', bg: 'from-emerald-500/10 to-transparent' },
    { label: '覆盖天数', value: stats.dailyTrend.length, icon: '◐', color: 'text-amber-400', bg: 'from-amber-500/10 to-transparent' },
  ]

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
            <Link href="/search" className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] transition-all">搜索</Link>
            <Link href="/dashboard" className="px-4 py-2 rounded-lg text-sm font-medium bg-white/[0.08] text-white">仪表盘</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              <span className="gradient-text">数据分析仪表盘</span>
            </h1>
            <p className="text-zinc-500 text-sm">来源分布 · 趋势分析 · 标签统计 · 质量评分</p>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {topStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`glass rounded-xl p-5 animate-fade-in-up delay-${i + 1} relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg}`} />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm ${stat.color}`}>{stat.icon}</span>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <div className={`text-3xl font-bold font-mono tabular-nums ${stat.color}`}>
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Source Distribution */}
            <div className="glass rounded-xl p-6 animate-fade-in-up delay-5">
              <h2 className="text-sm font-semibold text-zinc-300 mb-5 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-violet-500" />
                来源分布
              </h2>
              <div className="space-y-3">
                {Object.entries(stats.sourceDistribution)
                  .sort((a, b) => b[1] - a[1])
                  .map(([source, count]) => (
                    <div key={source} className="flex items-center gap-3">
                      <div className="w-16 text-xs text-zinc-400 truncate">{source}</div>
                      <div className="flex-1 h-5 bg-white/[0.04] rounded-md overflow-hidden relative">
                        <div
                          className={`h-full rounded-md transition-all duration-700 ${sourceColorBg[source] || 'bg-zinc-400'}`}
                          style={{ width: `${(count / maxSourceCount) * 100}%`, opacity: 0.7 }}
                        />
                      </div>
                      <div className="w-6 text-right text-xs font-mono text-zinc-400 tabular-nums">{count}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="glass rounded-xl p-6 animate-fade-in-up delay-6">
              <h2 className="text-sm font-semibold text-zinc-300 mb-5 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-cyan-500" />
                标签统计
              </h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(stats.tagDistribution)
                  .sort((a, b) => b[1] - a[1])
                  .map(([tag, count]) => {
                    const ratio = count / maxTagCount
                    const size = ratio > 0.7 ? 'text-sm px-3 py-1.5' : ratio > 0.4 ? 'text-xs px-2.5 py-1' : 'text-[10px] px-2 py-0.5'
                    const colorClass = ratio > 0.7
                      ? 'bg-violet-600/20 text-violet-300 border border-violet-500/20'
                      : ratio > 0.4
                        ? 'bg-cyan-600/15 text-cyan-300 border border-cyan-500/15'
                        : 'bg-white/[0.04] text-zinc-500 border border-white/[0.06]'
                    return (
                      <span key={tag} className={`${size} rounded-md ${colorClass} transition-all duration-200 hover:scale-105`}>
                        {tag} <span className="opacity-50 ml-0.5">{count}</span>
                      </span>
                    )
                  })}
              </div>
            </div>

            {/* Score Analysis */}
            <div className="glass rounded-xl p-6 animate-fade-in-up delay-7">
              <h2 className="text-sm font-semibold text-zinc-300 mb-5 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-emerald-500" />
                质量评分分析
              </h2>
              <div className="space-y-5">
                {[
                  { label: '准确性', value: stats.avgScores.accuracy, color: 'bg-emerald-400', text: 'text-emerald-400' },
                  { label: '时效性', value: stats.avgScores.timeliness, color: 'bg-cyan-400', text: 'text-cyan-400' },
                  { label: '实用性', value: stats.avgScores.utility, color: 'bg-violet-400', text: 'text-violet-400' },
                ].map(score => (
                  <div key={score.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-500">{score.label}</span>
                      <span className={`font-mono tabular-nums ${score.text}`}>{score.value}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${score.color} rounded-full transition-all duration-700`}
                        style={{ width: `${score.value}%`, opacity: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t border-white/[0.06]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-300">综合评分</span>
                    <span className="text-2xl font-bold font-mono tabular-nums text-emerald-400">{stats.avgScores.total}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Trend */}
            <div className="glass rounded-xl p-6 animate-fade-in-up delay-8">
              <h2 className="text-sm font-semibold text-zinc-300 mb-5 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-amber-500" />
                发布趋势
              </h2>
              {stats.dailyTrend.length > 0 ? (
                <div className="flex items-end justify-between h-40 gap-2">
                  {stats.dailyTrend.map((day) => {
                    const height = (day.count / maxTrendCount) * 100
                    return (
                      <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-[10px] font-mono text-zinc-500 tabular-nums">{day.count}</div>
                        <div className="flex-1 w-full flex items-end">
                          <div
                            className="w-full rounded-t-md bg-gradient-to-t from-violet-600/40 to-cyan-500/40 hover:from-violet-500/60 hover:to-cyan-400/60 transition-all duration-300 cursor-pointer"
                            style={{ height: `${Math.max(height, 4)}%` }}
                            title={`${day.date}: ${day.count}条`}
                          />
                        </div>
                        <div className="text-[10px] text-zinc-600 font-mono truncate w-full text-center">
                          {day.date.slice(5)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center text-zinc-600 text-sm">暂无数据</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
