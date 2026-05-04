import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('subscribers')
    .select('email, streak, subscribed_at')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    count: data.length,
    subscribers: data.map(s => ({
      email: s.email,
      streak: s.streak,
      subscribedAt: s.subscribed_at,
    })),
  })
}

export async function POST(request: Request) {
  const { email } = await request.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const { error } = await supabase
    .from('subscribers')
    .insert({ email })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, email })
}

export async function DELETE(request: Request) {
  const { email } = await request.json()
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  const { error, count } = await supabase
    .from('subscribers')
    .delete({ count: 'exact' })
    .eq('email', email)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, removed: count ?? 0 })
}
