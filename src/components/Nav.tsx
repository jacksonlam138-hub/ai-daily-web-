import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/search', label: '搜索' },
  { href: '/dashboard', label: '仪表盘' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
            AI
          </div>
          <span className="text-base font-semibold tracking-tight">
            <span className="gradient-text">AI日报</span>
            <span className="text-zinc-500 text-xs ml-2 font-normal">监测</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/[0.08] text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
