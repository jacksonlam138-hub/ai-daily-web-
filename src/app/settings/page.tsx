'use client'

import { useEffect, useState } from 'react'
import Nav from '@/components/Nav'

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

  if (!config) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
      加载中...
    </main>
  )

  return (
    <main style={{ minHeight: '100vh' }}>
      <Nav />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px' }}>
        {/* Header */}
        <div className="anim-fade-up" style={{ marginBottom: 32 }}>
          <h1 className="heading-display" style={{ fontSize: 28, marginBottom: 4 }}>
            <em>设置</em>
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            配置数据采集和推送规则
          </p>
        </div>

        {/* Cron */}
        <section className="anim-fade-up anim-d1 surface" style={{ padding: 24, marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
            定时任务
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.cron.enabled}
                onChange={e => setConfig({ ...config, cron: { ...config.cron, enabled: e.target.checked } })}
                style={{ width: 16, height: 16, accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>启用每日自动采集</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', width: 72 }}>执行时间</span>
              <input
                type="time"
                value={config.cron.time}
                onChange={e => setConfig({ ...config, cron: { ...config.cron, time: e.target.value } })}
                className="form-input"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', width: 72 }}>时效窗口</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>±</span>
                <input
                  type="number"
                  min={1}
                  max={7}
                  value={config.timeWindow}
                  onChange={e => setConfig({ ...config, timeWindow: parseInt(e.target.value) || 2 })}
                  className="form-input"
                  style={{ width: 48, textAlign: 'center' }}
                />
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>天</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="anim-fade-up anim-d2 surface" style={{ padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
            数据源配置
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {Object.entries(config.sources).map(([key, group]) => (
              <div key={key}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
                  {group.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {group.items.map(item => (
                    <span key={item} style={{
                      fontSize: 12,
                      padding: '4px 10px',
                      borderRadius: 6,
                      background: 'var(--accent-dim)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(200, 149, 108, 0.15)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}>
                      {item}
                      <button
                        onClick={() => {
                          const newSources = { ...config.sources }
                          newSources[key] = { ...group, items: group.items.filter(i => i !== item) }
                          setConfig({ ...config, sources: newSources })
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--accent)', opacity: 0.4, cursor: 'pointer', fontSize: 12, padding: 0 }}
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="anim-fade-up anim-d3" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={save} disabled={saving} className="btn-primary">
            {saving ? '保存中...' : '保存配置'}
          </button>
          {saved && <span style={{ fontSize: 13, color: '#34d399' }}>已保存</span>}
        </div>
      </div>
    </main>
  )
}
