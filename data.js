/* ============================================================
   AI 行业研究报告 · 数据层  v0.3
   作者：王艺雯 · Eve Wang · 2026年5月12日
   ============================================================ */
window.AI_DATA = {

  GR: "#D8D4CA",

  /* 端侧 AI 核心硬件规格基准（2026，旧版内容整合）*/
  hw_specs: [
    { name: "NPU 峰值算力",  value: "45+ TOPS",  fill: 85, unit: "旗舰标准",      color: "#1A1816" },
    { name: "LPDDR6 带宽",  value: "900 GB/s",  fill: 72, unit: "新一代标准",    color: "#2563EB" },
    { name: "内存容量",     value: "32 GB+",     fill: 65, unit: "旗舰普及率",    color: "#4A4743" },
    { name: "AI 能效比",    value: "12+ TOPS/W", fill: 78, unit: "车规目标",      color: "#E03D1E" },
    { name: "推理延迟",     value: "<20ms",      fill: 90, unit: "端侧 VLM 目标", color: "#059669" },
    { name: "LPDDR6 普及率",value: "65%",        fill: 65, unit: "2026 旗舰机型", color: "#8C8A86" }
  ],

  /* ═══════════════════════════════════════════════════════════
     SECTION 01 · 行业概览
  ═══════════════════════════════════════════════════════════ */

  /* 01 · 产业链架构（金字塔三层）*/
  pyramid_layers: [
    {
      id: "app",
      name: "应用层",
      en: "AI Applications",
      color: "#E03D1E",
      pct: 52,
      marketSize: "$680 亿",
      yoy: "+64%",
      categories: ["AI 编程助手", "多模态助手", "AI 搜索", "视频生成", "企业智能体"],
      examples: ["ChatGPT", "Cursor", "Perplexity", "可灵", "Manus"]
    },
    {
      id: "model",
      name: "基础大模型层",
      en: "Foundation Models",
      color: "#2563EB",
      pct: 76,
      marketSize: "$420 亿",
      yoy: "+89%",
      categories: ["闭源 LLM", "开源 LLM", "多模态模型", "推理模型", "领域垂直模型"],
      examples: ["GPT-4o", "Claude 3.7", "Llama 4", "DeepSeek R1", "Gemini 2.0"]
    },
    {
      id: "infra",
      name: "算力与基础设施",
      en: "AI Infrastructure",
      color: "#1A1816",
      pct: 100,
      marketSize: "$1,200 亿",
      yoy: "+52%",
      categories: ["AI 训练芯片", "推理加速器", "数据中心", "云 AI 平台", "网络互联"],
      examples: ["NVIDIA H200", "TSMC CoWoS", "AWS Trainium", "Google TPU v5", "NVLink 5"]
    }
  ],

  /* 02 · 核心技术词典（三维度 14 词） */
  glossary_dims: [
    {
      dim: "A",
      label: "认知底座",
      en: "Foundation",
      color: "#1A1816",
      desc: "AI 的大脑容量与核心科学逻辑",
      terms: [
        { term: "LLM",         full: "大语言模型",     en: "Large Language Model",
          def: "行业通用逻辑底座。基于 Transformer 架构、参数量 10B+ 的语言模型，通过海量文本预训练获得通用推理与理解能力。",
          key: "参数量 7B → 1T+（MoE 架构）" },
        { term: "Multimodal",  full: "多模态 AI",       en: "Multimodal AI",
          def: "解决感知边界，让 AI 具备视觉与听觉。同时处理文本、图像、音频、视频的统一模型，从「文字助手」到「通用感知」的跃迁。",
          key: "代表：GPT-4o · Gemini 2.0 Flash" },
        { term: "MoE",         full: "混合专家模型",   en: "Mixture of Experts",
          def: "提升能效比的关键。将大模型拆分为多个「小专家」子网络，每次推理仅激活少数专家，大幅降低训练与推理成本。",
          key: "DeepSeek V3：671B 总参数，激活 37B" },
        { term: "Token",       full: "词元",           en: "Token",
          def: "商业化成本与信息密度的基本单位。LLM 最小处理单元，约 3/4 个英文单词或 1.5 个汉字，是计算与计费的度量标准。",
          key: "GPT-4o 输入 $2.50 / 1M tokens" },
        { term: "Scaling Law", full: "规模法则",       en: "Scaling Law",
          def: "支撑行业持续投入算力的底层信仰。模型能力随算力、数据、参数量的增加而可预测地提升，为军备竞赛提供理论依据。",
          key: "OpenAI / Google 数百亿美元算力投入的核心依据" }
      ]
    },
    {
      dim: "B",
      label: "对齐与优化",
      en: "Alignment & Optimization",
      color: "#2563EB",
      desc: "AI 如何变聪明、变听话的工程手段",
      terms: [
        { term: "RLHF",         full: "人类反馈强化学习", en: "Reinforcement Learning from Human Feedback",
          def: "让 AI 的价值观与行为逻辑与人类对齐。通过人类对输出的偏好排序训练奖励模型——也是智驾「拟人化」行为的底层逻辑。",
          key: "ChatGPT 能力跃升的核心技术" },
        { term: "RAG",           full: "检索增强生成",   en: "Retrieval-Augmented Generation",
          def: "给 AI 挂载外部「百科全书」，解决知识截止和幻觉（Hallucination）问题，为实时、准确的行业知识提供支撑。",
          key: "企业知识库问答标配方案" },
        { term: "Vibe Coding",   full: "氛围编程",       en: "Vibe Coding",
          highlight: true,
          def: "编程民主化的体现。非技术人员通过自然语言与 AI 协作，快速实现业务逻辑交付——不需要「写代码」，只需要「讲清楚想要什么」。",
          key: "Cursor 月活超 3000 万，Vibe Coder 首超传统程序员" },
        { term: "SLM",           full: "小语言模型",     en: "Small Language Model",
          def: "行业转向端侧部署的必然路径。通过模型蒸馏将大模型能力压缩至手机、车载等低功耗设备可运行的规模，同等能力更低成本。",
          key: "Phi-3 Mini 3.8B ≈ GPT-3.5 能力，功耗 1/100" }
      ]
    },
    {
      dim: "C",
      label: "具身执行",
      en: "Physical Action",
      color: "#E03D1E",
      desc: "AI 进入物理世界、接管硬件实体",
      terms: [
        { term: "Edge AI",       full: "端侧 AI",         en: "Edge AI",
          def: "AI 本地化运行。在设备侧完成推理，解决云端方案的三大痛点：隐私泄露、网络延迟、断网失效。",
          key: "2026 年端侧 AI 芯片出货量预计超 20 亿颗" },
        { term: "ACC / LKA",     full: "自适应巡航 / 车道保持", en: "Adaptive Cruise Control / Lane Keep Assist",
          def: "具身智能的初级阶段——基础执行反射。感知单一信号并执行固定规则动作，是自动驾驶能力栈的最底层。",
          key: "L2 辅助驾驶全球渗透率已超 60%" },
        { term: "NOA",           full: "领航辅助驾驶",   en: "Navigate on Autopilot",
          def: "具身智能的进阶阶段——场景化决策。在高速或城区自主完成变道、超车、路口通过等复合动作，需实时环境建模。",
          key: "理想 NOA 城市脱手率 89%（上海早高峰）" },
        { term: "End-to-End",    full: "端到端",         en: "End-to-End",
          def: "智驾与机器人行业的架构终点。原始传感器数据直接输出底盘控制信号，消除中间模块割裂，MindVLA 即此架构。",
          key: "特斯拉 FSD v12 全面切换端到端架构（2024）" },
        { term: "World Model",   full: "世界模型",       en: "World Model",
          def: "AI 预测物理世界演变的能力。让 AI 在脑中「模拟」未来几秒的场景变化，是防御性驾驶与机器人操作规划的底层支撑。",
          key: "MindSim 以 1000× 速度在数字孪生中训练世界模型" }
      ]
    }
  ],
  glossary: [],

  /* 03 · 玩家图谱（三大阵营）*/
  player_camps: {
    "840": { camp: "巨头阵营", name: "美国",     players: ["OpenAI", "Google DeepMind", "Anthropic", "Meta AI", "Microsoft", "NVIDIA", "Amazon"] },
    "826": { camp: "巨头阵营", name: "英国",     players: ["DeepMind", "Wayve", "ARM"] },
    "250": { camp: "新锐力量", name: "法国",     players: ["Mistral AI", "H Company"] },
    "276": { camp: "新锐力量", name: "德国",     players: ["Aleph Alpha", "Helsing AI"] },
    "356": { camp: "新锐力量", name: "印度",     players: ["Sarvam AI", "Krutrim", "Ola AI"] },
    "392": { camp: "新锐力量", name: "日本",     players: ["Sakana AI", "SoftBank AI", "Toyota Research"] },
    "410": { camp: "新锐力量", name: "韩国",     players: ["Samsung AI", "NAVER HyperCLOVA"] },
    "682": { camp: "新锐力量", name: "沙特",     players: ["NEOM AI", "PIF AI Fund", "G42"] },
    "784": { camp: "新锐力量", name: "阿联酋",   players: ["TII Falcon", "G42 Cloud"] },
    "702": { camp: "新锐力量", name: "新加坡",   players: ["Sea AI Lab", "GovTech AI"] },
    "458": { camp: "新锐力量", name: "马来西亚", players: ["Microsoft SEA DC", "Petronas Digital"] },
    "156": { camp: "中国力量", name: "中国",     players: ["理想汽车", "华为", "DeepSeek", "百度", "阿里云", "腾讯混元", "宇树科技", "字节跳动"] },
    "158": { camp: "中国力量", name: "台湾",     players: ["TSMC AI 制造", "MediaTek Dimensity AI"] }
  },
  camp_colors: {
    "巨头阵营": "#1A1816",
    "新锐力量": "#2563EB",
    "中国力量": "#E03D1E"
  },
  camp_desc: {
    "巨头阵营": "科技巨头主导，掌控核心算力与顶尖模型研发",
    "新锐力量": "创业独角兽与主权 AI，构建区域本土生态",
    "中国力量": "具身智能与开源生态突破，打造独立 AI 体系"
  },

  /* 04 · 三大核心趋势 */
  trends: [
    {
      id: "scene",
      title: "场景为王",
      en: "Context is King",
      highlight: true,
      icon: "🎯",
      color: "#E03D1E",
      tagline: "技术红利已充分释放，谁拥有场景谁赢得未来",
      desc: "通用大模型竞争趋于同质化，真正的护城河转移至垂直场景的数据积累与工作流深度集成。医疗、法律、汽车、教育——深扎行业的 AI 产品将摘走大部分市场价值。",
      signals: [
        { label: "医疗 AI 企业融资规模", value: "$145亿（2025）", trend: "↑" },
        { label: "垂直场景留存率 vs 通用助手", value: "2.8×", trend: "↑" },
        { label: "行业垂直大模型数量", value: "1,200+", trend: "↑" }
      ]
    },
    {
      id: "vibe",
      title: "Vibe Coding",
      en: "Programming Democratization",
      highlight: true,
      icon: "⌨️",
      color: "#E03D1E",
      tagline: "编程民主化：AI 把键盘交还给所有人",
      desc: "Vibe Coding 重新定义「谁能做软件」。非技术背景创业者正在用 Cursor 和 Claude Code 构建真实可用的产品，传统程序员转型为 AI 编排师，效率提升 3–10×。这是自互联网以来最大的软件创作革命。",
      signals: [
        { label: "Cursor 月活跃用户", value: "3,000万+", trend: "↑" },
        { label: "Vibe Coder 人数 vs 传统程序员", value: "首次超越", trend: "↑" },
        { label: "AI 辅助代码占比（GitHub）", value: "62%", trend: "↑" }
      ]
    },
    {
      id: "physical",
      title: "Physical AI",
      en: "Embodied Intelligence",
      highlight: false,
      icon: "🤖",
      color: "#1A1816",
      tagline: "AI 走出屏幕，进入三维物理世界",
      desc: "世界模型让 AI 获得物理常识，自动驾驶端到端模型、人形机器人、AR 眼镜将通用智能落地为可触摸的产品。汽车成为最大的移动 AI 终端，理想、特斯拉引领具身智能量产化。",
      signals: [
        { label: "端到端自动驾驶新能源渗透率", value: "28%（2026 Q1）", trend: "↑" },
        { label: "人形机器人年出货量预测", value: "10万台+（2026）", trend: "↑" },
        { label: "全球 AI 眼镜出货量预测", value: "1,800万台（2026E）", trend: "↑" }
      ]
    }
  ],

  /* ─── 以下旧版 S01 数据已整合至 S02 或删除 ─── */
  /* (brand_data, supply_data, map_clusters, personas, penetration
     已替换为 pyramid_layers / glossary / player_camps / trends)  */


  /* ═══════════════════════════════════════════════════════════
     SECTION 02 · 赛道拆解
  ═══════════════════════════════════════════════════════════ */

  /* 01 · 端侧 AI：为什么是必然？ */
  edge_ai: {
    pain_points: [
      { icon: "💸", title: "云端推理成本",   color: "#E03D1E",
        desc: "GPT-4o 每百万 token 收费 $5，企业级日均百亿 token 调用成本高达 $50,000/天。用户量翻倍，成本线性增长，无法 Scale。" },
      { icon: "⏱️", title: "网络往返延迟",   color: "#D97706",
        desc: "云端 API 平均延迟 150–500ms。自动驾驶需要 <20ms 决策，实时语音交互需要 <50ms 响应——云端物理上做不到。" },
      { icon: "🔒", title: "数据隐私壁垒",   color: "#7C3AED",
        desc: "车内对话、医疗记录、企业机密无法合规上云。EU GDPR、中国《数据安全法》均对跨境数据传输设有严格限制。" },
      { icon: "📶", title: "网络连接依赖",   color: "#2563EB",
        desc: "隧道、地下车库、偏远地区信号差——云端 AI 随时断线。自动驾驶、工业机器人等场景必须离线可用。" }
    ],
    comparison: [
      { dim: "推理延迟",   cloud: "150–500ms", edge: "<20ms",         winner: "edge" },
      { dim: "边际成本",   cloud: "$2–75/1M tokens", edge: "≈$0（本地运行）", winner: "edge" },
      { dim: "数据隐私",   cloud: "数据上云处理",   edge: "本地全程处理",    winner: "edge" },
      { dim: "离线可用",   cloud: "断网即失效",     edge: "完全支持离线",    winner: "edge" },
      { dim: "模型更新",   cloud: "实时推送最新版", edge: "需 OTA 推送",     winner: "cloud" },
      { dim: "算力上限",   cloud: "弹性无上限",     edge: "受 SoC 制约",     winner: "cloud" }
    ]
  },

  /* 02 · 硬件铁三角：SoC · NPU · DDR */
  hw_components: [
    {
      id: "soc", name: "SoC", full: "片上系统", en: "System on Chip",
      icon: "🏭", color: "#1A1816",
      metaphor: "工厂厂长",
      metaphor_desc: "统筹 CPU、GPU、NPU、ISP、Modem 协同工作",
      desc: "将多个处理单元集成在单一芯片上，降低功耗与延迟。车规 SoC 与手机 SoC 在可靠性要求上相差 10 倍：需通过 AEC-Q100 Grade 0（-40°C ～ 150°C 全温区零失效）。",
      specs: [
        { k: "主流制程",  v: "4nm / 3nm（台积电）" },
        { k: "功耗包络",  v: "5–25W（车规场景）" },
        { k: "代表产品",  v: "骁龙 8 Elite · A18 Pro · 马赫 100" }
      ]
    },
    {
      id: "npu", name: "NPU", full: "神经处理单元", en: "Neural Processing Unit",
      icon: "⚡", color: "#E03D1E",
      metaphor: "大脑皮层",
      metaphor_desc: "专职执行矩阵乘法，AI 推理的真正主力",
      desc: "专为矩阵乘加（GEMM）优化的计算单元。相比 CPU 执行同等 AI 任务，NPU 能效高 10–50×。「TOPS（每秒万亿次运算）」是衡量端侧 AI 能力的第一指标，2026 旗舰标准为 45+ TOPS。",
      specs: [
        { k: "旗舰标准",  v: "45+ TOPS（2026 车规）" },
        { k: "能效目标",  v: "12+ TOPS/W（马赫 100 实测 12.8）" },
        { k: "核心运算",  v: "INT4 / INT8 矩阵乘加（GEMM）" }
      ]
    },
    {
      id: "ddr", name: "DDR 带宽", full: "内存带宽", en: "Memory Bandwidth",
      icon: "🚄", color: "#2563EB",
      metaphor: "运粮通道",
      metaphor_desc: "决定 NPU 实际速度的真正瓶颈",
      desc: "NPU 算力再强，内存带宽不足就会「算力空转」。LLM 推理的核心瓶颈不是算力，而是把模型权重从内存搬到 NPU 的速度——这就是「内存墙（Memory Wall）」。7B 参数模型 = 约 14GB 权重，需在 16ms 内完成搬运。",
      specs: [
        { k: "LPDDR6 带宽",  v: "900 GB/s（新一代标准）" },
        { k: "7B 模型搬运",  v: "14GB ÷ 900GB/s ≈ 15ms/次" },
        { k: "瓶颈所在",     v: "带宽 > 算力（推理场景）" }
      ]
    }
  ],

  /* 03 · 帕累托前沿 & 模型蒸馏 */
  pareto_new: {
    insight: "端侧 AI 的核心命题：不需要最大的模型，需要最适合硬件的「精炼模型」",
    distillation: [
      { step: 1, label: "教师模型",  icon: "🎓", color: "#1A1816",
        size: "100B+",  desc: "GPT-4o / Claude 3.7 等大模型生成高质量「软标签」训练数据" },
      { step: 2, label: "知识蒸馏",  icon: "⚗️", color: "#8C8A86",
        size: "→",      desc: "小模型学习大模型的「推理模式」，而非死记答案——关键在于软标签的概率分布" },
      { step: 3, label: "学生模型",  icon: "📚", color: "#2563EB",
        size: "7B–13B", desc: "参数量缩小 10–15×，特定场景精度保留 90%+，可在 SoC 上实时运行" },
      { step: 4, label: "量化压缩",  icon: "🗜️", color: "#E03D1E",
        size: "1B–4B",  desc: "INT4/INT8 量化再压缩 4–8×，模型体积从 14GB 降至 2GB，完全适配车规内存" }
    ],
    models: [
      { name: "Llama 3.2 1B",       latency: 3.2,  score: 49, platform: "端侧",    color: "#B8B5B0" },
      { name: "Phi-3 Mini 3.8B",    latency: 6.1,  score: 69, platform: "端侧",    color: "#8C8A86" },
      { name: "Qwen2.5-7B",         latency: 12.3, score: 74, platform: "端侧",    color: "#059669" },
      { name: "马赫100 · VLM 7B",   latency: 9.8,  score: 73, platform: "理想车载", color: "#E03D1E" },
      { name: "Gemma 2 9B",         latency: 14.2, score: 72, platform: "端侧",    color: "#A5A29D" },
      { name: "Phi-3 Medium 14B",   latency: 24.1, score: 78, platform: "混合",    color: "#7C3AED" },
      { name: "Llama 3.1 70B",      latency: 85.3, score: 84, platform: "云端",    color: "#4A4743" },
      { name: "DeepSeek V3 (671B)", latency: 42.5, score: 88, platform: "云端",    color: "#059669" },
      { name: "GPT-4o (API)",       latency: 65.2, score: 88, platform: "云端",    color: "#1A1816" },
      { name: "Claude 3.7 (API)",   latency: 55.8, score: 91, platform: "云端",    color: "#D97706" }
    ],
    frontier: [
      { latency: 3.2, score: 49 }, { latency: 6.1, score: 69 },
      { latency: 9.8, score: 73 }, { latency: 12.3, score: 74 },
      { latency: 24.1, score: 78 }, { latency: 42.5, score: 88 },
      { latency: 55.8, score: 91 }
    ],
    platform_colors: { "端侧":"#8C8A86", "理想车载":"#E03D1E", "混合":"#7C3AED", "云端":"#1A1816" }
  },

  /* 04 · 供应链的权力转移 */
  supply_shift: {
    phases: [
      { phase: "Phase 1", era: "2015–2020", title: "买芯片时代",
        icon: "🛒", color: "#B8B5B0",
        desc: "硬件厂商采购 NVIDIA / Qualcomm 现成芯片，AI 能力完全受制于上游芯片商的产品路线图与供货节奏。",
        power: "芯片厂商", bar: 20 },
      { phase: "Phase 2", era: "2020–2023", title: "软件优化时代",
        icon: "⚙️", color: "#2563EB",
        desc: "自研推理编译器、量化工具链、算子库（TensorRT / CoreML / MindIE），在相同芯片上榨取 2–3× 推理效率提升。",
        power: "软件平台方", bar: 45 },
      { phase: "Phase 3", era: "2023–2026", title: "软硬协同设计",
        icon: "🔗", color: "#E03D1E",
        desc: "芯片架构与模型算子协同设计——芯片「为模型而生」，而非模型「适配芯片」。Apple Silicon、Tesla FSD Chip、理想马赫 100 均采用此路径。",
        power: "垂直整合者", bar: 75 },
      { phase: "Phase 4", era: "2026+", title: "数据飞轮时代",
        icon: "🌀", color: "#1A1816",
        desc: "海量真实场景数据（理想的千万级行车数据、Apple 设备端数据）形成「数据飞轮」，持续迭代场景专属模型，护城河越来越深。",
        power: "场景数据拥有者", bar: 95 }
    ],
    players: [
      { name: "Apple",    chip: "M4 / A18 Pro",  strategy: "全栈消费电子垂直整合",       highlight: false },
      { name: "Tesla",    chip: "FSD Chip D2",   strategy: "自动驾驶训练+推理专用芯片",   highlight: false },
      { name: "Google",   chip: "TPU v5e",       strategy: "云端训练 + Pixel 端侧协同",   highlight: false },
      { name: "华为",     chip: "昇腾 910C",     strategy: "全国产算力生态闭环",           highlight: false },
      { name: "理想汽车", chip: "马赫 100",       strategy: "车规 AI 推理加速 · 软硬协同", highlight: true  }
    ]
  },

  /* ─── 旧版 S02 数据（competition / moore / chip_triangle）已被替换 ─── */
  _s2_old_: null,

  /* ─── 保留供 S02 雷达图备用 ─── */
  chip_triangle: {
    axes: ["NPU 算力", "内存带宽", "内存容量", "能效比", "车规可靠性"],
    chips: [
      { name: "NVIDIA H200",   color: "#1A1816", vals: [100, 88, 100, 45, 0] },
      { name: "骁龙 8 Elite",  color: "#4A4743", vals: [22,  30,  18, 80, 60] },
      { name: "马赫 100（理想）",color: "#E03D1E", vals: [42,  38,  24, 88, 100] }
    ]
  },

  /* (原 competition / moore / supply_cost 已废弃) */
  _dummy_s2_: null,

  /* ═══════════════════════════════════════════════════════════
     SECTION 03 · 行业未来
  ═══════════════════════════════════════════════════════════ */

  /* 01 · 硬件三梯队 */
  hw_tiers: [
    {
      tier: "第一梯队",
      badge: "T1",
      color: "#E03D1E",
      icon: "👓",
      title: "智能眼镜",
      subtitle: "AI 的第一视角入口",
      thesis: "AI 第一次拥有「眼睛」——视觉感知突破手机屏幕，进入真实物理世界。",
      examples: [
        { name: "Meta Ray-Ban", detail: "全球销量超 400 万副，月活用户 2600 万（2025 Q4）" },
        { name: "理想 MANA Glass", detail: "与 MindVLA 深度绑定，实时感知车内乘员状态" },
        { name: "Apple Vision Pro Gen2", detail: "空间计算 + 手眼协同，开发者生态爆发" }
      ],
      why: [
        "第一视角 = 最自然的感知接口，摄像头随眼球移动实时采集环境",
        "解放双手：无需触碰设备即可完成查询、识别、翻译、导航",
        "「增强」而非「替代」手机，用户无需改变已有行为习惯"
      ]
    },
    {
      tier: "第二梯队",
      badge: "T2",
      color: "#2563EB",
      icon: "🎧",
      title: "穿戴挂件",
      subtitle: "你的随身 Agent",
      thesis: "AI 耳机、AI 项链、AI 手环——随身设备成为 24h 个人 Agent 的感知节点。",
      examples: [
        { name: "Meta Orion 耳机", detail: "脑电波 + 语音多模态，意图识别准确率 91%" },
        { name: "Limitless Pendant", detail: "全天录音 + 实时摘要，私有化存储，不上传云端" },
        { name: "Samsung Galaxy Ring", detail: "健康数据 + AI 建议，持续学习用户生理节律" }
      ],
      why: [
        "始终佩戴 = 持续感知，AI 拥有连续的时间维度上下文",
        "超低功耗 NPU 使本地推理成为可能，隐私数据不出设备",
        "跨场景记忆：通勤中的对话可以在桌面上无缝续接"
      ]
    },
    {
      tier: "第三梯队",
      badge: "T3",
      color: "#059669",
      icon: "📱",
      title: "存量重塑",
      subtitle: "AI 手机与 AI PC",
      thesis: "60 亿台在网手机 + 20 亿台 PC 是最大的 AI 部署战场——存量市场的 AI 原生化改造。",
      examples: [
        { name: "Samsung Galaxy S25 Ultra", detail: "端侧 Gemini Nano，实时 AI 通话翻译，无需联网" },
        { name: "Apple iPhone 17 Pro", detail: "Apple Intelligence 全面落地，Siri 2.0 多步骤任务链" },
        { name: "Qualcomm Snapdragon X Elite", detail: "45 TOPS NPU，AI PC 市场份额 38%（2025）" }
      ],
      why: [
        "无需用户购买新设备，软件 OTA 即可激活 AI 能力，渗透率天花板最高",
        "手机厂商掌握最丰富的用户数据（位置/通话/消费），AI 个性化优势最强",
        "Killer App 尚未出现，但平台级 AI OS（iOS/Android）正在重写应用开发范式"
      ]
    }
  ],

  /* 02 · 失败教训 */
  failure_lessons: {
    headline: "不要试图取代手机，要增强感官",
    cases: [
      {
        product: "Rabbit R1",
        icon: "🐰",
        year: "2024",
        price: "$199",
        sold: "约 10 万台（退货率 >40%）",
        pitch: "一个会「操作所有 App」的独立 AI 设备，替代手机",
        failures: [
          "核心功能 LAM（大行动模型）延迟高达 8–12 秒，远超用户容忍阈值",
          "离开手机后失去 SIM 卡、通讯录、支付能力——根本无法独立生活",
          "App 操控依赖屏幕抓取（Screen Scraping），频繁 UI 更新后即崩溃",
          "定价 $199 vs. 免费的 ChatGPT App，价值主张根本无法成立"
        ],
        lesson: "用户不需要另一台「AI 设备」，他们需要现有设备变得更聪明。"
      },
      {
        product: "Humane AI Pin",
        icon: "📍",
        year: "2024",
        price: "$699 + $24/月",
        sold: "约 1 万台（已宣布停产）",
        pitch: "无屏幕投影 AI 伴侣，彻底取代手机通知中心",
        failures: [
          "激光投影在户外阳光下完全不可见，核心交互失效",
          "发热严重：持续使用 30 分钟后表面温度超过 45°C",
          "电池续航仅 2–3 小时，无法支撑全天使用场景",
          "所有功能均需联网，弱信号场景下形同虚设"
        ],
        lesson: "感官增强必须 0 摩擦——任何比拿手机更麻烦的操作都会被用户放弃。"
      }
    ],
    principles: [
      { icon: "🚫", bad: "试图取代手机",       good: "增强已有感官（眼/耳/记忆）" },
      { icon: "🚫", bad: "独立设备独立 App 生态", good: "寄生于手机/云的薄层感知节点" },
      { icon: "🚫", bad: "功能演示驱动产品定义", good: "真实日常痛点定义最小可行功能" },
      { icon: "🚫", bad: "延迟 > 3 秒的 AI 响应",  good: "本地推理 < 300ms，无感接入" }
    ]
  },

  /* 03 · 具身智能 · 物理常识 */
  physical_ai: {
    headline: "AI 如何开始理解「物理世界」",
    tagline: "从文字游戏到真实世界——AI 需要习得人类从 0 岁开始积累的物理直觉",
    concepts: [
      {
        icon: "💧", title: "流体直觉",
        example: "「水倒了会流到最低处，不会停在空中」",
        challenge: "LLM 能背诵流体力学公式，但早期机器人会把杯子倒过来然后困惑为什么水不见了。",
        solution: "通过数十亿次仿真环境中的物理引擎交互，AI 学习流体行为的统计规律。"
      },
      {
        icon: "💥", title: "刚体破坏",
        example: "「陶瓷杯碎了不能直接用手捡，玻璃碎片会划伤皮肤」",
        challenge: "具身 AI 必须理解材质属性、破坏模式与安全边界，否则无法在真实家庭场景中工作。",
        solution: "MindSim 等仿真器加入材质破坏物理引擎，机器人在虚拟世界打碎数百万个杯子后习得规律。"
      },
      {
        icon: "🧊", title: "支撑与重力",
        example: "「堆高的积木如果底部被抽走会整体倒塌」",
        challenge: "早期机器人手臂在收拾桌面时会随机移除物体，而不考虑支撑关系，导致连锁坍塌。",
        solution: "引入拓扑感知规划（Topological Scene Understanding），AI 先构建支撑图再决定操作顺序。"
      },
      {
        icon: "🌡️", title: "温度与危险",
        example: "「锅上的烟代表热，热的东西不能用手碰」",
        challenge: "视觉信号（烟/颜色/质地）到危险判断的映射，对 LLM 容易但对缺乏具身经历的机器人极难。",
        solution: "多模态传感器（热成像 + 视觉）融合，VLA 模型学习视觉-温度-行动的联合表征。"
      }
    ],
    progress: [
      { stage: "语言理解", desc: "知道「水往低处流」", done: true },
      { stage: "视觉感知", desc: "看到水在流", done: true },
      { stage: "物理预测", desc: "预判水会流到哪", done: true },
      { stage: "因果干预", desc: "用什么挡住水", done: false },
      { stage: "泛化推理", desc: "从水推广到所有流体", done: false }
    ]
  },

  /* 04 · 工业现场 */
  robot_field: {
    headline: "机器人的「实习」现场",
    tagline: "从实验室到工厂——具身智能的第一个十年是在真实场景中犯错、修正、进化",
    players: [
      {
        name: "Tesla Optimus",
        country: "🇺🇸",
        gen: "Gen 2",
        color: "#E03D1E",
        status: "量产部署",
        factory: "弗里蒙特工厂",
        task: "电池模块分拣 + 零件转运",
        daily_hours: "16h/天",
        fleet: "1000+ 台在线",
        highlight: "自监督学习：看人操作 3 次即可模仿新任务",
        weakness: "复杂双手协作任务（如电缆插拔）错误率仍达 12%",
        quote: "我们不是在制造机器人，我们是在制造最便宜的劳动力。 —— Elon Musk, 2025"
      },
      {
        name: "宇树 H1 Pro",
        country: "🇨🇳",
        gen: "2025",
        color: "#2563EB",
        status: "商业化试点",
        factory: "比亚迪深圳工厂",
        task: "车身焊接辅助 + 质检巡逻",
        daily_hours: "12h/天",
        fleet: "200+ 台在线",
        highlight: "国内最快量产速度：从研发到工厂部署仅 18 个月",
        weakness: "电池续航 4 小时，需多次换电，影响连续作业",
        quote: "中国机器人赛道的终点不是代替流水线工人，而是让中国工厂对外资零依赖。"
      },
      {
        name: "智元 远征 A2",
        country: "🇨🇳",
        gen: "2025",
        color: "#7C3AED",
        status: "小规模试点",
        factory: "上汽集团总装线",
        task: "座椅安装 + 内饰件装配",
        daily_hours: "8h/天",
        fleet: "50 台在线",
        highlight: "全国产化：算法/芯片/传动系统全链路自主可控",
        weakness: "操作速度比人工慢 40%，暂不具备经济性",
        quote: "当前阶段的核心不是取代人，而是积累真实场景数据，训练下一代模型。"
      }
    ]
  },


  /* ═══════════════════════════════════════════════════════════
     SECTION 04 · 理想汽车：具身智能先行者
  ═══════════════════════════════════════════════════════════ */

  /* 01 · 战略里程碑 */
  lx_milestones: [
    { year: "2015", title: "理想汽车创立",       type: "founding", color: "#8C8A86",
      desc: "李想以增程式电动为突破口，绕开纯电续航痛点，定位家庭智能出行。" },
    { year: "2019", title: "理想 ONE 发布",       type: "product",  color: "#4A4743",
      desc: "首款增程 SUV，六座家庭空间 + 车载大屏，首月订单破万。「场景定义产品」战略初成。" },
    { year: "2020", title: "纳斯达克上市",        type: "milestone",color: "#2563EB",
      desc: "最快盈利的中国新势力，上市首日市值超百亿美元，验证「家庭 AI 空间」商业逻辑。" },
    { year: "2022", title: "L9 / L8 / L7 矩阵", type: "product",  color: "#4A4743",
      desc: "三款 SUV 覆盖 20–35 万区间，月销突破 2 万辆，家庭智能座舱成核心差异化。" },
    { year: "2023", title: "MEGA 纯电旗舰",       type: "product",  color: "#4A4743",
      desc: "800V 高压 + 5C 超快充，12 分钟补能 80%，彻底解决「续航焦虑」物理前提。" },
    { year: "2024", title: "MindVLA 发布",        type: "ai",       color: "#E03D1E",
      desc: "端到端 VLA 模型上线，城市 NOA 脱手率 89%，具身智能从实验室走入量产车。" },
    { year: "2025", title: "马赫 100 量产",       type: "chip",     color: "#E03D1E",
      desc: "自研 5nm 车规 AI 推理芯片流片，软硬协同设计闭环，摆脱算力供应链依赖。" },
    { year: "2026+", title: "空间 Agent 元年",    type: "future",   color: "#1A1816",
      desc: "从驾驶助手到懂全家人的「AI 管家」，理想的第二成长曲线正式开启。" }
  ],
  milestone_type_colors: {
    founding: "#8C8A86", product: "#4A4743", milestone: "#2563EB",
    ai: "#E03D1E", chip: "#E03D1E", future: "#1A1816"
  },

  /* 02 · 空间 Agent */
  lx_space_agent: {
    tagline: "车不是交通工具，而是最大的移动 AI 硬件",
    evolution: [
      { phase: "1.0", icon: "🗺️", label: "导航驾驶",   desc: "A → B，自动驾驶点对点，解放双手" },
      { phase: "2.0", icon: "💬", label: "座舱交互",   desc: "语音指令、娱乐控制、多屏联动" },
      { phase: "3.0", icon: "👁️", label: "空间感知",   desc: "摄像头理解车内外三维空间与乘员状态" },
      { phase: "4.0", icon: "🏠", label: "家庭 AI 管家", desc: "理解每位家庭成员，主动服务，记忆偏好" }
    ],
    capabilities: [
      { icon: "👨‍👩‍👧", title: "家庭成员识别",
        desc: "视觉 + 声纹识别车内每位成员，记住座位偏好、情绪状态、历史行为，实现「认人」级个性化服务。" },
      { icon: "🧠", title: "主动意图推断",
        desc: "从「我有点冷」自动推断并执行调温，从「有点困」主动提醒休息——无需明确指令，AI 理解潜台词。" },
      { icon: "🔊", title: "多声场协同分配",
        desc: "主驾导航独立声场、副驾娱乐独立声场、二排儿童内容独立声场，一车多人各得其所。" },
      { icon: "🛣️", title: "全场景 NOA",
        desc: "城市 + 高速 + 泊车三段 NOA 无缝衔接，实现「车位到车位」全程接管，驾驶者角色从操作者变为监督者。" }
    ]
  },

  /* 03 · MindVLA 核心底座 */
  lx_mindvla: {
    headline: "理想的「通用 AI 大脑」：Vision · Language · Action",
    tagline: "与传统自动驾驶最大的区别：MindVLA 引入了「认知能力」和「常识推理」，让车真正像人一样思考。",
    vs_traditional: {
      label_old: "传统方案",
      label_new: "MindVLA",
      old: ["感知 → 规控两段式", "依赖高精地图", "只识别标准交通标志", "规则驱动决策"],
      new: ["感知 → 语义 → 行动端到端", "Mapless 无图导航", "理解施工标语 / 交警手势", "数据驱动 + 防御性驾驶"]
    },
    modules: [
      { id: "vision", name: "V · 视觉", en: "3D Vision Transformer",
        icon: "👁️", color: "#2563EB",
        headline: "不再只是「看车道线」",
        desc: "基于 3D ViT 架构，将多路摄像头流融合为三维空间特征图。不再是 2D 像素识别，而是直接理解空间中物体的几何位置、距离关系与动态变化——就像人类看世界的方式。" },
      { id: "language", name: "L · 语言", en: "Large Language Model Core",
        icon: "🧠", color: "#7C3AED",
        headline: "能读懂「临时施工」和模糊指令",
        desc: "引入大语言模型的常识推理能力。不仅能识别红绿灯，还能看懂复杂的临时施工标语、理解交警手势，甚至能执行「前面那个路口稍微靠右停一下」这种模糊自然语言指令。" },
      { id: "action", name: "A · 行动", en: "End-to-End Action Decoder",
        icon: "⚡", color: "#E03D1E",
        headline: "从感知到方向盘，一条链路",
        desc: "将视觉理解和语义指令直接解码为底盘控制信号（转向角 + 加速度曲线），实现感知到执行的端到端闭环。「丝滑感」的本质：高置信度决策 + 连续控制无缝衔接。" }
    ],
    core_insight: "MindVLA 让车具备了「像人一样思考」的能力。它通过对百万量级真实驾驶数据的学习，掌握了「防御性驾驶」等拟人化逻辑，彻底摆脱对高精地图的依赖。",
    benchmarks: [
      { metric: "城市 NOA 脱手率",  value: "89%",   context: "上海城区早高峰实测" },
      { metric: "复杂路口通过率",   value: "97.3%", context: "无保护左转场景" },
      { metric: "泊车定位精度",     value: "<5cm",  context: "APA 末端定位误差" },
      { metric: "非机动车避让成功率", value: "99.1%", context: "电动自行车混行场景" }
    ]
  },

  /* 04 · 马赫 100 + L9 Livis */
  lx_mach100: {
    headline: "编排式数据流架构：为什么「买芯片」不够",
    arch_contrast: {
      title: "冯·诺依曼 vs 数据流",
      old_name: "传统 CPU/GPU",
      new_name: "M100 数据流",
      old_desc: "计算过程需不断从 Cache/Memory 搬运数据，产生「存储墙」瓶颈——巨大的功耗与延迟",
      new_desc: "数据像水流一样直接在 TPB 计算单元间流动，编译器提前规划路线，数据到达即触发计算"
    },
    dataflow_features: [
      { icon: "💧", title: "去缓存化（Cache-less）",
        desc: "极大减少多级缓存。数据直接在各 TPB（张量处理块）之间流动，消除冗余搬运，彻底打破「存储墙」。" },
      { icon: "🗓️", title: "编译器编排",
        desc: "通过软硬协同，让编译器提前规划好数据在芯片内部的「运动路线」和执行时间，避免等待和空转。" },
      { icon: "⚡", title: "计算驱动",
        desc: "不是由指令驱动，而是由数据流动触发计算。当数据流到某计算单元时该单元才工作，效率极高。" }
    ],
    specs: [
      { k: "制程工艺",   v: "台积电 5nm" },
      { k: "单片算力",   v: "1280 TOPS" },
      { k: "端到端延迟", v: "较通用方案降低 40%" },
      { k: "功耗架构",   v: "车规低功耗封装" },
      { k: "安全认证",   v: "ASIL-D · AEC-Q100 G0" },
      { k: "架构类型",   v: "编排式数据流（ODA）" }
    ],
    livis: {
      name: "理想 L9 · Livis 方案",
      config: "双 M100 主计算",
      total_tops: "2560 TOPS",
      tops_label: "双片联动总算力",
      highlights: [
        "支撑万亿级参数模型的车端实时推理",
        "端到端自动驾驶 + 智能座舱双路并行",
        "毫秒级低延迟响应，单卡失效自动接管"
      ]
    },
    synergy: {
      title: "软硬一体：MindVLA × M100 的本质级护城河",
      mindvla_role: "解决「怎么想」——从感知到行动的智能上限",
      m100_role: "解决「跑得动」——编排式数据流打通算力瓶颈",
      conclusion: "这种软硬一体化自研，正是理想相比于「买现成方案」的公司，在成本、功耗和用户体验上构建的本质级护城河。"
    }
  },

  /* 05 · MindSim 进化闭环 */
  lx_mindsim: {
    headline: "模拟即生产：在虚拟世界跑完几亿公里",
    tagline: "真实训练数据永远不够——MindSim 用 1000× 速度在数字孪生中创造训练数据",
    steps: [
      { step: "01", icon: "🌍", title: "真实场景重建",
        desc: "基于量产车队激光雷达 + 摄像头采集数据，使用 NeRF / 3D 高斯泼溅技术重建厘米级精度数字孪生场景。" },
      { step: "02", icon: "🤖", title: "AI 自主强化学习",
        desc: "MindVLA 在仿真环境中以 1000× 真实速度自主探索，毫秒内完成数千次「碰撞-修正」迭代，习得复杂博弈策略。" },
      { step: "03", icon: "🎲", title: "Domain Randomization",
        desc: "随机化光照、天气、传感器噪声、行人行为模式，系统性消除 Sim-to-Real Gap，确保策略在现实世界充分泛化。" },
      { step: "04", icon: "📡", title: "车队数据飞轮",
        desc: "50 万+ 量产车每日回传「角落案例」片段，自动触发仿真器生成 100× 同类场景增广数据，飞轮越转越快。" },
      { step: "05", icon: "🚀", title: "OTA 快速验证推送",
        desc: "新策略在虚拟车队完成 1 亿公里等效验证后 OTA 推送，硬件迭代周期从 36 个月压缩至 6 个月。" }
    ],
    stats: [
      { label: "仿真 vs 真实里程",   value: "1000 : 1" },
      { label: "角落案例增广倍数",   value: "100 ×" },
      { label: "OTA 迭代周期",       value: "6 个月" },
      { label: "量产车队规模",        value: "50 万+" }
    ]
  },

  /* ═══════════════════════════════════════════════════════════
     SECTION 05 · 试乘体验反馈（理想 i6 · 2026年5月）
  ═══════════════════════════════════════════════════════════ */

  /* 01 · 用户画像 */
  reviewer_profile: {
    tags: [
      { label: "性别",   value: "女" },
      { label: "年龄",   value: "30+" },
      { label: "通勤",   value: "城市通勤" },
      { label: "驾龄",   value: "10 年以上" },
      { label: "现有车型", value: "Tesla Model Y" },
      { label: "驾驶频率", value: "较少驾驶" },
      { label: "路况偏好", value: "复杂路况焦虑" },
      { label: "AI 了解度", value: "了解辅助驾驶 & 车机交互" }
    ],
    conclusion: "智驾增量用户",
    conclusion_desc: "并非「赛道爱好者」，而是被智驾降低焦虑、提升安全感所吸引的城市日常用户——正是 NOA 渗透率提升的核心增量市场。",
    pain_points: [
      { icon: "😰", text: "复杂路况（密集车流、非机动车混行）焦虑" },
      { icon: "📱", text: "驾驶时无法同时处理导航与车内互动" },
      { icon: "🔋", text: "传统 SUV 续航焦虑，依赖固定充电桩" }
    ]
  },

  /* 02 · 试乘亮点 */
  trial_highlights: [
    {
      id: "conversion",
      icon: "📍",
      color: "#2563EB",
      title: "高效到店转化",
      subtitle: "高德搜索 → 呼叫中心 → 快速对接销售",
      desc: "从高德地图直接触发呼叫中心，销售快速接入并安排试乘，显著缩短了用户从「产生意图」到「触达实车」的链路。相比传统 4S 店预约流程，感知摩擦大幅降低。",
      insight: "全链路漏斗优化：理想将流量入口前置到地图 App，把「搜索意图」直接转化为到店行为。"
    },
    {
      id: "hud",
      icon: "🔆",
      color: "#E03D1E",
      title: "AR HUD 体验",
      subtitle: "高亮度 · 显示清晰 · 视线不离路面",
      desc: "HUD 亮度在白天阳光直射下仍清晰可辨，导航路线、速度、智驾状态实时叠加在路面视野上，驾驶员无需低头看中控屏。这是智驾时代最自然的人机交互界面。",
      insight: "AR HUD 并非装饰，而是虚实结合的感知接口——它让驾驶员的注意力始终锁定在物理世界，而不是屏幕。"
    },
    {
      id: "adas",
      icon: "🚗",
      color: "#E03D1E",
      title: "智驾拟人化",
      subtitle: "车位到车位 · 复杂路况避让 · 丝滑变道",
      desc: "全程 NOA 接管：从停车场出发，全程自动导航至目的地停车。面对非机动车、行人加塞等复杂博弈场景，决策平滑自然，没有传统 ADAS 常见的「急刹感」。变道时机的把握接近「老司机」预判。",
      insight: "「丝滑」是 AI 模型高置信度的感知表现——理想 MindVLA 在物理世界实现了「慢思考 → 流畅执行」的体验闭环。"
    },
    {
      id: "audio",
      icon: "🔊",
      color: "#7C3AED",
      title: "主驾导航独立声场",
      subtitle: "主驾侧定向音响播报导航，不干扰乘客",
      desc: "导航语音通过主驾枕侧/前侧定向音响定向播报，乘客座位几乎听不到——车内音乐正常播放，导航不再「打断」乘客体验。这是一个典型的「场景定义产品」案例。",
      insight: "计算音频的降维打击：一个硬件细节解决了家庭多人出行时「导航信息流 vs 娱乐音乐流」的长期矛盾。"
    }
  ],

  /* 03 · 理想 i8 / i6 vs Tesla Model Y 对比 */
  comparison_table: {
    note: "综合两次体验：理想 i8（产品规格）与理想 i6（实际试乘），对比 Tesla Model Y 现状",
    dims: [
      {
        dim: "空间设计逻辑",
        tesla: { val: "极简工具思维", detail: "冷色调、极简内饰（俗称「毛坯房」），侧重性能与驾驶者控制感。" },
        lixiang: { val: "温馨起居室思维", detail: "暖色调软包、精致收纳，侧重全家人的「居住感」和情感溢价。" },
        insight: { title: "从「车」到「家」", detail: "理想成功将汽车从单纯的交通工具转变为移动的第三空间，降低了非高频驾驶者的心理距离。" }
      },
      {
        dim: "交互边界感",
        tesla: { val: "单一集成中心", detail: "几乎所有功能集成在中央大屏，副驾无专属娱乐权。" },
        lixiang: { val: "平权交互架构", detail: "主副驾独立大屏 + 高清 HUD，信息流按需分配。" },
        insight: { title: "交互主权的分割", detail: "理想的「屏幕哲学」本质是服务的精细化，通过硬件布局解决了多人出行时的需求冲突。" }
      },
      {
        dim: "声场处理",
        tesla: { val: "全局播报", detail: "导航会中断或降低音乐音量，全车同步接收。" },
        lixiang: { val: "主驾独立声场", detail: "主驾枕侧 / 前侧定向音响播报导航，不干扰乘客。" },
        insight: { title: "计算音频的降维打击", detail: "这是典型的「场景定义产品」案例——解决了家庭成员对信息流（导航）与娱乐流（音乐）的互斥痛点。" }
      },
      {
        dim: "智驾体感",
        tesla: { val: "技术硬核但略显激进", detail: "操控精准，但对非专业司机有一定压迫感，刹车介入感明显。" },
        lixiang: { val: "类人丝滑（MindVLA）", detail: "避让行人与变道极其柔和，具备「老司机」式预判感。" },
        insight: { title: "信任感的建立", detail: "对不常开车的用户，智驾的「丝滑感」比「极限性能」更重要——这是 AI 模型走向普适化的关键。" }
      },
      {
        dim: "上手门槛",
        tesla: { val: "学习曲线", detail: "需要适应怀挡、屏幕控制开关等非常规操作，初次上手需适应期。" },
        lixiang: { val: "零压力接管", detail: "极高清晰度的 AR HUD 让视线始终在路面，降低了驾驶焦虑，智驾接管感知自然。" },
        insight: { title: "AR HUD 的战略价值", detail: "HUD 并非装饰，而是虚实结合的感知接口——智驾时代最安全、最高效的信息交互媒介。" }
      },
      {
        dim: "家庭角色照顾",
        tesla: { val: "驾驶者导向", detail: "后排 / 副驾体验相对单一，产品重心在驾驶者。" },
        lixiang: { val: "全员平权", detail: "副驾屏、二排舒适性、独立音响——全家人都是产品的第一用户。" },
        insight: { title: "成员关系管理", detail: "理想在做「成员关系管理」，而不仅仅是「驾驶工具」——这使其在家庭购车决策中拥有结构性优势。" }
      },
      {
        dim: "补能与效率",
        tesla: { val: "依赖 Supercharger", detail: "充电网络密集但依赖专属桩，峰值功率 250kW（V3）。" },
        lixiang: { val: "5C 超快充", detail: "配合 800V 高压平台，5C 倍率充电 12 分钟补能 80%。" },
        insight: { title: "续航焦虑的物理解", detail: "5C 技术是纯电 SUV 跨越「续航焦虑」红线的物理前提——让充电时间接近加油体验。" }
      }
    ]
  }

}; // END AI_DATA
