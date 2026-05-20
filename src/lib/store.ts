import { DailyItem, DailyReport, Statistics, SourceType, getSourceCategory } from '@/types'

const sampleItems: DailyItem[] = [
  // === 2026-05-20 (周二) ===
  {
    id: '20260520-01',
    date: '2026-05-20',
    title: 'Google I/O 2026 Keynote: Gemini 3.5 Flash发布，超越3.1 Pro基准，速度4x于其他前沿模型，成本不到一半',
    summary: 'Google发布Gemini 3.5 Flash，在几乎所有基准上超越3.1 Pro，尤其在编码和GDPVal（真实经济任务）上大幅提升。输出速度为其他前沿模型4倍，成本不到一半。3.5 Pro下月发布。内部已用Antigravity处理超3万亿tokens/天。Google月处理tokens达3.2千万亿（7x YoY）。',
    source: 'Google',
    sourceUrl: 'https://blog.google/innovation-and-ai/sundar-pichai-io-2026/',
    tags: ['#发布', '#模型', '#竞争'],
    accuracyScore: 98,
    timelinessScore: 98,
    utilityScore: 95,
    totalScore: 97,
    recommendReason: 'Gemini 3.5 Flash以不到一半价格提供前沿级智能+4倍速度，直接改变模型选型经济性。PM应立即评估：现有产品中哪些工作负载可以迁移到3.5 Flash以降低成本。top公司若80%工作负载切换可年省超10亿美元。',
    createdAt: '2026-05-19T17:45:00Z'
  },
  {
    id: '20260520-02',
    date: '2026-05-20',
    title: 'Gemini Spark: Google发布24/7个人AI Agent，MCP集成+Gmail/Docs直连，对标Claude Cowork和ChatGPT Agent',
    summary: 'Google发布Gemini Spark，24/7运行于Google Cloud专用VM的个人AI Agent。由Gemini 3.5+Antigravity驱动，原生集成Gmail/Docs/Sheets/Slides。数周内通过MCP接入第三方工具。今夏还将进入Chrome成为Agentic浏览器。trusted tester本周开放，Beta下周推送AI Ultra订阅者。',
    source: 'Google',
    sourceUrl: 'https://techcrunch.com/2026/05/19/google-introduces-gemini-spark-a-24-7-agentic-assistant-with-gmail-integration/',
    tags: ['#Agent', '#MCP', '#发布'],
    accuracyScore: 95,
    timelinessScore: 98,
    utilityScore: 96,
    totalScore: 96,
    recommendReason: '三大AI实验室（Google/Anthropic/OpenAI）均已发布24/7 Agent产品。Spark原生集成Google全家桶+MCP开放生态是差异化优势。PM应关注：Agent产品的竞争已从"能力"转向"生态集成深度"。低代码平台需评估MCP Server是否已覆盖Google生态。',
    createdAt: '2026-05-19T18:00:00Z'
  },
  {
    id: '20260520-03',
    date: '2026-05-20',
    title: 'Antigravity 2.0: Google推出独立Agent桌面平台+CLI/SDK/Managed Agents，MCP Server+A2A协议企业级支持',
    summary: 'Google发布Antigravity 2.0，独立Agent桌面应用（无需IDE），支持并行Agent、定时任务、子Agent工作流。配套推出CLI、SDK、Gemini API Managed Agents（一键启动隔离Linux环境+持久状态）和企业Agent Platform。底层集成A2A协议和MCP Server。Antigravity内Flash优化版速度达其他前沿模型12x。',
    source: 'Google',
    sourceUrl: 'https://www.marktechpost.com/2026/05/19/google-launches-antigravity-2-0-at-i-o-2026-a-standalone-agent-first-platform-with-cli-sdk-managed-execution-and-enterprise-support/',
    tags: ['#Agent', '#MCP', '#发布', '#低代码'],
    accuracyScore: 95,
    timelinessScore: 98,
    utilityScore: 96,
    totalScore: 96,
    recommendReason: 'Antigravity从IDE插件进化为独立Agent平台，说明AI开发工具正在"脱离IDE"。A2A+MCP企业级支持意味着Google在构建Agent基础设施。PM应关注：Agent平台化是趋势，低代码平台需要思考自己在Agent生态中的定位——是构建Agent还是被Agent调用。',
    createdAt: '2026-05-19T18:30:00Z'
  },
  {
    id: '20260520-04',
    date: '2026-05-20',
    title: 'Andrej Karpathy加入Anthropic预训练团队：将组建Claude加速预训练研究团队，AI顶尖人才争夺白热化',
    summary: 'OpenAI联合创始人、前Tesla AI总监Andrej Karpathy宣布加入Anthropic，在Nick Joseph领导下从事预训练工作。他将组建团队用Claude加速预训练研究。同期网络安全专家Chris Rohlf加入Anthropic前沿红队。Anthropic用AI辅助研究对抗OpenAI/Google的算力优势策略明显。',
    source: 'Anthropic',
    sourceUrl: 'https://techcrunch.com/2026/05/19/openai-co-founder-andrej-karpathy-joins-anthropics-pre-training-team/',
    tags: ['#竞争', '#战略'],
    accuracyScore: 97,
    timelinessScore: 98,
    utilityScore: 88,
    totalScore: 94,
    recommendReason: 'Karpathy是罕见的能桥接LLM理论与大规模训练实践的研究者。Anthropic明确用"AI辅助研究"对抗OpenAI/Google的算力优势——这是小团队以智取胜的策略。PM应关注：模型竞争的核心正从"谁算力多"转向"谁更会用AI做研究"，这可能改变模型迭代速度格局。',
    createdAt: '2026-05-19T15:43:00Z'
  },
  {
    id: '20260520-05',
    date: '2026-05-20',
    title: 'Gemini Omni Flash: Google发布统一世界模型，从任意输入生成视频输出，AI从预测文本到模拟现实',
    summary: 'Google发布Gemini Omni Flash，首个能从任意输入模态生成任意输出模态的模型。首发视频输出，后续支持图像和文本。结合Gemini智能与生成式媒体模型（Veo/Lyria），代表AI从"预测文本"到"模拟现实"的跨越。今日在Gemini App、Google Flow和YouTube Shorts上线，API数周内开放。',
    source: 'Google',
    sourceUrl: 'https://blog.google/innovation-and-ai/sundar-pichai-io-2026/',
    tags: ['#发布', '#模型', '#竞争'],
    accuracyScore: 95,
    timelinessScore: 98,
    utilityScore: 90,
    totalScore: 94,
    recommendReason: '统一世界模型意味着AI从"文本对话"进入"现实模拟"阶段。PM应关注：多模态生成正在从独立工具（文字/图片/视频各一个）向统一入口演进。低代码平台的产品形态可能因此改变——用户不再是"选工具"而是"描述想要什么"。',
    createdAt: '2026-05-19T17:50:00Z'
  },
  {
    id: '20260520-06',
    date: '2026-05-20',
    title: 'SynthID里程碑：OpenAI/Kakao/ElevenLabs采用Google AI水印标准，AI内容透明度从竞争走向协作',
    summary: 'Google宣布OpenAI、Kakao、ElevenLabs采用SynthID水印。SynthID已为超1000亿张图片/视频和6万年音频添加水印。Content Credentials验证扩展至Search和Chrome。行业从各自为政转向统一透明度标准。Google月处理3.2千万亿tokens，8.5M+开发者使用其模型API。',
    source: 'Google',
    sourceUrl: 'https://blog.google/innovation-and-ai/sundar-pichai-io-2026/',
    tags: ['#安全', '#协议', '#竞争'],
    accuracyScore: 95,
    timelinessScore: 98,
    utilityScore: 85,
    totalScore: 92,
    recommendReason: 'OpenAI采用Google的SynthID是罕见的跨阵营合作，说明AI内容标记已成为行业共识而非竞争点。PM应关注：AI生成内容的标记/溯源能力即将成为合规必需品。做AI产品的团队应尽早集成SynthID或Content Credentials，为即将到来的监管做准备。',
    createdAt: '2026-05-19T18:00:00Z'
  },
  // === 2026-05-19 (周一) ===
  {
    id: '20260519-01',
    date: '2026-05-19',
    title: 'Anthropic收购Stainless：SDK+MCP Server工具链纳入麾下，控制Agent基础设施瓶颈',
    summary: 'Anthropic收购Stainless（估值3亿美元的SDK工具公司），获得API SDK生成工具链控制权。Stainless此前同时服务OpenAI/Google/Cloudflare，收购后将关停对外服务。Anthropic同时掌控MCP协议（2024年发布并开源）和SDK工具链，形成Agent基础设施双垄断。',
    source: 'Anthropic',
    sourceUrl: 'https://www.rdworldonline.com/why-anthropic-hired-openai-co-founder-and-software-3-0-proponent-karpathy-and-acquired-the-dev-tools-company-stainless/',
    tags: ['#Agent', '#MCP', '#战略'],
    accuracyScore: 96,
    timelinessScore: 96,
    utilityScore: 95,
    totalScore: 96,
    recommendReason: 'Anthropic收购Stainless并关停竞品服务，这是Agent基础设施领域的"护城河"动作。控制SDK生成工具链意味着所有接入Claude的第三方都要走Anthropic的管道。PM应关注：Agent生态的竞争已从"谁的模型强"升级为"谁控制基础设施"。',
    createdAt: '2026-05-19T10:00:00Z'
  },
  {
    id: '20260519-02',
    date: '2026-05-19',
    title: 'Cursor发布Composer 2.5：基于Kimi K2.5开源检查点，编码Agent性能对标Opus 4.7/GPT-5.5',
    summary: 'Cursor发布Composer 2.5，基于Moonshot Kimi K2.5开源检查点训练。性能对标Opus 4.7和GPT-5.5，但价格仅1/10。解决了长rollout中信用分配难题，RL训练跨数十万token的rollout。中国开源模型在编码Agent领域开始与前沿模型正面竞争。',
    source: 'Cursor',
    sourceUrl: 'https://cursor.com/blog/composer-2-5',
    tags: ['#发布', '#竞争', '#低代码'],
    accuracyScore: 96,
    timelinessScore: 96,
    utilityScore: 95,
    totalScore: 96,
    recommendReason: 'Kimi K2.5开源检查点在编码Agent上对标前沿模型，说明开源与闭源的编码能力差距正在快速缩小。1/10的价格将严重冲击付费编码工具的市场。PM应关注：编码Agent进入"性价比"竞争阶段，低代码平台选型需要重新评估开源方案。',
    createdAt: '2026-05-19T12:00:00Z'
  },
  {
    id: '20260519-03',
    date: '2026-05-19',
    title: 'Musk诉OpenAI案落幕：9名陪审员一致驳回全部诉求，OpenAI可继续营利转型',
    summary: '旧金山联邦法院9名陪审员一致驳回Elon Musk对OpenAI的全部索赔诉求。Musk指控OpenAI背叛非营利使命转为营利、与Microsoft构成反垄断。陪审团仅审议数小时即达成一致。法官Gonzalez Rogers此前已表示AI市场竞争充分，反垄断阶段审理不太可能进行。Musk律师称将上诉。',
    source: 'OpenAI',
    sourceUrl: 'https://www.nytimes.com/live/2026/05/18/technology/openai-trial-verdict-altman-musk',
    tags: ['#竞争', '#战略'],
    accuracyScore: 97,
    timelinessScore: 95,
    utilityScore: 88,
    totalScore: 93,
    recommendReason: 'OpenAI彻底胜诉意味着其营利转型没有法律障碍，IPO路径更加清晰。对AI行业而言，非营利→营利的路径已被验证可行。PM应关注：OpenAI没有了法律不确定性，可能加速推进企业级产品和IPO，竞争格局将更清晰。',
    createdAt: '2026-05-18T19:50:00Z'
  },
  {
    id: '20260519-04',
    date: '2026-05-19',
    title: 'OpenAI+Dell合作：Codex进入混合云和本地部署，AI编码Agent进入企业数据中心',
    summary: 'OpenAI与Dell Technologies合作，将Codex引入混合云和本地部署环境。Codex将连接Dell AI Data Platform，让AI编码Agent直接在企业内网运行，接触内部代码库、文档和业务系统。同时探索Codex与Dell AI Factory集成，覆盖ChatGPT Enterprise和API解决方案。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/dell-codex-enterprise-partnership/',
    tags: ['#Agent', '#企业应用', '#发布'],
    accuracyScore: 96,
    timelinessScore: 96,
    utilityScore: 93,
    totalScore: 95,
    recommendReason: 'Codex进入企业本地部署意味着AI编码Agent从"SaaS工具"变为"基础设施"。对数据敏感型企业（金融、医疗、政府）是重大利好。PM应关注：AI编码工具的部署模式正在分化——云端SaaS和本地化并行，低代码平台需同时支持两种模式。',
    createdAt: '2026-05-19T17:00:00Z'
  },
  // === 2026-05-18 (周日) ===
  {
    id: '20260518-01',
    date: '2026-05-18',
    title: 'Google I/O 2026前瞻（5/19-20）：Gemini新一代大模型+Gemini Omni统一多模态+Veo 4',
    summary: 'Google I/O 2026将于5/19-20举行，核心预期为Gemini新一代模型（3.2或4.0），Gemini Omni泄露显示统一文本/图像/视频生成+对话式编辑能力，Veo 4视频生成工具也将发布。Nano Banana、Gemma、Lyria、Genie等全线AI工具同步更新。',
    source: 'Google',
    sourceUrl: 'https://mashable.com/article/google-io-2026-what-to-expect',
    tags: ['#发布', '#模型', '#竞争'],
    accuracyScore: 90,
    timelinessScore: 95,
    utilityScore: 92,
    totalScore: 92,
    recommendReason: 'Google I/O是AI行业年度风向标。Gemini Omni统一多模态生成将直接对标Seedance 2.0/Kling 3.0/Sora 2，改变视频生成竞争格局。PM应关注：多模态生成能力正在从单一工具向统一平台演进，低代码平台需提前规划多模态集成策略。',
    createdAt: '2026-05-18T01:00:00Z'
  },
  {
    id: '20260518-02',
    date: '2026-05-18',
    title: 'ChatGPT推出个人金融服务：Pro用户可直连银行账户管理财务，AI从对话进入个人金融',
    summary: 'OpenAI为ChatGPT Pro用户推出个人金融功能预览版，美国用户可连接银行账户，查询消费、储蓄和理财目标。用户通过侧栏Finances选项或@Finances指令启动。数据由用户自主控制，可随时断开账户和删除历史。ChatGPT不执行金融交易。',
    source: 'OpenAI',
    sourceUrl: 'https://dataconomy.com/2026/05/18/chatgpt-personal-finance-service-pro-users/',
    tags: ['#发布', '#企业应用'],
    accuracyScore: 94,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 93,
    recommendReason: 'ChatGPT从"对话工具"进入"个人金融"领域，意味着AI产品正在渗透高频刚需场景。连接真实金融账户是AI Agent化的关键一步。PM应关注：AI产品的壁垒正在从"模型能力"转向"数据接入深度"，谁能连接更多真实数据源谁就更有粘性。',
    createdAt: '2026-05-18T14:00:00Z'
  },
  // === 2026-05-16 (周五) ===
  {
    id: '20260516-01',
    date: '2026-05-16',
    title: 'Anthropic+PwC扩大战略联盟：Claude进入数十万员工规模部署，企业AI从试点进入规模化',
    summary: 'PwC与Anthropic大幅扩展联盟，推出Claude原生金融业务组，整合Claude全产品线（Cowork/Claude Code/生产力套件）。PwC将首先在美国部署Claude Code和Cowork，逐步扩展至全球数十万专业人员。设立联合卓越中心，培训认证3万名PwC Claude专家。聚焦金融、医药、医疗和消费行业。',
    source: 'Anthropic',
    sourceUrl: 'https://www.pwc.com/us/en/about-us/newsroom/press-releases/anthropic-pwc-expand-alliance-agentic-enterprise.html',
    tags: ['#Agent', '#企业应用', '#战略'],
    accuracyScore: 96,
    timelinessScore: 93,
    utilityScore: 95,
    totalScore: 95,
    recommendReason: '这是2026年最大规模的企业AI部署之一。Dario Amodei称Claude将触达"数十万"PwC员工。PM应关注：企业AI已从"试点"进入"规模化部署"阶段。Claude原生金融业务组的出现说明垂直行业AI方案正在产品化。低代码平台应加速企业级集成。',
    createdAt: '2026-05-16T14:00:00Z'
  },
  {
    id: '20260516-02',
    date: '2026-05-16',
    title: 'Anthropic+盖茨基金会$2亿合作：Claude用于全球健康、药物发现和教育普惠',
    summary: 'Anthropic与盖茨基金会启动$2亿四年合作，通过Claude加速疫苗和药物研究、改善疾病追踪、帮助政府利用健康数据决策。覆盖脊髓灰质炎、HPV等疾病的早期检测。同时应用于教育普惠和农业生产力提升。Anthropic承诺公开分享成功经验和失败教训。',
    source: 'Anthropic',
    sourceUrl: 'https://techfundingnews.com/anthropic-gates-foundation-launch-200m-initiative-to-tackle-disease-and-education-gaps-with-ai/',
    tags: ['#企业应用', '#安全'],
    accuracyScore: 94,
    timelinessScore: 93,
    utilityScore: 88,
    totalScore: 92,
    recommendReason: '$2亿合作说明AI for Good不是口号而是真金白银的投入。药物发现和疾病追踪是AI在垂直行业的硬核应用。PM应关注：AI的社会影响力正在成为企业品牌和合规资产的一部分，这会影响AI产品的采购决策标准。',
    createdAt: '2026-05-16T15:00:00Z'
  },
  // === 2026-05-15 (周四) ===
  {
    id: '20260515-01',
    date: '2026-05-15',
    title: 'Cerebras纳斯达克上市首日暴涨68%：市值950亿美元，2026年最大科技IPO验证AI芯片多元化需求',
    summary: 'Cerebras Systems纳斯达克首日收盘$311.07，较IPO价$185涨68%，市值950亿美元，融资55.5亿美元。年收入5.1亿美元（增76%），已与OpenAI签200亿美元三年期协议。NVIDIA之外最大AI芯片IPO，标志非GPU算力路线获资本市场认可。',
    source: '其他',
    sourceUrl: 'https://www.cnbc.com/2026/05/14/cerebras-cbrs-stock-trade-nasdaq-ipo.html',
    tags: ['#算力', '#融资'],
    accuracyScore: 97,
    timelinessScore: 97,
    utilityScore: 88,
    totalScore: 94,
    recommendReason: 'Cerebras上市验证非NVIDIA算力路线的商业可行性。对AI产品PM而言，算力多元化意味着部署选择增多、成本有望下降。低代码平台可关注Cerebras推理能力是否适配自身场景——未来可能多一个"推理引擎"选项。',
    createdAt: '2026-05-15T01:00:00Z'
  },
  {
    id: '20260515-02',
    date: '2026-05-15',
    title: 'Anthropic扩展Claude for Legal：新增法律插件+MCP连接器，法律已成Claude Cowork第一大使用场景',
    summary: 'Anthropic扩展Claude for Legal，新增商业、隐私、公司法等法律专用插件，以及DocuSign、Box等MCP连接器。Descrybe同步发布Legal Engine，3亿美国法律记录直连Claude。法律已是Claude Cowork使用量最高功能类别，超其他功能3倍。',
    source: 'Anthropic',
    sourceUrl: 'https://techcrunch.com/2026/05/12/the-ai-legal-services-industry-is-heating-up-anthropic-is-getting-in-on-the-action/',
    tags: ['#Agent', '#MCP', '#企业应用'],
    accuracyScore: 95,
    timelinessScore: 92,
    utilityScore: 95,
    totalScore: 94,
    recommendReason: 'MCP在垂直行业的深度集成案例——法律工具通过MCP连接器实现AI原生工作流。PM应关注：每个垂直行业都会出现类似的"AI+领域工具"MCP生态。低代码平台应尽早设计MCP集成架构，抢占垂直行业入口。',
    createdAt: '2026-05-15T02:00:00Z'
  },
  {
    id: '20260515-03',
    date: '2026-05-15',
    title: '日本三大银行将获Claude Mythos访问权限：AI安全工具从美国向亚太扩张',
    summary: '日本三菱UFJ、三井住友、瑞穗银行将获得Anthropic Mythos模型访问权限，用于网络安全漏洞检测。此前JPMorgan是唯一参与银行。美国财长Bessent访日期间通报此事，访问或于5月底前开放。Mythos已发现数千个高严重性漏洞。',
    source: 'Anthropic',
    sourceUrl: 'https://letsdatascience.com/news/japan-megabanks-gain-access-to-anthropic-mythos-a678ad86',
    tags: ['#安全', '#企业应用'],
    accuracyScore: 90,
    timelinessScore: 93,
    utilityScore: 88,
    totalScore: 90,
    recommendReason: 'Mythos从JPMorgan扩展到日本三大银行，说明AI安全工具正成为全球金融基础设施标配。做企业级AI产品的PM应关注：AI安全能力正在从"可选"变为"合规必需"，金融行业的安全审计标准将被AI工具重写。',
    createdAt: '2026-05-15T03:00:00Z'
  },
  {
    id: '20260515-04',
    date: '2026-05-15',
    title: 'GPT-5.6开发全面启动：预测市场89%概率6月底发布，GPT-5.5"地精偏执"问题仍在修复',
    summary: 'OpenAI已全面启动GPT-5.6开发。Polymarket预测市场显示89%概率在6月30日前发布。GPT-5.5因训练数据污染出现"地精偏执"问题，OpenAI紧急在系统提示中4次禁止提及地精、手动过滤训练数据。模型对齐的脆弱性引发行业关注。',
    source: 'OpenAI',
    sourceUrl: 'https://en.wikipedia.org/wiki/GPT-5.5',
    tags: ['#模型', '#竞争'],
    accuracyScore: 85,
    timelinessScore: 90,
    utilityScore: 88,
    totalScore: 87,
    recommendReason: '模型迭代加速（5.5→5.6仅6周）+对齐问题频发，PM需要关注两点：1) 产品架构必须有模型抽象层，能快速切换模型版本；2) AI产品上线前必须做输出质量审计，防止类似"偏执"问题影响用户体验。',
    createdAt: '2026-05-15T04:00:00Z'
  },
  {
    id: '20260514-01',
    date: '2026-05-14',
    title: 'Anthropic免费开放Claude Code课程：涵盖Agent、MCP、API实战，20分钟即可上手',
    summary: 'Anthropic在Skilljar平台上线免费课程库，包含Claude API开发、Claude Code实战和MCP入门等模块。视频教学+测验+认证，最快20分钟完成一门课。降低AI开发工具的学习门槛。',
    source: 'Anthropic',
    sourceUrl: 'https://zdnet.com/article/how-to-learn-claude-code-with-free-anthropic-ai-courses-online',
    tags: ['#Agent', '#MCP', '#更新'],
    accuracyScore: 95,
    timelinessScore: 92,
    utilityScore: 95,
    totalScore: 94,
    recommendReason: 'Anthropic在人才教育上开始发力——免费课程+认证=培养生态粘性。做AI产品的PM应该自己先跑一遍课程，既了解工具链能力边界，也能用来培训团队快速上手。',
    createdAt: '2026-05-14T01:00:00Z'
  },
  {
    id: '20260514-02',
    date: '2026-05-14',
    title: 'OECD数据：中国研发投入首次超越美国，AI三路径叠加优势显现',
    summary: 'OECD 2026年3月数据显示，按购买力平价计算，2024年中国研发投入1.03万亿美元首次超过美国的1.01万亿。DeepSeek V4自研算法+蒸馏低成本+持续高研发三路径叠加，中国AI竞争力加速。',
    source: '其他',
    sourceUrl: 'https://www.huxiu.com/article/4857915.html',
    tags: ['#战略', '#竞争'],
    accuracyScore: 92,
    timelinessScore: 88,
    utilityScore: 88,
    totalScore: 90,
    recommendReason: '研发投入逆转不是象征性事件——它意味着中国AI从"追赶"进入"并行"。做产品规划的PM需要重新评估：哪些AI能力可以用国产模型平替，哪些还必须依赖海外API。',
    createdAt: '2026-05-14T02:00:00Z'
  },


  {
    id: '20260514-01',
    date: '2026-05-14',
    title: 'TikTok World发布Ads MCP：AI Agent可直接规划、投放、优化广告，广告行业进入Agent原生时代',
    summary: 'TikTok World大会上发布TikTok Ads MCP，AI Agent可直连广告平台，端到端完成广告策划、投放和优化，无需人工操作Dashboard。Google、Meta、Amazon也已发布各自的MCP Server。行业趋势：大平台抢建Agent原生广告基础设施，控制数据流成为核心竞争点。',
    source: '其他',
    sourceUrl: 'https://pymnts.com/news/social-commerce/2026/tiktok-unleashes-ai-agents-on-its-ad-platform/',
    tags: ['#MCP', '#Agent', '#发布'],
    accuracyScore: 92,
    timelinessScore: 95,
    utilityScore: 92,
    totalScore: 93,
    recommendReason: '四大广告平台全部上线MCP Server，说明"Agent原生广告"不再是概念而是基础设施竞赛。做营销SaaS或广告技术的PM必须立即评估MCP集成方案——不接入就会被Agent生态排除在外。',
    createdAt: '2026-05-14T01:00:00Z'
  },
  {
    id: '20260514-02',
    date: '2026-05-14',
    title: 'OpenAI正式上线ChatGPT Ads Manager自助广告平台，2026年目标25亿美元广告收入',
    summary: 'OpenAI推出ChatGPT Ads Manager自助广告平台Beta版，支持CPC竞价、Conversions API和像素追踪。广告试点扩展至英国、墨西哥、日本、巴西和韩国。已与电通、宏盟、阳狮、WPP合作，2026年广告收入目标25亿美元，2030年目标1000亿美元。',
    source: 'OpenAI',
    sourceUrl: 'https://agilebrandguide.com/yesterdays-marketing-technology-ai-news-may-13-2026/',
    tags: ['#战略', '#竞争', '#发布'],
    accuracyScore: 90,
    timelinessScore: 92,
    utilityScore: 90,
    totalScore: 91,
    recommendReason: 'ChatGPT从工具变媒体，广告业务25亿→1000亿的路线图说明OpenAI正在构建完整的商业闭环。做AI产品商业化的PM应该研究ChatGPT Ads的变现模式——AI产品的"免费+广告"路线已经有人跑通了。',
    createdAt: '2026-05-14T02:00:00Z'
  },
  {
    id: '20260514-03',
    date: '2026-05-14',
    title: 'Manifold Security扩展供应链安全工具覆盖7700+MCP Server，填补Agent安全空白',
    summary: 'Manifold Security扩展Manifest工具至MCP Server安全评估，新增7700+MCP Server评分索引。每个Server获得Manifest Score（来源可信度+安全风险），检测prompt注入等行为风险。当前索引已超206,000项资产。MCP Server暴露HTTP端点、难以验证安全性的问题正在被解决。',
    source: '其他',
    sourceUrl: 'https://www.scworld.com/brief/manifold-security-expands-supply-chain-intelligence-to-cover-ai-agent-servers',
    tags: ['#安全', '#MCP', '#Agent'],
    accuracyScore: 92,
    timelinessScore: 90,
    utilityScore: 88,
    totalScore: 90,
    recommendReason: '7700+MCP Server的安全评估说明MCP生态已经大到需要专门的安全工具。企业级Agent产品如果使用第三方MCP Server，必须有安全评估流程。PM应该把MCP Server安全审查纳入产品合规检查清单。',
    createdAt: '2026-05-14T03:00:00Z'
  },
  {
    id: '20260514-04',
    date: '2026-05-14',
    title: 'xAI宣布5月15日退役多款旧版Grok模型，全面迁移至Grok 4.3',
    summary: 'xAI宣布5月15日12:00 PT退役grok-4-1-fast-reasoning、grok-4-fast-reasoning、grok-4-0709等模型，推荐迁移至Grok 4.3。Grok 4.3被描述为"史上最快最智能模型"，支持reasoning和non-reasoning两种模式。',
    source: '其他',
    sourceUrl: 'https://docs.x.ai/developers/migration/may-15-retirement',
    tags: ['#模型', '#更新'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 85,
    totalScore: 92,
    recommendReason: 'Grok 4.3全面替代旧版，API迁移窗口只有1天。使用xAI API的团队需要立即检查依赖并完成迁移。从PM视角看，AI模型供应商的迭代速度越来越快，产品架构必须设计好模型切换的抽象层。',
    createdAt: '2026-05-14T04:00:00Z'
  },
  {
    id: '20260514-05',
    date: '2026-05-14',
    title: 'Emberos推出Merchant：AI可见性优化工具，帮品牌在ChatGPT/Claude/Gemini中管理SKU曝光',
    summary: 'Emberos发布Merchant Agent，为品牌提供SKU级别的AI平台可见性优化。支持ChatGPT、Claude、Gemini、Perplexity等主流AI平台。标志着"AI可见性优化"（AIO）成为独立产品品类——当用户从搜索引擎转向AI助手获取推荐，品牌需要新的曝光管理工具。',
    source: '其他',
    sourceUrl: 'https://agilebrandguide.com/yesterdays-marketing-technology-ai-news-may-13-2026/',
    tags: ['#Agent', '#发布', '#企业应用'],
    accuracyScore: 88,
    timelinessScore: 90,
    utilityScore: 90,
    totalScore: 89,
    recommendReason: '"AI可见性优化"是一个全新的产品品类。当用户从Google搜索转向ChatGPT问推荐，传统的SEO工具就失效了。做电商或品牌营销的PM应该关注这个趋势——AI时代的"SEO"正在诞生。',
    createdAt: '2026-05-14T05:00:00Z'
  },
  // === 2026-05-13 (周二) ===
  {
    id: '20260513-01',
    date: '2026-05-13',
    title: 'Apple WWDC 2026前瞻：Siri全面重构、开放第三方AI模型、iOS 27多设备AI对齐',
    summary: 'WWDC 2026定于6月8-12日举办。预计发布iOS 27、更智能的Siri、更广泛的AI模型选项和macOS 27设计更新。Siri能否成为真正的AI助手是本次大会核心看点，被定义为Apple AI的"成败时刻"。',
    source: '其他',
    sourceUrl: 'https://www.techrepublic.com/article/news-apple-wwdc-2026-ios-27-siri-ai-preview/',
    tags: ['#Agent', '#战略'],
    accuracyScore: 85,
    timelinessScore: 90,
    utilityScore: 90,
    totalScore: 88,
    recommendReason: 'Apple WWDC是AI入场的年度最大窗口。如果Siri真的开放第三方AI模型，意味着iOS上的Agent入口将重新洗牌。做移动端AI产品的PM必须在6月前完成适配预案。',
    createdAt: '2026-05-13T01:00:00Z'
  },
  {
    id: '20260513-02',
    date: '2026-05-13',
    title: 'Gemini 3.2 Flash仍未正式发布：Google静默测试策略引发关注，I/O大会或正式公布',
    summary: 'Gemini 3.2 Flash自5月5日被用户在iOS和AI Studio发现后，Google至今未正式宣布。据称编码能力超Gemini 3.1 Pro，定价仅$0.25/百万token。Google I/O大会可能正式发布。',
    source: 'Google',
    sourceUrl: 'https://www.buildfastwithai.com/blogs/gemini-3-2-flash-release-2026',
    tags: ['#模型', '#发布'],
    accuracyScore: 88,
    timelinessScore: 85,
    utilityScore: 88,
    totalScore: 87,
    recommendReason: 'Google的"先泄露再发布"策略已成常态。Flash系列如果真比3.1 Pro还强且更便宜，API成本会大幅下降。现在就可以开始评估迁移路径，不用等I/O。',
    createdAt: '2026-05-13T02:00:00Z'
  },

  // === 2026-05-12 (周一) ===
  {
    id: '20260512-01',
    date: '2026-05-12',
    title: 'Anthropic洽谈300-500亿美元融资，估值高达9500亿美元，超越OpenAI',
    summary: '据NYT报道，Anthropic正洽谈300-500亿美元新融资，估值最高达9500亿美元，为3个月前3800亿估值的2.5倍。年化收入已达300亿美元，Dario称需求年化增速可达80倍。',
    source: 'Anthropic',
    sourceUrl: 'https://www.nytimes.com/2026/05/12/technology/anthropic-funding-950-billion-valuation.html',
    tags: ['#融资', '#战略'],
    accuracyScore: 90,
    timelinessScore: 95,
    utilityScore: 88,
    totalScore: 91,
    recommendReason: 'Anthropic估值3个月翻2.5倍超越OpenAI，说明Claude Code等企业产品收入爆发。选择AI供应商的PM应该关注：供应商的财务健康度直接影响API稳定性和长期支持。',
    createdAt: '2026-05-12T01:00:00Z'
  },
  {
    id: '20260512-02',
    date: '2026-05-12',
    title: 'Vapi完成5000万美元B轮融资：语音AI Agent基础设施平台，已支持超10亿次通话',
    summary: '语音AI Agent平台Vapi获5000万美元B轮（Peak XV领投），估值约5亿美元。平台连接AI模型与语音引擎，支持100万+开发者、270万+AI Agent、超10亿次通话。已部署于Amazon Ring。',
    source: '其他',
    sourceUrl: 'https://siliconangle.com/2026/05/12/vapi-nabs-50m-make-voice-ai-human/',
    tags: ['#Agent', '#融资'],
    accuracyScore: 92,
    timelinessScore: 92,
    utilityScore: 90,
    totalScore: 91,
    recommendReason: '语音Agent是下一个爆发点。10亿次通话说明语音AI已经过了验证期。做企业客服、销售自动化的PM应该评估Vapi这样的中间件平台，而不是自己从零搭建语音链路。',
    createdAt: '2026-05-12T02:00:00Z'
  },
  {
    id: '20260512-03',
    date: '2026-05-12',
    title: 'Judgment Labs获3200万美元融资：专注AI Agent模型基础设施和评估工具',
    summary: '旧金山初创公司Judgment Labs获3200万美元种子+A轮合并融资，为"Agent原生"公司提供AI Agent模型的基础设施。资金将用于招聘AI研究员和工程师扩展产品。',
    source: '其他',
    sourceUrl: 'https://techstartups.com/2026/05/12/top-startup-and-tech-funding-news-may-12-2025/',
    tags: ['#Agent', '#融资'],
    accuracyScore: 90,
    timelinessScore: 90,
    utilityScore: 85,
    totalScore: 88,
    recommendReason: 'Agent评估和监控工具正在形成独立赛道。当Agent产品规模化后，"怎么知道Agent做对了"会成为核心痛点。关注Agent质量管控的PM可以跟进这类工具。',
    createdAt: '2026-05-12T03:00:00Z'
  },

  // === 2026-05-11 (周日) ===
  {
    id: '20260511-01',
    date: '2026-05-11',
    title: 'Google报告：AI驱动的黑客攻击在3个月内从新兴威胁升级为工业级规模',
    summary: 'Google发布报告称，AI驱动的网络攻击仅用3个月就从初生问题演变为工业级威胁。犯罪集团和国家级行为者正利用商业化AI模型大规模扩展攻击，AI安全防御窗口期正在急剧缩短。',
    source: 'Google',
    sourceUrl: 'https://www.theguardian.com/technology/2026/may/11/ai-powered-hacking-industrial-scale-threat-three-months-google',
    tags: ['#安全', '#Agent'],
    accuracyScore: 95,
    timelinessScore: 92,
    utilityScore: 90,
    totalScore: 93,
    recommendReason: 'AI攻击工业化意味着AI安全产品从"可选"变"必选"。做企业安全或AI产品的PM应该把安全叙事从"合规"升级为"生存"——这是卖安全产品的最佳窗口期。',
    createdAt: '2026-05-11T01:00:00Z'
  },


  // === 2026-05-10 (周六) ===
  {
    id: '20260510-01',
    date: '2026-05-10',
    title: 'Anthropic签署18亿美元Akamai云计算协议，继SpaceX后持续扩大算力版图',
    summary: 'Anthropic与Akamai签署18亿美元计算协议，满足激增的AI软件需求。继SpaceX Colossus 1之后，Anthropic通过多云策略持续锁定算力资源，Akamai称其能确保CPU和GPU供应。',
    source: 'Anthropic',
    sourceUrl: 'https://www.reuters.com/business/anthropic-signs-18-billion-ai-cloud-deal-with-akamai-bloomberg-news-reports-2026-05-08/',
    tags: ['#算力', '#战略'],
    accuracyScore: 95,
    timelinessScore: 88,
    utilityScore: 85,
    totalScore: 90,
    recommendReason: '继SpaceX之后又签Akamai，Anthropic的算力焦虑肉眼可见。对用Claude API的团队是好事——容量越充足，限流越少。多云策略也意味着断线风险更低。',
    createdAt: '2026-05-10T01:00:00Z'
  },
  {
    id: '20260510-02',
    date: '2026-05-10',
    title: 'OpenAI推出ChatGPT"信任联系人"安全功能：检测自伤对话自动通知',
    summary: 'OpenAI为ChatGPT上线"Trusted Contact"功能。用户可指定一位信任联系人，当AI检测到自伤或自杀倾向的对话时，人工团队1小时内审核并通知。标志AI产品安全责任从被动响应转向主动干预。',
    source: 'OpenAI',
    sourceUrl: 'https://www.cnet.com/tech/services-and-software/openai-chatgpt-trusted-contact-feature/',
    tags: ['#安全', '#更新'],
    accuracyScore: 95,
    timelinessScore: 88,
    utilityScore: 85,
    totalScore: 90,
    recommendReason: 'AI产品安全从"免责声明"走向"主动干预"。做C端AI产品的PM应该关注这个模式——你的产品在极端场景下有没有类似的兜底机制？这会成为合规基线。',
    createdAt: '2026-05-10T02:00:00Z'
  },
  {
    id: '20260510-03',
    date: '2026-05-10',
    title: 'JPMorgan将AI投资从实验性R&D重新归类为核心基础设施，2026技术预算198亿美元',
    summary: '全球最大银行JPMorgan将20亿美元年度AI预算从"可 discretionary 创新"重新归类为与数据中心、支付系统并列的核心基础设施。2000人AI团队，AI每日扫描超10万亿美元交易。',
    source: '其他',
    sourceUrl: 'https://crypto.news/jpmorgan-makes-ai-core-infrastructure-spending/',
    tags: ['#企业应用', '#战略'],
    accuracyScore: 90,
    timelinessScore: 82,
    utilityScore: 90,
    totalScore: 88,
    recommendReason: '华尔街把AI从"实验"升级为"基础设施"，这是AI企业应用落地最强烈的信号。做B端AI产品的PM可以用这个案例说服决策层：AI不再是锦上添花，而是水电煤。',
    createdAt: '2026-05-10T03:00:00Z'
  },

  // === 2026-05-09 (周五) ===
  // === 2026-05-09 (周五) ===
  {
    id: '20260509-01',
    date: '2026-05-09',
    title: 'Google Chrome被曝静默安装4GB Gemini Nano模型，引发隐私争议',
    summary: 'Chrome浏览器被发现在未经用户同意的情况下静默下载4GB的Gemini Nano端侧AI模型。Google回应称已支持在设置中关闭和移除，资源不足时自动卸载。端侧AI部署的隐私边界问题浮出水面。',
    source: 'Google',
    sourceUrl: 'https://www.cnet.com/tech/services-and-software/chrome-installing-4gb-ai-model-gemini-nano/',
    tags: ['#安全', '#模型'],
    accuracyScore: 92,
    timelinessScore: 95,
    utilityScore: 88,
    totalScore: 92,
    recommendReason: '端侧AI部署首次引发大规模隐私争议。对PM来说，AI功能"默认开启"还是"用户选择"将成为产品设计的核心博弈点，直接影响用户信任和留存。',
    createdAt: '2026-05-09T01:00:00Z'
  },
  {
    id: '20260509-02',
    date: '2026-05-09',
    title: 'Microsoft Agent 365正式商用：跨云AI Agent治理平台，覆盖AWS和Google Cloud',
    summary: '微软Agent 365正式GA，提供统一控制平面来发现、治理和管控跨Microsoft、AWS和Google Cloud的AI Agent。含实时监控仪表盘、影子Agent检测拦截、合规审计等功能。已接入n8n等伙伴生态。',
    source: 'Microsoft',
    sourceUrl: 'https://futurumgroup.com/insights/microsoft-agent-365-turns-shadow-ai-into-a-governed-asset-class/',
    tags: ['#Agent', '#企业应用', '#发布'],
    accuracyScore: 95,
    timelinessScore: 92,
    utilityScore: 95,
    totalScore: 94,
    recommendReason: 'Agent治理从"可选项"变成"必选项"。微软抢先布局跨云Agent管控层，做企业AI产品的PM必须跟进——你的Agent能不能被Agent 365发现和管理，将成为企业采购的前提条件。',
    createdAt: '2026-05-09T02:00:00Z'
  },
  {
    id: '20260509-03',
    date: '2026-05-09',
    title: 'Apple WWDC 2026前瞻：Siri将变为独立App，向第三方AI提供商开放生态',
    summary: '据多方消息，Apple将在WWDC 2026上宣布Siri成为独立应用，并开放AI生态给外部提供商。iOS 27将带来Siri从语音助手向自主系统Agent的转型。WWDC 2026可能是Tim Cook最后一届Keynote。',
    source: '其他',
    sourceUrl: 'https://borncity.com/news/apple-wwdc-2026-siri-wird-zur-app-ki-revolution-bei-ios-27/',
    tags: ['#Agent', '#战略'],
    accuracyScore: 78,
    timelinessScore: 90,
    utilityScore: 90,
    totalScore: 85,
    recommendReason: 'Siri独立化+开放生态，意味着iOS上的AI Agent入口不再是Apple独占。做移动端AI产品的团队需要提前规划如何在Siri生态中占位，类似当年小程序抢占微信入口。',
    createdAt: '2026-05-09T03:00:00Z'
  },
  {
    id: '20260509-04',
    date: '2026-05-09',
    title: 'AMD发布Instinct MI350P：企业级AI推理加速卡，正面挑战NVIDIA',
    summary: 'AMD推出Instinct MI350P PCIe加速卡，定位企业AI推理和Agent工作负载。强调开放性、可扩展性和混合云一致性部署。多家合作伙伴（Nutanix等）已表态支持，为NVIDIA主导的AI算力市场提供替代选择。',
    source: '其他',
    sourceUrl: 'https://www.amd.com/en/products/accelerators/instinct.html',
    tags: ['#算力', '#发布'],
    accuracyScore: 95,
    timelinessScore: 88,
    utilityScore: 82,
    totalScore: 89,
    recommendReason: 'AI算力市场终于有了NVIDIA之外的成熟选项。MI350P主打推理场景，对做大规模Agent部署的团队来说是降低成本的好时机，可以开始评估AMD方案的TCO。',
    createdAt: '2026-05-09T04:00:00Z'
  },
  {
    id: '20260509-05',
    date: '2026-05-09',
    title: 'Anthropic开放安全工具：Mythos发现数万漏洞，推动AI安全从防御转向基建',
    summary: 'Anthropic在金融行业活动上披露Mythos安全模型的最新进展。该模型已发现近300个Firefox漏洞和数万其他系统漏洞。Anthropic提出"用AI重写更安全的代码"理念，将安全从补丁模式转向设计阶段。',
    source: 'Anthropic',
    sourceUrl: 'https://www.bankinfosecurity.com/anthropic-sounds-cyber-alarm-amid-financial-ai-push-a-31617',
    tags: ['#安全', '#Agent'],
    accuracyScore: 95,
    timelinessScore: 85,
    utilityScore: 88,
    totalScore: 90,
    recommendReason: 'AI安全从"发现问题"进化到"重写代码"。Anthropic的思路是让AI帮你把代码写得更安全，而不是等出问题再补。做企业级产品的PM应该把这个理念融入产品叙事。',
    createdAt: '2026-05-09T05:00:00Z'
  },

  // === 2026-05-08 (周四) ===
  {
    id: '20260508-01',
    date: '2026-05-08',
    title: 'Anthropic与SpaceX达成算力合作，Claude Code速率翻倍、取消高峰降速',
    summary: 'Anthropic宣布获得SpaceX Colossus 1超算全部算力（22万+GPU、300MW）。Claude Code五小时窗口限制翻倍，取消高峰降速，Opus API速率大幅提升。双方还探讨共建吉瓦级轨道算力。',
    source: 'Anthropic',
    sourceUrl: 'https://arstechnica.com/ai/2026/05/anthropic-raises-claude-code-usage-limits-credits-new-deal-with-spacex/',
    tags: ['#Agent', '#算力', '#更新'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 95,
    totalScore: 95,
    recommendReason: 'Claude Code速率翻倍即日生效，重度用户能直接感受到，轨道算力是长期故事。对PM来说，API限流松绑意味着Agent产品可以更激进地调用Claude。',
    createdAt: '2026-05-08T01:00:00Z'
  },
  {
    id: '20260508-02',
    date: '2026-05-08',
    title: 'Grok Connectors上线：深度集成Office/Notion/GitHub/Linear，支持BYO MCP',
    summary: 'SpaceXAI在Grok Web上线Connectors功能，端到端打通SharePoint、Outlook、Google Workspace、Notion、GitHub、Linear等工具，可读写编辑。同时推出"自带MCP"功能连接自定义服务。',
    source: '其他',
    sourceUrl: 'https://x.ai/news/grok-connectors',
    tags: ['#Agent', '#MCP', '#发布'],
    accuracyScore: 95,
    timelinessScore: 92,
    utilityScore: 95,
    totalScore: 94,
    recommendReason: 'Grok这波连接器把Office、GitHub和Notion全打通了，不是演示级挂接而是能直接读写编辑的真集成，外加开放自建MCP。做Agent产品的PM应该立刻试试。',
    createdAt: '2026-05-08T02:00:00Z'
  },
  {
    id: '20260508-03',
    date: '2026-05-08',
    title: 'xAI正式并入SpaceX，Grok和X统一归入SpaceXAI品牌',
    summary: '马斯克宣布xAI不再作为独立实体，Grok和X纳入SpaceX旗下SpaceXAI子品牌。xAI此前已获Anysphere（Cursor母公司）60亿美元收购权。AI与航天合流标志性事件。',
    source: '其他',
    sourceUrl: 'https://en.wikipedia.org/wiki/XAI_(company)',
    tags: ['#战略', '#竞争'],
    accuracyScore: 92,
    timelinessScore: 88,
    utilityScore: 88,
    totalScore: 90,
    recommendReason: 'AI公司并入航天集团史无前例，马斯克从AI参与者变成算力规则制定者。SpaceXAI这名字像PR操作，关键得看Grok团队是真融合还是换个招牌。',
    createdAt: '2026-05-08T02:30:00Z'
  },
  {
    id: '20260508-04',
    date: '2026-05-08',
    title: 'DeepSeek估值飙升至450亿美元，国家大基金主导首轮外部融资',
    summary: '国家集成电路产业投资基金正与DeepSeek洽谈主导首轮融资，投后估值约450亿美元。腾讯有意跟投，创始人梁文锋参与出资。标志国家队首次公开投资大模型公司。',
    source: '其他',
    sourceUrl: 'https://www.21jingji.com/article/20260507/herald/be3cf711cdfe8b63a1bdf39c21879cc6.html',
    tags: ['#融资', '#战略'],
    accuracyScore: 90,
    timelinessScore: 90,
    utilityScore: 90,
    totalScore: 90,
    recommendReason: '大基金第一次押注大模型就给了DeepSeek，等于官方把大模型升格为半导体级国家战略。对整个赛道是强心针，但其他玩家的融资故事恐怕得换个讲法了。',
    createdAt: '2026-05-08T03:00:00Z'
  },
  {
    id: '20260508-05',
    date: '2026-05-08',
    title: 'Microsoft开源Agent Framework（MAF）：支持Python+.NET的生产级多Agent框架',
    summary: '微软开源MAF框架，支持构建、编排和部署生产级AI Agent及多Agent工作流。含Agent Skills知识库构建、强化学习实验包，与Azure AI Foundry深度集成。',
    source: 'Microsoft',
    sourceUrl: 'https://github.com/microsoft/agent-framework',
    tags: ['#Agent', '#开源', '#发布'],
    accuracyScore: 95,
    timelinessScore: 90,
    utilityScore: 92,
    totalScore: 92,
    recommendReason: '微软把多Agent框架从Azure独占变为开源，Python+.NET双语言覆盖，做企业Agent的团队可以直接上手，不必从零搭建编排层。',
    createdAt: '2026-05-08T03:30:00Z'
  },
  {
    id: '20260508-06',
    date: '2026-05-08',
    title: 'Gemini 3.2 Flash泄露：现身iOS应用和AI Studio，编码能力超3.1 Pro',
    summary: 'Gemini 3.2 Flash被用户在iOS应用、AI Studio模型选择器和LM Arena基准测试中发现。报道称该轻量模型编码能力超越Gemini 3.1 Pro，成本更低。Polymarket押注近期正式发布。',
    source: 'Google',
    sourceUrl: 'https://polymarket.com/event/gemini-3pt2-released-by',
    tags: ['#模型', '#发布'],
    accuracyScore: 85,
    timelinessScore: 90,
    utilityScore: 88,
    totalScore: 87,
    recommendReason: 'Flash系列定位轻量高效，如果编码真超3.1 Pro，那API成本会大幅下降。做AI功能集成的PM可以提前评估迁移路径。',
    createdAt: '2026-05-08T04:00:00Z'
  },
  {
    id: '20260508-07',
    date: '2026-05-08',
    title: '豆包宣布收费引发价格战：DeepSeek 2.5折、千问补贴、元宝文心宣布免费',
    summary: '字节豆包5月4日上线三档付费（68-500元），引发竞品激烈反应。DeepSeek V4-Pro限时2.5折，千问推奶茶补贴活动，元宝和文心一言直接免费。日均Token消耗已达180万亿。',
    source: '字节',
    sourceUrl: 'https://www.tmtpost.com/7978796.html',
    tags: ['#竞争', '#战略'],
    accuracyScore: 92,
    timelinessScore: 85,
    utilityScore: 88,
    totalScore: 88,
    recommendReason: '免费时代结束的信号弹。豆包率先收费，竞品用补贴和免费反击，国内AI应用商业模式进入真刀真枪阶段。做AI产品的PM该思考自己的付费墙怎么设计了。',
    createdAt: '2026-05-08T04:30:00Z'
  },

  // === 2026-05-07 (周三) ===
  {
    id: '20260507-01',
    date: '2026-05-07',
    title: 'OpenAI发布GPT-5.5 Instant：更智能、更清晰、更个性化，ChatGPT和API同步上线',
    summary: 'OpenAI于5月5日发布GPT-5.5 Instant，定位为更快更个性化的轻量模型。与GPT-5.5 Pro互补，Instant版本主打低延迟和日常对话场景。已在ChatGPT和API中上线。',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/introducing-gpt-rosalind/',
    tags: ['#发布', '#模型'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 93,
    createdAt: '2026-05-07T01:00:00Z'
  },
  {
    id: '20260507-02',
    date: '2026-05-07',
    title: 'Altman考虑拆分OpenAI机器人/硬件部门为独立公司，聚焦AI软件核心',
    summary: '据媒体报道，Sam Altman正考虑将OpenAI的机器人与硬件部门拆分为独立公司，以便更聚焦于AI软件核心业务。此举或为IPO铺路，也反映AI公司"做减法"的趋势。',
    source: 'OpenAI',
    sourceUrl: 'https://www.bloomberg.com/news/articles/2026-05-05',
    tags: ['#战略', '#竞争'],
    accuracyScore: 88,
    timelinessScore: 90,
    utilityScore: 85,
    totalScore: 88,
    createdAt: '2026-05-07T01:30:00Z'
  },
  {
    id: '20260507-03',
    date: '2026-05-07',
    title: 'Anthropic进军华尔街：推出金融行业专用AI Agent，瞄准银行和投行场景',
    summary: 'Anthropic加速布局金融行业，推出针对银行和投行的AI Agent产品。据报道JPMorgan等华尔街机构已在对接。标志着AI Agent从开发者工具正式进入垂直行业深耕阶段。',
    source: 'Anthropic',
    sourceUrl: 'https://fortune.com/2026/05/05/anthropic-wall-street-ai-agents/',
    tags: ['#Agent', '#企业应用'],
    accuracyScore: 92,
    timelinessScore: 92,
    utilityScore: 92,
    totalScore: 92,
    createdAt: '2026-05-07T02:00:00Z'
  },


  {
    id: '20260506-01',
    date: '2026-05-06',
    title: 'Microsoft、Google、xAI同意向美国政府提前开放AI模型做安全审查',
    summary: '继白宫宣布考虑AI模型发布前审查后，Microsoft、Google和xAI已同意向美国政府提供新模型的早期访问权限用于国家安全测试。这一决定直接源于Anthropic Mythos模型暴露出的大量网络安全漏洞。',
    source: 'Microsoft',
    sourceUrl: 'https://www.reuters.com/legal/litigation/microsoft-xai-google-will-share-ai-models-with-us-govt-security-reviews-2026-05-05/',
    tags: ['#安全', '#战略'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 90,
    totalScore: 95,
    createdAt: '2026-05-06T01:00:00Z'
  },
  {
    id: '20260506-02',
    date: '2026-05-06',
    title: 'Anthropic CEO警告：Mythos发现数万安全漏洞，AI进入网络攻击"危险时刻"',
    summary: 'Dario Amodei公开警告AI已暴露数万个软件漏洞，创造了一个短暂的"危险窗口期"。软件公司、政府和银行必须在此期间修补漏洞，否则将面临大规模网络攻击风险。',
    source: 'Anthropic',
    sourceUrl: 'https://www.cnbc.com/2026/05/05/anthropic-ceo-cyber-moment-of-danger-mythos-vulnerabilities.html',
    tags: ['#安全', '#Agent'],
    accuracyScore: 95,
    timelinessScore: 100,
    utilityScore: 92,
    totalScore: 96,
    createdAt: '2026-05-06T01:30:00Z'
  },
  {
    id: '20260506-03',
    date: '2026-05-06',
    title: 'CopilotKit获$2700万A轮融资，帮助开发者构建应用内嵌AI Agent',
    summary: '西雅图初创公司CopilotKit完成$2700万A轮，由Glilot Capital、NFX和SignalFire领投。产品让开发者能在自有应用中快速集成AI Agent，降低AI功能开发门槛。',
    source: '其他',
    sourceUrl: 'https://techcrunch.com/2026/05/05/copilotkit-raises-27m-to-help-devs-deploy-app-native-ai-agents',
    tags: ['#Agent', '#融资', '#低代码'],
    accuracyScore: 92,
    timelinessScore: 95,
    utilityScore: 95,
    totalScore: 94,
    createdAt: '2026-05-06T02:00:00Z'
  },

  // === 2026-05-05 (周一) ===
  {
    id: '20260505-01',
    date: '2026-05-05',
    title: 'NYT：白宫拟对AI模型实施发布前审查，特朗普政府AI政策180度大转弯',
    summary: '纽约时报报道，此前坚持不干预AI的特朗普政府正在讨论在AI模型公开发布前进行政府审查。这一政策转向意味着美国可能效仿欧盟AI法案，对前沿模型施加监管。对AI产品发布节奏和合规成本影响深远。',
    source: '其他',
    sourceUrl: 'https://www.nytimes.com/2026/05/04/technology/trump-ai-models.html',
    tags: ['#安全', '#战略'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 93,
    createdAt: '2026-05-05T01:00:00Z'
  },
  {
    id: '20260505-02',
    date: '2026-05-05',
    title: 'Cisco $4亿收购AI安全初创Astrix，Anthropic参投公司获巨头背书',
    summary: 'Cisco以$4亿收购以色列AI安全公司Astrix。Astrix专注非人类身份和AI Agent安全风险，获Menlo Ventures和Anthropic投资。标志着AI Agent安全已成为企业刚需赛道。',
    source: '其他',
    sourceUrl: 'https://www.calcalistech.com/ctechnews/article/dy5obf581',
    tags: ['#安全', '#Agent', '#融资'],
    accuracyScore: 92,
    timelinessScore: 90,
    utilityScore: 88,
    totalScore: 90,
    createdAt: '2026-05-05T01:30:00Z'
  },


  // === 2026-05-04 (周日) ===
  {
    id: '20260504-01',
    date: '2026-05-04',
    title: '五角大楼签发机密AI合同：SpaceX、Google、OpenAI等8家中标，Anthropic仍被排除',
    summary: '美国国防部与8家AI公司签署机密合同，包括SpaceX、Google、OpenAI等。Anthropic因拒绝参与特定军事用途继续被排除在外，凸显AI公司与政府合作中的伦理分歧。',
    source: 'OpenAI',
    sourceUrl: 'https://orbitaltoday.com/2026/05/03/8-ai-companies-win-pentagon-classified-contracts-while-anthropic-remains-blacklisted/',
    tags: ['#战略', '#安全'],
    accuracyScore: 92,
    timelinessScore: 95,
    utilityScore: 90,
    totalScore: 92,
    createdAt: '2026-05-04T01:00:00Z'
  },
  {
    id: '20260504-02',
    date: '2026-05-04',
    title: 'NYT深度：DeepSeek开源模式成为中国AI软实力武器，已渗透伊朗印度等国选举系统',
    summary: '纽约时报报道DeepSeek的开源策略正在产生地缘政治影响。其模型被伊朗、印度等国用于选举相关应用，开源AI成为中国软实力输出的新载体。',
    source: '其他',
    sourceUrl: 'https://www.nytimes.com/2026/05/03/world/deepseek-china-ai-iran-india-elections.html',
    tags: ['#开源', '#战略'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 85,
    totalScore: 92,
    createdAt: '2026-05-04T01:30:00Z'
  },
  {
    id: '20260504-03',
    date: '2026-05-04',
    title: '中国法院里程碑裁决：不能以AI替代为由解除劳动合同，为AI时代用工确立先例',
    summary: '中国法院裁定企业不能以AI替代为由解雇员工，为AI替代人类工作设立了法律先例。这是全球首例AI替代劳动纠纷判决，对企业AI落地有重大影响。',
    source: '其他',
    sourceUrl: 'https://news.bitcoin.com/zh/zhong-guo-gong-ren-ying-de-ju-you-li-cheng-bei-yi-yi-de-ren-gong-zhi-neng-ti-dai-an-jian',
    tags: ['#企业应用', '#安全'],
    accuracyScore: 88,
    timelinessScore: 90,
    utilityScore: 92,
    totalScore: 90,
    createdAt: '2026-05-04T02:00:00Z'
  },


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
    source: 'Minimax',
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
  // === 2026-05-13 (周二) ===
  {
    id: '20260513-01',
    date: '2026-05-13',
    title: 'Anthropic洽谈$9500亿估值融资300-500亿，即将成为全球估值最高AI公司',
    summary: '据NYT报道，Anthropic正以约$9500亿估值洽谈$300-500亿新一轮融资。此前4月TechCrunch已报道$9000亿估值的$500亿融资意向。Anthropic估值28个月增长50倍，超越OpenAI的$8520亿，Claude Code和Mythos是增长双引擎。',
    source: 'Anthropic',
    sourceUrl: 'https://www.nytimes.com/2026/05/12/technology/anthropic-funding-950-billion-valuation.html',
    tags: ['#融资', '#战略'],
    accuracyScore: 97,
    timelinessScore: 95,
    utilityScore: 88,
    totalScore: 94,
    recommendReason: 'Anthropic从$380亿到$9500亿只用了3个月。对PM来说这不仅是融资新闻——Anthropic有足够弹药确保API服务稳定性，重度依赖Claude API的团队可以更放心地做长期产品规划。',
    createdAt: '2026-05-13T01:00:00Z'
  },
  {
    id: '20260513-02',
    date: '2026-05-13',
    title: 'Google警告：AI黑客三个月内从萌芽发展为工业级威胁，已拦截大规模利用事件',
    summary: 'Google发布报告称AI驱动的黑客攻击在三个月内从新兴问题升级为工业级威胁。Google已拦截一起黑客组织利用AI发现零日漏洞的大规模利用事件。即使没有Anthropic Mythos模型，攻击者也在快速采用AI发现未知漏洞。',
    source: 'Google',
    sourceUrl: 'https://www.theguardian.com/technology/2026/may/11/ai-powered-hacking-industrial-scale-threat-three-months-google',
    tags: ['#安全', '#Agent'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 92,
    totalScore: 94,
    recommendReason: 'AI安全攻防正式进入军备竞赛阶段。做AI产品的PM必须把安全审计列入产品路线图——不是有空再做，而是上线前提。特别是涉及用户数据的Agent产品，安全漏洞可能导致产品被监管叫停。',
    createdAt: '2026-05-13T02:00:00Z'
  },
  {
    id: '20260513-03',
    date: '2026-05-13',
    title: 'OpenAI向EU开放网络安全模型，Anthropic拒绝开放Mythos引发监管博弈',
    summary: 'OpenAI宣布向欧盟开放新网络安全模型。Anthropic则拒绝向EU发布Mythos，理由是担心被恶意利用。两家公司在AI安全与开放之间的策略分歧进一步公开化，EU AI法案8月生效前监管博弈加剧。',
    source: 'OpenAI',
    sourceUrl: 'https://www.cnbc.com/2026/05/11/openai-eu-cyber-model-anthropic-mythos-gpt.html',
    tags: ['#安全', '#竞争'],
    accuracyScore: 95,
    timelinessScore: 92,
    utilityScore: 90,
    totalScore: 92,
    recommendReason: 'AI公司的安全vs开放路线分歧正在影响区域市场策略。做全球产品的PM要注意：EU AI法案8月生效，你的AI功能在EU能不能用将直接影响国际化策略。Anthropic的保守意味着EU客户可能被迫选OpenAI。',
    createdAt: '2026-05-13T03:00:00Z'
  },
  {
    id: '20260513-04',
    date: '2026-05-13',
    title: 'NYT：中国追求AI自主削弱美芯片封锁效果，DeepSeek成国家战略标杆',
    summary: '纽约时报分析中国AI自主化进程正在削弱美国芯片封锁效果。DeepSeek成为标杆案例，在受限算力条件下仍持续推出有竞争力的大模型。中美AI差距缩小迫使双方重回谈判桌，Trump-Xi峰会将讨论AI安全议题。',
    source: '其他',
    sourceUrl: 'https://www.nytimes.com/2026/05/12/business/china-semiconductor-ai-deepseek.html',
    tags: ['#战略', '#竞争'],
    accuracyScore: 95,
    timelinessScore: 95,
    utilityScore: 85,
    totalScore: 92,
    recommendReason: '芯片封锁没挡住中国AI，反而催生了DeepSeek这种受限创新。对做AI产品的PM来说，全球AI供应链不是单选题——未来可能需要同时适配中美两套AI基础设施，产品架构要为多模型多区域做好准备。',
    createdAt: '2026-05-13T04:00:00Z'
  },
  {
    id: '20260513-05',
    date: '2026-05-13',
    title: '芯片期货市场诞生：AI算力需求催生半导体金融衍生品，交易员可押注芯片价格',
    summary: 'CNBC报道新的半导体期货市场即将上线，允许交易员对芯片价格进行对冲和投机。AI算力需求持续推高芯片成本，期货市场的出现标志着AI基础设施成本波动已达到需要金融工具管理的程度。',
    source: '其他',
    sourceUrl: 'https://www.cnbc.com/2026/05/12/new-futures-market-for-semiconductors-comes-as-ai-drives-costs-skyward.html',
    tags: ['#算力', '#战略'],
    accuracyScore: 92,
    timelinessScore: 92,
    utilityScore: 85,
    totalScore: 90,
    recommendReason: '芯片期货市场的出现说明AI算力成本波动已经大到需要金融工具对冲。做AI产品的PM要关注：如果你的产品严重依赖GPU推理成本，现在可以考虑用期货锁定长期成本，类似航空公司对冲燃油价格。',
    createdAt: '2026-05-13T05:00:00Z'
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
