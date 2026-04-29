import { NextResponse } from 'next/server'
import { TwitterApi } from 'twitter-api-v2'
import { getDailyReport } from '@/lib/store'
import { formatTweetThread } from '@/lib/tweet-formatter'

function getTwitterClient() {
  const apiKey = process.env.TWITTER_API_KEY
  const apiSecret = process.env.TWITTER_API_SECRET
  const accessToken = process.env.TWITTER_ACCESS_TOKEN
  const accessSecret = process.env.TWITTER_ACCESS_SECRET

  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    return null
  }

  return new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
    accessToken,
    accessSecret,
  })
}

export async function POST(request: Request) {
  const client = getTwitterClient()

  if (!client) {
    return NextResponse.json({
      error: 'Twitter API not configured',
      setup: {
        steps: [
          '1. Go to https://developer.twitter.com',
          '2. Create a Project and App',
          '3. Set App permissions to "Read and Write"',
          '4. Generate API Key + Secret + Access Token + Secret',
          '5. Add to .env.local:',
          '   TWITTER_API_KEY=xxxxx',
          '   TWITTER_API_SECRET=xxxxx',
          '   TWITTER_ACCESS_TOKEN=xxxxx',
          '   TWITTER_ACCESS_SECRET=xxxxx',
        ],
      },
    }, { status: 500 })
  }

  let date: string
  try {
    const body = await request.json()
    date = body.date
  } catch {
    date = new Date().toISOString().split('T')[0]
  }

  const report = getDailyReport(date)
  if (!report) {
    return NextResponse.json({ error: `No report for ${date}` }, { status: 404 })
  }

  const tweets = formatTweetThread(report.items, date)

  try {
    // Post as a thread
    const results = []

    // First tweet
    const firstTweet = await client.v2.tweet(tweets[0])
    results.push({ index: 0, id: firstTweet.data.id })

    // Thread continuation
    let previousId = firstTweet.data.id

    for (let i = 1; i < tweets.length; i++) {
      const reply = await client.v2.reply(tweets[i], previousId)
      results.push({ index: i, id: reply.data.id })
      previousId = reply.data.id
    }

    return NextResponse.json({
      ok: true,
      threadLength: tweets.length,
      tweetIds: results.map(r => r.id),
      date,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown Twitter API error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// GET: Preview the tweet thread without posting
export async function GET() {
  const today = new Date().toISOString().split('T')[0]
  const report = getDailyReport(today)

  if (!report) {
    return NextResponse.json({ error: 'No report for today' }, { status: 404 })
  }

  const tweets = formatTweetThread(report.items, today)
  return NextResponse.json({
    date: today,
    threadLength: tweets.length,
    preview: tweets,
    note: 'POST to this endpoint to publish the thread',
  })
}
