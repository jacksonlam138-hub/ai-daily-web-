---
name: ai-daily
description: AI日报生成器 - 面向低代码AI产品经理，自动采集AI资讯、甄别筛选、生成日报并推送到飞书。使用 /ai-daily 命令触发。
---

# AI日报生成器（低代码AI PM版）

## 触发方式
```
/ai-daily
```

## 用户画像
低代码行业软件AI产品经理，关注：
- AI能力如何影响低代码/无代码平台的产品边界
- Agent框架与协议（MCP）对开发工具链的重构
- 模型能力跃迁带来的新产品形态
- 企业AI应用的落地节奏

## 时区约定
- 所有日期均以**北京时间（UTC+8）**为准
- 如系统时间非北京时间，需先通过 `TZ=Asia/Shanghai date +%Y-%m-%d` 或搜索确认当前北京日期
- 日报日期、时效性判断均基于北京时间

## 工作流程

### 步骤0: 确认日期
获取当前北京时间日期，作为本次日报的目标日期。

### 步骤1: 数据采集（News-First 策略，目标 ≤5 次 API 调用）

**第一轮：Brave News API 批量采集（3次调用）**

1. `brave_news_search("AI artificial intelligence model release", freshness="pd", count=20)`
   → 覆盖当日全球AI新闻（御三家+融资+产品发布）

2. `brave_news_search("AI agent MCP coding tool Claude Cursor Codex", freshness="pw", count=20)`
   → 覆盖Agent生态+AI开发工具动态

3. `brave_news_search("AI 人工智能 大模型 智谱 字节 阿里", freshness="pw", count=15, search_lang="zh-hans")`
   → 覆盖国内大厂动态

**第二轮：补漏（0-2次调用，视第一轮覆盖情况决定）**

- 如果第一轮已充分覆盖 OpenAI/Anthropic/Google 官方动态 → 跳过
- 否则用 `brave_web_search("site:openai.com OR site:anthropic.com", freshness="pw")` 补漏

**数据源优先级（仅用于结果分类和评分参考）：**

| 优先级 | 来源 | 说明 |
|--------|------|------|
| P0 御三家 | OpenAI, Anthropic, Google | 必须覆盖 |
| P0 Agent生态 | Hermes, OpenClaw, MCP, Dify | 必须覆盖 |
| P1 开发工具 | Cursor, Coze, Windsurf, Lovable, Replit, n8n | 重要动态 |
| P1 重点关注 | Lovart, Seedance | 用户指定跟踪 |
| P2 国内大厂 | 智谱, 字节, 阿里, Minimax | 重要动态 |
| P2 基础设施 | Microsoft, Meta, Broadcom | 融资/战略 |

### 步骤2: 日期验证（关键！）
在甄别之前，**必须先确认每条新闻的实际发布日期**：

1. **检查URL中的日期**：如 `/2026/04/13/`、`2026-04-13` 等
2. **访问原文确认发布时间**：使用 WebFetch 读取原文的发布日期
3. **与已有日报去重**：对比 store.ts 中已录入的数据，避免重复
4. **时效性窗口**：只录入**当日 ± 2天**内首次发布的新闻
5. **不得将旧闻重新包装为新日期**：即使搜索结果返回了旧文章，也不可录入为当日新闻
6. **如有重复或类似已录入内容则跳过**

**拒绝录入的情况：**
- 文章实际发布日期早于3天前
- 已在前几期日报中覆盖过的内容
- 搜索结果中的"综述/对比"文章（非新闻事件）
- 无法确认发布日期的内容（除非来源可信度极高）

### 步骤3: 信息甄别
对每条通过日期验证的信息按PM视角评分：

| 维度 | 标准 | 权重 |
|------|------|------|
| 准确性 | 是否官方来源或权威媒体 | 40% |
| 时效性 | 是否24-48小时内 | 30% |
| PM价值 | 对低代码AI产品决策的影响 | 30% |

**PM价值加分项：**
- 涉及Agent/MCP/低代码工具 +10
- 模型能力边界突破（影响产品可行性） +10
- 企业应用落地案例 +5
- 竞品产品策略变化 +5

**应当过滤：**
- 纯融资/估值数字（除非有产品策略变化）
- 缺乏实质的预告/炒作
- 与低代码/AI开发无关的纯学术进展

### 步骤4: 生成日报
按以下模板生成Markdown：

```markdown
# AI日报 | {今日日期}

## 御三家动态

### OpenAI
- **{标题}** #{标签}
  {50字摘要}
  [来源]({链接})

### Anthropic
- **{标题}** #{标签}
  {50字摘要}
  [来源]({链接})

### Google
- **{标题}** #{标签}
  {50字摘要}
  [来源]({链接})

---

## AI Agent 生态
- **{标题}** #{标签}
  {50字摘要}
  [来源]({链接})

---

## 低代码 / AI 开发工具
- **{标题}** #{标签}
  {50字摘要}
  [来源]({链接})

---

## 国内动态
{如有重要国内AI资讯}

---

## PM 视角
**本周关键趋势**：{1-2句总结对低代码AI产品的影响}
**值得关注**：{列出2-3个需要持续跟踪的方向}

---
*AI日报 @ {时间戳}*
```

### 步骤5: 保存与推送
1. 保存日报到本地文件
2. 更新监测网站数据（ai-daily-web/src/lib/store.ts）
3. 调用飞书机器人API推送（需配置Webhook）

## 标签体系

### 核心标签（PM视角）
- `#Agent` - AI智能体相关
- `#MCP` - Model Context Protocol
- `#低代码` - 低代码/无代码平台
- `#RAG` - 检索增强生成
- `#企业应用` - 企业级AI应用

### 技术标签
- `#发布` - 新产品/模型发布
- `#更新` - 功能更新
- `#模型` - 模型相关
- `#开源` - 开源项目
- `#API` - API变更
- `#协议` - 协议/标准

### 业务标签
- `#融资` - 融资/估值
- `#战略` - 公司战略调整
- `#竞争` - 竞品动态
- `#算力` - 算力/芯片
- `#安全` - 安全/合规
- `#蒸馏` - 模型蒸馏相关

## 来源类型映射

| 来源 | 分类 |
|------|------|
| OpenAI, Anthropic, Google | 御三家 |
| Minimax, 智谱, 字节, 阿里, Seedance | 国内大厂 |
| Hermes, Dify, Cursor, Coze, Windsurf, Bolt, v0, Lovable, Replit, n8n | AI开发工具 |
| Microsoft, Meta, Broadcom | 基础设施 |
| GitHub, MCP, OpenClaw, Notebook | 热门项目 |
| Pencil, Lovart, Rows, Atlas, Search1, men.ai | 重点关注 |

## 配置要求
在 `~/.claude/skills/ai-daily/config.json` 中配置：
```json
{
  "feishu_webhook": "YOUR_WEBHOOK_URL",  // 替换为你的飞书机器人 Webhook，勿提交真实值
  "output_dir": "~/AI-Daily-Reports",
  "push_time": "09:00",
  "user_role": "lowcode_ai_pm",
  "focus_areas": ["agent", "mcp", "lowcode", "rag", "enterprise"]
}
```

## 注意事项
- 摘要严格控制在50字以内
- 每个分类最多5条内容
- "PM视角"部分是差异化价值，必须有
- Agent/MCP/低代码相关内容优先展示
- 如无重要内容，该分类可省略
