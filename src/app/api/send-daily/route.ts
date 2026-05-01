import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { readFile } from 'fs/promises'
import path from 'path'
import { getDailyReport } from '@/lib/store'
import { generateDailyEmail } from '@/lib/email-template'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}
const SUBSCRIBERS_PATH = path.join(process.cwd(), 'src/data/subscribers.json')

interface Subscriber {
  email: string
  streak: number
  subscribedAt: string
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await readFile(SUBSCRIBERS_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export async function POST(request: Request) {
  const resend = getResend()
  if (!resend) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured', setup: '1. Sign up at resend.com  2. Get API key  3. Add RESEND_API_KEY to .env.local' }, { status: 500 })
  }

  const dateParam = new URL(request.url).searchParams.get('date')
  const today = dateParam || new Date().toISOString().split('T')[0]
  const report = getDailyReport(today)

  if (!report) {
    return NextResponse.json({ error: 'No report found for today' }, { status: 404 })
  }

  const subscribers = await getSubscribers()
  if (subscribers.length === 0) {
    return NextResponse.json({ error: 'No subscribers' }, { status: 400 })
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  const html = generateDailyEmail(report.items, today)
  const subject = `AI日报 | ${today.slice(5)} · ${report.items.length}条动态`

  const results = []

  for (const sub of subscribers) {
    try {
      const { data, error } = await resend.emails.send({
        from: `AI日报 <${fromEmail}>`,
        to: sub.email,
        subject,
        html,
      })
      results.push({ email: sub.email, success: !error, error: error?.message })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      results.push({ email: sub.email, success: false, error: message })
    }
  }

  const successCount = results.filter(r => r.success).length
  return NextResponse.json({
    sent: successCount,
    total: subscribers.length,
    date: today,
    items: report.items.length,
    results,
  })
}
