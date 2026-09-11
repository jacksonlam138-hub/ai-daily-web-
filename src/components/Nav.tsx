'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  return (
    <header className="reading-nav">
      <nav aria-label="主导航" className="reading-nav-inner">
        <Link href="/" className="reading-wordmark">AI Daily</Link>
        <div className="reading-nav-links">
          {[
            { href: '/', label: '精选' }, { href: '/archive', label: '往期' }, { href: '/search', label: '搜索' },
          ].map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}
        </div>
      </nav>
    </header>
  )
}
