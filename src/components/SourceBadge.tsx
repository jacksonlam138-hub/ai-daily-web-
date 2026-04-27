import { DailyItem, SourceType, getSourceCategory } from '@/types'

const badgeClass: Record<string, string> = {
  'OpenAI': 'badge-openai',
  'Anthropic': 'badge-anthropic',
  'Google': 'badge-google',
  'Minimax': 'badge-minimax',
  '智谱': 'badge-zhipu',
  '字节': 'badge-bytedance',
  '阿里': 'badge-alibaba',
  'Seedance': 'badge-seedance',
  'Hermes': 'badge-hermes',
  'Dify': 'badge-dify',
  'Cursor': 'badge-cursor',
  'Coze': 'badge-coze',
  'Windsurf': 'badge-windsurf',
  'Bolt': 'badge-default',
  'v0': 'badge-default',
  'Lovable': 'badge-lovable',
  'Replit': 'badge-replit',
  'n8n': 'badge-n8n',
  'Pencil': 'badge-default',
  'Lovart': 'badge-lovart',
  'Rows': 'badge-default',
  'Atlas': 'badge-default',
  'Search1': 'badge-default',
  'men.ai': 'badge-default',
  'Microsoft': 'badge-microsoft',
  'Meta': 'badge-meta',
  'Broadcom': 'badge-broadcom',
  'GitHub': 'badge-github',
  'MCP': 'badge-mcp',
  'OpenClaw': 'badge-openclaw',
  'Notebook': 'badge-default',
  '其他': 'badge-default',
  'CNBC': 'badge-default',
  'Reuters': 'badge-default',
  'XDA': 'badge-default',
  'The Next Web': 'badge-default',
  'Axios': 'badge-default',
  'Bloomberg': 'badge-default',
}

export function SourceBadge({ source }: { source: SourceType }) {
  return (
    <span className={`badge ${badgeClass[source] || 'badge-default'}`}>
      {source}
    </span>
  )
}

export function ScoreIndicator({ score }: { score: number }) {
  const cls = score >= 95 ? 'score-high' : score >= 90 ? 'score-mid' : 'score-low'
  return (
    <div className={`score-ring ${cls}`}>
      {score}
    </div>
  )
}

export function CategoryHeader({ category }: { category: string }) {
  return (
    <div style={{ marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
      <span style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>
        {category}
      </span>
    </div>
  )
}

export function NewsItemCard({ item }: { item: DailyItem }) {
  return (
    <div className="news-item">
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Source + Tags */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
            <SourceBadge source={item.source} />
            {item.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          {/* Title */}
          <h3 style={{
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.5,
            color: 'var(--text-primary)',
            marginBottom: 6,
          }}>
            {item.title}
          </h3>
          {/* Summary */}
          <p style={{
            fontSize: 13,
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 8,
          }}>
            {item.summary}
          </p>
          {/* Link */}
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow"
          >
            原文
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        {/* Score */}
        <ScoreIndicator score={item.totalScore} />
      </div>
    </div>
  )
}
