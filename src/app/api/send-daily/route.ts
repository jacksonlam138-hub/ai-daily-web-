import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getDailyReport } from '@/lib/store'
import { generateDailyEmail } from '@/lib/email-template'
import { supabase } from '@/lib/supabase'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export async function POST(request: Request) {
  const resend = getResend()
  if (!resend) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
  }

  const dateParam = new URL(request.url).searchParams.get('date')
  const today = dateParam || new Date().toISOString().split('T')[0]
  const report = getDailyReport(today)

  if (!report) {
    return NextResponse.json({ error: 'No report found for today' }, { status: 404 })
  }

  const { data: subscribers, error: dbError } = await supabase
    .from('subscribers')
    .select('email, streak')

  if (dbError || !subscribers || subscribers.length === 0) {
    return NextResponse.json({ error: 'No subscribers', details: dbError?.message }, { status: 400 })
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  const subject = `AI日报 | ${today.slice(5)} · ${report.items.length}条动态`

  const results = []

  for (const sub of subscribers) {
    try {
      const html = generateDailyEmail(report.items, today, sub.streak, sub.email)
      const { error } = await resend.emails.send({
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
