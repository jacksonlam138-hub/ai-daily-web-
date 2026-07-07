import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getDailyReport } from '@/lib/store'
import type { DailyItem, Role } from '@/types'

const ROLE_LABEL: Record<Role, string> = {
  pm: 'PM',
  investor: '投资',
  brand: '品牌',
  beginner: '小白',
}

const VALID_ROLES: Role[] = ['pm', 'investor', 'brand', 'beginner']

const NUMS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

function getWebhookConfig() {
  const webhookUrl = process.env.FEISHU_WEBHOOK_URL
  const secret = process.env.FEISHU_SECRET
  return { webhookUrl, secret }
}

// 飞书自定义机器人签名算法：
// stringToSign = `${timestamp}\n${secret}`
// sign = base64(HMAC-SHA256(key=stringToSign, msg=''))
function buildSign(timestamp: number, secret: string): string {
  const stringToSign = `${timestamp}\n${secret}`
  return crypto.createHmac('sha256', stringToSign).update('').digest('base64')
}

// 转义 lark_md 中会被解析的特殊字符：lark_md 不支持 `##`、`>` 引用块
function formatItem(item: DailyItem, idx: number, role?: Role): string {
  const num = NUMS[idx] ?? `${idx + 1}.`
  const insight = role ? item.perspectives?.[role] : item.recommendReason
  const label = role ? ROLE_LABEL[role] : 'PM'
  const lines = [
    `**${num} ${item.title}**`,
    '',
    item.summary,
  ]
  if (insight) {
    lines.push('', `💡 **${label}**：${insight}`)
  }
  lines.push('', `来源：[${item.source}](${item.sourceUrl})`)
  return lines.join('\n')
}

function buildCard(date: string, items: DailyItem[], role?: Role) {
  const subtitle = `${items.length} 条新内容已上线${role ? ` · ${ROLE_LABEL[role]}视角` : ''}`

  const elements: object[] = [
    {
      tag: 'div',
      text: { tag: 'lark_md', content: `**${subtitle}**` },
    },
    { tag: 'hr' },
  ]

  items.forEach((item, idx) => {
    elements.push({
      tag: 'div',
      text: { tag: 'lark_md', content: formatItem(item, idx, role) },
    })
  })

  elements.push({ tag: 'hr' })
  elements.push({
    tag: 'action',
    actions: [
      {
        tag: 'button',
        text: { tag: 'plain_text', content: '🔗 查看完整日报' },
        url: `https://news.lamchung.top/daily/${date}`,
        type: 'primary',
      },
    ],
  })

  return {
    config: { wide_screen_mode: true },
    header: {
      title: { tag: 'plain_text', content: `🆕 AI日报 | ${date}` },
      template: 'blue',
    },
    elements,
  }
}

function resolveDate(request: Request): string {
  const fromQuery = new URL(request.url).searchParams.get('date')
  if (fromQuery) return fromQuery
  return new Date().toISOString().split('T')[0]
}

function resolveRole(request: Request): Role | undefined {
  const fromQuery = new URL(request.url).searchParams.get('role')
  if (fromQuery && VALID_ROLES.includes(fromQuery as Role)) {
    return fromQuery as Role
  }
  return undefined
}

export async function POST(request: Request) {
  const { webhookUrl, secret } = getWebhookConfig()

  if (!webhookUrl) {
    return NextResponse.json({
      error: 'FEISHU_WEBHOOK_URL not configured',
      setup: {
        steps: [
          '1. 飞书群 → 群设置 → 群机器人 → 添加机器人 → 自定义机器人',
          '2. 安全设置：建议选"签名校验"模式，记录 secret',
          '3. 复制 webhook URL（形如 https://open.feishu.cn/open-apis/bot/v2/hook/xxx）',
          '4. 添加到 .env.local 或 Vercel Environment Variables：',
          '   FEISHU_WEBHOOK_URL=https://open.feishu.cn/open-apis/bot/v2/hook/xxx',
          '   FEISHU_SECRET=SECxxx（如启用签名校验）',
        ],
      },
    }, { status: 500 })
  }

  const date = resolveDate(request)
  const role = resolveRole(request)
  const report = getDailyReport(date)

  if (!report) {
    return NextResponse.json({ error: `No report for ${date}` }, { status: 404 })
  }

  const card = buildCard(date, report.items, role)
  const timestamp = Math.floor(Date.now() / 1000)
  const body: Record<string, unknown> = { msg_type: 'interactive', card }
  if (secret) {
    body.timestamp = String(timestamp)
    body.sign = buildSign(timestamp, secret)
  }

  try {
    const resp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const result = await resp.json()

    // 飞书成功返回 { code: 0, msg: 'success', data: {} } 或 { StatusCode: 0, StatusMessage: 'success' }
    const code = result?.code ?? result?.StatusCode
    const ok = code === 0 || code === undefined || (resp.ok && !('code' in result && result.code !== 0))

    if (!ok && code !== 0) {
      return NextResponse.json({
        error: 'Feishu API error',
        detail: result,
        date,
      }, { status: 502 })
    }

    return NextResponse.json({
      ok: true,
      date,
      role: role ?? 'default',
      itemCount: report.items.length,
      feishuResponse: result,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const date = resolveDate(request)
  const role = resolveRole(request)
  const report = getDailyReport(date)

  if (!report) {
    return NextResponse.json({ error: `No report for ${date}` }, { status: 404 })
  }

  return NextResponse.json({
    date,
    role: role ?? 'default',
    itemCount: report.items.length,
    preview: buildCard(date, report.items, role),
    note: 'POST to push. Add ?role=pm|investor|brand|beginner to switch perspective.',
  })
}
