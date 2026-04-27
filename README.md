# AI日报监测平台

面向低代码AI产品经理的自动化AI资讯聚合系统。每日采集全球AI动态，三维度评分筛选，生成结构化日报并展示在Web监测平台。

**在线访问**: https://ai-daily-web-livid.vercel.app

## 技术栈

- Next.js 16.2.2 (App Router) + React 19 + TypeScript 5
- Tailwind CSS v4 (Glass Morphism 暗色主题)
- Claude Code Skill 驱动自动化采集

## 页面

| 页面 | 路径 | 功能 |
|------|------|------|
| 首页 | `/` | 今日日报、统计概览、历史日报 |
| 搜索 | `/search` | 关键词/标签/来源/日期筛选 |
| 仪表盘 | `/dashboard` | 来源分布、标签云、评分趋势 |
| 设置 | `/settings` | 定时任务与数据源配置 |

## 评分体系

准确性 40% + 时效性 30% + PM价值 30%

## 数据源

覆盖御三家(OpenAI/Anthropic/Google)、AI Agent生态、AI开发工具、国内大厂、基础设施共16个核心来源。

详见 [docs/PRD.md](docs/PRD.md)

## 自动化

通过 Claude Code Skill + Cron 每日北京时间 9:00 自动执行采集流程。详见 [docs/skill/](docs/skill/)

## 开发

```bash
npm install
npm run dev
# 访问 http://localhost:3000
```

## License

MIT
