'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface SourceGroup {
  label: string
  items: string[]
}

interface Config {
  cron: { enabled: boolean; time: string }
  sources: Record<string, SourceGroup>
  timeWindow: number
  focusAreas: string[]
}

export default function SettingsPage() {
  const [config, setConfig] = useState<Config | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/config').then(r => r.json()).then(setConfig)
  }, [])

  async function save() {
    if (!config) return
    setSaving(true)
    setSaved(false)
    await fetch('/api/config', { method: 'POST', body: JSON.stringify(config) })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!config) return <main className="min-h-screen grid-bg flex items-center justify-center text-zinc-500">加载中...</main>

  return (
    <main className="min-h-screen grid-bg">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">AI</div>
            <span className="text-base font-semibold tracking-tight">
              <span className="gradient-text">AI日报</span>
              <span className="text-zinc-500 text-xs ml-2 font-normal">设置</span>
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] transition-all">首页</Link>
            <Link href="/settings" className="px-4 py-2 rounded-lg text-sm font-medium bg-white/[0.08] text-white">设置</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* 定时任务 */}
          <section className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-zinc-200 mb-4">定时任务</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.cron.enabled}
                  onChange={e => setConfig({ ...config, cron: { ...config.cron, enabled: e.target.checked } })}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-violet-500 focus:ring-violet-500"
                />
                <span className="text-sm text-zinc-300">启用每日自动采集</span>
              </label>
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-400 w-24">执行时间</span>
                <input
                  type="time"
                  value={config.cron.time}
                  onChange={e => setConfig({ ...config, cron: { ...config.cron, time: e.target.value } })}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-400 w-24">时效窗口</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">±</span>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={config.timeWindow}
                    onChange={e => setConfig({ ...config, timeWindow: parseInt(e.target.value) || 2 })}
                    className="w-12 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-2 text-sm text-zinc-200 text-center focus:border-violet-500"
                  />
                  <span className="text-xs text-zinc-500">天</span>
                </div>
              </div>
            </div>
          </section>

          {/* 数据源 */}
          <section className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-zinc-200 mb-4">数据源配置</h2>
            <div className="space-y-5">
              {Object.entries(config.sources).map(([key, group]) => (
                <div key={key}>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{group.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <span key={item} className="text-xs px-2.5 py-1.5 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/15">
                        {item}
                        <button
                          onClick={() => {
                            const newSources = { ...config.sources }
                            newSources[key] = { ...group, items: group.items.filter(i => i !== item) }
                            setConfig({ ...config, sources: newSources })
                          }}
                          className="ml-1.5 text-violet-400/50 hover:text-violet-300"
                        >x</button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 保存 */}
          <div className="flex items-center gap-4">
            <button
              onClick={save}
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存配置'}
            </button>
            {saved && <span className="text-sm text-emerald-400">已保存</span>}
          </div>

        </div>
      </div>
    </main>
  )
}
