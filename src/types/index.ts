// 日报条目
export interface DailyItem {
  id: string
  date: string
  title: string
  summary: string
  source: SourceType
  sourceUrl: string
  tags: string[]
  accuracyScore: number
  timelinessScore: number
  utilityScore: number
  totalScore: number
  createdAt: string
}

// 日报
export interface DailyReport {
  id: string
  date: string
  items: DailyItem[]
  markdown: string
  createdAt: string
}

// 来源类型
export type SourceType =
  // 御三家
  | 'OpenAI'
  | 'Anthropic'
  | 'Google'
  // 国内大厂
  | 'Minimax'
  | '智谱'
  | '字节'
  | '阿里'
  | 'Seedance'
  // AI Agent 生态
  | 'Hermes'
  | 'OpenClaw'
  | 'MCP'
  | 'Dify'
  // AI 开发工具
  | 'Cursor'
  | 'Coze'
  | 'Windsurf'
  | 'Lovable'
  | 'Replit'
  | 'n8n'
  | 'Lovart'
  // 基础设施
  | 'Microsoft'
  | 'Meta'
  | 'Broadcom'
  // 开源生态
  | 'GitHub'
  // 媒体
  | 'CNBC'
  | 'Reuters'
  | 'XDA'
  | 'The Next Web'
  | 'Axios'
  | 'Bloomberg'
  // 其他
  | '其他'

// 来源分类
export type SourceCategory = '御三家' | '国内大厂' | 'AI Agent生态' | 'AI开发工具' | '基础设施' | '热门项目' | '重点关注' | '其他'

// 获取来源分类
export function getSourceCategory(source: SourceType): SourceCategory {
  const bigThree: SourceType[] = ['OpenAI', 'Anthropic', 'Google']
  const domestic: SourceType[] = ['Minimax', '智谱', '字节', '阿里', 'Seedance']
  const agentEco: SourceType[] = ['Hermes', 'OpenClaw', 'MCP', 'Dify']
  const devTools: SourceType[] = ['Cursor', 'Coze', 'Windsurf', 'Lovable', 'Replit', 'n8n']
  const infra: SourceType[] = ['Microsoft', 'Meta', 'Broadcom']
  const projects: SourceType[] = ['GitHub']
  const focusProducts: SourceType[] = ['Lovart']

  if (bigThree.includes(source)) return '御三家'
  if (domestic.includes(source)) return '国内大厂'
  if (agentEco.includes(source)) return 'AI Agent生态'
  if (devTools.includes(source)) return 'AI开发工具'
  if (infra.includes(source)) return '基础设施'
  if (projects.includes(source)) return '热门项目'
  if (focusProducts.includes(source)) return '重点关注'
  return '其他'
}

// 统计数据
export interface Statistics {
  totalItems: number
  sourceDistribution: Record<string, number>
  tagDistribution: Record<string, number>
  avgScores: {
    accuracy: number
    timeliness: number
    utility: number
    total: number
  }
  dailyTrend: { date: string; count: number }[]
}
