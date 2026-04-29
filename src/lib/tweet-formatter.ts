import { DailyItem } from '@/types'

/**
 * Format daily report items into a Twitter Thread.
 * Returns an array of tweet texts.
 *
 * Thread structure:
 * 1. Header tweet: date + count + top story
 * 2-N. One tweet per news item
 * N+1. CTA + tags
 */
export function formatTweetThread(items: DailyItem[], date: string): string[] {
  const tweets: string[] = []
  const shortDate = date.slice(5).replace('-', '/')

  // Tweet 1: Header
  const top = items[0]
  tweets.push(
    `🤖 AI日报 | ${shortDate}\n\n` +
    `今日 ${items.length} 条动态\n\n` +
    `🔥 ${top.title}\n` +
    `${top.summary.slice(0, 80)}...\n\n` +
    `👇 展开看完整日报`
  )

  // Tweets 2-N: Each news item
  items.forEach((item, i) => {
    const tags = item.tags.slice(0, 3).join(' ')
    tweets.push(
      `${i + 1}/${items.length} ${item.source} · ${item.totalScore}分\n\n` +
      `${item.title}\n\n` +
      `${item.summary.slice(0, 120)}\n\n` +
      `${tags}`
    )
  })

  // Last tweet: CTA
  tweets.push(
    `📬 每天收AI日报到邮箱 → ai-daily-web-livid.vercel.app\n\n` +
    `#AI日报 #AI #ArtificialIntelligence #PM`
  )

  // Twitter limit: 280 chars per tweet
  // Trim tweets that exceed limit
  return tweets.map(t => {
    if (t.length <= 280) return t
    // Truncate and add ellipsis
    return t.slice(0, 277) + '...'
  })
}

/**
 * Format a single tweet for daily highlight (no thread)
 */
export function formatSingleTweet(items: DailyItem[], date: string): string {
  const shortDate = date.slice(5).replace('-', '/')
  const top3 = items.slice(0, 3)

  let tweet = `🤖 AI日报 | ${shortDate} · ${items.length}条\n\n`

  top3.forEach((item, i) => {
    tweet += `${i + 1}. ${item.title.slice(0, 50)}${item.title.length > 50 ? '...' : ''} · ${item.totalScore}分\n`
  })

  tweet += `\n#AI日报 #AI`

  if (tweet.length > 280) {
    tweet = tweet.slice(0, 277) + '...'
  }

  return tweet
}
