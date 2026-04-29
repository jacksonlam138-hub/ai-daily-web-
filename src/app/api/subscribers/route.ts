import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

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

async function saveSubscribers(subs: Subscriber[]): Promise<void> {
  await writeFile(SUBSCRIBERS_PATH, JSON.stringify(subs, null, 2), 'utf-8')
}

export async function GET() {
  const subs = await getSubscribers()
  return NextResponse.json({ count: subs.length, subscribers: subs.map(s => ({ email: s.email, streak: s.streak, subscribedAt: s.subscribedAt })) })
}

export async function POST(request: Request) {
  const { email } = await request.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const subs = await getSubscribers()
  if (subs.some(s => s.email === email)) {
    return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
  }

  subs.push({ email, streak: 0, subscribedAt: new Date().toISOString() })
  await saveSubscribers(subs)

  return NextResponse.json({ ok: true, email })
}

export async function DELETE(request: Request) {
  const { email } = await request.json()
  const subs = await getSubscribers()
  const filtered = subs.filter(s => s.email !== email)
  await saveSubscribers(filtered)

  return NextResponse.json({ ok: true, removed: subs.length - filtered.length })
}
