import { DailyItem, DailyReport, Statistics, SourceType, getSourceCategory } from '@/types'

const sampleItems: DailyItem[] = [
  // === 2026-05-01 (周四·五一) ===
  {
    id: '20260501-01',
    date: '2026-05-01',
    title: 'Google Cloud增速超越Azure和AWS，三大云厂商Q1集体超预期，AI需求全面爆发',
    summary: 'Amazon、Google、Microsoft三大云厂商Q1财报均超预期。Google Cloud增速领跑，Azure增40%，AWS同样加速增长。三家均大幅上调资本支出预期以应对AI需求，合计2026年capex将超$7000亿。',
    source: 'Google',
    sourceUrl: 'https://cnbc.com/2026/04/30/google-microsoft-and-amazon-all-report-cloud-beats-in-earnings.html',
    tags: ['#企业应用', '#算力'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 93,
    createdAt: '2026-05-01T01:00:00Z'
  },
  {
    id: '20260501-02',
    date: '2026-05-01',
    title: 'Meta放弃Llama开源路线，转向闭源模型Muse Spark，开源AI社区震动',
    summary: 'Meta宣布放弃开源Llama系列，转向专有模型Muse Spark。这一战略转向意味着AI开源生态失去最大支持者，对依赖Llama的开发者和企业产生深远影响。',
    source: 'Meta',
    sourceUrl: 'https://thenewstack.io/meta-abandons-llama-spark/',
    tags: ['#开源', '#战略'],
    accuracyScore: 92,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 92,
    createdAt: '2026-05-01T01:30:00Z'
  },
  {
    id: '20260501-03',
    date: '2026-05-01',
    title: 'SoftBank拟拆分AI与机器人业务"Roze"赴美IPO，目标估值$1000亿',
    summary: 'SoftBank计划将AI和机器人业务拆分为独立公司"Roze"，赴美IPO目标估值$1000亿。该计划与其在OpenAI的大规模投资并行，显示软银全面押注AI基础设施。',
    source: '其他',
    sourceUrl: 'https://cnbc.com/2026/04/30/softbank-roze-ai-robotics-ipo-100-billion-ft-report.html',
    tags: ['#融资', '#战略'],
    accuracyScore: 90,
    timelinessScore: 90,
    utilityScore: 82,
    totalScore: 87,
    createdAt: '2026-05-01T02:00:00Z'
  },

  // === 2026-04-30 (周三) ===
  {
    id: '20260430-01',
    date: '2026-04-30',
    title: 'CNBC：Anthropic洽谈$9000亿估值融资，超越OpenAI成为全球最高估值AI公司',
    summary: 'Anthropic正与投资者洽谈以$9000亿估值融资，超越OpenAI的$8520亿。Claude Code是增长核心，年化收入达$300亿。Amazon投资$250亿，Google承诺$400亿。Claude Mythos网络安全模型引发政府高层关注。',
    source: 'Anthropic',
    sourceUrl: 'https://www.cnbc.com/2026/04/29/anthropic-weighs-raising-funds-at-900b-valuation-topping-openai.html',
    tags: ['#融资', '#竞争', '#战略'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 97,
    createdAt: '2026-04-30T01:00:00Z'
  },
  {
    id: '20260430-02',
    date: '2026-04-30',
    title: 'Cursor AI曝出严重安全漏洞：扩展可窃取API密钥，AI Agent可被利用静默执行代码',
    summary: '安全研究员发现Cursor多个高危漏洞（CVE-2026-26268），扩展可从未加密SQLite库窃取API密钥和会话令牌。Git钩子可触发AI Agent静默执行恶意代码。截至4月底仍未发布完整修复。',
    source: 'Cursor',
    sourceUrl: 'https://sqmagazine.co.uk/cursor-ai-security-flaw-api-key-theft-code-execution',
    tags: ['#安全', '#Agent'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 95,
    totalScore: 95,
    createdAt: '2026-04-30T01:30:00Z'
  },
  {
    id: '20260430-03',
    date: '2026-04-30',
    title: 'Microsoft Q3财报：Azure增长40%，Copilot突破2000万席，全年AI支出$1900亿',
    summary: 'Microsoft Q3营收$828.9亿超预期，Azure增长40%。365 Copilot席位达2000万（1月为1500万）。AI年化收入$370亿，同比+123%。同时结束与OpenAI独家合作，改为非独家许可。',
    source: 'Microsoft',
    sourceUrl: 'https://cnbc.com/2026/04/29/microsoft-msft-q3-earnings-report-2026.html',
    tags: ['#企业应用', '#战略'],
    accuracyScore: 97,
    timelinessScore: 95,
    utilityScore: 88,
    totalScore: 93,
    createdAt: '2026-04-30T02:00:00Z'
  },
  {
    id: '20260430-04',
    date: '2026-04-30',
    title: 'Lovable推出iOS/Android移动端，Vibe Coding平台全面移动化',
    summary: 'AI应用构建平台Lovable正式上线移动端App。用户可在手机上通过自然语言构建应用，iOS端暂仅支持预览。Vibe Coding从桌面走向移动，降低AI开发门槛。',
    source: 'Lovable',
    sourceUrl: 'https://www.gadgets360.com/ai/news/lovable-mobile-app-launched-android-ios-vibe-coding-platform-features-11424406',
    tags: ['#低代码', '#发布'],
    accuracyScore: 90,
    timelinessScore: 95,
    utilityScore: 95,
    totalScore: 93,
    createdAt: '2026-04-30T02:30:00Z'
  },
  {
    id: '20260430-05',
    date: '2026-04-30',
    title: 'MiniMax发布Speech 2.8：10秒声音克隆，原生语气标签让AI语音告别机器人感',
    summary: 'MiniMax发布Speech 2.8语音模型。支持原生声音标签（叹气、笑声、咳嗽），10秒样本高保真声音克隆，消除跨语言口音串扰。中文-日语对已优化。',
    source: 'MiniMax',
    sourceUrl: 'https://www.minimax.io/news/minimax-speech-28',
    tags: ['#模型', '#发布'],
    accuracyScore: 92,
    timelinessScore: 90,
    utilityScore: 85,
    totalScore: 89,
    createdAt: '2026-04-30T03:00:00Z'
  },

  // === 2026-04-29 (周二) ===
  {
    id: '20260429-01',
    date: '2026-04-29',
    title: 'WSJ：OpenAI连续多月未达营收目标，在编码和企业市场被Anthropic抢地盘',
    summary: 'WSJ报道OpenAI今年多次未达月度营收目标，ChatGPT增长放缓，未实现10亿周活目标。在编码和企业市场被Anthropic蚕食份额。Altman和CFO发联合声明称"完全一致"。',
    source: 'OpenAI',
    sourceUrl: 'https://www.reuters.com/business/openai-falls-short-revenue-user-targets-it-races-toward-ipo-wsj-reports-2026-04-28/',
    tags: ['#竞争', '#战略'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 92,
    totalScore: 97,
    createdAt: '2026-04-29T02:00:00Z'
  },
  {
    id: '20260429-02',
    date: '2026-04-29',
    title: 'Apple WWDC 2026海报暗藏AI Siri玄机，Google Gemini将驱动全新Siri',
    summary: 'Mark Gurman分析WWDC 2026宣传图隐藏AI Siri线索。Apple与Google Gemini合作打造对话式Siri，可能作为独立App推出。iOS 27将于6月8日WWDC发布。',
    source: 'Google',
    sourceUrl: 'https://mashable.com/article/apple-wwdc-ai-siri-tease',
    tags: ['#Agent', '#竞争'],
    accuracyScore: 90,
    timelinessScore: 95,
    utilityScore: 85,
    totalScore: 90,
    createdAt: '2026-04-29T02:30:00Z'
  },
  {
    id: '20260429-03',
    date: '2026-04-29',
    title: 'XDA横评：Claude Code vs Codex vs Lovable vs Replit，仅一款真正可用于生产',
    summary: 'XDA编辑实测四大AI编码工具，从想法到可交付原型的全流程对比。结论：只有一款工具达到了"真正可用于实际工作"的标准，AI编码工具差距正在拉大。',
    source: '其他',
    sourceUrl: 'https://www.xda-developers.com/tested-claude-code-lovable-and-replit-side-by-side/',
    tags: ['#低代码', '#Agent', '#竞争'],
    accuracyScore: 92,
    timelinessScore: 95,
    utilityScore: 95,
    totalScore: 94,
    createdAt: '2026-04-29T03:00:00Z'
  },

  // === 2026-04-28 (周一) ===
  {
    id: '20260428-01',
    date: '2026-04-28',
    title: 'DeepSeek发布V4-Pro模型，API价格暴降75%引爆中国AI价格战',
    summary: 'DeepSeek发布旗舰模型V4-Pro并对开发者提供75%折扣至5月5日，输入缓存命中价格降至原价1/10。模型擅长Agent场景但性能仍落后Google Gemini-Pro-3.1。中国AI价格战持续升温。',
    source: '其他',
    sourceUrl: 'https://www.bloomberg.com/news/articles/2026-04-27/deepseek-slashes-fees-for-new-ai-model-in-chinese-price-war',
    tags: ['#发布', '#竞争', '#Agent'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 90,
    totalScore: 96,
    createdAt: '2026-04-28T02:00:00Z'
  },
  {
    id: '20260428-02',
    date: '2026-04-28',
    title: 'Cursor+Claude Opus 4.6误删公司生产数据库，AI Agent安全引发关注',
    summary: 'PocketOS创始人称Cursor运行Claude Opus 4.6在一次API调用中删除了生产数据库和所有卷级备份，耗时仅9秒。AI编码Agent的权限控制和安全防护成为行业焦点。',
    source: 'Anthropic',
    sourceUrl: 'https://www.tomshardware.com/tech-industry/artificial-intelligence/claude-powered-ai-coding-agent-deletes-entire-company-database-in-9-seconds-backups-zapped-after-cursor-tool-powered-by-anthropics-claude-goes-rogue',
    tags: ['#安全', '#Agent'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 97,
    createdAt: '2026-04-28T02:30:00Z'
  },
  {
    id: '20260428-03',
    date: '2026-04-28',
    title: '中国监管部门阻止Meta 20亿美元收购AI Agent初创公司Manus',
    summary: '中国宣布阻止Meta以约20亿美元收购新加坡AI初创Manus的交易。Manus以"真正自主的Agent"著称，去年12月宣布交易后历经数月监管审查。AI领域地缘政治博弈加剧。',
    source: 'Meta',
    sourceUrl: 'https://www.cnbc.com/2026/04/27/meta-manus-china-blocks-acquisition-ai-startup.html',
    tags: ['#竞争', '#Agent', '#战略'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 88,
    totalScore: 95,
    createdAt: '2026-04-28T03:00:00Z'
  },
  {
    id: '20260428-04',
    date: '2026-04-28',
    title: 'Google追加400亿美元投资Anthropic，3500亿估值锁定算力合作',
    summary: 'Google先期投入100亿美元现金（Anthropic估值3500亿美元），另300亿美元待达成绩效目标后追加。同时承诺大幅扩展Anthropic在Google算力基础设施上的容量，含100万台Ironwood TPU。',
    source: 'Google',
    sourceUrl: 'https://www.cnbc.com/2026/04/24/google-to-invest-up-to-40-billion-in-anthropic-as-search-giant-spreads-its-ai-bets.html',
    tags: ['#融资', '#算力', '#战略'],
    accuracyScore: 98,
    timelinessScore: 88,
    utilityScore: 92,
    totalScore: 93,
    createdAt: '2026-04-28T03:30:00Z'
  },

  // === 2026-04-27 (周日) ===
  {
    id: '20260427-01',
    date: '2026-04-27',
    title: 'OpenAI发布GPT-5.5：推理与编码能力跃升，Codex效率翻倍',
    summary: 'OpenAI 4月26日发布GPT-5.5，推理、编码和任务自动化能力大幅提升，在Codex中用更少token完成同等任务。API自4月24日开放。ChatGPT周活达9亿，付费用户超5000万。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/introducing-gpt-5-5/',
    tags: ['#发布', '#模型', '#Agent'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 98,
    createdAt: '2026-04-27T02:00:00Z'
  },
  {
    id: '20260427-02',
    date: '2026-04-27',
    title: 'AWS Bedrock AgentCore更新：3次API调用部署自主Agent',
    summary: 'AWS在Bedrock AgentCore推出托管Agent Harness，开发者仅需3次API调用即可部署自主Agent。新增持久化文件系统、AgentCore CLI，支持Claude Code/Codex/Cursor的预置技能。',
    source: '其他',
    sourceUrl: 'https://forbes.com/sites/janakirammsv/2026/04/26/aws-cuts-ai-agent-setup-to-3-api-calls-in-agentcore-update',
    tags: ['#发布', '#Agent', '#企业应用'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 97,
    createdAt: '2026-04-27T02:30:00Z'
  },
  {
    id: '20260427-03',
    date: '2026-04-27',
    title: 'Fortune深度：Anthropic回应Claude Code性能下降，用户持续流失',
    summary: 'Fortune报道Anthropic承认Claude Code因三次工程失误导致性能下降：推理历史丢失bug、25字回复上限、用量异常消耗。已回滚修复并重置用户额度，但部分用户转向OpenAI Codex。',
    source: 'Anthropic',
    sourceUrl: 'https://fortune.com/2026/04/24/anthropic-engineering-missteps-claude-code-performance-decline-user-backlash/',
    tags: ['#Agent', '#竞争'],
    accuracyScore: 97,
    timelinessScore: 95,
    utilityScore: 92,
    totalScore: 95,
    createdAt: '2026-04-27T03:00:00Z'
  },
  {
    id: '20260427-04',
    date: '2026-04-27',
    title: 'GitNexus：开源MCP原生知识图谱引擎，赋予AI编码Agent代码结构感知',
    summary: 'GitNexus开源发布MCP原生知识图谱引擎，为Claude Code、Cursor、Codex等Agent提供完整代码库结构感知能力，支持分层索引和跨仓库语义搜索。',
    source: 'GitHub',
    sourceUrl: 'https://www.marktechpost.com/2026/04/24/meet-gitnexus-an-open-source-mcp-native-knowledge-graph-engine-that-gives-claude-code-and-cursor-full-codebase-structural-awareness/',
    tags: ['#开源', '#MCP', '#Agent'],
    accuracyScore: 94,
    timelinessScore: 92,
    utilityScore: 95,
    totalScore: 94,
    createdAt: '2026-04-27T03:30:00Z'
  },
  {
    id: '20260427-05',
    date: '2026-04-27',
    title: 'Amazon追加50亿美元投资Anthropic，深化AI算力与模型合作',
    summary: 'Amazon完成对Anthropic的50亿美元追加投资与合作伙伴协议，为本周最大融资事件。Anthropic年化营收已破300亿美元，Amazon持续加码AI基础设施布局。',
    source: 'Anthropic',
    sourceUrl: 'https://news.crunchbase.com/venture/biggest-funding-rounds-ai-autonomy-biotech-anthropic/',
    tags: ['#融资', '#战略'],
    accuracyScore: 96,
    timelinessScore: 92,
    utilityScore: 88,
    totalScore: 92,
    createdAt: '2026-04-27T04:00:00Z'
  },
  {
    id: '20260427-06',
    date: '2026-04-27',
    title: 'Google Gemini Drops四月更新：新增多种实用功能',
    summary: 'Google发布Gemini Drops四月月度更新，涵盖Gemini App多项功能改进和体验优化，持续提升Gemini在多模态交互和日常使用场景的表现。',
    source: 'Google',
    sourceUrl: 'https://blog.google/innovation-and-ai/products/gemini-app/gemini-drop-april-2026/',
    tags: ['#更新'],
    accuracyScore: 97,
    timelinessScore: 90,
    utilityScore: 82,
    totalScore: 90,
    createdAt: '2026-04-27T04:30:00Z'
  },
  {
    id: '20260427-07',
    date: '2026-04-27',
    title: 'MCP生态爆发：1万+企业服务器部署，9700万SDK下载，Gartner预测年末40%企业应用嵌入Agent',
    summary: '截至4月MCP已在1万+企业服务器部署，SDK下载量超9700万。A2A协议获150+组织支持，Gartner预测2026年底40%企业应用将嵌入AI Agent，MCP成为Agent接入标准协议。',
    source: 'MCP',
    sourceUrl: 'https://www.fifthrow.com/blog/ai-agent-orchestration-goes-enterprise-the-april-2026-playbook-for-systematic-innovation-risk-and-value-at-scale',
    tags: ['#MCP', '#Agent', '#企业应用'],
    accuracyScore: 92,
    timelinessScore: 90,
    utilityScore: 98,
    totalScore: 93,
    createdAt: '2026-04-27T05:00:00Z'
  },

  // === 2026-04-23 (周三) ===
  {
    id: '20260423-01',
    date: '2026-04-23',
    title: 'OpenAI发布Workspace Agents：ChatGPT团队可创建Codex驱动的共享Agent',
    summary: 'OpenAI在ChatGPT推出Workspace Agents，团队可创建共享Agent自动处理报告、编码、消息回复等任务，云端运行无需在线，5月6日前免费，后续按credit计费。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/introducing-workspace-agents-in-chatgpt/',
    tags: ['#发布', '#Agent', '#企业应用'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 93,
    totalScore: 97,
    createdAt: '2026-04-23T08:00:00Z'
  },
  {
    id: '20260423-02',
    date: '2026-04-23',
    title: 'Apple宣布John Ternus接任CEO，Tim Cook转任董事会执行主席',
    summary: 'Apple宣布硬件工程VP John Ternus将于9月1日接任CEO，Tim Cook转任董事会执行主席。Ternus在Apple工作近整个职业生涯，师从Jobs和Cook。',
    source: 'The Next Web',
    sourceUrl: 'https://www.theguardian.com/technology/2026/apr/20/john-ternus-apple-ceo-tim-cook',
    tags: ['#战略'],
    accuracyScore: 97,
    timelinessScore: 92,
    utilityScore: 78,
    totalScore: 90,
    createdAt: '2026-04-23T08:00:00Z'
  },
  {
    id: '20260423-03',
    date: '2026-04-23',
    title: 'IBM Q1营收增速放缓+AI冲击担忧，盘后股价下跌6.5%',
    summary: 'IBM一季度营收增速放缓，软件业务（含Red Hat和Watsonx）增长仅11.3%，引发AI工具冲击传统软件业务的担忧，盘后跌6.5%。CEO称AI助手可帮助对冲风险。',
    source: 'Reuters',
    sourceUrl: 'https://www.reuters.com/business/ibm-tops-quarterly-estimates-hybrid-cloud-growth-2026-04-22/',
    tags: ['#竞争', '#企业应用'],
    accuracyScore: 96,
    timelinessScore: 95,
    utilityScore: 85,
    totalScore: 92,
    createdAt: '2026-04-23T08:00:00Z'
  },
  {
    id: '20260423-04',
    date: '2026-04-23',
    title: 'Claude Code修复Opus 4.7关键Bug：context窗口按200K计算导致提前压缩',
    summary: 'Claude Code修复Opus 4.7会话错误按200K而非实际1M窗口计算context百分比的问题，导致自动压缩过早触发。同时优化/resume大session速度提升67%。',
    source: 'Anthropic',
    sourceUrl: 'https://github.com/anthropics/claude-code/releases',
    tags: ['#更新', '#Agent'],
    accuracyScore: 98,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 95,
    createdAt: '2026-04-23T08:00:00Z'
  },
  {
    id: '20260423-05',
    date: '2026-04-23',
    title: 'SpaceX-Cursor 600亿交易后续：OpenAI去年曾尝试收购Cursor未果',
    summary: 'Fortune报道OpenAI去年曾调查收购Cursor的可能性但未成行。a16z和Nvidia同时是xAI和Cursor投资方，利益高度一致。Cursor CEO Michael Truell尚未公开回应。',
    source: 'CNBC',
    sourceUrl: 'https://fortune.com/2026/04/22/spacex-strikes-60-billion-deal-cursor/',
    tags: ['#融资', '#竞争'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 88,
    totalScore: 93,
    createdAt: '2026-04-23T08:00:00Z'
  },

  // === 2026-04-22 (周二) ===
  {
    id: '20260422-01',
    date: '2026-04-22',
    title: 'SpaceX宣布600亿美元收购Cursor，或支付100亿美元合作费',
    summary: 'SpaceX宣布已获收购Cursor选择权，今年晚些时候可600亿美元收购，或支付100亿作为合作费。Cursor原计划20亿融资被叫停，a16z和Nvidia同时是xAI和Cursor的投资方。',
    source: 'CNBC',
    sourceUrl: 'https://www.cnbc.com/2026/04/21/spacex-says-it-can-buy-cursor-later-this-year-for-60-billion-or-pay-10-billion-for-our-work-together.html',
    tags: ['#融资', '#竞争', '#Agent'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 98,
    createdAt: '2026-04-22T08:00:00Z'
  },
  {
    id: '20260422-01b',
    date: '2026-04-22',
    title: 'Meta开始在员工电脑安装追踪软件，采集鼠标键盘操作训练AI Agent',
    summary: 'Meta内部 memos 透露，将安装MCI工具采集美国员工的鼠标移动、点击和按键数据用于训练AI模型，还会截取屏幕快照，以提升AI在计算机交互任务上的能力。',
    source: 'Meta',
    sourceUrl: 'https://www.manilatimes.net/2026/04/22/business/sunday-business-it/meta-to-start-capturing-employee-mouse-movements-keystrokes-for-ai-training-data/2325496',
    tags: ['#安全', '#Agent', '#战略'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 92,
    totalScore: 96,
    createdAt: '2026-04-22T08:00:00Z'
  },
  {
    id: '20260422-02',
    date: '2026-04-22',
    title: 'GitHub Copilot暂停新用户注册，收紧用量限制，Agent需求暴涨成主因',
    summary: 'GitHub宣布暂停Copilot Pro/Pro+/Student新注册，收紧个人计划用量上限。官方称Agent工作流导致算力需求暴增，不限制将影响所有用户体验。',
    source: 'GitHub',
    sourceUrl: 'https://github.blog/news-insights/company-news/changes-to-github-copilot-individual-plans/',
    tags: ['#Agent', '#更新'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 90,
    totalScore: 96,
    createdAt: '2026-04-22T08:00:00Z'
  },
  {
    id: '20260422-03',
    date: '2026-04-22',
    title: '贝索斯AI初创Project Prometheus融资100亿美元，估值380亿，押注物理世界AI',
    summary: 'FT/Bloomberg报道贝索斯Project Prometheus即将完成100亿美元融资，估值380亿。该公司聚焦物理AI（制造、航空、半导体），已从OpenAI/DeepMind大量挖人。',
    source: 'Bloomberg',
    sourceUrl: 'https://www.bloomberg.com/news/articles/2026-04-21/jeff-bezos-nears-10-billion-funding-round-for-ai-lab-ft-says',
    tags: ['#融资', '#Agent'],
    accuracyScore: 96,
    timelinessScore: 100,
    utilityScore: 88,
    totalScore: 95,
    createdAt: '2026-04-22T08:00:00Z'
  },
  {
    id: '20260422-04',
    date: '2026-04-22',
    title: '微软M365大会发布Agent 365：从AI助手进化为自主运营Agent',
    summary: '微软2026 M365大会发布Agent 365战略，从Copilot辅助模式转向可自主发起行动、做决策、管理完整流程的自主Agent，配套企业治理框架，覆盖客服/HR/财务场景。',
    source: 'Microsoft',
    sourceUrl: 'https://windowsnews.ai/article/microsoft-2026-m365-conference-reveals-ai-evolution-from-copilot-assistants-to-governed-autonomous-a.414501',
    tags: ['#发布', '#Agent', '#企业应用'],
    accuracyScore: 94,
    timelinessScore: 95,
    utilityScore: 93,
    totalScore: 94,
    createdAt: '2026-04-22T08:00:00Z'
  },
  {
    id: '20260422-05',
    date: '2026-04-22',
    title: '英国劳埃德银行成首家引入AI投资决策工具的英国银行',
    summary: 'Lloyds Banking Group推出AI工具辅助客户投资决策，为英国金融业首例。在严格监管的金融咨询行业，AI介入投资建议引发行业关注。',
    source: 'Reuters',
    sourceUrl: 'https://www.reuters.com/technology/artificial-intelligence/',
    tags: ['#企业应用', '#安全'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 85,
    totalScore: 92,
    createdAt: '2026-04-22T08:00:00Z'
  },
  {
    id: '20260422-06',
    date: '2026-04-22',
    title: '国内7大Coding Plan全景对比：火山/阿里/腾讯/百度/Kimi/智谱/MiniMax',
    summary: '知乎热文梳理国内7大AI Coding Plan的模型、价格、额度与特点，覆盖火山引擎、阿里通义、腾讯、百度、Kimi、智谱和MiniMax，为开发者提供选型参考。',
    source: '智谱',
    sourceUrl: 'https://zhuanlan.zhihu.com/p/2015468530938693485',
    tags: ['#低代码', '#API'],
    accuracyScore: 90,
    timelinessScore: 95,
    utilityScore: 92,
    totalScore: 92,
    createdAt: '2026-04-22T08:00:00Z'
  },

  // === 2026-04-21 (周一) ===
  {
    id: '20260421-01',
    date: '2026-04-21',
    title: 'OpenAI Codex重大更新：后台操控电脑、多Agent并行、记忆与图片生成',
    summary: 'Codex新增后台computer use（独立光标操控所有应用）、多Agent并行执行、PR审查、SSH远程开发、图片生成与偏好记忆，周活开发者超300万。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/codex-for-almost-everything/',
    tags: ['#发布', '#Agent', '#低代码'],
    accuracyScore: 98,
    timelinessScore: 95,
    utilityScore: 95,
    totalScore: 96,
    createdAt: '2026-04-21T08:00:00Z'
  },
  {
    id: '20260421-02',
    date: '2026-04-21',
    title: 'OpenAI Agents SDK升级：原生沙箱执行+模型原生Harness',
    summary: 'Agents SDK新增原生沙箱执行环境，Agent可在隔离容器中安全操作文件、安装依赖、运行代码，支持持久化状态和凭证隔离，防止提示注入。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/the-next-evolution-of-the-agents-sdk/',
    tags: ['#发布', '#Agent', '#API'],
    accuracyScore: 98,
    timelinessScore: 95,
    utilityScore: 92,
    totalScore: 95,
    createdAt: '2026-04-21T08:00:00Z'
  },
  {
    id: '20260421-03',
    date: '2026-04-21',
    title: 'GitHub Copilot上线Claude Opus 4.7：多步骤任务与Agent执行更强',
    summary: 'GitHub Copilot正式上线Claude Opus 4.7，测试显示多步骤任务和Agent执行更可靠，将逐步替换Opus 4.5/4.6，促销期7.5倍请求倍率。',
    source: 'GitHub',
    sourceUrl: 'https://github.blog/changelog/2026-04-16-claude-opus-4-7-is-generally-available/',
    tags: ['#更新', '#Agent'],
    accuracyScore: 97,
    timelinessScore: 92,
    utilityScore: 90,
    totalScore: 94,
    createdAt: '2026-04-21T08:00:00Z'
  },
  {
    id: '20260421-04',
    date: '2026-04-21',
    title: 'GitHub Copilot支持开放Agent Skills规范，跨平台通用',
    summary: 'GitHub发布Agent Skills规范，技能包可在Copilot、Claude Code、Cursor、Codex、Gemini CLI等多个Agent平台通用，定义标准化的指令、脚本和资源格式。',
    source: 'GitHub',
    sourceUrl: 'https://releasebot.io/updates/github',
    tags: ['#协议', '#Agent', '#开源'],
    accuracyScore: 95,
    timelinessScore: 92,
    utilityScore: 95,
    totalScore: 94,
    createdAt: '2026-04-21T08:00:00Z'
  },
  {
    id: '20260421-05',
    date: '2026-04-21',
    title: 'Google Gemini推出Mac原生App、聊天记录迁移和Labs动态视图',
    summary: 'Gemini发布macOS原生应用（Apple Silicon），新增从ChatGPT/Claude导入聊天记录和记忆，Labs推出动态可视布局和自定义Gems迷你应用。',
    source: 'Google',
    sourceUrl: 'https://gemini.google/release-notes/',
    tags: ['#发布', '#更新'],
    accuracyScore: 97,
    timelinessScore: 90,
    utilityScore: 85,
    totalScore: 91,
    createdAt: '2026-04-21T08:00:00Z'
  },
  {
    id: '20260421-06',
    date: '2026-04-21',
    title: 'OpenAI分层开放网络AI模型GPT-5.4-Cyber，从限制能力转向验证身份',
    summary: 'OpenAI推出分级可信访问计划(TAC)，通过身份验证等级解锁AI网络能力，初始开放给安全厂商和研究者，逐步扩展至数千人。与Anthropic Mythos"玻璃翼计划"形成竞争。',
    source: 'Axios',
    sourceUrl: 'https://www.axios.com/2026/04/14/openai-model-cyber-program-release',
    tags: ['#安全', '#战略'],
    accuracyScore: 95,
    timelinessScore: 88,
    utilityScore: 82,
    totalScore: 89,
    createdAt: '2026-04-21T08:00:00Z'
  },
  {
    id: '20260421-07',
    date: '2026-04-21',
    title: 'Hermes Agent v0.6.0支持Multi-Agent Profiles：单机运行多专业Agent',
    summary: 'Hermes Agent v0.6.0新增Profiles功能，可为开发、运维、内容等不同角色配置独立LLM、MCP服务器和消息通道，支持MCP桥接跨Agent通信。',
    source: 'Hermes',
    sourceUrl: 'https://lushbinary.com/blog/hermes-agent-multi-agent-profiles-guide/',
    tags: ['#更新', '#Agent', '#MCP'],
    accuracyScore: 92,
    timelinessScore: 90,
    utilityScore: 93,
    totalScore: 92,
    createdAt: '2026-04-21T08:00:00Z'
  },
  {
    id: '20260421-08',
    date: '2026-04-21',
    title: 'OpenAI Codex按量付费上线，Pro用户5月31日前双倍额度',
    summary: 'Codex推出API token计费模式，Pro用户$100/月享双倍额度至5月31日，Business工作空间最高可获$500额度。使用/status命令实时查看剩余额度。',
    source: 'OpenAI',
    sourceUrl: 'https://developers.openai.com/codex/pricing',
    tags: ['#API', '#更新'],
    accuracyScore: 97,
    timelinessScore: 90,
    utilityScore: 85,
    totalScore: 91,
    createdAt: '2026-04-21T08:00:00Z'
  },

  // === 2026-04-20 (周日) ===
  {
    id: '20260420-01',
    date: '2026-04-20',
    title: 'AI芯片创业公司2026年融资创纪录达83亿美元，挑战Nvidia霸主地位',
    summary: 'Dealroom数据显示2026年AI芯片初创企业已融资83亿美元，Cerebras获10亿美元，MatX、Ayar Labs、Etched各获5亿，欧洲多家公司计划1亿+轮次。',
    source: 'CNBC',
    sourceUrl: 'https://www.cnbc.com/2026/04/17/nvidia-ai-chip-rivals-funding-euclyd-fractile.html',
    tags: ['#融资', '#算力'],
    accuracyScore: 95,
    timelinessScore: 90,
    utilityScore: 88,
    totalScore: 92,
    createdAt: '2026-04-20T08:00:00Z'
  },
  {
    id: '20260420-02',
    date: '2026-04-20',
    title: 'Meta计划5月20日首轮裁员8000人，全面转向AI基础设施投资',
    summary: 'Fox Business报道Meta将于5月20日启动首轮裁员约8000人（10%），将数十亿资金重新分配至AI基础设施，团队架构大幅重组。',
    source: 'Meta',
    sourceUrl: 'https://www.indexbox.io/blog/meta-announces-major-layoffs-8000-jobs-cut-in-may-2026/',
    tags: ['#战略', '#竞争'],
    accuracyScore: 93,
    timelinessScore: 92,
    utilityScore: 85,
    totalScore: 90,
    createdAt: '2026-04-20T08:00:00Z'
  },
  {
    id: '20260420-03',
    date: '2026-04-20',
    title: 'DeepSeek以100亿美元估值融资至少3亿美元，中国AI初创估值飙升',
    summary: 'Reuters报道中国AI初创DeepSeek正在以100亿美元估值融资至少3亿美元，但部分美国VC因地缘因素持观望态度。',
    source: 'Reuters',
    sourceUrl: 'https://www.reuters.com/world/china/chinas-deepseek-is-raising-funds-10-billion-valuation-information-reports-2026-04-17/',
    tags: ['#融资', '#竞争'],
    accuracyScore: 96,
    timelinessScore: 92,
    utilityScore: 80,
    totalScore: 90,
    createdAt: '2026-04-20T08:00:00Z'
  },
  {
    id: '20260420-04',
    date: '2026-04-20',
    title: 'Cursor ARR突破20亿美元成史上增长最快B2B SaaS，正洽谈20亿融资',
    summary: 'Cursor母公司Anysphere以3年达20亿美元ARR刷新B2B SaaS增速纪录，正洽谈20亿美元融资，估值达500-600亿。Claude Code开发者认知度已达57%。',
    source: 'The Next Web',
    sourceUrl: 'https://thenextweb.com/news/cursor-anysphere-2-billion-funding-50-billion-valuation-ai-coding',
    tags: ['#融资', '#低代码', '#Agent'],
    accuracyScore: 94,
    timelinessScore: 90,
    utilityScore: 92,
    totalScore: 92,
    createdAt: '2026-04-20T08:00:00Z'
  },
  {
    id: '20260420-05',
    date: '2026-04-20',
    title: 'Claude Code发布/tui全屏渲染、移动推送通知、Ultraplan云端规划',
    summary: 'Claude Code新增/tui全屏渲染模式、移动端推送通知、Ultraplan云端规划（CLI起草→Web评审→远程执行），MCP连接稳定性大幅改善。',
    source: 'Anthropic',
    sourceUrl: 'https://code.claude.com/docs/en/whats-new',
    tags: ['#更新', '#Agent', '#MCP'],
    accuracyScore: 98,
    timelinessScore: 88,
    utilityScore: 95,
    totalScore: 94,
    createdAt: '2026-04-20T08:00:00Z'
  },

  // === 2026-04-19 (周六) ===
  {
    id: '20260419-01',
    date: '2026-04-19',
    title: 'Cerebras正式提交IPO申请：年收入5.1亿，与OpenAI签200亿长约',
    summary: 'AI芯片厂商Cerebras提交IPO申请，2025年收入5.1亿美元（增长76%），与OpenAI签超200亿美元三年期算力协议，OpenAI提供10亿美元贷款。',
    source: 'CNBC',
    sourceUrl: 'https://www.cnbc.com/2026/04/17/cerebras-new-ipo-ai-chips.html',
    tags: ['#融资', '#算力', '#发布'],
    accuracyScore: 96,
    timelinessScore: 92,
    utilityScore: 85,
    totalScore: 92,
    createdAt: '2026-04-19T08:00:00Z'
  },
  {
    id: '20260419-02',
    date: '2026-04-19',
    title: 'Snap裁员16%约1300人，CEO称AI提升效率将替代重复性工作',
    summary: 'Snap CEO Evan Spiegel宣布裁员16%约1300人，预计2026下半年节省5亿美元，称AI将加速工作流程并减少重复性任务。',
    source: 'CNBC',
    sourceUrl: 'https://www.cnbc.com/2026/04/15/snap-stock-layoffs-16-percent-workforce.html',
    tags: ['#战略', '#企业应用'],
    accuracyScore: 95,
    timelinessScore: 90,
    utilityScore: 82,
    totalScore: 90,
    createdAt: '2026-04-19T08:00:00Z'
  },
  {
    id: '20260419-03',
    date: '2026-04-19',
    title: 'OpenClaw 2026.4.14发布：Claude Opus 4.7默认、Gemini TTS、云端LanceDB记忆',
    summary: 'OpenClaw新版默认启用Claude Opus 4.7，集成Gemini TTS语音合成、云端LanceDB记忆存储和Copilot嵌入，插件包更精简。',
    source: 'OpenClaw',
    sourceUrl: 'https://releasebot.io/updates/openclaw',
    tags: ['#更新', '#开源', '#Agent'],
    accuracyScore: 95,
    timelinessScore: 90,
    utilityScore: 90,
    totalScore: 92,
    createdAt: '2026-04-19T08:00:00Z'
  },
  {
    id: '20260419-04',
    date: '2026-04-19',
    title: 'n8n+Dify+Ollama被推为最佳自托管AI自动化技术栈',
    summary: 'XDA发文推荐n8n(DIFY)作自动化层、Dify作LLM应用层、Ollama作推理层的自托管组合，兼顾隐私与灵活性，已有成熟连接器生态。',
    source: 'XDA',
    sourceUrl: 'https://www.xda-developers.com/n8n-dify-ollama-best-self-hosted-ai-automation-stack/',
    tags: ['#低代码', '#开源', '#企业应用'],
    accuracyScore: 92,
    timelinessScore: 88,
    utilityScore: 92,
    totalScore: 91,
    createdAt: '2026-04-19T08:00:00Z'
  },
  {
    id: '20260419-05',
    date: '2026-04-19',
    title: 'Google发布Gemma 4开源模型：4种规格，Apache 2.0协议，支持多模态',
    summary: 'Google发布Gemma 4系列，含E2B/E4B/26B MoE/31B Dense四种规格，Apache 2.0开源，支持文本和图像输入，HuggingFace已有7万变体。',
    source: 'Google',
    sourceUrl: 'https://en.wikipedia.org/wiki/Gemma_(language_model)',
    tags: ['#发布', '#开源', '#模型'],
    accuracyScore: 96,
    timelinessScore: 85,
    utilityScore: 88,
    totalScore: 90,
    createdAt: '2026-04-19T08:00:00Z'
  },

  // === 2026-04-18 ===
  {
    id: '20260418-01',
    date: '2026-04-18',
    title: 'Anthropic 发布 Claude Design：AI协作视觉设计工具',
    summary: 'Anthropic Labs推出Claude Design，基于Opus 4.7驱动，用户可协作Claude创建设计稿、原型和幻灯片，支持读取代码库和设计文件自动提取设计系统。',
    source: 'Anthropic',
    sourceUrl: 'https://www.anthropic.com/news/claude-design-anthropic-labs',
    tags: ['#发布', '#低代码'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 98,
    createdAt: '2026-04-18T08:00:00Z'
  },
  {
    id: '20260418-02',
    date: '2026-04-18',
    title: '白宫幕僚长会见Anthropic CEO讨论Mythos模型安全风险',
    summary: '白宫幕僚长Susie Wiles于4月17日会见Anthropic CEO Dario Amodei，讨论Mythos模型的网络安全风险与政府使用权限，DC和华尔街高度关注。',
    source: 'Anthropic',
    sourceUrl: 'https://apnews.com/article/white-house-anthropic-meeting-ai-mythos-f3c590fcee98297832973d02d3979c87',
    tags: ['#安全', '#战略'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 85,
    totalScore: 94,
    createdAt: '2026-04-18T08:30:00Z'
  },
  {
    id: '20260418-03',
    date: '2026-04-18',
    title: 'OpenAI与Cerebras达成超200亿美元三年期芯片协议',
    summary: 'OpenAI与芯片创业公司Cerebras达成超200亿美元三年期服务器使用协议，并获得Cerebras股权认股权证，大幅多元化算力基础设施摆脱对NVIDIA依赖。',
    source: 'OpenAI',
    sourceUrl: 'https://www.reuters.com/technology/openai-spend-more-than-20-billion-cerebras-chips-receive-equity-stake-2026-04-17/',
    tags: ['#算力', '#战略'],
    accuracyScore: 98,
    timelinessScore: 95,
    utilityScore: 88,
    totalScore: 94,
    createdAt: '2026-04-18T09:00:00Z'
  },
  {
    id: '20260418-04',
    date: '2026-04-18',
    title: 'Nvidia发布量子计算开源AI模型，量子计算板块大涨',
    summary: 'Nvidia于4月16日发布面向量子计算的新开源AI模型，推动量子计算股票板块集体大涨。AI与量子计算融合趋势加速，基础设施能力边界进一步扩展。',
    source: 'Broadcom',
    sourceUrl: 'https://www.cnbc.com/2026/04/16/quantum-stocks-nvidia-ai-models.html',
    tags: ['#发布', '#开源', '#算力'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 82,
    totalScore: 91,
    createdAt: '2026-04-18T09:30:00Z'
  },
  {
    id: '20260418-05',
    date: '2026-04-18',
    title: 'OpenAI政策负责人：AI公司需更好地与公众沟通风险',
    summary: 'OpenAI政策负责人Chris Lehane于4月17日表示AI公司需更好沟通AI风险，行业领袖面临人身攻击加剧。AI行业公信力与政策沟通成为核心议题。',
    source: 'OpenAI',
    sourceUrl: 'https://fortune.com/2026/04/17/openais-policy-chief-chris-lehane-ai-warning-violence/',
    tags: ['#安全', '#战略'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 75,
    totalScore: 90,
    createdAt: '2026-04-18T10:00:00Z'
  },
  // === 2026-04-17 ===
  {
    id: '20260417-01',
    date: '2026-04-17',
    title: 'Anthropic 发布 Claude Opus 4.7：编码能力大幅提升，视觉提升13%',
    summary: 'Anthropic 4月16日发布Claude Opus 4.7 GA版，聚焦高级软件工程，视觉能力提升13%，内置网络安全使用安全防护。已在GitHub Copilot模型选择器中上线。',
    source: 'Anthropic',
    sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
    tags: ['#发布', '#模型'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 98,
    createdAt: '2026-04-17T08:00:00Z'
  },
  {
    id: '20260417-02',
    date: '2026-04-17',
    title: 'OpenAI 发布 Codex 全面升级：从编程工具变为全能AI助手',
    summary: 'OpenAI 4月16日发布"Codex for (almost) everything"重大更新，新增操作电脑、对接日常应用、生成图片和上下文记忆能力，从编程专用工具跃升为通用AI助手。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/codex-for-almost-everything/',
    tags: ['#发布', '#产品', '#Agent'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 98,
    totalScore: 99,
    createdAt: '2026-04-17T08:30:00Z'
  },
  {
    id: '20260417-03',
    date: '2026-04-17',
    title: 'OpenAI 发布 GPT-Rosalind：专为生命科学研究打造的AI模型',
    summary: 'OpenAI 4月16日推出GPT-Rosalind模型，专为生命科学研究设计，具备增强的生物学知识和科研能力。AI向垂直领域专业化趋势明显。',
    source: 'OpenAI',
    sourceUrl: 'https://www.reuters.com/business/healthcare-pharmaceuticals/openai-launches-ai-model-gpt-rosalind-life-sciences-research-2026-04-16/',
    tags: ['#发布', '#模型'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 85,
    totalScore: 94,
    createdAt: '2026-04-17T09:00:00Z'
  },
  {
    id: '20260417-04',
    date: '2026-04-17',
    title: 'Canva 发布 AI 2.0 研究预览版，重新定义AI设计体验',
    summary: 'Canva 4月16日发布Canva AI 2.0研究预览版，首批100万用户体验。AI设计工具赛道从辅助走向主导，对低代码设计平台有直接冲击。',
    source: '其他',
    sourceUrl: 'https://lasvegassun.com/news/2026/apr/16/canva-unveils-canva-ai-20-reimagining-how-the-worl/',
    tags: ['#发布', '#产品'],
    accuracyScore: 92,
    timelinessScore: 100,
    utilityScore: 92,
    totalScore: 95,
    createdAt: '2026-04-17T09:30:00Z'
  },
  {
    id: '20260417-05',
    date: '2026-04-17',
    title: 'Benchling 推出 MCP 驱动的 AI Connectors，连接研发数据生态',
    summary: 'Benchling 4月16日发布基于MCP协议的AI Connectors，打通研发数据生态。MCP协议正在从开发工具向垂直行业快速渗透，企业级MCP应用持续落地。',
    source: 'MCP',
    sourceUrl: 'https://www.prnewswire.com/news-releases/benchling-launches-ai-connectors-to-power-the-data-ecosystem-for-rd-302743911.html',
    tags: ['#MCP', '#企业应用'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 97,
    createdAt: '2026-04-17T10:00:00Z'
  },
  {
    id: '20260417-06',
    date: '2026-04-17',
    title: 'Politico 揭露：联邦机构绕过特朗普禁令秘密测试 Mythos',
    summary: 'Politico 4月14日报道，多个联邦机构包括商务部正在绕过特朗普政府的Anthropic禁令，秘密测试Mythos模型的网络安全能力。政策与技术需求矛盾激化。',
    source: 'Anthropic',
    sourceUrl: 'https://www.politico.com/news/2026/04/14/anthropic-mythos-federal-agency-testing-00872439',
    tags: ['#政策', '#安全'],
    accuracyScore: 95,
    timelinessScore: 98,
    utilityScore: 88,
    totalScore: 94,
    createdAt: '2026-04-17T10:30:00Z'
  },
  {
    id: '20260417-07',
    date: '2026-04-17',
    title: '美国议员闭门讨论AI，表达对"毁灭性"风险的深度担忧',
    summary: '美联社4月17日报道，美国议员举行闭门会议讨论AI发展，多位议员表达了对AI技术轨迹带来"毁灭性"后果的深度担忧。AI安全立法压力持续加大。',
    source: '其他',
    sourceUrl: 'https://www.news4jax.com/news/politics/2026/04/17/lawmakers-gathered-quietly-to-talk-about-ai-angst-and-fears-of-destruction-followed/',
    tags: ['#政策', '#安全'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 82,
    totalScore: 92,
    createdAt: '2026-04-17T11:00:00Z'
  },
  {
    id: '20260417-08',
    date: '2026-04-17',
    title: 'Forbes 发布2026 AI 50榜单：从AI主导转向AI独立',
    summary: 'Forbes 4月16日发布2026 AI 50榜单，主题为"从AI主导到AI独立"，反映行业从巨头依赖向自主AI能力建设的结构性转变。',
    source: '其他',
    sourceUrl: 'https://www.forbes.com/sites/pr/2026/04/16/forbes-unveils-2026-ai-50-marking-shift-from-ai-dominance-to-ai-independence/',
    tags: ['#趋势'],
    accuracyScore: 92,
    timelinessScore: 100,
    utilityScore: 85,
    totalScore: 92,
    createdAt: '2026-04-17T11:30:00Z'
  },

  // === 2026-04-16 ===
  {
    id: '20260416-01',
    date: '2026-04-16',
    title: 'Maine 通过全美首个州级数据中心暂停令，AI基建遭遇监管阻力',
    summary: '缅因州立法机构通过全美首个州级数据中心建设暂停令，引发连锁反应。全美超4000座AI数据中心在建，社区对电耗、水耗和环境影响的不满持续升温。',
    source: '其他',
    sourceUrl: 'https://www.sandiegouniontribune.com/2026/04/15/data-center-moratoriums/',
    tags: ['#基础设施', '#政策'],
    accuracyScore: 92,
    timelinessScore: 100,
    utilityScore: 88,
    totalScore: 93,
    createdAt: '2026-04-16T08:00:00Z'
  },
  {
    id: '20260416-02',
    date: '2026-04-16',
    title: '新泽西社区数天内成功阻止数据中心建设，草根运动蔓延全美',
    summary: '新泽西居民迅速动员成功阻止一座数据中心建设，引发全美各地反数据中心活动人士效仿。AI基建扩张正面临越来越强的社区抵抗。',
    source: '其他',
    sourceUrl: 'https://www.taipeitimes.com/News/world/archives/2026/04/16/2003855714',
    tags: ['#基础设施', '#社会'],
    accuracyScore: 90,
    timelinessScore: 100,
    utilityScore: 82,
    totalScore: 91,
    createdAt: '2026-04-16T08:30:00Z'
  },
  {
    id: '20260416-03',
    date: '2026-04-16',
    title: 'MHI 与 Deloitte 联合报告：AI 成未来十年供应链最大颠覆者',
    summary: 'MHI与德勤4月15日发布年度报告，将AI列为未来十年供应链最大颠覆因素。供应链AI化正在重塑企业运营模式。',
    source: '其他',
    sourceUrl: 'https://finance.yahoo.com/sectors/technology/articles/mhi-deloitte-report-finds-ai-171000075.html',
    tags: ['#企业应用', '#趋势'],
    accuracyScore: 90,
    timelinessScore: 100,
    utilityScore: 85,
    totalScore: 92,
    createdAt: '2026-04-16T09:00:00Z'
  },
  {
    id: '20260416-04',
    date: '2026-04-16',
    title: 'withZeta.ai 发布：首个多Agent AI联合科学家用于罕见癌症药物发现',
    summary: 'Lantern Pharma在纳斯达克发布withZeta.ai，全球首个面向罕见癌症的多Agent AI联合科学家平台，展示了Agent在企业级科研场景的落地。',
    source: '其他',
    sourceUrl: 'https://www.businesswire.com/news/home/20260414869501/en/',
    tags: ['#Agent', '#企业应用'],
    accuracyScore: 90,
    timelinessScore: 100,
    utilityScore: 85,
    totalScore: 92,
    createdAt: '2026-04-16T09:30:00Z'
  },
  {
    id: '20260416-05',
    date: '2026-04-16',
    title: 'Anthropic 悄然上线 Claude 身份验证：部分功能需护照+自拍',
    summary: 'Anthropic 4月15日为Claude部分功能引入身份验证，用户需提交政府证件和自拍，由Persona提供第三方验证。同时年龄验证误判导致部分成年用户被锁号。',
    source: 'Anthropic',
    sourceUrl: 'https://www.kucoin.com/news/flash/anthropic-quietly-launches-identity-verification-passport-and-selfie-required-for-some-claude-features',
    tags: ['#安全', '#产品'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 90,
    totalScore: 95,
    createdAt: '2026-04-16T10:00:00Z'
  },
  {
    id: '20260416-06',
    date: '2026-04-16',
    title: '中国团队 EvoMap 指控 Hermes Agent 抄袭其开源项目 Evolver',
    summary: 'EvoMap团队4月15日发公开信，指控Nous Research的Hermes Agent高度复制其2月开源的AI Agent自进化引擎Evolver代码。Evolver曾10分钟登顶ClawHub热榜。',
    source: 'Hermes',
    sourceUrl: 'https://view.inews.qq.com/a/20260415A067A200',
    tags: ['#开源', '#争议'],
    accuracyScore: 88,
    timelinessScore: 100,
    utilityScore: 92,
    totalScore: 93,
    createdAt: '2026-04-16T10:30:00Z'
  },
  {
    id: '20260416-07',
    date: '2026-04-16',
    title: 'OpenClaw 2026.4.12 发布：Active Memory 插件上线，支持 LM Studio',
    summary: 'OpenClaw发布2026.4.12版本，新增Active Memory插件（专用记忆子Agent）、LM Studio内置provider、Codex provider及本地MLX语音。插件加载和记忆可靠性大幅提升。',
    source: 'OpenClaw',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    tags: ['#更新', '#Agent', '#开源'],
    accuracyScore: 97,
    timelinessScore: 85,
    utilityScore: 98,
    totalScore: 93,
    createdAt: '2026-04-16T11:00:00Z'
  },
  {
    id: '20260416-08',
    date: '2026-04-16',
    title: '阿里ATH发布Meoo秒悟：零代码AI开发工具，集成四大模型',
    summary: '阿里ATH事业群4月15日发布首款AI开发工具Meoo（秒悟），集成千问/Kimi/GLM/MiniMax四大模型，用户无需编程用自然语言即可完成应用开发和部署，内置阿里云数据库和存储服务。',
    source: '阿里',
    sourceUrl: 'https://finance.sina.com.cn/roll/2026-04-15/doc-inhuqfve3526036.shtml',
    tags: ['#低代码', '#发布', '#Agent'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 98,
    totalScore: 98,
    createdAt: '2026-04-16T11:30:00Z'
  },

  // === 2026-04-15 ===
  {
    id: '20260415-01',
    date: '2026-04-15',
    title: '诺和诺德与 OpenAI 达成战略合作，AI 加速药物发现',
    summary: '诺和诺德4月14日宣布与OpenAI达成战略合作，将AI全面应用于药物发现、制造和运营。此前AI制药合作在2024-2025年间增长120%。',
    source: 'OpenAI',
    sourceUrl: 'https://www.cnbc.com/2026/04/14/novo-nordisk-openai-ai-drug-discovery-healthcare-nvo.html',
    tags: ['#合作', '#企业应用'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 88,
    totalScore: 95,
    createdAt: '2026-04-15T08:00:00Z'
  },
  {
    id: '20260415-02',
    date: '2026-04-15',
    title: 'GitLab 与 Google Cloud 扩大合作，Vertex AI 集成至 Duo Agent 平台',
    summary: 'GitLab 4月14日宣布扩大与Google Cloud合作，企业客户可在Duo Agent平台原生使用Vertex AI模型（含Gemini），实现Agentic DevSecOps。GTLB盘后涨超7%。',
    source: 'Google',
    sourceUrl: 'https://about.gitlab.com/press/releases/2026-04-14-gitlab-collaborate-to-bring-agentic-devsecops-to-enterprise-teams-using-vertexai',
    tags: ['#Agent', '#企业应用'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 97,
    createdAt: '2026-04-15T08:30:00Z'
  },
  {
    id: '20260415-03',
    date: '2026-04-15',
    title: 'Sam Altman 住宅连遭两次袭击，嫌疑人反 AI 动机曝光',
    summary: 'OpenAI CEO住宅先后遭燃烧弹（4月10日）和枪击（4月12日）袭击，嫌疑人写下反AI言论被控谋杀未遂。AI行业领袖人身安全引发广泛关注。',
    source: 'OpenAI',
    sourceUrl: 'https://www.cnbc.com/2026/04/14/sam-altman-openai-molotov-attack-arraignment.html',
    tags: ['#安全', '#社会'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 78,
    totalScore: 92,
    createdAt: '2026-04-15T09:00:00Z'
  },
  {
    id: '20260415-04',
    date: '2026-04-15',
    title: 'Microsoft Copilot Chat 4月15日起收紧访问权限',
    summary: 'Microsoft宣布4月15日起调整Copilot Chat在部分Office应用中的访问权限，大型租户未授权用户将受限。微软以"稀缺策略"推动企业Copilot付费采用。',
    source: 'Microsoft',
    sourceUrl: 'https://www.reworked.co/digital-workplace/microsoft-is-betting-scarcity-will-help-it-sell-copilot/',
    tags: ['#产品', '#企业应用'],
    accuracyScore: 92,
    timelinessScore: 100,
    utilityScore: 88,
    totalScore: 93,
    createdAt: '2026-04-15T09:30:00Z'
  },

  // === 2026-04-14 ===
  {
    id: '20260414-01',
    date: '2026-04-14',
    title: '英国金融监管机构紧急评估 Mythos 风险，央行拉响警报',
    summary: '英国央行、PRA与国家网络安全部门紧急磋商评估Mythos对金融体系的系统性风险。英国AI安全研究所（AISI）正测试该模型以开发防御方案。',
    source: 'Anthropic',
    sourceUrl: 'https://www.reuters.com/world/uk/uk-financial-regulators-rush-assess-risks-anthropics-latest-ai-model-ft-reports-2026-04-12/',
    tags: ['#安全', '#金融'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 92,
    totalScore: 96,
    createdAt: '2026-04-14T08:00:00Z'
  },
  {
    id: '20260414-02',
    date: '2026-04-14',
    title: 'Stanford HAI 发布2026 AI Index：前沿模型一年提升30个百分点',
    summary: '第九版AI指数报告423页：全球AI投资2520亿美元（美国1090亿为中国12倍）；前沿模型在Humanity\'s Last Exam上一年提升30个百分点；AI在科学医学领域超越人类。',
    source: 'Google',
    sourceUrl: 'https://hai.stanford.edu/ai-index',
    tags: ['#研究', '#里程碑'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 90,
    totalScore: 96,
    createdAt: '2026-04-14T09:00:00Z'
  },
  {
    id: '20260414-03',
    date: '2026-04-14',
    title: 'NYT深度：全球AI军备竞赛升级，中美俄加速部署AI武器',
    summary: '纽约时报4月12日刊发《相互自动毁灭：升级中的全球AI军备竞赛》，报道中美俄等国加速部署AI自主武器和军事系统，引发冷战级别安全担忧。',
    source: '其他',
    sourceUrl: 'https://www.nytimes.com/2026/04/12/technology/china-russia-us-ai-weapons.html',
    tags: ['#军事', '#趋势'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 80,
    totalScore: 91,
    createdAt: '2026-04-14T10:00:00Z'
  },
  {
    id: '20260414-04',
    date: '2026-04-14',
    title: 'AI公司承认公众形象危机，大力资助智库重塑舆论',
    summary: 'Guardian 4月12日报道，民调显示公众对AI不满持续上升，AI巨头正大力资助智库和政策文件试图重塑舆论，AI信任危机加剧。',
    source: '其他',
    sourceUrl: 'https://www.theguardian.com/technology/2026/apr/12/ai-image-problem-policy-papers-thinktanks',
    tags: ['#社会', '#趋势'],
    accuracyScore: 92,
    timelinessScore: 100,
    utilityScore: 82,
    totalScore: 91,
    createdAt: '2026-04-14T10:30:00Z'
  },
  {
    id: '20260414-05',
    date: '2026-04-14',
    title: '美国空军宣布在阿拉斯加开设12个AI数据中心',
    summary: '美国空军4月12日宣布计划在阿拉斯加开设12个新的AI专用数据中心，加速军事AI基础设施建设。反映AI算力需求已延伸至国防领域。',
    source: '其他',
    sourceUrl: 'https://aviationa2z.com/index.php/2026/04/12/us-air-force-to-open-12-new-ai-data-centers-in-alaska/',
    tags: ['#基础设施', '#军事'],
    accuracyScore: 90,
    timelinessScore: 100,
    utilityScore: 82,
    totalScore: 90,
    createdAt: '2026-04-14T11:00:00Z'
  },
  {
    id: '20260414-06',
    date: '2026-04-14',
    title: 'OutSystems报告：97%企业探索Agent AI，94%担忧治理失控',
    summary: 'OutSystems发布《State of AI Development 2026》报告，调查1900名IT领导者发现97%企业已探索Agent AI策略，但94%担忧AI工具蔓延导致安全风险和技术债务。',
    source: '其他',
    sourceUrl: 'https://www.businesswire.com/news/home/20260407749542/en/Agentic-AI-Goes-Mainstream-in-the-Enterprise-but-94-Raise-Concern-About-Sprawl-OutSystems-Research-Finds',
    tags: ['#企业应用', '#Agent'],
    accuracyScore: 95,
    timelinessScore: 90,
    utilityScore: 95,
    totalScore: 93,
    createdAt: '2026-04-14T11:30:00Z'
  },
  {
    id: '20260414-07',
    date: '2026-04-14',
    title: 'Vercel CEO释放IPO信号：AI Agent驱动收入激增',
    summary: 'Vercel CEO Guillermo Rauch在HumanX大会上表示公司"每天都在更接近IPO"。AI Agent功能（含v0）驱动收入大幅增长，Next.js生态持续扩张。',
    source: '其他',
    sourceUrl: 'https://techcrunch.com/2026/04/13/vercel-ceo-guillermo-rauch-signals-ipo-readiness-as-ai-agents-fuel-revenue-surge/',
    tags: ['#IPO', '#低代码', '#Agent'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 98,
    totalScore: 98,
    createdAt: '2026-04-14T12:00:00Z'
  },
  {
    id: '20260414-08',
    date: '2026-04-14',
    title: '最高法院裁定不支持Anthropic，Pentagon"供应链风险"标签维持',
    summary: '美国最高法院4月13日拒绝阻止Pentagon对Anthropic的"供应链风险"认定。Anthropic称此认定为报复行为，案件始于Anthropic反对AI军事化应用。',
    source: 'Anthropic',
    sourceUrl: 'https://tucollegian.org/supreme-court-rules-against-anthropic-in-legal-battle-against-the-pentagon/',
    tags: ['#政策', '#安全'],
    accuracyScore: 93,
    timelinessScore: 100,
    utilityScore: 85,
    totalScore: 92,
    createdAt: '2026-04-14T12:30:00Z'
  },
  {
    id: '20260414-09',
    date: '2026-04-14',
    title: 'Google CEO 60分钟访谈：美国必须在AI领域保持领先',
    summary: 'Google CEO Sundar Pichai在CBS 60分钟节目中表示美国必须在AI领域保持领先地位。讨论了AI发展速度、就业影响和全球竞争格局。',
    source: 'Google',
    sourceUrl: 'https://www.cbsnews.com/video/sundar-pichai-us-ai-60-minutes-video-2026-04-12/',
    tags: ['#战略', '#竞争'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 85,
    totalScore: 91,
    createdAt: '2026-04-14T13:00:00Z'
  },

  // === 2026-04-11 ===
  // === 2026-04-11 ===
  {
    id: '20260411-01',
    date: '2026-04-11',
    title: 'Anthropic 考虑自研AI芯片，减少对外部供应商依赖',
    summary: '三名知情人士透露Anthropic正在探索设计自有AI芯片，以应对持续增长的算力需求。Claude营收已突破300亿美元年化，自研芯片将降低对Google/Broadcom算力的依赖。',
    source: 'Anthropic',
    sourceUrl: 'https://www.taipeitimes.com/News/biz/archives/2026/04/11/2003855386',
    tags: ['#芯片', '#战略'],
    accuracyScore: 90,
    timelinessScore: 100,
    utilityScore: 88,
    totalScore: 92,
    createdAt: '2026-04-11T08:00:00Z'
  },
  {
    id: '20260411-02',
    date: '2026-04-11',
    title: 'CoreWeave 与 Anthropic 签署多年数十亿美元算力协议',
    summary: 'CoreWeave与Anthropic达成多年协议，使用多种Nvidia GPU架构为Claude提供算力。CoreWeave股价暴涨13%，该协议被描述为"数十亿美元级别"。',
    source: 'Anthropic',
    sourceUrl: 'https://www.reuters.com/legal/transactional/coreweave-strikes-ai-cloud-deal-with-anthropic-shares-rise-2026-04-10/',
    tags: ['#算力', '#合作'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 90,
    totalScore: 96,
    createdAt: '2026-04-11T08:30:00Z'
  },
  {
    id: '20260411-03',
    date: '2026-04-11',
    title: 'Mythos 模型引发华尔街和美国政府紧急安全讨论',
    summary: 'Anthropic的Mythos模型因能力过于强大决定不公开发布，已引发财长Bessent、美联储主席Powell和华尔街CEO们的紧急讨论，涉及AI对金融安全的潜在影响。',
    source: 'Anthropic',
    sourceUrl: 'https://www.bloomberg.com/news/newsletters/2026-04-10/anthropic-s-powerful-ai-models-spark-urgent-talks-in-finance-industry',
    tags: ['#安全', '#金融'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 92,
    totalScore: 96,
    createdAt: '2026-04-11T09:00:00Z'
  },
  {
    id: '20260411-04',
    date: '2026-04-11',
    title: 'OpenAI Codex 周活跃用户突破300万，API处理量达150亿token/分钟',
    summary: 'OpenAI发布"企业AI新阶段"报告：Codex周活300万，API每分钟处理150亿token，GPT-5.4驱动创纪录用户参与度。2026年被定义为"Agent之年"。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/next-phase-of-enterprise-ai/',
    tags: ['#产品', '#里程碑'],
    accuracyScore: 98,
    timelinessScore: 95,
    utilityScore: 92,
    totalScore: 95,
    createdAt: '2026-04-11T09:30:00Z'
  },
  {
    id: '20260411-05',
    date: '2026-04-11',
    title: 'OpenAI 发布AI经济政策蓝图：机器人税、公共财富基金与四天工作制',
    summary: 'OpenAI提出AI时代社会政策建议，包括对自动化劳动征税、建立公共财富基金、推行四天工作制，呼吁政府应对AI对就业的冲击。',
    source: 'OpenAI',
    sourceUrl: 'https://techcrunch.com/2026/04/06/openais-vision-for-the-ai-economy-public-wealth-funds-robot-taxes-and-a-four-day-work-week/',
    tags: ['#政策', '#战略'],
    accuracyScore: 95,
    timelinessScore: 90,
    utilityScore: 85,
    totalScore: 90,
    createdAt: '2026-04-11T10:00:00Z'
  },
  {
    id: '20260411-06',
    date: '2026-04-11',
    title: 'Google Gemma 4 发布：31B参数、256K上下文、原生多模态开源模型',
    summary: 'Google DeepMind发布Gemma 4系列开源模型，四个参数规模，支持256K上下文、原生多模态和高级推理。Apache 2.0协议，被誉为2026年最强开源模型。',
    source: 'Google',
    sourceUrl: 'https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/',
    tags: ['#开源', '#模型'],
    accuracyScore: 97,
    timelinessScore: 92,
    utilityScore: 95,
    totalScore: 95,
    createdAt: '2026-04-11T10:30:00Z'
  },
  {
    id: '20260411-07',
    date: '2026-04-11',
    title: 'Google Cloud Next 2026 大会4月22日开幕，预计发布新一代TPU',
    summary: 'Google Cloud Next 2026定于4月22-24日举办，预计发布下一代TPU架构、内存池化和光路交换技术（OCS），对AI计算供应链有重大影响。',
    source: 'Google',
    sourceUrl: 'http://www.eeo.com.cn/2026/0411/834439.shtml',
    tags: ['#会议', '#基础设施'],
    accuracyScore: 92,
    timelinessScore: 100,
    utilityScore: 88,
    totalScore: 93,
    createdAt: '2026-04-11T11:00:00Z'
  },
  {
    id: '20260411-08',
    date: '2026-04-11',
    title: 'CoreWeave 与 Meta 签署210亿美元AI算力协议',
    summary: 'CoreWeave与Meta签署210亿美元扩展AI云协议，仅一天后又签下Anthropic。Bank of America将2026年芯片市场预测上调至1.3万亿美元。',
    source: 'Meta',
    sourceUrl: 'https://www.forbes.com/sites/aliciapark/2026/04/10/coreweave-stock-surges-13-on-anthropic-deal-a-day-after-21-billion-meta-partnership/',
    tags: ['#算力', '#合作'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 90,
    totalScore: 96,
    createdAt: '2026-04-11T11:30:00Z'
  },
  {
    id: '20260411-09',
    date: '2026-04-11',
    title: 'Meta Muse Spark 首秀：超级智能实验室首个闭源模型',
    summary: 'Meta发布Muse Spark，首次采用闭源策略。编码能力落后竞品，但健康问答和推理表现提升。标志着Meta AI战略从纯开源向封闭转变的关键一步。',
    source: 'Meta',
    sourceUrl: 'https://www.reuters.com/sustainability/sustainable-finance-reporting/meta-unveils-first-ai-model-superintelligence-team-2026-04-08/',
    tags: ['#发布', '#竞争'],
    accuracyScore: 95,
    timelinessScore: 92,
    utilityScore: 88,
    totalScore: 92,
    createdAt: '2026-04-11T12:00:00Z'
  },
  {
    id: '20260411-10',
    date: '2026-04-11',
    title: 'CCTV 调查AI滥用：深度伪造图像成造谣工具，法律责任加重',
    summary: '央视调查揭露个人利用AI生成图像传播不实信息获取流量的行为及法律后果。AI生成虚假"种草"评测同时引发电商监管关注。',
    source: '其他',
    sourceUrl: 'https://news.cctv.cn/2026/04/11/ARTIMGiAjfbtkOxqzbL2fkLZ260411.shtml',
    tags: ['#安全', '#监管'],
    accuracyScore: 92,
    timelinessScore: 100,
    utilityScore: 80,
    totalScore: 90,
    createdAt: '2026-04-11T14:00:00Z'
  },

  // === 2026-04-10 ===
  {
    id: '20260410-01',
    date: '2026-04-10',
    title: 'Anthropic 发布 Claude Mythos Preview：网络安全领域的颠覆性模型',
    summary: 'Anthropic发布Claude Mythos预览版，能自主进行安全研究，已发现数千个漏洞含零日漏洞。因双用途风险不公开提供，仅向CrowdStrike等少数合作伙伴开放，同时推出Project Glasswing安全计划。',
    source: 'Anthropic',
    sourceUrl: 'https://techcrunch.com/2026/04/07/anthropic-mythos-ai-model-preview-security/',
    tags: ['#发布', '#安全'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 98,
    createdAt: '2026-04-10T08:00:00Z'
  },
  {
    id: '20260410-02',
    date: '2026-04-10',
    title: 'Meta 发布 Muse Spark AI 模型，正面挑战 OpenAI 和 Google',
    summary: 'Meta发布首个主要AI模型"Muse Spark"，与顶级聊天机器人竞争。这是Meta在140亿美元引入Alexandr Wang后的首次重大AI发布，标志着Meta AI战略的重大升级。',
    source: 'Meta',
    sourceUrl: 'https://www.cnbc.com/2026/04/08/meta-debuts-first-major-ai-model-since-14-billion-deal-to-bring-in-alexandr-wang.html',
    tags: ['#发布', '#竞争'],
    accuracyScore: 95,
    timelinessScore: 98,
    utilityScore: 90,
    totalScore: 94,
    createdAt: '2026-04-10T08:30:00Z'
  },
  {
    id: '20260410-03',
    date: '2026-04-10',
    title: 'OpenAI 发布企业AI新战略，公布儿童安全蓝图',
    summary: 'OpenAI宣布"企业AI新阶段"计划，同时推出Child Safety Blueprint，在推动企业AI应用的同时加强安全治理。标志着OpenAI从纯技术公司向政策参与者的转型。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/news/',
    tags: ['#企业应用', '#安全'],
    accuracyScore: 92,
    timelinessScore: 95,
    utilityScore: 88,
    totalScore: 92,
    createdAt: '2026-04-10T09:00:00Z'
  },
  {
    id: '20260410-04',
    date: '2026-04-10',
    title: 'Google Research 发布 TurboQuant：极端模型压缩新方法',
    summary: 'Google Research发表TurboQuant论文，提出极端AI模型压缩新方法，可在保持性能的同时大幅减少模型体积，对边缘部署和推理成本降低有重要意义。',
    source: 'Google',
    sourceUrl: 'https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/',
    tags: ['#研究', '#效率'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 93,
    createdAt: '2026-04-10T09:30:00Z'
  },
  {
    id: '20260410-05',
    date: '2026-04-10',
    title: 'Hermes Agent v0.7 引入持久化执行，GitHub Star 突破 32K',
    summary: 'Hermes Agent发布v0.7版本，新增持久化执行功能（将Agent转化为工作流基础设施），扩展MCP集成至真实工具生态。GitHub 32K Stars，成为2026年与OpenClaw并列的最热Agent框架。',
    source: 'Hermes',
    sourceUrl: 'https://www.ai.cc/blogs/hermes-agent-2026-self-improving-open-source-ai-agent-vs-openclaw-guide/',
    tags: ['#Agent', '#MCP', '#开源'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 98,
    totalScore: 96,
    createdAt: '2026-04-10T10:00:00Z'
  },
  {
    id: '20260410-06',
    date: '2026-04-10',
    title: 'Dify MCP 生态扩展：应用可变为 MCP Server',
    summary: 'Dify推出MCP Agent Strategy Plugin，任何Dify应用都可变为MCP Server端点。外部MCP客户端（包括Hermes Agent）可直接调用Dify工作流，实现Agent平台的互联互通。',
    source: 'Dify',
    sourceUrl: 'https://dify.ai/blog/turn-your-dify-app-into-an-mcp-server',
    tags: ['#MCP', '#低代码', '#企业应用'],
    accuracyScore: 95,
    timelinessScore: 92,
    utilityScore: 98,
    totalScore: 95,
    createdAt: '2026-04-10T10:30:00Z'
  },
  {
    id: '20260410-07',
    date: '2026-04-10',
    title: '字节 Coze 与京东 JoyAgent 开源，低代码 Agent 平台竞争升温',
    summary: '字节跳动Coze和京东JoyAgent先后开源AI Agent平台，为低代码开发带来新机遇。两大互联网公司开放Agent基础设施，预示企业级低代码Agent生态加速形成。',
    source: 'Coze',
    sourceUrl: 'https://www.53ai.com/news/OpenSourceLLM/2025080223765.html',
    tags: ['#低代码', '#Agent', '#开源'],
    accuracyScore: 90,
    timelinessScore: 88,
    utilityScore: 95,
    totalScore: 91,
    createdAt: '2026-04-10T11:00:00Z'
  },
  {
    id: '20260410-08',
    date: '2026-04-10',
    title: 'ChatGPT 集成 Notion、Linear、Box 等生产力工具',
    summary: 'OpenAI在ChatGPT中新增与Notion、Linear、Box等主流生产力工具的深度集成，用户可直接在ChatGPT中操作外部应用。标志着AI从对话工具向工作流中枢的演进。',
    source: 'OpenAI',
    sourceUrl: 'https://blog.mean.ceo/ai-product-launches-news-april-2026/',
    tags: ['#产品', '#集成'],
    accuracyScore: 92,
    timelinessScore: 90,
    utilityScore: 95,
    totalScore: 92,
    createdAt: '2026-04-10T11:30:00Z'
  },
  {
    id: '20260410-09',
    date: '2026-04-10',
    title: 'Microsoft 发布自研AI模型，与OpenAI形成竞合关系',
    summary: 'Microsoft开始发布自研AI模型与合作伙伴OpenAI形成直接竞争。标志着微软AI战略从纯合作转向自主+合作并行，对整个AI行业格局产生深远影响。',
    source: 'Microsoft',
    sourceUrl: 'https://www.linkedin.com/pulse/ai-updates-week-4526-annie-cushing-ag3de',
    tags: ['#竞争', '#战略'],
    accuracyScore: 90,
    timelinessScore: 88,
    utilityScore: 90,
    totalScore: 89,
    createdAt: '2026-04-10T12:00:00Z'
  },
  {
    id: '20260410-10',
    date: '2026-04-10',
    title: 'arXiv: SkillRT 研究——LLM Agent 技能编译为可复用单元',
    summary: 'arXiv发表SkillRT论文，研究如何将LLM Agent的技能编译为可高效执行的复用单元。对低代码平台设计AI工作流编排有直接参考价值，是Agent工程化的重要进展。',
    source: 'GitHub',
    sourceUrl: 'https://arxiv.org/html/2604.03088v1',
    tags: ['#Agent', '#研究'],
    accuracyScore: 88,
    timelinessScore: 90,
    utilityScore: 92,
    totalScore: 90,
    createdAt: '2026-04-10T14:00:00Z'
  },

  // === 2026-04-09 ===
  {
    id: '20260409-01',
    date: '2026-04-09',
    title: 'OpenAI、Anthropic、Google 联手打击中国模型蒸馏行为',
    summary: '三大AI巨头通过Frontier Model Forum建立跨公司合作，共享情报以对抗中国企业未经授权提取其前沿模型能力的行为。此举由DeepSeek事件催生，旨在保护知识产权。',
    source: 'OpenAI',
    sourceUrl: 'https://www.bloomberg.com/news/articles/2026-04-06/openai-anthropic-google-unite-to-combat-model-copying-in-china',
    tags: ['#联合行动', '#知识产权'],
    accuracyScore: 97,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 97,
    createdAt: '2026-04-09T08:00:00Z'
  },
  {
    id: '20260409-02',
    date: '2026-04-09',
    title: 'Anthropic 营收突破300亿美元，与Google/Broadcom扩大算力合作',
    summary: 'Anthropic年化营收从2025年底的90亿美元飙升至300亿美元。同时与Google和Broadcom扩大算力合作，锁定约3.5吉瓦TPU算力，合作金额达数千亿美元。',
    source: 'Anthropic',
    sourceUrl: 'https://techcrunch.com/2026/04/07/anthropic-compute-deal-google-broadcom-tpus/',
    tags: ['#融资', '#算力'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 93,
    totalScore: 97,
    createdAt: '2026-04-09T08:30:00Z'
  },
  {
    id: '20260409-03',
    date: '2026-04-09',
    title: 'Anthropic 因网络安全顾虑推迟AI模型发布',
    summary: 'Anthropic出于网络安全考虑，决定推迟一款新AI模型的发布。公司表示需要在确保模型安全防护措施完善后再向公众推出。',
    source: 'Anthropic',
    sourceUrl: 'https://fortune.com/2026/04/07/openai-drama-sam-altman-ipo-anthropic-cybersecurity-risks-eye-on-ai/',
    tags: ['#安全', '#模型'],
    accuracyScore: 90,
    timelinessScore: 95,
    utilityScore: 88,
    totalScore: 91,
    createdAt: '2026-04-09T09:00:00Z'
  },
  {
    id: '20260409-04',
    date: '2026-04-09',
    title: 'OpenAI 内部动荡：IPO隐忧与高管关系紧张',
    summary: 'OpenAI面临CEO Sam Altman诚信质疑、与CFO Sarah Friar关系紧张以及高管重组等问题，IPO前景不确定性增加。',
    source: 'OpenAI',
    sourceUrl: 'https://fortune.com/2026/04/07/openai-drama-sam-altman-ipo-anthropic-cybersecurity-risks-eye-on-ai/',
    tags: ['#公司治理', '#IPO'],
    accuracyScore: 88,
    timelinessScore: 92,
    utilityScore: 85,
    totalScore: 88,
    createdAt: '2026-04-09T09:30:00Z'
  },
  {
    id: '20260409-05',
    date: '2026-04-09',
    title: 'Anthropic 与 OpenAI 营收差距急剧缩小，两家均在筹备IPO',
    summary: '2025年初OpenAI年化营收60亿vs Anthropic 10亿，到2026年4月Anthropic已达300亿，差距大幅缩小。两家公司都在为IPO做准备。',
    source: 'Anthropic',
    sourceUrl: 'https://www.reuters.com/technology/artificial-intelligence/openai-versus-anthropic-what-revenue-race-means-their-ipos-2026-04-08/',
    tags: ['#营收', '#IPO'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 93,
    createdAt: '2026-04-09T10:00:00Z'
  },
  {
    id: '20260409-06',
    date: '2026-04-09',
    title: 'Broadcom 扩大AI芯片合作，与Google和Anthropic签署大单',
    summary: 'Broadcom与Google和Anthropic扩大AI芯片合作协议。分析师预计Broadcom来自Anthropic的AI营收2026年将达210亿美元，此后每年420亿美元。',
    source: 'Broadcom',
    sourceUrl: 'https://www.cnbc.com/2026/04/06/broadcom-agrees-to-expanded-chip-deals-with-google-anthropic.html',
    tags: ['#芯片', '#算力'],
    accuracyScore: 95,
    timelinessScore: 93,
    utilityScore: 88,
    totalScore: 92,
    createdAt: '2026-04-09T10:30:00Z'
  },
  {
    id: '20260409-07',
    date: '2026-04-09',
    title: 'AI正在颠覆网络安全行业：漏洞发现速度大幅提升',
    summary: 'Anthropic、OpenAI、Google等公司的AI技术使黑客能够以前所未有的速度发现安全漏洞，网络安全行业面临根本性变革。',
    source: '其他',
    sourceUrl: 'https://www.nytimes.com/2026/04/06/technology/ai-cybersecurity-hackers.html',
    tags: ['#安全', '#行业趋势'],
    accuracyScore: 90,
    timelinessScore: 88,
    utilityScore: 85,
    totalScore: 88,
    createdAt: '2026-04-09T11:00:00Z'
  },
  {
    id: '20260409-08',
    date: '2026-04-09',
    title: 'Anthropic 切断 OpenClaw 的 Claude 订阅支持',
    summary: 'Anthropic在Claude订阅中移除了对OpenClaw的支持，引发开发者社区讨论。此举被视为Anthropic收紧第三方集成策略的信号。',
    source: 'Anthropic',
    sourceUrl: 'https://www.linkedin.com/pulse/ai-updates-week-4526-annie-cushing-ag3de',
    tags: ['#生态', '#政策'],
    accuracyScore: 85,
    timelinessScore: 90,
    utilityScore: 82,
    totalScore: 86,
    createdAt: '2026-04-09T11:30:00Z'
  },
  {
    id: '20260409-09',
    date: '2026-04-09',
    title: 'Microsoft 发布自有AI模型，与OpenAI展开直接竞争',
    summary: 'Microsoft开始发布自研AI模型，与主要合作伙伴OpenAI形成竞争关系。标志着微软AI战略从纯合作转向自主+合作并行。',
    source: 'Microsoft',
    sourceUrl: 'https://www.linkedin.com/pulse/ai-updates-week-4526-annie-cushing-ag3de',
    tags: ['#竞争', '#战略'],
    accuracyScore: 88,
    timelinessScore: 90,
    utilityScore: 88,
    totalScore: 89,
    createdAt: '2026-04-09T12:00:00Z'
  },
  {
    id: '20260409-10',
    date: '2026-04-09',
    title: 'GitHub 热门趋势：OpenClaw Agent 和 Learn Claude Code 领跑',
    summary: 'GitHub上AI Agent项目持续火热，OpenClaw成为最受关注的AI编程Agent，Learn Claude Code月增2.4万Star。AI工程化与企业级平台成为新方向。',
    source: 'GitHub',
    sourceUrl: 'https://github.com/OpenGithubs/github-monthly-rank',
    tags: ['#开源', '#趋势'],
    accuracyScore: 90,
    timelinessScore: 85,
    utilityScore: 88,
    totalScore: 88,
    createdAt: '2026-04-09T14:00:00Z'
  },
  {
    id: '20260409-11',
    date: '2026-04-09',
    title: 'Hermes Agent v0.8.0 发布：自进化AI Agent框架持续爆发',
    summary: 'Nous Research开源的Hermes Agent更新至v0.8.0，GitHub 25K+ Stars。核心特性是内置自学习闭环（失败→反思→自动生成Skill→持续改进），支持MCP协议，一键切换模型零代码改动，与OpenClaw并列为2026最热Agent框架。',
    source: 'Hermes',
    sourceUrl: 'https://zhuanlan.zhihu.com/p/2022015752258027715',
    tags: ['#Agent', '#开源', '#MCP'],
    accuracyScore: 95,
    timelinessScore: 98,
    utilityScore: 95,
    totalScore: 96,
    createdAt: '2026-04-09T14:30:00Z'
  },
  {
    id: '20260409-12',
    date: '2026-04-09',
    title: 'MCP 协议生态加速扩展，重构AI生产力工具链',
    summary: 'Model Context Protocol（MCP）正在成为AI Agent接入外部服务的标准协议，支持双向通信，驱动企业级Agent从协议标准到实际落地。Hermes、Dify等主流框架均已适配。',
    source: 'MCP',
    sourceUrl: 'https://www.woshipm.com/ai/6233632.html',
    tags: ['#MCP', '#协议', '#企业应用'],
    accuracyScore: 92,
    timelinessScore: 90,
    utilityScore: 95,
    totalScore: 92,
    createdAt: '2026-04-09T15:00:00Z'
  },

  // === 2026-04-07 ===
  {
    id: '20260407-01',
    date: '2026-04-07',
    title: 'OpenAI 收购安全公司 TBPN，强化安全研究',
    summary: 'OpenAI宣布收购安全研究公司TBPN，进一步强化其在AI安全领域的布局。此次收购将帮助OpenAI建立更完善的安全评估体系。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/blog/openai-acquires-tbpn',
    tags: ['#收购', '#安全'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 88,
    totalScore: 94,
    createdAt: '2026-04-07T08:00:00Z'
  },
  {
    id: '20260407-02',
    date: '2026-04-07',
    title: 'Claude Opus 4.6 & Sonnet 4.6 支持最长 300K 输出',
    summary: 'Anthropic将Claude Opus 4.6和Sonnet 4.6的max_tokens上限提升至300K，支持长文内容、结构化数据和大型代码生成的单次输出。',
    source: 'Anthropic',
    sourceUrl: 'https://docs.anthropic.com/en/docs/release-notes',
    tags: ['#更新', '#API'],
    accuracyScore: 98,
    timelinessScore: 95,
    utilityScore: 92,
    totalScore: 95,
    createdAt: '2026-04-07T09:00:00Z'
  },
  {
    id: '20260407-03',
    date: '2026-04-07',
    title: 'Claude Haiku 3 模型宣布退役，建议迁移至 Haiku 4.5',
    summary: 'Anthropic宣布Claude Haiku 3模型将于4月19日正式退役，推荐开发者迁移到性能更强的Claude Haiku 4.5模型。',
    source: 'Anthropic',
    sourceUrl: 'https://docs.anthropic.com/en/docs/release-notes',
    tags: ['#退役', '#模型'],
    accuracyScore: 97,
    timelinessScore: 98,
    utilityScore: 85,
    totalScore: 93,
    createdAt: '2026-04-07T09:30:00Z'
  },
  {
    id: '20260407-04',
    date: '2026-04-07',
    title: 'Google 搜索产品接入虚拟试穿 AI 功能',
    summary: 'Google宣布从4月30日起，其虚拟试穿技术将直接在Google搜索结果中提供，覆盖Google全平台产品搜索场景。',
    source: 'Google',
    sourceUrl: 'https://blog.google/products/search/google-virtual-try-on',
    tags: ['#产品', '#AI应用'],
    accuracyScore: 90,
    timelinessScore: 92,
    utilityScore: 80,
    totalScore: 87,
    createdAt: '2026-04-07T10:00:00Z'
  },
  {
    id: '20260407-05',
    date: '2026-04-07',
    title: 'OpenAI 公开 Model Spec 方法论，推动安全透明化',
    summary: 'OpenAI公开了其Model Spec方法论，详细阐述了模型行为规范的制定原则和实施方式，推动AI安全治理透明化。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/blog/model-spec-approach',
    tags: ['#安全', '#透明化'],
    accuracyScore: 92,
    timelinessScore: 88,
    utilityScore: 85,
    totalScore: 88,
    createdAt: '2026-04-07T10:30:00Z'
  },
  {
    id: '20260407-06',
    date: '2026-04-07',
    title: 'Anthropic 推出数据驻留控制功能，支持指定推理区域',
    summary: 'Anthropic推出数据驻留控制功能inference_geo参数，允许企业客户指定模型推理运行的区域。美国境内推理定价为标准价格的1.1倍。',
    source: 'Anthropic',
    sourceUrl: 'https://docs.anthropic.com/en/docs/release-notes',
    tags: ['#企业', '#合规'],
    accuracyScore: 93,
    timelinessScore: 90,
    utilityScore: 88,
    totalScore: 90,
    createdAt: '2026-04-07T11:00:00Z'
  },
  // === 2026-04-06 ===
  {
    id: '20260406-01',
    date: '2026-04-06',
    title: 'OpenAI 完成1220亿美元融资，创AI领域最高纪录',
    summary: 'OpenAI宣布完成1220亿美元新一轮融资，刷新AI领域融资纪录。资金将用于加速下一代AI技术研发和基础设施建设。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/blog/122b-fundraising',
    tags: ['#融资', '#里程碑'],
    accuracyScore: 98,
    timelinessScore: 100,
    utilityScore: 95,
    totalScore: 98,
    createdAt: '2026-04-06T08:00:00Z'
  },
  {
    id: '20260406-02',
    date: '2026-04-06',
    title: 'Codex 推出按量计费团队版，降低开发门槛',
    summary: 'OpenAI宣布Codex代码生成平台推出按量计费团队版，使中小团队无需预付高额费用即可使用Codex的AI编程能力。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/blog/codex-teams',
    tags: ['#产品', '#定价'],
    accuracyScore: 92,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 92,
    createdAt: '2026-04-06T10:00:00Z'
  },
  {
    id: '20260406-03',
    date: '2026-04-06',
    title: 'AI 智能体 Operator 引爆两会讨论，用户态度分化',
    summary: 'OpenAI Operator等AI智能体技术引发全国两会热议。调查数据显示56%受访者保持观望，已使用者不足6%，市场接受度仍待培育。',
    source: '其他',
    sourceUrl: 'https://news.sina.com.cn/ai-agent-operator',
    tags: ['#智能体', '#社会'],
    accuracyScore: 85,
    timelinessScore: 90,
    utilityScore: 82,
    totalScore: 86,
    createdAt: '2026-04-06T14:00:00Z'
  },
  // === 2026-04-03 ===
  {
    id: '20260403-01',
    date: '2026-04-03',
    title: '智谱发布 GLM-5V-Turbo 多模态模型，原生支持图像视频输入',
    summary: '智谱AI发布GLM-5V-Turbo多模态模型，原生支持图像和视频输入，拥有200K上下文窗口。该模型深度适配Agent工作流，擅长设计稿代码还原与可视化迭代。',
    source: '智谱',
    sourceUrl: 'https://www.zhipuai.cn/news/glm-5v-turbo',
    tags: ['#发布', '#多模态'],
    accuracyScore: 95,
    timelinessScore: 98,
    utilityScore: 90,
    totalScore: 94,
    createdAt: '2026-04-03T09:00:00Z'
  },
  {
    id: '20260403-02',
    date: '2026-04-03',
    title: '阿里发布 Qwen3.5-Max-Preview，已在 Qwen Chat 上线',
    summary: '阿里通义实验室发布Qwen3.5-Max-Preview模型，已在Qwen Chat平台上线供用户测试体验。该模型在多项基准测试中表现优异。',
    source: '阿里',
    sourceUrl: 'https://qwenlm.github.io/blog/qwen3.5-max-preview',
    tags: ['#发布', '#模型'],
    accuracyScore: 92,
    timelinessScore: 95,
    utilityScore: 88,
    totalScore: 92,
    createdAt: '2026-04-03T10:00:00Z'
  },
  {
    id: '20260403-03',
    date: '2026-04-03',
    title: '阿里 Wan2.7-Image 统一图像生成编辑模型发布',
    summary: '阿里通义实验室发布图像生成与编辑统一模型Wan2.7-Image及其Pro版，支持虚拟捏脸、调色盘、多语言印刷级文本渲染等功能。人类偏好盲测多项能力国内第一。',
    source: '阿里',
    sourceUrl: 'https://tongyi.aliyun.com/wanxiang',
    tags: ['#发布', '#图像生成'],
    accuracyScore: 93,
    timelinessScore: 95,
    utilityScore: 85,
    totalScore: 91,
    createdAt: '2026-04-03T11:00:00Z'
  },
  // === 2026-04-02 ===
  {
    id: '20260402-01',
    date: '2026-04-02',
    title: 'ClawHub 上线中国镜像站，火山引擎提供基础设施',
    summary: 'OpenClaw生态技能市场ClawHub上线官方中国镜像站，由字节跳动火山引擎及BytePlus赞助基础设施，已完成备案和内容汉化。',
    source: 'GitHub',
    sourceUrl: 'https://clawhub.cn',
    tags: ['#生态', '#本土化'],
    accuracyScore: 90,
    timelinessScore: 92,
    utilityScore: 88,
    totalScore: 90,
    createdAt: '2026-04-02T09:00:00Z'
  },
  {
    id: '20260402-02',
    date: '2026-04-02',
    title: 'OpenAI 推出 Safety Bug Bounty 计划',
    summary: 'OpenAI推出安全漏洞赏金计划，邀请安全研究人员参与AI模型安全测试，最高奖励可达10万美元。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/blog/safety-bug-bounty',
    tags: ['#安全', '#开源'],
    accuracyScore: 92,
    timelinessScore: 90,
    utilityScore: 88,
    totalScore: 90,
    createdAt: '2026-04-02T10:00:00Z'
  },
  {
    id: '20260402-03',
    date: '2026-04-02',
    title: '智谱CEO张鹏：未来12个月算力仍是关键瓶颈',
    summary: '在中关村论坛AI开源前沿论坛上，智谱CEO张鹏表示算力不足制约AI研究进展，推理阶段需求正以十倍百倍速度爆发，大量需求未被满足。',
    source: '智谱',
    sourceUrl: 'https://www.zhipuai.cn/news/zhangpeng-zgc-forum',
    tags: ['#观点', '#算力'],
    accuracyScore: 88,
    timelinessScore: 85,
    utilityScore: 82,
    totalScore: 85,
    createdAt: '2026-04-02T14:00:00Z'
  },
  // === 2026-03-30 ===
  {
    id: '20260330-01',
    date: '2026-03-30',
    title: 'Claude Sonnet 1M 上下文窗口测试版即将退役',
    summary: 'Anthropic宣布Claude Sonnet 4.5和Sonnet 4的1M token上下文窗口测试版将于4月30日退役，建议开发者迁移至标准上下文。',
    source: 'Anthropic',
    sourceUrl: 'https://docs.anthropic.com/en/docs/release-notes',
    tags: ['#退役', '#API'],
    accuracyScore: 95,
    timelinessScore: 88,
    utilityScore: 80,
    totalScore: 88,
    createdAt: '2026-03-30T10:00:00Z'
  },
  {
    id: '20260330-02',
    date: '2026-03-30',
    title: '字节火山引擎与 ClawHub 达成基础设施合作',
    summary: '字节跳动旗下火山引擎宣布为ClawHub中国镜像站提供云计算基础设施支持，推动AI开发生态本土化。',
    source: '字节',
    sourceUrl: 'https://www.volcengine.com/news/clawhub-partnership',
    tags: ['#合作', '#基础设施'],
    accuracyScore: 88,
    timelinessScore: 90,
    utilityScore: 82,
    totalScore: 87,
    createdAt: '2026-03-30T11:00:00Z'
  },
  // === 2026-03-28 ===
  {
    id: '20260328-01',
    date: '2026-03-28',
    title: 'Google Gemma 3 开源模型正式发布',
    summary: 'Google DeepMind发布Gemma 3系列开源模型，包含多种参数规模，在同等规模模型中表现出色，支持多语言和多模态任务。',
    source: 'Google',
    sourceUrl: 'https://blog.google/technology/ai/gemma-3',
    tags: ['#开源', '#模型'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 93,
    createdAt: '2026-03-28T09:00:00Z'
  },
  {
    id: '20260328-02',
    date: '2026-03-28',
    title: 'Minimax 推出 Video-02 视频生成模型',
    summary: 'Minimax发布Video-02视频生成模型，支持高分辨率长视频生成，在视频一致性和动态效果方面显著提升。',
    source: 'Minimax',
    sourceUrl: 'https://www.minimaxi.com/news/video-02',
    tags: ['#发布', '#视频生成'],
    accuracyScore: 88,
    timelinessScore: 90,
    utilityScore: 85,
    totalScore: 88,
    createdAt: '2026-03-28T10:00:00Z'
  },
  {
    id: '20260328-03',
    date: '2026-03-28',
    title: 'GitHub Copilot 支持多文件同时编辑',
    summary: 'GitHub宣布Copilot支持多文件同时编辑功能，开发者可以一次修改多个相关文件，大幅提升AI辅助编程效率。',
    source: 'GitHub',
    sourceUrl: 'https://github.blog/copilot-multi-file-edit',
    tags: ['#更新', '#工具'],
    accuracyScore: 92,
    timelinessScore: 90,
    utilityScore: 95,
    totalScore: 92,
    createdAt: '2026-03-28T12:00:00Z'
  },
  // === 2026-03-25 ===
  {
    id: '20260325-01',
    date: '2026-03-25',
    title: '"智能经济"正式写入国家十五五规划纲要',
    summary: '《国民经济和社会发展第十五个五年规划纲要》正式将"智能经济"确立为国家战略，从数字经济到智能经济的转型进入新阶段。',
    source: '其他',
    sourceUrl: 'https://www.gov.cn/zhengce/202603/smart-economy',
    tags: ['#政策', '#国家战略'],
    accuracyScore: 98,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 94,
    createdAt: '2026-03-25T08:00:00Z'
  },
  {
    id: '20260325-02',
    date: '2026-03-25',
    title: '中国独角兽企业达416家，AI领域数量居首',
    summary: '第三届全球独角兽企业大会发布报告：中国独角兽企业416家，总估值1.6万亿美元，AI领域企业数量居各行业首位。',
    source: '其他',
    sourceUrl: 'https://news.cn/unicorn-2026',
    tags: ['#数据', '#独角兽'],
    accuracyScore: 90,
    timelinessScore: 85,
    utilityScore: 80,
    totalScore: 85,
    createdAt: '2026-03-25T10:00:00Z'
  },
]

let dailyItems: DailyItem[] = [...sampleItems]

export function getAllItems(): DailyItem[] {
  return dailyItems
}

export function getDailyReport(date: string): DailyReport | null {
  const items = dailyItems.filter(item => item.date === date)
  if (items.length === 0) return null

  return {
    id: date,
    date,
    items,
    markdown: generateMarkdown(items),
    createdAt: items[0].createdAt
  }
}

export function getRecentReports(days: number = 7): DailyReport[] {
  const dates = [...new Set(dailyItems.map(item => item.date))]
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .slice(0, days)

  return dates.map(date => getDailyReport(date)!).filter(Boolean)
}

export function searchItems(query: string, tags?: string[], sources?: SourceType[]): DailyItem[] {
  return dailyItems.filter(item => {
    const matchQuery = !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase())

    const matchTags = !tags || tags.length === 0 ||
      tags.some(tag => item.tags.includes(tag))

    const matchSources = !sources || sources.length === 0 ||
      sources.includes(item.source)

    return matchQuery && matchTags && matchSources
  })
}

export function getStatistics(): Statistics {
  const sourceDistribution: Record<SourceType, number> = {} as Record<SourceType, number>
  const tagDistribution: Record<string, number> = {}

  let totalAccuracy = 0
  let totalTimeliness = 0
  let totalUtility = 0

  dailyItems.forEach(item => {
    sourceDistribution[item.source] = (sourceDistribution[item.source] || 0) + 1
    item.tags.forEach(tag => {
      tagDistribution[tag] = (tagDistribution[tag] || 0) + 1
    })
    totalAccuracy += item.accuracyScore
    totalTimeliness += item.timelinessScore
    totalUtility += item.utilityScore
  })

  const count = dailyItems.length
  const dates = [...new Set(dailyItems.map(item => item.date))].sort()

  return {
    totalItems: count,
    sourceDistribution,
    tagDistribution,
    avgScores: {
      accuracy: count > 0 ? Math.round(totalAccuracy / count) : 0,
      timeliness: count > 0 ? Math.round(totalTimeliness / count) : 0,
      utility: count > 0 ? Math.round(totalUtility / count) : 0,
      total: count > 0 ? Math.round((totalAccuracy + totalTimeliness + totalUtility) / (count * 3)) : 0
    },
    dailyTrend: dates.map(date => ({
      date,
      count: dailyItems.filter(item => item.date === date).length
    }))
  }
}

export function addItem(item: DailyItem): void {
  dailyItems.push(item)
}

function generateMarkdown(items: DailyItem[]): string {
  const groupedByCategory: Record<string, DailyItem[]> = {}

  items.forEach(item => {
    const category = getSourceCategory(item.source)
    if (!groupedByCategory[category]) {
      groupedByCategory[category] = []
    }
    groupedByCategory[category].push(item)
  })

  let markdown = `# AI日报 | ${items[0]?.date || '未知日期'}\n\n`

  if (groupedByCategory['御三家']) {
    markdown += `## 御三家\n\n`
    groupedByCategory['御三家'].forEach(item => {
      markdown += `### ${item.source}\n`
      markdown += `- **${item.title}** ${item.tags.join(' ')}\n`
      markdown += `  ${item.summary}\n`
      markdown += `  [来源](${item.sourceUrl})\n\n`
    })
  }

  if (groupedByCategory['AI开发工具']) {
    markdown += `---\n\n## AI Agent 生态 & 开发工具\n\n`
    groupedByCategory['AI开发工具'].forEach(item => {
      markdown += `- **${item.title}** ${item.tags.join(' ')}\n`
      markdown += `  ${item.summary}\n`
      markdown += `  [来源](${item.sourceUrl})\n\n`
    })
  }

  if (groupedByCategory['基础设施']) {
    markdown += `---\n\n## 基础设施\n\n`
    groupedByCategory['基础设施'].forEach(item => {
      markdown += `- **${item.title}** ${item.tags.join(' ')}\n`
      markdown += `  ${item.summary}\n`
      markdown += `  [来源](${item.sourceUrl})\n\n`
    })
  }

  if (groupedByCategory['国内大厂']) {
    markdown += `---\n\n## 国内动态\n\n`
    groupedByCategory['国内大厂'].forEach(item => {
      markdown += `### ${item.source}\n`
      markdown += `- **${item.title}** ${item.tags.join(' ')}\n`
      markdown += `  ${item.summary}\n`
      markdown += `  [来源](${item.sourceUrl})\n\n`
    })
  }

  if (groupedByCategory['热门项目']) {
    markdown += `---\n\n## 热门项目\n\n`
    groupedByCategory['热门项目'].forEach(item => {
      markdown += `- **${item.title}** ${item.tags.join(' ')}\n`
      markdown += `  ${item.summary}\n`
      markdown += `  [来源](${item.sourceUrl})\n\n`
    })
  }

  if (groupedByCategory['重点关注']) {
    markdown += `---\n\n## 重点关注产品\n\n`
    groupedByCategory['重点关注'].forEach(item => {
      markdown += `- **${item.title}** ${item.tags.join(' ')}\n`
      markdown += `  ${item.summary}\n`
      markdown += `  [来源](${item.sourceUrl})\n\n`
    })
  }

  markdown += `---\n\n*AI日报 @ ${new Date().toISOString()}*`

  return markdown
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  dailyItems.forEach(item => item.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags)
}

export function getAllSources(): SourceType[] {
  const sources = new Set<SourceType>()
  dailyItems.forEach(item => sources.add(item.source))
  return Array.from(sources)
}
