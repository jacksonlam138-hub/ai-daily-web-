'use client'

import { useState } from 'react'

export default function SubscribeModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function subscribe() {
    if (!email.includes('@')) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage('订阅成功！每天早上收到AI日报')
      } else {
        setStatus('error')
        setMessage(data.error || '订阅失败')
      }
    } catch {
      setStatus('error')
      setMessage('网络错误')
    }
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        style={{ width: 400, padding: 32, borderRadius: 16, background: '#1a1816', border: '1px solid #2a2520' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--accent)' }}>
              订阅AI日报
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              每天早上送到邮箱，3分钟看懂AI
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer', padding: 4 }}
          >
            ✕
          </button>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>&#10003;</div>
            <div style={{ fontSize: 14, color: '#34d399' }}>{message}</div>
          </div>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="search-input"
              style={{ paddingLeft: 16, marginBottom: 16 }}
              onKeyDown={e => e.key === 'Enter' && subscribe()}
            />
            <button
              onClick={subscribe}
              disabled={status === 'loading' || !email.includes('@')}
              className="btn-primary"
              style={{ width: '100%', padding: '12px 0' }}
            >
              {status === 'loading' ? '订阅中...' : '免费订阅'}
            </button>
            {status === 'error' && (
              <div style={{ fontSize: 13, color: '#f87171', marginTop: 8, textAlign: 'center' }}>{message}</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
