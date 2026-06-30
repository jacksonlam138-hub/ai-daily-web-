import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getDailyReport } from '@/lib/store'
import type { DailyItem } from '@/types'

function getWebhookConfig() {
  const webhookUrl = process.env.DINGTALK_WEBHOOK_URL
  const secret = process.env.DINGTALK_SECRET
  return { webhookUrl, secret }
}

function buildSignedUrl(webhookUrl: string, secret: string): string {
  const timestamp = Date.now()
  const stringToSign = `${timestamp}\n${secret}`
  const hmac = crypto.createHmac('sha256', secret).update(stringToSign).digest('base64')
  const sign = encodeURIComponent(hmac)
  const separator = webhookUrl.includes('?') ? '&' : '?'
  return `${webhookUrl}${separator}timestamp=${timestamp}&sign=${sign}`
}

function formatMarkdown(date: string, items: DailyItem[]): string {
  const nums = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
  const lines: string[] = [
    `## 🆕 AI日报 | ${date}`,
    `**${items.length} 条新内容已上线**`,
    '',
  ]

  items.forEach((item, idx) => {
    const num = nums[idx] ?? `${idx + 1}.`
    lines.push(`${num} ${item.title}`)
    lines.push(`> ${item.summary}`)
    if (item.recommendReason) {
      lines.push(`> 💡 PM：${item.recommendReason}`)
    }
    lines.push(`> 来源：[${item.source}](${item.sourceUrl})`)
    lines.push('')
  })

  lines.push(`🔗 [完整日报](https://news.lamchung.top/daily/${date})`)
  return lines.join('\n')
}

function resolveDate(request: Request): string {
  const fromQuery = new URL(request.url).searchParams.get('date')
  if (fromQuery) return fromQuery
  return new Date().toISOString().split('T')[0]
}

export async function POST(request: Request) {
  const { webhookUrl, secret } = getWebhookConfig()

  if (!webhookUrl) {
    return NextResponse.json({
      error: 'DINGTALK_WEBHOOK_URL not configured',
      setup: {
        steps: [
          '1. 钉钉群 → 群设置 → 智能群助手 → 添加机器人 → 自定义',
          '2. 安全设置：建议选"加签"模式，记录 secret',
          '3. 复制 webhook URL（形如 https://oapi.dingtalk.com/robot/send?access_token=xxx）',
          '4. 添加到 .env.local：',
          '   DINGTALK_WEBHOOK_URL=https://oapi.dingtalk.com/robot/send?access_token=xxx',
          '   DINGTALK_SECRET=SECxxx（如启用加签）',
        ],
      },
    }, { status: 500 })
  }

  const date = resolveDate(request)
  const report = getDailyReport(date)

  if (!report) {
    return NextResponse.json({ error: `No report for ${date}` }, { status: 404 })
  }

  const finalUrl = secret ? buildSignedUrl(webhookUrl, secret) : webhookUrl

  try {
    const resp = await fetch(finalUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msgtype: 'markdown',
        markdown: {
          title: `AI日报 | ${date}`,
          text: formatMarkdown(date, report.items),
        },
      }),
    })

    const result = await resp.json()

    if (result.errcode !== 0) {
      return NextResponse.json({
        error: 'DingTalk API error',
        detail: result,
        date,
      }, { status: 502 })
    }

    return NextResponse.json({
      ok: true,
      date,
      itemCount: report.items.length,
      dingtalkResponse: result,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const date = resolveDate(request)
  const report = getDailyReport(date)

  if (!report) {
    return NextResponse.json({ error: `No report for ${date}` }, { status: 404 })
  }

  return NextResponse.json({
    date,
    itemCount: report.items.length,
    preview: formatMarkdown(date, report.items),
    note: 'POST to this endpoint to push to DingTalk',
  })
}
