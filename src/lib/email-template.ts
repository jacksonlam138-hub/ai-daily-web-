import { DailyItem, SourceType } from '@/types'

const sourceBadgeColor: Record<string, string> = {
  'OpenAI': '#10a37f',
  'Anthropic': '#d97706',
  'Google': '#4285f4',
  'GitHub': '#8b949e',
  'MCP': '#a855f7',
  'Hermes': '#ec4899',
  'Cursor': '#06b6d4',
}

export function generateDailyEmail(
  items: DailyItem[],
  date: string,
  streak: number = 0,
): string {
  const top3 = items.slice(0, 3)
  const rest = items.slice(3)

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#0a0908; font-family:'PingFang SC','Hiragino Sans GB','Microsoft YaHei',system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0908;">
<tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">

  <!-- Header -->
  <tr><td style="padding-bottom:24px;">
    <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="font-family:Georgia,serif; font-size:28px; font-style:italic; color:#c8956c;">
        AI Daily
      </td>
      <td align="right" style="font-size:13px; color:#6a6054; font-family:monospace; vertical-align:bottom;">
        ${date}${streak > 0 ? ` · 连续${streak}天` : ''}
      </td>
    </tr>
    </table>
  </td></tr>

  <!-- Divider -->
  <tr><td style="height:1px; background:linear-gradient(90deg,#2a2520,transparent);"></td></tr>

  <!-- Top 3 News -->
  ${top3.map((item, i) => `
  <tr><td style="padding:28px 0;">
    <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td width="36" valign="top" style="font-size:18px; font-weight:700; color:#c8956c; font-family:monospace; padding-top:2px;">
        0${i + 1}
      </td>
      <td style="padding-left:16px;">
        <div style="margin-bottom:8px;">
          <span style="display:inline-block; padding:2px 8px; border-radius:4px; font-size:12px; font-weight:600; background:${sourceBadgeColor[item.source] || 'rgba(200,149,108,0.1)'}22; color:${sourceBadgeColor[item.source] || '#c8956c'};">
            ${item.source}
          </span>
          <span style="font-size:12px; color:#6a6054; font-family:monospace; margin-left:8px;">${item.totalScore}分</span>
        </div>
        <div style="font-size:16px; font-weight:500; color:#e8e0d4; line-height:1.5; margin-bottom:6px;">
          ${item.title}
        </div>
        <div style="font-size:14px; color:#9a8e7e; line-height:1.6;">
          ${item.summary}
        </div>
        <a href="${item.sourceUrl}" target="_blank" style="font-size:13px; color:#6a6054; text-decoration:none;">
          原文 →
        </a>
      </td>
    </tr>
    </table>
  </td></tr>
  <tr><td style="height:1px; background:#1a1816;"></td></tr>
  `).join('')}

  <!-- Rest items (title only) -->
  ${rest.length > 0 ? `
  <tr><td style="padding:20px 0;">
    <div style="font-size:12px; color:#6a6054; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:12px; font-weight:600;">
      更多动态
    </div>
    ${rest.map(item => `
    <div style="padding:8px 0; font-size:14px; color:#9a8e7e; line-height:1.5;">
      <span style="color:${sourceBadgeColor[item.source] || '#6a6054'}; font-weight:600;">${item.source}</span>
      · ${item.title}
      <span style="color:#6a6054; font-family:monospace; font-size:12px;">${item.totalScore}</span>
    </div>
    `).join('')}
  </td></tr>
  ` : ''}

  <!-- CTA -->
  <tr><td style="padding:24px 0; text-align:center;">
    <table cellpadding="0" cellspacing="0" align="center">
    <tr>
      <td style="background:#c8956c; border-radius:8px; padding:12px 32px;">
        <a href="https://ai-daily-web-livid.vercel.app" target="_blank" style="color:#0a0908; font-size:15px; font-weight:600; text-decoration:none; letter-spacing:0.02em;">
          查看完整日报
        </a>
      </td>
    </tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding-top:16px; border-top:1px solid #1a1816; text-align:center;">
    <div style="font-size:12px; color:#6a6054;">
      AI日报 · 面向低代码AI产品经理 · <a href="https://ai-daily-web-livid.vercel.app" style="color:#6a6054;">取消订阅</a>
    </div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}
