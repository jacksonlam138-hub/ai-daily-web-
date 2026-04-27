import { DailyItem, SourceType, getSourceCategory } from '@/types'

const sourceClassMap: Record<string, string> = {
  'OpenAI': 'src-openai',
  'Anthropic': 'src-anthropic',
  'Google': 'src-google',
  'Minimax': 'src-minimax',
  '智谱': 'src-zhipu',
  '字节': 'src-bytedance',
  '阿里': 'src-alibaba',
  'Seedance': 'src-seedance',
  'Hermes': 'src-hermes',
  'Dify': 'src-dify',
  'Cursor': 'src-cursor',
  'Coze': 'src-coze',
  'Windsurf': 'src-windsurf',
  'Bolt': 'src-bolt',
  'v0': 'src-v0',
  'Lovable': 'src-lovable',
  'Replit': 'src-replit',
  'n8n': 'src-n8n',
  'Pencil': 'src-pencil',
  'Lovart': 'src-lovart',
  'Rows': 'src-rows',
  'Atlas': 'src-atlas',
  'Search1': 'src-search1',
  'men.ai': 'src-menai',
  'Microsoft': 'src-microsoft',
  'Meta': 'src-meta',
  'Broadcom': 'src-broadcom',
  'GitHub': 'src-github',
  'MCP': 'src-mcp',
  'OpenClaw': 'src-openclaw',
  'Notebook': 'src-notebook',
  '其他': 'src-other',
}

export function SourceBadge({ source }: { source: SourceType }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${sourceClassMap[source] || 'src-other'}`}>
      {source}
    </span>
  )
}

export function ScoreBar({ score, size = 'sm' }: { score: number; size?: 'sm' | 'lg' }) {
  const height = size === 'lg' ? 'h-2' : 'h-1'

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${height} bg-white/[0.06] rounded-full overflow-hidden`}>
        <div
          className={`${height} bg-indigo-400 rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-mono text-zinc-500 tabular-nums w-8 text-right">{score}</span>
    </div>
  )
}

export function ReportItem({ item, index }: { item: DailyItem; index: number }) {
  const category = getSourceCategory(item.source)
  const categoryClass =
    category === '御三家' ? 'p0' :
    category === '国内大厂' ? 'p1' :
    category === '热门项目' ? 'p2' : 'p3'

  return (
    <div
      className={`animate-fade-in-up delay-${Math.min(index + 1, 8)} group p-5 border-b border-white/[0.04] last:border-0 transition-colors duration-200 hover:bg-white/[0.02]`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <SourceBadge source={item.source} />
            {item.tags.map(tag => (
              <span key={tag} className="text-xs text-zinc-500">{tag}</span>
            ))}
          </div>
          <h3 className="text-[15px] font-medium text-zinc-100 mb-1.5 leading-relaxed group-hover:text-white transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{item.summary}</p>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-violet-400 mt-2 transition-colors"
          >
            查看原文
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-50">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <div className="w-24 shrink-0 pt-1">
          <ScoreBar score={item.totalScore} />
        </div>
      </div>
    </div>
  )
}

export function CategoryHeader({ category }: { category: string }) {
  return (
    <div className="category-line mb-3">
      <h2 className="text-xs font-medium tracking-wide text-zinc-400">
        {category}
      </h2>
    </div>
  )
}
