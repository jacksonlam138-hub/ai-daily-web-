import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const CONFIG_PATH = path.join(process.env.HOME || '', '.claude/skills/ai-daily/config.json')

export async function GET() {
  try {
    const raw = await readFile(CONFIG_PATH, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({ error: 'config not found' }, { status: 404 })
  }
}

export async function POST(request: Request) {
  try {
    const config = await request.json()
    await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8')
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'write failed' }, { status: 500 })
  }
}
