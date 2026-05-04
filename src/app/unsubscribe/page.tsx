'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!email) {
      setStatus('error')
      return
    }

    fetch('/api/subscribers', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(data => {
        setStatus(data.ok ? 'success' : 'error')
      })
      .catch(() => setStatus('error'))
  }, [email])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0908' }}>
      <div style={{ maxWidth: 400, padding: 40, textAlign: 'center' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontStyle: 'italic', color: '#c8956c', marginBottom: 24 }}>
          AI Daily
        </div>

        {status === 'loading' && (
          <div style={{ color: '#9a8e7e', fontSize: 15 }}>处理中...</div>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: 36, marginBottom: 16, color: '#34d399' }}>&#10003;</div>
            <div style={{ fontSize: 16, color: '#e8e0d4', marginBottom: 12 }}>已取消订阅</div>
            <div style={{ fontSize: 14, color: '#9a8e7e' }}>
              {email} 将不再收到AI日报邮件
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: 36, marginBottom: 16, color: '#f87171' }}>&#10007;</div>
            <div style={{ fontSize: 16, color: '#e8e0d4', marginBottom: 12 }}>操作失败</div>
            <div style={{ fontSize: 14, color: '#9a8e7e' }}>
              请稍后重试或直接回复邮件告知
            </div>
          </>
        )}

        <div style={{ marginTop: 32 }}>
          <a href="https://news.lamchung.top" style={{ color: '#c8956c', fontSize: 14, textDecoration: 'none' }}>
            返回首页 →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0908', color: '#9a8e7e' }}>加载中...</div>}>
      <UnsubscribeContent />
    </Suspense>
  )
}
