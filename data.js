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
    /* NOTE: ordered top → bottom visually: app (apex) → model → infra (base) */
    {
      id: "app",
      name: "应用层",
      en: "AI Applications",
      color: "#E03D1E",
      bracket_items: [
        { name: "智能眼镜", icon: "👓",
          players: [
            { name: "Meta",      product: "Ray-Ban Meta Smart Glasses", desc: "全球最畅销 AI 眼镜，内置 Llama 语音助手，月销超 100 万副，是 AI 硬件首个真正意义上的大众消费品。" },
            { name: "Apple",     product: "Vision Pro",                 desc: "空间计算旗舰，visionOS 生态初步成型，是头显形态下 AI 交互的实验场，定价 $3499 面向专业市场。" },
            { name: "Google",    product: "Android XR Glasses",         desc: "基于 Gemini 的 AI 眼镜，实时翻译、导航叠加，目标 2026 年以消费级价格推向大众市场。" },
            { name: "雷鸟创新",  product: "Air3 Pro",                   desc: "国内 AR 眼镜领先者，双目全彩波导方案，接入大模型实现实时信息叠加，消费电子性价比路线。" },
            { name: "VITURE",    product: "One XR Glasses",             desc: "专注移动大屏场景，支持 1080p 虚拟屏幕与手机直连，轻量化设计与游戏、观影场景深度绑定。" },
            { name: "Rokid",     product: "AR Lite / Station 2",        desc: "国内 AR 眼镜量产先行者，与 YunOS 深度结合，企业端与工业巡检是核心市场。" },
            { name: "XREAL",     product: "Air 2 Ultra",                desc: "全球出货量最大的消费级 AR 眼镜之一，支持空间计算与 6DoF 追踪，开发者生态最活跃的 AR 平台。" }
          ]
        },
        { name: "汽车", icon: "🚗",
          players: [
            { name: "Tesla",      product: "FSD V12 / Cybercab",         desc: "全球端到端自动驾驶先行者，V12 版本删除全部规则代码，纯神经网络接管驾驶，Robotaxi 商业化启动。" },
            { name: "理想汽车",   product: "MindVLA 全场景 NOA",          desc: "城市+高速+泊车端到端统一架构，上海早高峰脱手率 89%，马赫100 芯片实现软硬协同极致优化。" },
            { name: "小鹏",       product: "XNGP / AERO",                desc: "国内城市 NOA 早期领先者，AI 天玑系统推理架构，覆盖全国 200+ 城市无图智驾。" },
            { name: "华为 AITO",  product: "ADS 3.0",                    desc: "不依赖高精地图的城市 NOA，激光雷达+摄像头融合方案，问界 M9 搭载，高端市场份额快速提升。" },
            { name: "蔚来",       product: "NOP+ / Adam 超算",            desc: "自研 Adam 超算集群支撑大模型训练，NOP+ 覆盖高速与城区场景，换电生态构建闭环数据飞轮。" },
            { name: "Waymo",      product: "Waymo One Robotaxi",          desc: "全球商业化运营最成熟的 Robotaxi，旧金山全天候无人驾驶，日均行程超 5 万次，安全里程领先业界。" }
          ]
        },
        { name: "机器人", icon: "🤖",
          players: [
            { name: "Figure AI",          product: "Figure-02",         desc: "OpenAI 加持的人形机器人，可与人自然对话并完成多步骤物理操作，首批进入宝马工厂量产测试。" },
            { name: "Boston Dynamics",    product: "Atlas（电动版）",    desc: "运动能力最强的人形机器人，全电驱转型后实现翻跟头、搬重物等高动态动作，已进入工业应用阶段。" },
            { name: "宇树科技 Unitree",   product: "G1 · H1",           desc: "性价比最高的人形机器人，G1 约 16 万元，运动能力国内领先，是机器人研究者和工厂部署首选。" },
            { name: "Tesla",              product: "Optimus Gen-2",     desc: "马斯克押注的核心长期业务，Gen-2 双手灵巧度大幅提升，目标 2026 年工厂内规模部署数千台。" }
          ]
        },
        { name: "办公 Agent", icon: "💼",
          players: [
            { name: "Microsoft",   product: "Copilot 365",              desc: "深度整合 Word / Excel / Teams 的 AI 副驾驶，企业付费用户超 600 万，是最大规模商业化 AI Agent。" },
            { name: "Google",      product: "Workspace AI / Agentspace", desc: "Gmail、Docs、Drive 全系 AI 化，Agentspace 实现跨应用自主任务执行，Google 企业生态护城河。" },
            { name: "Anthropic",   product: "Claude for Work",          desc: "以安全合规为核心差异化的企业 AI，长文档处理与代码 Review 领先，金融/法律行业首选方案。" },
            { name: "OpenAI",      product: "ChatGPT Enterprise · Operator", desc: "ChatGPT Enterprise 是全球最大规模企业 AI 部署平台，Operator 自主 Agent 完成多步骤复杂网络任务，是办公 Agent 最强竞争者。" },
            { name: "腾讯",        product: "腾讯元宝 · 企业微信 AI",   desc: "深度整合 12 亿微信与企业微信用户生态，混元大模型驱动智能会议摘要与文档生成，国内 B2B 市场覆盖最广。" },
            { name: "字节跳动",    product: "扣子 (Coze)",              desc: "低代码 Agent 搭建平台，接入飞书 / 抖音生态，开发者超 300 万，国内企业 Agent 部署首选之一。" }
          ]
        }
      ],
      /* legacy tracks kept for reference, not rendered */
      tracks: [
        { name: "AI 编程助手",
          desc: "代码生成与智能补全领域正在重新定义软件开发流程。从逐行补全到自然语言生成完整应用，编程门槛持续降低，催生「Vibe Coder」这一全新职业群体。",
          products: [
            { name: "Cursor",         company: "Anysphere",    desc: "AI-first 代码编辑器，自然语言驱动代码生成与重构，月活超 3000 万。Vibe Coding 浪潮的核心平台，正重新定义软件开发方式。" },
            { name: "GitHub Copilot", company: "Microsoft",    desc: "深度集成 VS Code 的 AI 编程助手，覆盖 GitHub 62% AI 辅助代码提交，企业版付费用户超 130 万。" }
          ]},
        { name: "多模态助手",
          desc: "集文字、图像、语音、视频于一体的通用对话助手，正成为个人与企业的「AI 入口」。中美产品均在争夺用户日均使用时长，竞争激烈程度仅次于搜索。",
          products: [
            { name: "ChatGPT",        company: "OpenAI",       desc: "全球最大 AI 对话助手，月活超 3 亿。支持语音、图像、文档多模态交互，GPT-4o 驱动，是消费级 AI 的代名词。" },
            { name: "Claude",         company: "Anthropic",    desc: "以安全性与长文档处理见长的 AI 助手，支持 200K token 上下文，企业市场渗透率持续提升。" },
            { name: "Kimi",           company: "月之暗面",      desc: "国内长文档理解能力领先的 AI 助手，支持 200 万字超长上下文，月活超 3000 万，是国内多模态助手的重要竞争者。" }
          ]},
        { name: "AI 搜索",
          desc: "以生成式答案取代传统蓝链结果，颠覆 Google 二十年搜索范式。实时检索 + 大模型推理是核心技术门槛，国内外均有强力竞争者涌现。",
          products: [
            { name: "Perplexity",     company: "Perplexity AI", desc: "以 AI 生成答案取代传统搜索结果页，实时检索 + RAG 架构，月活超 1 亿，估值超 $90 亿。" },
            { name: "天工 AI",        company: "昆仑万维",      desc: "国内领先 AI 搜索产品，深度整合实时信息检索与大模型推理，支持多轮追问与深度研究报告生成。" }
          ]},
        { name: "视频生成",
          desc: "从文字到视频的端到端生成在 2024-2025 年爆发式增长。物理真实感、运动一致性与可控性是核心竞争维度，中国团队在此赛道已实现与 OpenAI 并肩竞争。",
          products: [
            { name: "可灵",           company: "快手",          desc: "国内领先文生视频大模型，支持 2 分钟长视频生成，物理真实感国内第一，已开放 API 商业化。" },
            { name: "Seedance",       company: "字节跳动",      desc: "字节跳动推出的视频生成模型，专注高保真、强时序一致性的长视频生成，与即梦 AI 共同构成字节视频 AI 矩阵。" },
            { name: "即梦 AI",        company: "字节跳动",      desc: "字节跳动旗下 AI 创作平台，整合文生图、文生视频、AI 编辑等能力，深度整合剪映生态，月活数千万。" },
            { name: "Sora",           company: "OpenAI",        desc: "OpenAI 文生视频旗舰模型，支持最长 60 秒高保真视频，时空一致性行业领先，2024 年底正式发布。" },
            { name: "海螺 AI",        company: "MiniMax",       desc: "MiniMax 旗下 AI 视频平台，在运动流畅性与画面细节上表现突出，是国内第一批实现商业化的视频生成产品之一。" }
          ]},
        { name: "企业智能体",
          desc: "能够自主规划并执行多步骤任务的 AI 系统，是通用 AI 的最前沿落地形态。目前仍处于早期商业化阶段，准确率与可靠性是关键瓶颈。",
          products: [
            { name: "Manus",          company: "Monica",        desc: "首个通用 AI 智能体，可自主完成网页操作、数据分析、代码执行等多步骤任务，无需人工干预。" },
            { name: "扣子",           company: "字节跳动",      desc: "字节跳动智能体开发平台，支持低代码搭建多 Agent 工作流，接入飞书、抖音等字节系生态，开发者数量国内第一。" }
          ]}
      ]
    },
    {
      id: "model",
      name: "模型层",
      en: "Foundation Models",
      color: "#2563EB",
      bracket_items: [
        { name: "LLM", icon: "🧠",
          players: [
            { name: "OpenAI",      product: "GPT-4o · o3",         desc: "全球 AI 商业化标杆，ChatGPT 月活超 3 亿。GPT-4o 统一多模态交互，o3 推理模型首次超越人类专家水平。" },
            { name: "Anthropic",   product: "Claude 3.7 · Opus 4", desc: "代码与长文档综合性能领先，企业安全合规口碑最强，Claude Code 快速渗透开发者生态。" },
            { name: "DeepSeek",    product: "V3 · R1（开源）",      desc: "$600 万训练成本比肩 GPT-4，重构全球 AI 成本曲线认知，R1 开源推理模型引发全球复现浪潮。" },
            { name: "阿里云",      product: "Qwen3（开源旗舰）",     desc: "Hugging Face 下载量前三，开源最激进的中国大厂，全球开发者覆盖构建本土开源生态护城河。" }
          ]
        },
        { name: "多模态", icon: "🎨",
          players: [
            { name: "Google",      product: "Gemini 2.5 Pro",       desc: "2M token 超长上下文，原生多模态最强，深度整合 Search / YouTube 数据，TPU 自研算力支撑。" },
            { name: "OpenAI",      product: "GPT-4o Vision · Sora", desc: "实时语音多模态统一（4o）；文生视频「物理世界模拟器」Sora 60 秒高保真视频震撼影视行业。" },
            { name: "字节跳动",    product: "Seedance · 即梦 AI",   desc: "视频生成追平 Sora 帧率与一致性，中美并肩少数领域之一，抖音生态分发是最强商业化渠道。" },
            { name: "快手",        product: "可灵 2.0",              desc: "国内视频生成物理真实感第一，支持 2 分钟长视频，已开放 API 商业化，月活创作者超千万。" }
          ]
        },
        { name: "VLA 模型", icon: "🦾",
          players: [
            { name: "Google DeepMind",          product: "RT-2 · Gemini Robotics",  desc: "视觉语言行动一体化先驱，RT-2 将网页知识迁移至机器人操作，泛化能力行业顶尖。" },
            { name: "Physical Intelligence (π)", product: "π0 · π0.5",              desc: "硅谷最受关注的机器人 AI 公司，π0 实现单模型操控 20+ 种机器人形态，融资超 $5 亿。" },
            { name: "理想汽车",                 product: "MindVLA",                 desc: "车载 VLA 模型，将感知、规划、控制合并为端到端统一推理，马赫100 芯片实现实时车规级运行。" },
            { name: "Figure AI",               product: "Figure-02 VLA",            desc: "OpenAI 联合开发的机器人 VLA，实现自然语言指令到多步骤物理操作的零样本泛化。" }
          ]
        }
      ],
      /* legacy tracks kept for reference, not rendered */
      tracks: [
        { name: "闭源 LLM",
          desc: "商业闭源模型以订阅或 API 付费模式运营，性能通常领先开源模型 6-12 个月。OpenAI 与 Anthropic 为绝对领导者，国内百度、阿里等巨头紧随其后。",
          products: [
            { name: "GPT-4o",         company: "OpenAI",       desc: "OpenAI 旗舰多模态模型，文本、图像、音频统一处理，推理延迟降低 50%，是 ChatGPT 的动力核心。" },
            { name: "Claude 3.7",     company: "Anthropic",    desc: "Anthropic 最新旗舰，在代码、推理、长文档领域综合性能领先，企业部署安全性行业标杆。" },
            { name: "文心 4.0",       company: "百度",          desc: "百度旗舰大模型，深度融合搜索与知识图谱，在中文理解与行业落地方面具备本土优势，日均调用超 15 亿次。" }
          ]},
        { name: "开源 LLM",
          desc: "可下载权重、可二次开发的大模型生态，正快速缩小与闭源模型的性能差距。Meta 与 DeepSeek 引领，开源浪潮降低了全球 AI 部署的门槛与成本。",
          products: [
            { name: "Llama 4",        company: "Meta",         desc: "Meta 开源大模型旗舰，MoE 架构支持多模态，开源社区最大生态，推动开源 AI 能力逼近闭源顶尖水平。" },
            { name: "DeepSeek V3",    company: "DeepSeek",     desc: "中国开源 LLM 标杆，671B 参数 MoE 架构仅激活 37B，训练成本仅 $600 万，性价比震惊行业。" },
            { name: "Qwen3",          company: "阿里云",        desc: "阿里云通义千问第三代，开源版本性能比肩 GPT-4 级别，支持混合推理模式，全球 Hugging Face 下载量前三。" }
          ]},
        { name: "多模态模型",
          desc: "统一处理文本、图像、音频、视频的基础模型，是下一代 AI 交互的基础设施。长上下文窗口与实时处理能力是核心竞争维度，Google 在此领域占据先发优势。",
          products: [
            { name: "Gemini 2.0",     company: "Google",       desc: "Google 原生多模态旗舰，深度整合 Search、Maps、YouTube 数据，长上下文处理业界最强（2M token）。" },
            { name: "混元大模型",     company: "腾讯",          desc: "腾讯自研多模态大模型，深度融合微信、企业微信生态，支持文图音视频一体化处理，企业级部署规模行业前列。" }
          ]},
        { name: "推理模型",
          desc: "专为复杂推理任务优化的模型，通过「慢思考」链式推导大幅提升数学、编程、逻辑能力。DeepSeek R1 的开源打破 OpenAI 垄断，引发全球推理模型开源浪潮。",
          products: [
            { name: "DeepSeek R1",    company: "DeepSeek",     desc: "开源推理模型，思维链性能比肩 OpenAI o1，完全开源权重，引发全球对中国 AI 能力的重新评估。" },
            { name: "o3",             company: "OpenAI",       desc: "OpenAI 最强推理模型，在数学竞赛、科学推理、代码生成等高难度任务上首次超越人类专家平均水平。" }
          ]},
        { name: "领域垂直模型",
          desc: "深度聚焦特定行业（医疗、法律、金融、科学）的专用模型。凭借领域数据壁垒与专有微调建立差异化护城河，是通用大模型无法直接替代的细分市场。",
          products: [
            { name: "AlphaFold 3",    company: "Google DeepMind", desc: "蛋白质结构预测模型，可预测所有生命分子相互作用，2024 年诺贝尔化学奖重要贡献。" },
            { name: "盘古气象",       company: "华为",           desc: "华为研发的 AI 气象大模型，预测精度超越传统数值天气预报，推理速度快 10000 倍，已实现商业化部署。" }
          ]}
      ]
    },
    {
      id: "infra",
      name: "算力层",
      en: "AI Infrastructure",
      color: "#1A1816",
      bracket_items: [
        { name: "芯片", icon: "⚙️",
          players: [
            { name: "NVIDIA",    product: "H200 · B200 · GB200",   desc: "AI 芯片绝对霸主，掌控约 80% 训练市场。H200 单卡 4000 TOPS，B200 性能再翻倍，数据中心装机首选。" },
            { name: "AMD",       product: "MI300X · MI325X",        desc: "GPU 领域唯一能挑战 NVIDIA 的对手，ROCm 生态逐步完善，以更低价格切入训练与推理双市场。" },
            { name: "华为昇腾",  product: "昇腾 910C · 910B",       desc: "中国 AI 训练芯片国产替代核心，在国内对标 H100，支持 MindSpore 框架，大规模量产已启动。" },
            { name: "Qualcomm",  product: "骁龙 8 Elite / 车规 SA",  desc: "端侧推理 SoC 领导者，骁龙 8 Elite NPU 性能业界最强，汽车 SA8775P 平台是智驾域控芯片首选。" }
          ]
        },
        { name: "机房", icon: "🏢",
          players: [
            { name: "Google",         product: "TPU Pod · 超大规模数据中心", desc: "自研 TPU 驱动全系 AI 服务，2025-2026 年数据中心资本开支超 $750 亿，液冷技术行业领先。" },
            { name: "Microsoft",      product: "Azure AI 超算集群",           desc: "OpenAI 独家算力合作伙伴，Azure 为 GPT-4o 训练提供 10 万块+ H100 集群，企业 AI 平台市占第一。" },
            { name: "AWS",            product: "Trainium2 · AWS UltraCluster", desc: "自研 Trainium 训练芯片降低成本 40%，UltraCluster 支持 10 万块加速卡无损互联。" },
            { name: "腾讯 / 阿里云",  product: "腾讯智算中心 · 阿里云飞天", desc: "国内算力基础设施双巨头，均部署昇腾 + 自研加速卡混合方案，支撑国内大模型训练与推理需求。" }
          ]
        },
        { name: "电力", icon: "⚡",
          insight: { icon: "⚡", title: "电力正在取代芯片，成为下一个行业瓶颈", body: "芯片短缺是 2022–2024 年 AI 扩张的最大制约。随着台积电产能释放与各国自研芯片铺量，供给侧正在缓解——但电力危机正在接棒。Goldman Sachs 预测：AI 数据中心电力需求到 2030 年将增长 160%，届时全球电力消耗将达 1,000+ TWh。爱尔兰、荷兰已对新建数据中心接入电网设置禁令；美国弗吉尼亚州（全球最大数据中心集群）已无额外电力容量接纳新项目。能源不再是配套问题，而是算力扩张的硬上限。" },
          players: [
            { name: "Google",          product: "核能直购 / Kairos Power",        desc: "全球首家与核电厂签订 AI 专用购电协议，并向小型模块化核反应堆（SMR）开发商 Kairos Power 追加投资，目标 2030 年数据中心 100% 清洁能源供电。" },
            { name: "Microsoft",       product: "三里岛核电复活 / X-energy SMR",   desc: "重启已关闭的三里岛核电站（20 年 PPA）为 Azure AI 供电；同步与 SMR 开发商 X-energy 签订长期协议，布局下一代小型核反应堆自供电方案。" },
            { name: "Amazon",          product: "宾州核电园区直购 / X-energy",     desc: "收购宾夕法尼亚州一座核电站旁的数据中心园区直接就近取电；另向 X-energy 注资，是三巨头中核电布局最激进的一个。" },
            { name: "NextEra Energy",  product: "风能 + 太阳能 PPA",              desc: "美国最大清洁能源运营商，与科技巨头签订长期购电协议（PPA），是 AI 数据中心清洁电力的最大第三方供应商，覆盖超 20GW 装机。" },
            { name: "国家电网 / 南方电网", product: "东数西算 / 绿电直供走廊",    desc: "落地「东数西算」国家战略：将内蒙古、宁夏、贵州等西部清洁能源（风光水电）通过超高压直流专线输送至京津冀、粤港澳等东部算力集群，实现算力与电力的空间解耦。" },
            { name: "海兰信 / 中国电建",  product: "海底数据中心（在建）",          desc: "中国正在建设全球规模最大的商业化海底数据中心：利用深海恒温海水免费散热，PUE 可低至 1.076（陆地中心通常 1.3+）；首批设备已在海南陵水水域完成部署，目标 2025–2027 年陆续投产。" },
            { name: "UAE / NEOM",      product: "沙漠太阳能 + 主权 AI 电力",      desc: "阿联酋与沙特依托充沛日照大规模部署太阳能（单个项目超 5GW），为 G42、Aramco Digital 等主权 AI 算力中心提供绿电直供；NEOM 超级城市内建专属微电网，算力与能源一体化规划。" }
          ]
        }
      ],
      /* legacy tracks kept for reference, not rendered */
      tracks: [
        { name: "AI 训练芯片",
          desc: "大规模模型训练的核心硬件，算力稀缺性是当前 AI 军备竞赛的首要制约因素。NVIDIA 掌握约 80% 市场份额，中国受出口管制压力推动国产替代加速。",
          products: [
            { name: "NVIDIA H200",    company: "NVIDIA",       desc: "目前最主流的 AI 训练加速卡，HBM3e 内存 141GB，单卡 4000 TOPS，是 GPT-4 / Llama 4 训练的主力硬件。" },
            { name: "昇腾 910C",      company: "华为",          desc: "华为自研 AI 训练芯片，在国内市场对标 H100，支持 MindSpore 框架，是中国算力自主化的核心产品。" }
          ]},
        { name: "推理加速器",
          desc: "专为高并发、低延迟推理优化的芯片。随着 AI 应用爆发，推理算力需求增速正超越训练，大量互联网公司开始自研推理芯片以降低成本。",
          products: [
            { name: "Google TPU v5",  company: "Google",       desc: "专为大规模推理优化的定制 AI 芯片，驱动 Google 全系 AI 服务，能效比优于同代 GPU 3×。" },
            { name: "AWS Trainium2",  company: "Amazon",       desc: "AWS 自研 AI 训练芯片第二代，训练成本较 GPU 降低 40%，专为超大规模模型训练优化。" }
          ]},
        { name: "数据中心",
          desc: "承载 AI 工作负载的物理基础设施。2025-2026 年全球 AI 数据中心投资超 $5000 亿，电力供应与液冷散热成为新瓶颈，选址逻辑正从人口中心转向电力资源地。",
          products: [
            { name: "TSMC CoWoS",     company: "TSMC",         desc: "台积电先进封装技术，将 GPU 与 HBM 内存紧密集成，是 NVIDIA H100/H200 性能的关键支撑工艺。" }
          ]},
        { name: "云 AI 平台",
          desc: "提供模型训练、推理、部署、监控全链路服务的托管平台。降低企业使用 AI 的技术门槛与运维成本，国内阿里云、腾讯云、华为云均在布局完整 AI 服务栈。",
          products: [
            { name: "Azure AI",       company: "Microsoft",    desc: "深度整合 OpenAI 的企业级 AI 平台，覆盖模型推理、微调、RAG 到 Copilot 应用全链路，企业市占第一。" },
            { name: "阿里云百炼",     company: "阿里云",        desc: "阿里云 AI 模型服务平台，支持通义系列及第三方模型一站式调用与微调，国内企业 AI 部署首选之一。" }
          ]},
        { name: "网络互联",
          desc: "连接数千块 GPU 的高速互联网络，决定大规模训练集群的通信效率。NVIDIA NVLink 与 InfiniBand 是两大核心技术，网络带宽正成为算力扩展的新瓶颈。",
          products: [
            { name: "NVLink 5",       company: "NVIDIA",       desc: "NVIDIA 第五代 GPU 互联技术，带宽达 1.8 TB/s，支持 576 块 GPU 无损互联，大规模训练集群的神经系统。" }
          ]}
      ]
    }
  ],

  /* 01.5 · 行业发展里程碑 */
  industry_milestones: [
    {
      year: 2017,
      events: [
        { tag: "学术", color: "#7C3AED", title: "Transformer", desc: "\"Attention is All You Need\" 发表，现代 LLM 的架构基础就此奠定" }
      ]
    },
    {
      year: 2018,
      events: [
        { tag: "学术", color: "#7C3AED", title: "BERT", desc: "预训练 + 微调范式确立，NLP 任务全面突破，迁移学习成为主流" },
        { tag: "车载", color: "#059669", title: "Tesla HW3.0 与自研 FSD 芯片", desc: "抛弃通用 GPU，走向专用集成电路（ASIC）自研，开启了「软硬一体化」的车载算力时代。" }
      ]
    },
    {
      year: 2019,
      events: [
        { tag: "产品", color: "#2563EB", title: "GPT-2", desc: "OpenAI 以「太危险」为由限制发布，首次引发全球 AI 安全讨论" }
      ]
    },
    {
      year: 2020,
      events: [
        { tag: "产品", color: "#2563EB", title: "GPT-3", desc: "1750 亿参数，Few-shot 涌现震惊学界，Scaling Law 信仰形成" },
        { tag: "生态", color: "#D97706", title: "GitHub Copilot 内测", desc: "AI 辅助编程首次进入工业级生产环境" },
        { tag: "学术", color: "#7C3AED", title: "Vision Transformer (ViT)", desc: "Transformer 首次成功跨界计算机视觉（CV），成为 MindVLA 等多模态大模型能够「看懂世界」的底层支柱。" },
        { tag: "学术", color: "#7C3AED", title: "NeRF（神经辐射场）诞生", desc: "首次实现用神经网络进行 3D 场景重建，是 2026 年云端世界模型的技术前身。" }
      ]
    },
    {
      year: 2021,
      events: [
        { tag: "产品", color: "#2563EB", title: "DALL-E", desc: "文生图能力首次演示，多模态 AI 从学术走向大众视野" },
        { tag: "生态", color: "#D97706", title: "GitHub Copilot GA", desc: "正式上线一年新增 100 万开发者，AI 编程助手市场成型" },
        { tag: "学术", color: "#7C3AED", title: "OpenAI CLIP 模型", desc: "打通「文字」与「图像」的语义空间，是多模态的底层支柱，直接决定具身智能能否「看懂指令、操控物理世界」。" },
        { tag: "车载", color: "#059669", title: "Tesla AI Day 引入占用网络", desc: "智驾行业从毫米波雷达走向纯视觉、时空向量空间的感知范式，奠定了端到端的感知基础。" }
      ]
    },
    {
      year: 2022,
      events: [
        { tag: "产品", color: "#2563EB", title: "ChatGPT 上线", desc: "5 天破百万用户，史上最快消费级 AI，开启 LLM 应用爆发元年" },
        { tag: "产品", color: "#2563EB", title: "Stable Diffusion / Midjourney", desc: "图像生成开源民主化，创作门槛骤降，版权争议开始" },
        { tag: "车载", color: "#059669", title: "Tesla FSD β V10", desc: "首次城市场景 Beta，端到端自动驾驶方向正式确立" }
      ]
    },
    {
      year: 2023,
      turning_point: { icon: "🚀", label: "大模型元年", color: "#2563EB", desc: "ChatGPT → GPT-4 引爆全球 LLM 应用潮" },
      events: [
        { tag: "产品", color: "#2563EB", title: "GPT-4", desc: "多模态旗舰，通过律师资格考试（Top 10%），Bar-passing AI 时代开始" },
        { tag: "学术", color: "#7C3AED", title: "Llama 1 开源", desc: "Meta 引爆开源 LLM 生态，权重泄露加速全球社区迭代" },
        { tag: "中国", color: "#E03D1E", title: "文心一言 · 通义 · 星火", desc: "百度、阿里、科大讯飞同年入局，国产大模型「百模大战」开打" },
        { tag: "车载", color: "#059669", title: "华为 ADS 2.0", desc: "城市 NOA 不依赖高精地图，国内智驾格局重新洗牌" }
      ]
    },
    {
      year: 2024,
      events: [
        { tag: "产品", color: "#2563EB", title: "Sora", desc: "文生视频「物理世界模拟器」，60 秒高保真视频震撼影视行业" },
        { tag: "产品", color: "#2563EB", title: "GPT-4o · Claude 3", desc: "实时语音多模态统一（4o）；综合评分首超 GPT-4（Claude 3 Opus）" },
        { tag: "产品", color: "#2563EB", title: "OpenAI o1", desc: "推理型「慢思考」模型范式诞生，数学竞赛首次超越人类专家" },
        { tag: "中国", color: "#E03D1E", title: "DeepSeek V2 · Kimi 200万字", desc: "国产超高性价比 MoE 开源；Kimi 超长上下文引爆国内用户增长" },
        { tag: "生态", color: "#D97706", title: "Apple Intelligence", desc: "苹果将 AI 纳入系统级，端侧小模型 + 云端隐私架构成为标准范式" },
        { tag: "车载", color: "#059669", title: "Tesla FSD V12 量产", desc: "全球首个端到端（E2E）智驾方案落地，智驾跨入「直觉本能」时代。" }
      ]
    },
    {
      year: 2025,
      turning_point: { icon: "⚡", label: "Agent 爆发", color: "#D97706", desc: "AI 从「对话」进化为「行动」，Agent 进入工业级规模化落地" },
      events: [
        { tag: "中国", color: "#E03D1E", title: "DeepSeek R1 / V3", desc: "训练成本 $600 万比肩 GPT-4，震惊硅谷，重构全球 AI 成本曲线" },
        { tag: "产品", color: "#2563EB", title: "Gemini 2.0 · Llama 4", desc: "多模态长上下文再突破（Gemini）；MoE 开源旗舰（Meta Llama 4）" },
        { tag: "中国", color: "#E03D1E", title: "Seedance · 可灵 2.0", desc: "字节跳动、快手视频生成追平 Sora 帧率与一致性" },
        { tag: "生态", color: "#D97706", title: "MCP 协议标准化", desc: "Anthropic 主导的 AI Agent 工具调用标准，跨平台 Agent 生态成型" },
        { tag: "车载", color: "#059669", title: "理想 MindVLA 全场景 NOA", desc: "高速 + 城市 + 泊车端到端量产，城市脱手率 89%（上海早高峰）" }
      ]
    },
    {
      year: 2026,
      turning_point: { icon: "🤖", label: "具身智能元年", color: "#E03D1E", desc: "Physical AI 从实验室走向量产：机器人、智驾、AI 眼镜全面商业化" },
      events: [
        { tag: "产品", color: "#2563EB", title: "Claude Opus 4 · Gemini 2.5 Pro", desc: "旗舰模型能力再次跃升，Agent 级推理与工具调用成为新标准" },
        { tag: "生态", color: "#D97706", title: "AI Agent 规模化落地", desc: "从 Demo 进入工业级生产：代码生成、数据分析、运营自动化全面商业化" },
        { tag: "生态", color: "#7C3AED", title: "Vibe Coding「养虾潮」", desc: "以 Cline（OpenClaw）为代表的开源 AI 编程 Agent 引爆非开发者群体；无需写代码、自然语言驱动项目落地的「养虾」模式席卷中文互联网，Vibe Coding 从小众实验走向主流创作方式" }
      ]
    }
  ],

  /* 02 · 核心技术词典（三维度 20 词） */
  glossary_dims: [
    {
      dim: "A",
      label: "认知底座",
      en: "Foundation",
      color: "#1E3A5F",
      desc: "AI 的大脑容量与核心科学逻辑",
      terms: [
        { term: "Transformer",   full: "注意力架构",      en: "Transformer Architecture",
          def: "当代 AI 的通用计算底座。「自注意力」机制让模型捕捉序列中任意距离的依赖关系，LLM、ViT、VLA 几乎所有主流模型均基于此架构。",
          key: "\"Attention is All You Need\"（2017）奠定基石" },
        { term: "LLM",           full: "大语言模型",      en: "Large Language Model",
          def: "行业通用逻辑底座。10B+ 参数语言模型，通过海量文本预训练获得通用推理与理解能力，是一切上层应用的智能引擎。",
          key: "参数量 7B → 1T+（MoE 架构）" },
        { term: "Multimodal",    full: "多模态 AI",        en: "Multimodal AI",
          def: "解决感知边界。同时处理文本、图像、音频的统一模型，从「文字助手」进化为「通用感知」。",
          key: "代表：GPT-4o · Gemini 2.0" },
        { term: "MoE",           full: "混合专家模型",    en: "Mixture of Experts",
          def: "提升能效比的关键。将大模型拆分为多个「专家」子网络，推理时仅激活少数，大幅降低训练与推理成本。",
          key: "DeepSeek V3：671B 总参数，激活 37B" },
        { term: "Token",         full: "词元",            en: "Token",
          def: "LLM 最小处理单元，约 3/4 英文单词或 1.5 汉字，是算力与计费的度量标准。",
          key: "GPT-4o 输入 $2.50 / 1M tokens" },
        { term: "Scaling Law",   full: "规模法则",        en: "Scaling Law",
          def: "行业持续投入算力的底层信仰。模型能力随算力、数据、参数量增加而可预测提升。",
          key: "OpenAI / Google 数百亿美元算力投入的核心依据" },
        { term: "System 1 & 2",  full: "快思维与慢思维",  en: "System 1 & System 2",
          def: "借自行为经济学的认知双系统。System 1 = 毫秒级本能反应；System 2 = 深度推理。对应智驾端侧实时决策与云端长程规划两种 AI 模式。",
          key: "o3 / R1 代表 System 2 跃迁；马赫 100 承载 System 1" },
        { term: "CoT",           full: "思维链",          en: "Chain of Thought",
          def: "激活 AI System 2 推理的核心技术。引导模型逐步展示思考过程，大幅提升复杂数学与规划任务准确率。",
          key: "GSM8K：CoT 使 GPT-3 从 17% → 55%" },
        { term: "World Model",   full: "世界模型",        en: "World Model",
          def: "AI 在脑中「预演」物理世界变化的能力，是防御性驾驶与机器人操作规划的底层支撑。",
          key: "MindSim 以 1000× 速度在数字孪生中训练" },
        { term: "数字孪生",       full: "虚拟世界模拟器",  en: "Digital Twin",
          def: "以物理引擎构建的虚拟训练环境，通过生成极端工况批量制造训练数据，解决具身智能的数据瓶颈。",
          key: "MindSim 每天生成 10 亿公里复杂路况",
          brands: [ { name: "理想 MindSim" }, { name: "NVIDIA Omniverse" }, { name: "Waymo" } ] },
        { term: "HBM",           full: "高带宽内存",      en: "High Bandwidth Memory",
          def: "大模型训练与推理的带宽命脉。多层 DRAM 堆叠封装于芯片旁，带宽比 DDR5 高 5–10×，是突破「内存墙」的关键。",
          key: "H100：3.35 TB/s HBM3 · SK 海力士 / 三星垄断供应" }
      ]
    },
    {
      dim: "B",
      label: "对齐与优化",
      en: "Alignment & Optimization",
      color: "#2563EB",
      desc: "AI 如何变聪明、变听话的工程手段",
      terms: [
        { term: "RLHF",          full: "人类反馈强化学习", en: "Reinforcement Learning from Human Feedback",
          def: "让 AI 行为与人类偏好对齐。通过人类对输出的偏好排序训练奖励模型，是 ChatGPT 能力跃升的核心技术。",
          key: "ChatGPT 能力跃升的核心技术" },
        { term: "RAG",           full: "检索增强生成",    en: "Retrieval-Augmented Generation",
          def: "给 AI 挂载外部「百科全书」，解决知识截止和幻觉问题，为实时准确的行业知识提供支撑。",
          key: "企业知识库问答标配方案" },
        { term: "Vibe Coding",   full: "氛围编程",        en: "Vibe Coding",
          highlight: true,
          def: "编程民主化的体现。非技术人员通过自然语言与 AI 协作快速交付业务逻辑，无需「写代码」，只需「讲清楚想要什么」。",
          key: "Cursor 月活超 3000 万，Vibe Coder 首超传统程序员" },
        { term: "SLM",           full: "小语言模型",      en: "Small Language Model",
          def: "通过蒸馏将大模型能力压缩至手机、车载等低功耗设备，同等能力更低成本的端侧部署路径。",
          key: "Phi-3 Mini 3.8B ≈ GPT-3.5 能力，功耗 1/100" },
        { term: "Synthetic Data", full: "合成数据",        en: "Synthetic Data",
          def: "用 AI 生成 AI 训练数据。通过数字孪生或大模型批量生成极端工况数据，成本不到人工标注的 1/100。",
          key: "MindSim：每天生成 10 亿公里合成路况" },
        { term: "蒸馏 & 量化",    full: "模型蒸馏与量化",  en: "Distillation & Quantization",
          def: "将大模型「压缩装箱」的两大工程手段。蒸馏用大模型指导小模型，量化将权重精度降至 INT8/INT4，推理速度提升 2–4×。",
          key: "INT4 量化推理速度提升 3×；内存占用减少 75%" },
        { term: "长上下文记忆",   full: "长文本推理与记忆", en: "Long-Context Memory",
          def: "AI 处理超长序列的能力，是智能体从「单轮问答」进化为「持久助手」的核心基础设施。",
          key: "Gemini 1.5 Pro：200 万 Token（约 5 本《战争与和平》）" },
        { term: "帕累托前沿",     full: "多目标优化边界",  en: "Pareto Frontier",
          def: "无法在不损失另一目标的前提下继续提升某指标的最优解集合。精度 vs 速度、安全 vs 能力，是理解 AI Trade-off 的基础框架。",
          key: "越接近前沿，每次进步成本呈指数级上升" }
      ]
    },
    {
      dim: "C",
      label: "具身执行",
      en: "Physical Action",
      color: "#E03D1E",
      desc: "AI 进入物理世界、接管硬件实体",
      terms: [
        { term: "Edge AI",       full: "端侧 AI",          en: "Edge AI",
          def: "AI 在设备本地运行，解决云端方案的三大痛点：隐私泄露、网络延迟、断网失效。",
          key: "2026 年端侧 AI 芯片出货量预计超 20 亿颗" },
        { term: "ACC / LKA",     full: "自适应巡航 / 车道保持", en: "Adaptive Cruise Control / LKA",
          def: "具身智能的初级阶段——单一信号感知、固定规则执行。L2 辅助驾驶全球渗透率已超 60%。",
          key: "L2 辅助驾驶全球渗透率已超 60%",
          brands: [ { name: "丰田" }, { name: "大众" }, { name: "本田" }, { name: "宝马" } ] },
        { term: "高速 NOA",      full: "高速领航辅助驾驶",  en: "Highway NOA",
          def: "高速路全程自主变道、超车、匝道进出，是当前主流新势力的基线能力。",
          key: "2025 年新势力高速 NOA 覆盖率已接近 100%",
          brands: [ { name: "蔚来" }, { name: "比亚迪" }, { name: "特斯拉" }, { name: "极氪" } ] },
        { term: "城市 NOA",      full: "全场景城市领航辅助", en: "City NOA",
          highlight: true,
          def: "当前智驾能力分水岭。城区复杂路口、密集车流全程领航，需实时 3D 环境建模与端到端推理。",
          key: "理想城市 NOA 脱手率 89%（上海早高峰）",
          brands: [ { name: "理想" }, { name: "华为" }, { name: "小鹏" }, { name: "特斯拉" } ] },
        { term: "X-by-Wire",     full: "线控底盘",         en: "X-by-Wire Chassis",
          def: "以电信号取代机械连接控制底盘，消除传动延迟后 AI 可以 1000Hz+ 频率调节动作——是「神经耦合肌肉」的物理基础。",
          key: "理想 L9 Livis 全线控底盘（2026/5）",
          brands: [ { name: "理想" }, { name: "比亚迪" }, { name: "博世" } ] },
        { term: "End-to-End",    full: "端到端",           en: "End-to-End",
          def: "原始传感器数据直接输出底盘控制信号，消除感知→规划→控制割裂，大幅提升复杂场景泛化能力。",
          key: "Tesla FSD v12（2024）；理想 MindVLA 同架构" },
        { term: "DSA",           full: "专用架构芯片",     en: "Domain-Specific Architecture",
          def: "为特定算法负载定制的芯片架构，相对通用 GPU 能效比提升 3–10×，是打破内存墙与功耗瓶颈的核心路径。",
          key: "马赫 100 能效比比通用智驾芯片高 3×",
          brands: [ { name: "理想" }, { name: "Tesla" }, { name: "Google" } ] },
        { term: "VLA",           full: "视觉-语言-行动模型", en: "Vision-Language-Action Model",
          highlight: true,
          def: "将视觉感知（看）、语言理解（想）、物理动作（做）统一在单一模型中，让机器人和智驾系统能感知-思考-行动。",
          key: "MindVLA 城区 NOA 脱手率 89%" },
        { term: "长尾场景",      full: "低频极端工况",     en: "Long-Tail Scenarios",
          def: "驾驶中出现概率极低但影响极大的边缘工况——逆行、鬼探头、异形障碍。覆盖长尾是端到端与世界模型训练的核心挑战。",
          key: "MindSim 每天生成 10 亿公里以覆盖长尾" },
        { term: "TOPS",          full: "每秒万亿次运算",   en: "Tera Operations Per Second",
          def: "衡量 AI 芯片推理算力的基本单位。马赫 100 达 2560 TOPS，约为旗舰手机芯片的 50×。",
          key: "马赫 100：2560 TOPS · 行业同级 3×" },
        { term: "DDR / LPDDR",   full: "双倍数据率内存",   en: "DDR / Low Power DDR",
          def: "端侧 AI 芯片的主流内存接口。LPDDR5X 带宽约 77 GB/s，是边缘推理性能的带宽上限，远低于训练侧 HBM。",
          key: "LPDDR5X：77 GB/s vs HBM3：3.35 TB/s" }
      ]
    }
  ],
  glossary: [],

  /* 03 · 玩家图谱（三大阵营）*/
  player_camps: {
    "840": { camp: "巨头阵营", name: "美国",     players: ["Amazon", "Anthropic", "Google DeepMind", "Meta AI", "Microsoft", "NVIDIA", "OpenAI"] },
    "826": { camp: "巨头阵营", name: "英国",     players: ["ARM", "DeepMind", "Wayve"] },
    "250": { camp: "新锐力量", name: "法国",     players: ["H Company", "Mistral AI"] },
    "276": { camp: "新锐力量", name: "德国",     players: ["Aleph Alpha", "Helsing AI"] },
    "356": { camp: "新锐力量", name: "印度",     players: ["Krutrim", "Ola AI", "Sarvam AI"] },
    "392": { camp: "新锐力量", name: "日本",     players: ["Sakana AI", "SoftBank AI", "Toyota Research"] },
    "410": { camp: "新锐力量", name: "韩国",     players: ["Naver", "三星电子/SK海力士"] },
    "682": { camp: "新锐力量", name: "中东",     players: ["G42 Cloud", "NEOM AI", "PIF AI Fund", "TII Falcon"] },
    "784": { camp: "新锐力量", name: "中东",     players: ["G42 Cloud", "NEOM AI", "PIF AI Fund", "TII Falcon"] },
    "702": { camp: "新锐力量", name: "新加坡",   players: ["GovTech AI", "Sea AI Lab"] },
    "458": { camp: "新锐力量", name: "马来西亚", players: ["Microsoft SEA DC", "Petronas Digital"] },
    "156": { camp: "中国力量", name: "中国",     players: ["DeepSeek", "阿里云", "百度", "华为", "理想汽车", "小米", "腾讯混元", "宇树科技", "月之暗面", "字节跳动", "智谱AI"] },
    "158": { camp: "中国力量", name: "台湾",     players: ["MediaTek Dimensity AI", "TSMC AI 制造"] }
  },

  /* 国家产业特点标签（点击国家后展示） */
  country_traits: {
    "840": { tags: ["算力主导", "模型研发", "开发者生态"],   note: "掌控全球 AI 核心基础设施与顶尖模型", insight_idx: 0 },
    "826": { tags: ["基础研究", "芯片架构", "自动驾驶"],    note: "DeepMind 与 ARM 奠定全球 AI 技术底座" },
    "250": { tags: ["开源主权", "MoE 架构", "欧洲旗手"],    note: "欧洲 AI 主权战略的核心力量", insight_idx: 2 },
    "276": { tags: ["主权 AI", "政企合规", "垂直深耕"],     note: "以 AI Act 引领负责任 AI 监管框架", insight_idx: 2 },
    "356": { tags: ["语音落地", "语言多元", "政企红利"],    note: "22 种本土语言构建差异化 AI 壁垒", insight_idx: 3 },
    "392": { tags: ["算法创新", "日语主权", "工业 AI"],     note: "小参数低功耗算法与工业场景引领" },
    "410": { tags: ["HBM 供应链", "主权 LLM", "硬件制造"],  note: "掌控 AGI 时代 HBM 内存命脉" },
    "682": { tags: ["主权算力", "开源大模型", "中立节点"],  note: "石油美元与王室资金驱动，构建全球 AI 主权基础设施" },
    "784": { tags: ["主权算力", "开源大模型", "中立节点"],  note: "石油美元与王室资金驱动，构建全球 AI 主权基础设施" },
    "702": { tags: ["数据枢纽", "政府 AI", "出海跳板"],     note: "中美 AI 产品进入东南亚的战略支点", insight_idx: 3 },
    "458": { tags: ["算力飞地", "工业 AI", "数据主权"],     note: "承接硅谷算力外包的黄金数据飞地", insight_idx: 3 },
    "156": { tags: ["场景落地", "硬件集成", "本土生态"],    note: "以垂直整合与规模化落地构建 AI 护城河", insight_idx: 1 },
    "158": { tags: ["芯片制造", "先进封装", "端侧 AI"],     note: "全球 AI 芯片制造的不可替代支柱" }
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

  global_player_insights: [
    {
      region: "🇺🇸 美国 · 硅谷",
      color: "#1A1816",
      tagline: "算力 × 模型 × 生态 三位一体",
      desc: "OpenAI / Google / Anthropic / Meta 占据全球顶级模型研发 80% 以上资源，NVIDIA 掌控 AI 芯片命脉。核心优势在算力基础设施与平台生态，形成「算力 → 模型 → 开发者生态」飞轮。"
    },
    {
      region: "🇨🇳 中国",
      color: "#E03D1E",
      tagline: "场景落地 × 硬件集成 × 本土生态",
      desc: "以场景规模化落地为核心竞争力：理想 / 华为在智驾垂直整合全球领先，字节 / 快手视频生成追平硅谷，DeepSeek 以极低成本重构模型训练认知。受出口管制倒逼，国产芯片与全栈 AI 自主化加速。"
    },
    {
      region: "🇪🇺 欧洲",
      color: "#7C3AED",
      tagline: "主权 AI × 监管制度 × 垂直专精",
      desc: "Mistral（法国）以开源追求欧洲 AI 主权；德国 Aleph Alpha 深耕政企安全合规市场。欧盟 AI Act 是全球首个 AI 监管法规，欧洲正以「负责任 AI」为差异化路径，而非正面对抗美中算力竞赛。"
    },
    {
      region: "🌏 东南亚 / 印度",
      color: "#059669",
      tagline: "用户规模 × 本地化 × 后发优势",
      desc: "印度 Sarvam / Krutrim 专注本土语言大模型，借助 14 亿人口市场形成差异化壁垒。东南亚是中美 AI 产品出海的核心战场，Grab / Sea 等生态型平台正快速 AI 化，争夺下一批 10 亿用户。"
    }
  ],

  /* 公司画像（点击公司标签时展示）*/
  company_profiles: {
    "OpenAI":           { track:"闭源 LLM · 通用助手", products:"GPT-4o、ChatGPT、Sora、o3", desc:"全球 AI 商业化标杆，ChatGPT 月活超 3 亿，估值超 $1570 亿。以闭源旗舰模型为核心，向消费端与企业端双向扩张。" },
    "Google DeepMind":  { track:"基础模型 · 科学 AI", products:"Gemini 2.0、AlphaFold 3、Google TPU v5", desc:"谷歌旗下 AI 研究机构，Gemini 系列驱动全系 Google 服务，AlphaFold 3 荣获诺贝尔化学奖贡献，前沿研究实力行业顶尖。" },
    "Anthropic":        { track:"闭源 LLM · 安全 AI", products:"Claude 3.7、Claude Code", desc:"前 OpenAI 团队创立，以 AI 安全为核心差异化，Claude 系列在长文档与代码领域综合领先，企业市场渗透率快速提升。" },
    "Meta AI":          { track:"开源 LLM · 多模态", products:"Llama 4、Code Llama", desc:"Meta 开源战略核心执行者，Llama 系列是全球最大开源模型生态，用开源补贴生态、对抗 OpenAI 的商业封闭策略。" },
    "Microsoft":        { track:"AI 平台 · 编程助手", products:"Azure AI、GitHub Copilot、Copilot", desc:"OpenAI 最大股东，通过 Azure AI 和 Copilot 全面 AI 化 Office/云服务，企业 AI 平台市场份额全球第一。" },
    "NVIDIA":           { track:"AI 芯片 · 网络互联", products:"H200、GB200、NVLink 5、CUDA", desc:"AI 算力垄断者，H100/H200 GPU 全球市占率超 80%，CUDA 生态构筑深厚护城河，市值一度超 $3.3 万亿。" },
    "Amazon":           { track:"云 AI 平台 · 推理芯片", products:"AWS Bedrock、Trainium2、Alexa+", desc:"全球最大云厂商，通过 AWS Bedrock 提供多模型 API，自研 Trainium/Inferentia 降低算力成本，Alexa+ 全面 AI 化。" },
    "DeepMind":         { track:"基础研究 · 科学 AI", products:"AlphaFold、Gemini、AlphaCode", desc:"成立于伦敦的顶尖 AI 研究机构，被谷歌收购后持续引领科学 AI 突破，AlphaFold 解决蛋白质折叠难题。" },
    "Wayve":            { track:"自动驾驶 · 具身智能", products:"LINGO-2、AV2.0", desc:"英国自动驾驶独角兽，以端到端学习为核心，用 LLM 驱动驾驶决策，软银、英伟达联合投资，估值超 $10 亿。" },
    "ARM":              { track:"AI 芯片架构", products:"Cortex-X925、Ethos NPU", desc:"全球移动端芯片架构垄断者，几乎所有手机 AI 芯片均基于 ARM 架构，AI PC 与车规芯片扩展中。" },
    "Mistral AI":       { track:"开源 LLM", products:"Mistral Large、Mixtral 8x22B", desc:"法国 AI 独角兽，以高效开源模型著称，Mixtral MoE 架构性价比惊艳业界，获欧盟扶持，估值超 $60 亿。" },
    "DeepSeek":         { track:"开源 LLM · 推理模型", products:"DeepSeek V3、DeepSeek R1", desc:"中国 AI 黑马，以极低训练成本（$600 万）打造比肩 GPT-4 的开源模型，R1 推理能力震惊全球，引发 AI 降本浪潮。" },
    "理想汽车":         { track:"具身智能 · 智能驾驶", products:"MindVLA、Mach100、MindSim、NOA", desc:"中国具身智能先行者，自研端到端 VLA 模型 MindVLA，算力平台 Mach100 达 2560 TOPS，城区 NOA 脱手率 89%。" },
    "华为":             { track:"AI 芯片 · 基础模型 · 气象 AI", products:"昇腾 910C、盘古大模型、盘古气象", desc:"中国算力自主化核心力量，昇腾 910C 对标 H100，盘古系列覆盖通用与垂直领域，气象大模型商业化落地。" },
    "百度":             { track:"闭源 LLM · AI 搜索", products:"文心 4.0、文小言、ERNIE Bot", desc:"中国最早布局大模型的互联网巨头，文心系列日调用超 15 亿次，深度融合百度搜索与知识图谱，AI 搜索转型先行。" },
    "阿里云":           { track:"开源 LLM · 云 AI 平台", products:"Qwen3、通义千问、阿里云百炼", desc:"中国最大云厂商，Qwen3 开源版全球下载量前三，阿里云百炼提供企业 AI 全链路服务，国内 AI 平台市场第一。" },
    "腾讯混元":         { track:"基础模型 · 多模态", products:"混元大模型、腾讯元宝", desc:"腾讯自研大模型，深度融合微信、企业微信 12 亿用户生态，在中文理解与多模态交互领域持续迭代。" },
    "宇树科技":         { track:"具身智能 · 人形机器人", products:"Unitree H1、G1、B2", desc:"全球人形机器人出货量最大厂商，G1 售价 $16,000 颠覆市场预期，已出口至多个国家，具身智能商业化领跑者。" },
    "字节跳动":         { track:"视频生成 · 智能体 · 助手", products:"Seedance、即梦 AI、扣子 Coze、豆包", desc:"中国 AI 应用矩阵最全的互联网公司，豆包月活国内第一，即梦/Seedance 视频生成领先，扣子智能体平台开发者数量最多。" },
    "TSMC AI 制造":     { track:"AI 芯片制造 · 先进封装", products:"CoWoS、N3 工艺、N2 工艺", desc:"全球最先进半导体制造商，为 NVIDIA/Apple/AMD 代工全部旗舰芯片，CoWoS 封装技术是 AI 芯片性能的关键支撑。" },
    "MediaTek Dimensity AI": { track:"端侧 AI 芯片", products:"Dimensity 9400、天玑 AI", desc:"台湾移动芯片巨头，Dimensity 9400 内置 APU 专用 AI 引擎，端侧大模型推理能力比肩苹果 A18。" },
    /* 印度 */
    "Sarvam AI":          { track:"语音 AI · 本土语言大模型", products:"Sarvam-2B、SpeechToText API", desc:"获英伟达与微软输血的印度 AI「国家队」，死死咬住本土 22 种官方语言的语音下沉与政企主权红利。" },
    "Krutrim":            { track:"本土基础大模型 · AI 云底座", products:"Krutrim LLM、Krutrim Cloud", desc:"印度本土首家 AI 独角兽，已放弃硬件芯片自研，全面转向构建 Indic 语料基础大模型与本土 AI 云底座。" },
    "Ola AI":             { track:"出行 AI · 具身应用", products:"Krutrim AI for EV", desc:"依托庞大的两轮电动车与网约车供应链，是印度极少数具备本土物理实体数据、主攻出行场景的具身应用尝试者。" },
    /* 法国 */
    "H Company":          { track:"Agent AI · 自动化工作流", products:"HRA Agent Framework", desc:"由 DeepMind 前顶级科学家创立，主攻大模型在 Agent 与自动化工作流中的工业级落地，是欧洲最顶尖的具身与主动作业技术输出者。" },
    /* 中东 */
    "NEOM AI":            { track:"主权 AI · 智慧城市", products:"NEOM AI Platform、Tonomus", desc:"沙特 NEOM 超级城市项目旗下 AI 部门，依托 PIF 千亿美元主权基金，打造全球最大规模 AI 原生智慧城市实验场，是中东数字主权建设的最前沿样板。" },
    "PIF AI Fund":        { track:"主权投资 · AI 生态基金", products:"沙特公共投资基金 AI 专项", desc:"沙特公共投资基金（PIF）旗下 AI 专项投资部门，管理规模超 7000 亿美元，战略押注英伟达、SoftBank Vision Fund 及区域 AI 基础设施，是全球 AI 最重要的主权资本力量之一。" },
    "TII Falcon":         { track:"开源大模型 · 主权 AI", products:"Falcon 180B、Falcon 40B", desc:"由阿联酋技术创新研究所（TII）全资打造的开源大模型巨擘，依靠纯粹的王室主权资金硬堆算力，常年高居 Hugging Face 开源榜单前列，是中东向全球输出「算力普惠」的外交名片。" },
    "G42 Cloud":          { track:"中东 AI 云 · 主权数据节点", products:"G42 Cloud Platform、AI Hub", desc:"阿联酋国家级 AI 与云计算独角兽，深度绑定微软与英伟达（获微软 15 亿美元战略投资），作为中东最大的中立主权数据节点，是美中科技巨头进入中东及非洲市场的「必经引渡桥梁」。" },
    /* 马来西亚 */
    "Microsoft SEA DC":   { track:"算力基础设施 · 数据飞地", products:"Azure Malaysia Region、AI Hub SEA", desc:"微软在东南亚的核心算力据点，依托马来西亚低税收与充足电力，成为承接硅谷巨头亚太算力外包与主权数据隔离的黄金数据飞地。" },
    "Petronas Digital":   { track:"工业 AI · 能源数字化", products:"Petronas AI for Upstream、SupplyChain AI", desc:"马来西亚国家石油公司旗下数字化巨擘，将 AI 算法全面注入深海勘探与跨国供应链，是东南亚传统重工业向物理 AI 转型的重要前哨。" },
    /* 日本 */
    "Sakana AI":          { track:"进化模型 · 小参数创新", products:"EvoLLM-JP、Sakana Model Fusion", desc:"由 Transformer 核心作者之一创立，首创「进化模型合并」技术，让小模型通过类生物进化方式自动繁衍融合，是全球小参数低功耗算法创新的天花板。" },
    "SoftBank AI":        { track:"日语基础大模型 · AI 算力", products:"SoftBank LLM、Vision Fund AI Portfolio", desc:"依托孙正义庞大的全球科技投资版图，通过扫货英伟达高端算力构建日本本土最大规模日语母语基础大模型，是日本政企市场无可替代的 AI 算力与主权生态巨无霸。" },
    "Toyota Research":    { track:"具身智能 · 工业机器人", products:"Large Behavior Model (LBM)、TRI Diffusion Policy", desc:"丰田旗下硬核物理 AI 前哨，全球率先跑通基于「扩散策略（Diffusion Policy）」的机器人行为操控，手握全球最庞大汽车与精细工业实体数据，是具身智能运动控制的绝对隐形巨头。" },
    /* 韩国 */
    "Naver":              { track:"主权 LLM · 本土互联网 AI", products:"HyperCLOVA X、CLOVA AI", desc:"韩国绝对的本土互联网巨头，死守具有极高语言与文化壁垒的独家母语数据，构建了全韩最强的 HyperCLOVA 主权大模型生态，有效抵御硅谷巨头长驱直入。" },
    "三星电子/SK海力士":   { track:"HBM 内存 · 半导体制造", products:"HBM3E、LPDDR5X、CXL Memory", desc:"全球半导体供应链的「硬核肉身」，卡死了 AGI 时代不可或缺的 HBM（高带宽内存）核心命脉，是全球 AI 算力巨兽（如英伟达）背后最具垄断性的硬件地基支撑者。" },
    /* 中国新增 */
    "智谱AI":             { track:"全栈大模型 · 企业 Agent", products:"GLM-4、CogVideo、智谱 AI 开放平台", desc:"已上市的中国全栈大模型先锋，API 调用量季度暴涨 400%，统治本土企业级 Agent 与私有化市场，市值破 4000 亿港元。" },
    "月之暗面":           { track:"长文本 LLM · 海外增长", products:"Kimi K2.5、Kimi AI Assistant", desc:"估值突破 200 亿美元的超级独角兽，Kimi K2.5 深度绑定行动框架，从「长文本天花板」实现到海外月增 170% 的应用端极限狂飙。" },
    "小米":               { track:"人车家 AI 生态 · 具身智能", products:"CyberOne 机器人、小米 SU7、HyperOS AI", desc:"依托恐怖的智能硬件生态与汽车/手机全闭环供应链，是全球极少数能将「人车家全生态」与具身大模型无缝软硬解耦的量产巨鳄。" }
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
    analogy: {
      cloud: { name: "云端 AI 智囊团", icon: "☁️", desc: "博学但远在天边，通过电话（网络）交流，慢且贵。代表：ChatGPT、Claude" },
      edge:  { name: "端侧 AI 特种兵", icon: "⚡", desc: "就在你身边，反应快、保护隐私、断网也能作战。代表：Apple Intelligence、理想 MindVLA" },
      trend: "2026 年主流趋势是「端云协同」——高频 / 私密 / 实时任务在端侧，复杂搜索 / 海量推理 / 非实时任务交云端"
    },
    auto_reasons: [
      { icon: "🛡️", title: "生命安全（零延迟）",  color: "#E03D1E",
        desc: "时速 120km/h 时每毫秒延迟都关乎生死。云端 200ms 网络抖动不可接受，智驾决策必须在端侧本地闭环" },
      { icon: "🏠", title: "隐私与私密空间",      color: "#7C3AED",
        desc: "车内是家庭空间延伸。座舱对话、车内摄像头画面不应上传云端，本地推理是合规底线" },
      { icon: "📡", title: "网络可靠性",           color: "#2563EB",
        desc: "隧道 / 地库 / 偏远山区信号中断。AI 助手和智驾不能因「没信号」就罢工" }
    ],
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

  /* 02 · 算力铁三角：芯片 · 内存 · 功耗与散热 */
  hw_components: [
    {
      id: "chip", name: "芯片", full: "训练芯片 · 推理芯片", en: "AI Chips",
      icon: "⚙️", color: "#1A1816",
      challenge: "训练靠算力堆叠，推理靠能效取胜——同一块芯片很难同时做到两者极致，玩家与诉求截然不同。",
      metaphor: "算力引擎",
      metaphor_desc: "分为训练与推理两大战场，决定 AI 能跑多快、跑多远",
      desc: "<div style='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px'><div style='background:var(--bg);border-left:3px solid #1A1816;border-radius:0 6px 6px 0;padding:10px 12px'><div style='font-family:var(--mono);font-size:10px;font-weight:700;color:#1A1816;letter-spacing:.05em;margin-bottom:5px'>训练芯片</div><div style='font-size:11.5px;color:var(--i2);line-height:1.6'>追求峰值算力（FP16/BF16），以数据中心 GPU 为主。衡量指标是千卡集群吞吐量。代表：NVIDIA H200 · 华为昇腾 910C · AMD MI300X</div></div><div style='background:var(--bg);border-left:3px solid #D97706;border-radius:0 6px 6px 0;padding:10px 12px'><div style='font-family:var(--mono);font-size:10px;font-weight:700;color:#D97706;letter-spacing:.05em;margin-bottom:5px'>推理 / 端侧芯片</div><div style='font-size:11.5px;color:var(--i2);line-height:1.6'>追求 TOPS/W 能效，落地于汽车、眼镜、手机。自研浪潮（Tesla FSD · 理想 Mach 100 · 苹果 M4）正在颠覆「必须买英伟达」的共识</div></div></div>",
      specs: [
        { k: "训练旗舰",      v: "NVIDIA H200 · 华为昇腾 910C · AMD MI300X" },
        { k: "推理旗舰",      v: "英伟达 Thor 2000 TOPS · 理想 Mach 100 2560 TOPS" },
        { k: "L9 Livis 方案", v: "骡龙 8295（座舱）+ Mach 100（智驾）+ 525M（辅助域）" },
        { k: "能效标准",      v: "12+ TOPS/W（2026 车规推理基准）" }
      ],
      rivals: [
        {
          name: "英伟达 NVIDIA", role: "训练 + 推理双霸主",
          icon: "⚡", color: "#76B900",
          products: "H200 / B200（训练）· Orin 254 TOPS · Thor 2000 TOPS（推理）",
          strategy: "掌控约 80% AI 训练市场；Orin 是 L2+ 智驾主流平台，Thor 锁定 L3/L4 天花板，CUDA 生态是最深的护城河",
          verdict: "短期内无可替代，但高价格与出口管制正在加速国产替代"
        },
        {
          name: "高通 Qualcomm", role: "座舱推理领导者",
          icon: "📱", color: "#E03D1E",
          products: "骡龙 8295 Hexagon NPU（45 TOPS）· Snapdragon Digital Chassis",
          strategy: "统治智能座舱 AI（语音·人脸·DMS），功耗极优 <5W；以「舱驾一体」战略向智驾延伸",
          verdict: "座舱推理的默认底座，算力上限制约其进入高阶智驾"
        },
        {
          name: "理想 · Tesla 自研", role: "垂直整合颠覆者",
          icon: "🎯", color: "#D97706",
          products: "理想 Mach 100（2560 TOPS · 12.8 TOPS/W）· Tesla FSD HW4/HW5",
          strategy: "绕开外部供应商，软硬协同深度定制；Mach 100 是中国首款量产 VLA DSA 芯片，Tesla FSD 芯片已迭代至第五代",
          verdict: "自研芯片是「算法 × 硬件」护城河的终极形态，引领行业跟进"
        },
        {
          name: "华为 · AMD", role: "国产替代 · 训练挑战者",
          icon: "🛡️", color: "#2563EB",
          products: "华为昇腾 910C（国内对标 H100）· AMD MI300X",
          strategy: "华为昇腾是中国算力自主化核心，出口管制下唯一规模量产的国产训练芯片；AMD 以更低价格切入英伟达腹地",
          verdict: "训练市场的两条替代路径：国产自主（华为）与英美系备选（AMD）"
        }
      ]
    },
    {
      id: "memory", name: "内存", full: "LPDDR · DDR · HBM", en: "Memory & Bandwidth",
      icon: "🚄", color: "#2563EB",
      challenge: "「内存墙」困境：NPU 算力空转，数据搬运能耗远超计算本身，边缘设备发烫、数据中心电费暴涨。",
      metaphor: "运粮通道",
      metaphor_desc: "芯片算力再强，内存带宽不足就会「算力空转」",
      desc: "<div style='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px'><div style='background:var(--bg);border-left:3px solid #2563EB;border-radius:0 6px 6px 0;padding:10px 12px'><div style='font-family:var(--mono);font-size:10px;font-weight:700;color:#2563EB;letter-spacing:.05em;margin-bottom:5px'>边缘 / 车载</div><div style='font-size:11.5px;color:var(--i2);line-height:1.6'>LPDDR5x 为主（低功耗、高频、贴近 SoC）。三星 / SK海力士 / 美光 / 长鑫存储（CXMT）激烈竞争，国产替代正在加速</div></div><div style='background:var(--bg);border-left:3px solid #1A1816;border-radius:0 6px 6px 0;padding:10px 12px'><div style='font-family:var(--mono);font-size:10px;font-weight:700;color:#1A1816;letter-spacing:.05em;margin-bottom:5px'>数据中心训练</div><div style='font-size:11.5px;color:var(--i2);line-height:1.6'>HBM3e 为主（高带宽内存，封装在 GPU die 旁），带宽达 5 TB/s。几乎只有三星与 SK 海力士能做，是比芯片更隐形的算力瓶颈</div></div></div>",
      specs: [
        { k: "LPDDR5x 带宽", v: "900 GB/s（车规新一代标准）" },
        { k: "HBM3e 带宽",   v: "5 TB/s（NVIDIA H200 封装）" },
        { k: "7B 模型搬运",  v: "14 GB ÷ 900 GB/s ≈ 15 ms/次" },
        { k: "车规认证",     v: "AEC-Q100 Grade 1（-40°C ～ 105°C，寿命 10 年+）" }
      ],
      rivals: [
        {
          name: "三星 Samsung", role: "综合存储最强",
          icon: "⚔️", color: "#1E3A5F",
          products: "LPDDR5x · HBM3 · eUFS 4.0 汽车版",
          strategy: "全线覆盖边缘与数据中心，HBM 与 SK 海力士并列双寡头，LPDDR5x 凭借超大产能打价格战",
          verdict: "规模最大、产品线最全，但 HBM 良率与 SK 海力士仍有差距"
        },
        {
          name: "SK 海力士", role: "HBM 绝对领导者",
          icon: "🥇", color: "#E03D1E",
          products: "HBM3e（独供 NVIDIA H200）· LPDDR5x",
          strategy: "HBM3e 独家为英伟达 H200 供货，是当前 AI 训练内存的最关键节点；与英伟达深度绑定",
          verdict: "AI 军备竞赛中最受益的「卖铲人」，市值已超传统半导体巨头"
        },
        {
          name: "美光 Micron", role: "车规存储深耕者",
          icon: "🔵", color: "#2563EB",
          products: "Automotive LPDDR5x · UFS 4.0 车规版 · HBM3e（追赶中）",
          strategy: "在汽车存储市场布局最深，全系 AEC-Q100 认证，是国内外主流车企首选；HBM 产能追赶三星与 SK",
          verdict: "软件定义汽车时代最大受益者，车规存储市场增速远超手机"
        },
        {
          name: "长鑫存储 CXMT", role: "国产替代先锋",
          icon: "🇨🇳", color: "#059669",
          products: "LPDDR5（国产量产）· DDR5（研发中）",
          strategy: "中国唯一量产 DRAM 的厂商，受出口管制催化加速扩产；主攻国内汽车与消费电子，与华为、比亚迪深度合作",
          verdict: "良率与带宽仍落后三代，但政策支持 + 大客户背书正在快速补齐"
        }
      ]
    },
    {
      id: "power", name: "功耗与散热", full: "能效 · 热设计 · 电力供给", en: "Power & Thermal",
      icon: "🌡️", color: "#D97706",
      challenge: "芯片越强越烫：车规热预算约 200W；数据中心层面，电力正在取代芯片，成为下一个算力瓶颈。",
      metaphor: "隐形天花板",
      metaphor_desc: "TOPS 是宣传数字，TOPS/W 才是工程红线",
      desc: "<div style='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px'><div style='background:var(--bg);border-left:3px solid #D97706;border-radius:0 6px 6px 0;padding:10px 12px'><div style='font-family:var(--mono);font-size:10px;font-weight:700;color:#D97706;letter-spacing:.05em;margin-bottom:5px'>端侧 · 芯片能效</div><div style='font-size:11.5px;color:var(--i2);line-height:1.6'>TOPS/W（每瓦算力）是真正的工程红线。理想 Mach 100 以 12.8 TOPS/W 树立量产标杆；车规整车热预算约 200W</div></div><div style='background:var(--bg);border-left:3px solid #7C3AED;border-radius:0 6px 6px 0;padding:10px 12px'><div style='font-family:var(--mono);font-size:10px;font-weight:700;color:#7C3AED;letter-spacing:.05em;margin-bottom:5px'>数据中心 · 电力供给</div><div style='font-size:11.5px;color:var(--i2);line-height:1.6'>Goldman Sachs 预测 AI 用电 2030 年增长 160%。爱尔兰 / 荷兰已对新建数据中心限电——电力正在成为算力扩张的硬上限</div></div></div>",
      specs: [
        { k: "端侧能效标杆",  v: "理想 Mach 100：12.8 TOPS/W（2026 量产最高）" },
        { k: "车规热预算",    v: "域控合计 <200W（整车散热约束）" },
        { k: "数据中心 PUE", v: "海底中心 1.076 vs 陆地中心 1.3+（用电效率对比）" },
        { k: "电力增速预测",  v: "AI 数据中心用电 2030 年增长 160%（Goldman Sachs）" }
      ],
      rivals: [
        {
          name: "理想 · Tesla 端侧自研", role: "车规能效标杆",
          icon: "🎯", color: "#D97706",
          products: "Mach 100（12.8 TOPS/W）· Tesla FSD HW4（感知-规控一体低功耗）",
          strategy: "软硬协同定制让功耗最小化：Mach 100 专为 MindVLA 模型裁剪指令集，避免通用芯片的冗余能耗",
          verdict: "端侧 AI 能效的天花板，自研路线的核心竞争优势之一"
        },
        {
          name: "液冷散热方案", role: "数据中心热管理",
          icon: "💧", color: "#2563EB",
          products: "Google / Microsoft 浸没式液冷集群 · NVIDIA GB200 NVL72 液冷机架",
          strategy: "AI 芯片功耗密度已超传统风冷极限；NVIDIA GB200 整机柜要求液冷基础设施，推动数据中心大规模改造",
          verdict: "液冷从可选变必选，是 2025–2027 年数据中心最大基建投资方向"
        },
        {
          name: "核电 · 清洁能源直购", role: "长期电力供给",
          icon: "⚛️", color: "#059669",
          products: "Google · Kairos Power SMR · 微软 · 三里岛核电复活 · Amazon 宾州核电园区",
          strategy: "三大科技巨头已签订核电长期 PPA；小型模块化核反应堆（SMR）成为 2030 年后 AI 数据中心自供电核心路线",
          verdict: "「算力即电力」已成共识——谁掌握稳定清洁电源，谁就掌握下一轮扩张的主动权"
        },
        {
          name: "海底数据中心", role: "散热 + 电力一体化",
          icon: "🌊", color: "#7C3AED",
          products: "海兰信 · 中国电建（海南陵水，2025–2027 投产）· Microsoft Project Natick",
          strategy: "深海恒温海水免费散热，PUE 低至 1.076；选址近海上风电，实现算力与绿电就近耦合",
          verdict: "极致能效解法——用物理降温代替机械制冷，是散热与电力问题的一体化答案"
        }
      ]
    }
  ],

  /* 03 · 帕累托前沿 & 模型蒸馏 */
  pareto_new: {
    insight: "端侧 AI 的核心命题：不需要最大的模型，需要最适合硬件的「精炼模型」",
    pareto_intro: {
      analogy: "想象参加一场生存挑战（在手机 / 汽车上跑 AI）：你希望装备越全越好（精度、智能），又希望负重越轻越好（低功耗、少内存、快反应）。这两个目标天然互斥——把二者关系画在坐标轴上，「不增加负重就已把装备带到最全」的那条边缘曲线，就是帕累托前沿。",
      states: [
        { label: "落后状态", icon: "⚠️", color: "#D97706", desc: "AI 占用 20GB 内存，反应还慢——说明还没到「前沿」，仍有大量优化空间" },
        { label: "前沿状态", icon: "✓",  color: "#059669", desc: "在仅 2GB 内存约束下，你的 AI 已是全世界同体积最聪明——这才是帕累托前沿" }
      ],
      scope: [
        { icon: "📱", label: "消费电子",   desc: "AI 眼镜散热空间极小、手机电池受限" },
        { icon: "🚗", label: "车载 / 机器人", desc: "实时决策、断网不停、延迟致命" },
        { icon: "✈️", label: "无人区场景", desc: "航天 / 军事——无网络仍需高精度决策" }
      ]
    },
    distill_intro: {
      analogy: "蒸馏 = AI 界的「脱水浓缩」——老师不只告诉学生「这是猫」，而是告诉学生「我之所以认为这是猫，是因为我看到了这些特征的概率分布」。学生学会的是思维逻辑，而非死记答案。",
      conclusion: "2026 年顶尖 AI 工程师不再是「写代码的」，而是「调天平的」——在算力、延迟、精度之间找到最完美的平衡点"
    },
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

  /* S02-01 · 三面墙 */
  s2_barriers: {
    headline: "发展的困境：撞上物理世界的「三面墙」",
    tagline: "AI 降临物理世界时，遭遇了三道根本性障碍——每一道都不是技术问题，而是物理定律",
    walls: [
      {
        id: "software",
        icon: "💻",
        name: "软件墙",
        title: "长尾场景的「逻辑黑盒」",
        color: "#2563EB",
        points: [
          { label: "黑盒对齐难题", text: "传统软件是 If-Then，出错了好修；但 AI 是概率模型，如何保证它在复杂物理世界（如闹市穿行）中不犯「莫名其妙」的错误？软件安全对齐成为行业新命题。" },
          { label: "长尾场景枯竭", text: "靠人工写代码已无法覆盖海量驾驶 / 生活场景（Corner Cases），软件进化的速度被「真实数据获取成本」严重卡住。" },
          { label: "软件臃肿化", text: "模型越来越大，如不做压缩手术，软件将直接「撑死」硬件存储——大象装不进冰箱。推理能力与硬件承载力之间的鸿沟日益扩大。" }
        ]
      },
      {
        id: "hardware",
        icon: "⚙️",
        name: "硬件墙",
        title: "传统架构的「性能枷锁」",
        color: "#D97706",
        points: [
          { label: "冯·诺依曼瓶颈", text: "数据在存储和计算单元之间搬运的能耗，远大于计算本身——芯片 90% 的功耗浪费在「搬数据」上，而非真正思考。这是传统 CPU/GPU 的结构性缺陷。" },
          { label: "功耗与散热极限", text: "眼镜、车机等硬件形态体积有限。芯片过热后 AI 会因降频变笨，导致「聪明不过三秒」——物理散热成为智能上限的硬约束。" },
          { label: "传感器数字洪流", text: "硬件感知到的数据量极大，但现有处理总线无法实时消化这些「数字洪流」——感知与处理之间存在根本性的架构不匹配。" }
        ]
      },
      {
        id: "cloud",
        icon: "☁️",
        name: "云端墙",
        title: "物理世界的「通信铁律」",
        color: "#E03D1E",
        points: [
          { label: "不可跨越的延迟", text: "光速和网络层级的物理限制，决定了云端大脑永远无法实现毫秒级紧急避险反馈。智驾或机器人操作中，50ms 的延迟即意味着事故——这是自然法则，不是工程问题。" },
          { label: "带宽成本雪崩", text: "数千万台终端如果实时上传高清视觉流，运营商带宽成本和企业服务器成本将直接击穿商业模式——云端 AI 大规模部署的商业天花板已清晰可见。" }
        ]
      }
    ]
  },

  /* S02-03 · 终局畅想 */
  s2_endgame: {
    headline: "终局畅想",
    tagline: "2026 年，能在「帕累托前沿」站稳脚跟的玩家，将赢得物理 AI 时代的决赛入场券",
    visions: [
      {
        icon: "🔗",
        title: "软硬「共生体」",
        color: "#1A1816",
        desc: "硬件不再是容器，而是 AI 本能的延伸。AI 拥有了「物理直觉」，硬件拥有了「思维能力」——两者的边界消失，形成自然生长的共生系统。算法逻辑直接「烧录」进硅片，不再是软件 + 硬件的拼接，而是一体化的智能有机体。"
      },
      {
        icon: "📐",
        title: "帕累托前沿的「生存位」",
        color: "#2563EB",
        desc: "行业胜出的标准：在保持最高「智商」（推理能力）的同时，实现最低的能耗与延迟。在功耗 <50W 与极端体积约束下，压榨出最高的推理效率——这道窄门，只有软硬协同自研的玩家才能通过。"
      }
    ]
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

  /* NEW · 大模型格局 */
  model_landscape: {
    insight: "2026 年大模型进入「下半场」：开源与闭源能力差距快速收窄，推理成本两年下降 100×，竞争焦点从「谁最聪明」转向「谁生态最强」与「谁最便宜」",
    camps: [
      {
        id: "closed", name: "闭源旗舰", color: "#1A1816",
        tagline: "质量领先，护城河在生态与安全合规",
        players: [
          { name: "OpenAI",        models: "GPT-4o · o3 · GPT-4.5",
            edge: "全球最大用户基础，月活 3 亿，企业市场份额第一",
            risk: "估值超 $1570 亿，商业化重压靠订阅 + API；开源竞争持续压价" },
          { name: "Anthropic",     models: "Claude 3.7 · Claude Opus 4.6",
            edge: "代码与长文档领先，企业安全合规口碑最强，Claude Code 快速渗透开发者",
            risk: "市场认知不及 OpenAI，主要依赖企业市场差异化" },
          { name: "Google DeepMind", models: "Gemini 2.0 · Gemini 2.5 Pro",
            edge: "2M token 超长上下文，Search + YouTube 数据护城河，TPU 算力自研",
            risk: "Bard→Gemini 品牌迭代混乱，用户心智落后 ChatGPT" }
        ]
      },
      {
        id: "open", name: "开源生态", color: "#2563EB",
        tagline: "以开源换生态，成本降维打击闭源",
        players: [
          { name: "Meta AI",    models: "Llama 4（MoE 多模态）",
            edge: "全球最大开源生态，Facebook / Instagram 数据护城河",
            risk: "无直接商业化路径，完全依赖生态影响力变现" },
          { name: "DeepSeek",  models: "V3（闭源）· R1（开源推理）",
            edge: "以 $600 万训练成本比肩 GPT-4，重构行业成本曲线认知",
            risk: "团队规模小，数据安全受国际审查，持续迭代能力存疑" },
          { name: "阿里云 Qwen", models: "Qwen3（开源旗舰）",
            edge: "Hugging Face 下载量前三，全栈云服务协同，全球开发者覆盖",
            risk: "开源策略最激进，海外品牌认知度仍然较低" }
        ]
      },
      {
        id: "china", name: "国产矩阵", color: "#E03D1E",
        tagline: "本土化护城河 + 生态分发优势",
        players: [
          { name: "百度",      models: "文心 4.0 · ERNIE Speed",
            edge: "搜索 + 知识图谱数据，日调用超 15 亿次，本土部署合规优势",
            risk: "与字节 / 月之暗面竞争激烈，C 端增长失速" },
          { name: "月之暗面",  models: "Kimi 1.5 · Kimi k1.5",
            edge: "200 万字超长上下文，月活超 3000 万，推理能力国内领先",
            risk: "融资依赖度高，商业化路径仍处于探索期" },
          { name: "字节跳动",  models: "豆包 Pro · Seed 系列",
            edge: "抖音 / 飞书生态分发，AI 编程覆盖 280 万开发者，视频生成世界级",
            risk: "核心模型能力略弱，生态分发是主要竞争武器而非技术壁垒" }
        ]
      }
    ],
    challenges: [
      { icon: "💸", color: "#E03D1E", title: "成本内卷",
        desc: "推理成本两年下降 100×，API 趋近免费。在极低毛利率下生存，才是真正的竞争" },
      { icon: "📊", color: "#2563EB", title: "能力收敛",
        desc: "开源追闭源速度超预期：DeepSeek R1 开源，推理能力比肩 OpenAI o1，认知壁垒正在瓦解" },
      { icon: "🏰", color: "#7C3AED", title: "护城河稀薄",
        desc: "无数据飞轮和生态锁定的纯模型厂商面临「能力被复制、价格被打穿」双重压力" },
      { icon: "⚖️", color: "#059669", title: "监管合规",
        desc: "欧盟 AI Act、中国大模型备案、美国出口管制——合规成本与地缘因素成为隐形壁垒" }
    ]
  },

  /* NEW · 应用与场景 */
  app_landscape: {
    insight: "AI 应用已从「新鲜玩具」进入「留存竞争」阶段：用户习惯一旦形成就难以迁移，OS 级 / IDE 级分发入口正在决定最终格局",
    tracks: [
      { icon: "💻", name: "AI 编程助手", color: "#7C3AED",
        leaders_global: ["Cursor", "GitHub Copilot", "Windsurf"],
        leaders_cn: ["MarsCode（字节）", "通义灵码（阿里）"],
        dynamics: "Cursor 月活超 3000 万，「Vibe Coding」浪潮让非程序员也能开发应用；IDE 级分发是最深的护城河",
        challenge: "Microsoft 以 VS Code + Copilot 构建双重防线，新进入者须在垂直场景或体验层做到显著差异化" },
      { icon: "🔍", name: "AI 搜索", color: "#059669",
        leaders_global: ["Perplexity AI", "Google AI Overview"],
        leaders_cn: ["天工 AI（昆仑万维）", "秘塔 AI"],
        dynamics: "Perplexity 月活超 1 亿，以生成式答案取代传统蓝链；Google 用 AI Overview 全面防守",
        challenge: "商业化难点：原生搜索广告模式在生成式答案界面下失效，如何不破坏体验地变现" },
      { icon: "💬", name: "多模态助手", color: "#2563EB",
        leaders_global: ["ChatGPT", "Claude", "Gemini"],
        leaders_cn: ["Kimi（月之暗面）", "豆包（字节）"],
        dynamics: "竞争最激烈赛道；ChatGPT 月活 3 亿形成「ChatGPT = AI 助手」的心智锚点，留存率是分水岭",
        challenge: "后来者必须在垂直场景差异化（Kimi 长文档 / Claude 代码），否则只能打价格战" },
      { icon: "🎬", name: "视频生成", color: "#E03D1E",
        leaders_global: ["Sora（OpenAI）", "Runway Gen-3"],
        leaders_cn: ["可灵 2.0（快手）", "Seedance（字节）", "即梦 AI（字节）"],
        dynamics: "2024–2025 中国团队快速追平 Sora 物理真实感，「中美并肩」已成现实；主要商业化场景为创作者工具",
        challenge: "版权与肖像权未解决；算力成本极高；训练数据合规性面临法律挑战" },
      { icon: "🤖", name: "企业 Agent", color: "#D97706",
        leaders_global: ["Manus（Monica）", "Salesforce Agentforce"],
        leaders_cn: ["扣子（字节）", "智谱 Agent"],
        dynamics: "从「对话」到「行动」——Agent 可自主完成多步骤任务；RPA 向 AI-native 工作流迁移加速",
        challenge: "Hallucination 幻觉率是企业采用核心阻力；B 端私有化部署门槛远高于 C 端" }
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
    ai: "#E03D1E", chip: "#E03D1E", future: "#1A1816", launch: "#D97706"
  },

  /* 02 · 展望 2026 */
  lx_outlook_2026: {
    headline: "展望 2026 · 理想的三条战线",
    tagline: "根据理想 2025 年财报与 2026 年 5 月最新公开信息整理",
    pillars: [
      {
        id: "car",
        icon: "🚗",
        title: "汽车产品",
        subtitle: "底盘线控化与全线出海",
        color: "#1A1816",
        items: [
          {
            icon: "🎮",
            name: "线控底盘",
            en: "X-by-Wire",
            stat: "5 月 15 日交付",
            desc: "L9 Livis 搭载全线控底盘（线控转向、后轮转向、800V 主动悬架），李想明确定位为「全球化最后短板的答案」，对标超豪华品牌物理驾控极限。"
          },
          {
            icon: "📊",
            name: "产品矩阵下探",
            stat: "i6 单月贡献 2.4 万辆",
            desc: "理想 L6 与新款 i6（纯电轿车 / 轿跑）已成为销量支柱。2026 年 3 月交付量回升至 4.1 万辆，i6 占比超 60%，确立 20–30 万市场统治力。"
          },
          {
            icon: "⚡",
            name: "补能基建",
            stat: "超充站突破 4000 座",
            desc: "截至 2026 Q1，全国超充站已达 4000+ 座，大幅缓解纯电车型里程焦虑，为 i6 等纯电产品提供可靠的补能网络支撑。"
          }
        ]
      },
      {
        id: "ai",
        icon: "🧠",
        title: "AI 战略",
        subtitle: "从端到端到「物理智能体」",
        color: "#E03D1E",
        items: [
          {
            icon: "🤖",
            name: "MindVLA 2.0（o1 版）",
            stat: "NVIDIA GTC 2026 发布",
            desc: "定义为「通用物理智能体」而非单纯智驾模型。具备类 OpenAI o1 的推理能力，可理解复杂物理常识与长程逻辑，向机器人等场景延伸。"
          },
          {
            icon: "⚙️",
            name: "端侧算力闭环",
            en: "Mach 100",
            stat: "2026 年进入量产准备期",
            desc: "自研马赫 100 芯片针对 MindVLA 神经网络结构原生优化，旨在摆脱通用 GPU 依赖，提升端侧推理能效比，打通软硬一体护城河。"
          },
          {
            icon: "📡",
            name: "数据规模",
            stat: "6.4 亿 km · 368 城",
            desc: "截至 2026 年 5 月，累计行驶里程 6.4 亿公里，辅助驾驶覆盖城市 368 座。海量真实物理世界数据是模型持续迭代的核心燃料。"
          }
        ]
      },
      {
        id: "finance",
        icon: "💰",
        title: "财务投入",
        subtitle: "研发加码，AI 占比「压倒性」",
        color: "#2563EB",
        items: [
          {
            icon: "📈",
            name: "研发支出再创新高",
            stat: "2026 年预算 120 亿元",
            desc: "2025 年全年研发投入 113 亿元，2026 年预算进一步提升至 120 亿元。研发不再只是「造新车」，而是「造大脑」——AI 基础设施全面升级。"
          },
          {
            icon: "🎯",
            name: "AI 投入占比 50%",
            stat: "≈ 60 亿元 / 年专项 AI",
            desc: "理想明确规定研发费用的 50% 必须专项用于 AI 项目。这在整车行业属于极高比例，意味着每年约 60 亿人民币直接砸在算力和算法上。"
          },
          {
            icon: "🏦",
            name: "现金护城河",
            stat: "1012 亿元现金储备",
            desc: "截至 2025 年底现金储备 1012 亿元，支撑 2026 年 3 月启动的 10 亿美元股票回购计划，显示管理层对 AI 转型成功的高度自信。"
          }
        ]
      }
    ]
  },

  /* 03 · 核心技术突破 */
  lx_core_tech: {
    tabs: [
      {
        id: "car",
        label: "汽车产品",
        icon: "🚗",
        color: "#1A1816",
        subtitle: "从「移动空间」到「智慧生命体」",
        cards: [
          {
            icon: "🏠",
            title: "空间 Agent",
            subtitle: "L9 Livis 的交互革命",
            def: "汽车不再是被动等待指令的机器，而是具备主动感知能力的家庭成员——从「智能座舱（Smart Cockpit）」向「空间计算（Spatial Computing）」的跨越。",
            points: [
              { label: "多模态主动服务", text: "结合车内摄像头和传感器，Livis 能通过眼神、手势甚至情绪状态（MindVLA 2.0 提供支持）主动询问需求。例如感应到后排孩子睡着，自动调整温控和音响布局。" },
              { label: "全车意图对齐", text: "端侧算力驱动全车 7 麦克风精准定位，Livis 能处理「帮他打开那个」这类极其模糊、依赖上下文的复杂指令——从「声控」进化为真正的「意图理解」。" }
            ]
          },
          {
            icon: "🎮",
            title: "物理智能",
            subtitle: "线控底盘与算法的「神经耦合」",
            def: "将线控底盘（X-by-Wire）视作具身智能的「肌肉」，让 AI 直接驱动物理动作，实现数字决策与物理执行的毫秒级融合。",
            points: [
              { label: "AI 预判悬架", text: "MindVLA 2.0 通过感知路面起伏，提前 50ms 调整线控悬架阻尼，实现真正的「魔毯」体验——而非传统的被动响应。" },
              { label: "极限界计算", text: "Mach 100 芯片支持下，湿滑或极端避障场景中 AI 以 1000Hz+ 频率微调线控转向和制动，超越人类反应极限。" },
              { label: "全栈自研", text: "理想线控转向与线控制动系统实现全栈自研，在 L9 Livis 首发搭载，对标超豪华品牌物理驾控上限。" }
            ]
          },
          {
            icon: "⚡",
            title: "补能与续航",
            subtitle: "AI 驱动的能源管理系统",
            def: "用 AI 优化每一瓦电的去向。理想「双能战略」（电能 + 智能）的核心交汇点——让补能体验从「被动加油」变为「无感协同」。",
            points: [
              { label: "AI 节能 +12%", text: "MindVLA 2.0 对驾驶行为和温控进行微秒级优化，新款 i6 综合续航在冬季环境下比传统算法提升约 12%。" },
              { label: "云端协同补能", text: "5000+ 座超充站接入「能源大脑」，结合 MindSim 路况模拟和实时充电网信息，充电路线推荐精准度（含排队预测）达 98%。" },
              { label: "全场景能效优化", text: "实时微调热管理系统，根据驾驶员习惯和物理环境提升 i6 / L6 在极寒 / 极热环境下的实际续航。" }
            ]
          }
        ]
      },
      {
        id: "ai",
        label: "AI 技术",
        icon: "🧠",
        color: "#E03D1E",
        subtitle: "从「数字逻辑」到「具身智能体」",
        cards: [
          {
            icon: "🤖",
            title: "MindVLA 2.0",
            subtitle: "与物理世界的「对齐」",
            def: "不再是感知→规划→控制的分模块堆叠，而是视觉、语言、行动三位一体的通用物理智能体，具备类 o1 的长程推理能力，在 NVIDIA GTC 2026 上正式发布。",
            points: [
              { label: "从「看图说话」到「物理直觉」", text: "通过「世界模拟器」学习物理常识：下雨天路面湿滑制动距离需提前 20%；预判障碍物的质量与惯性——这是传统规则代码无法编写的隐性知识。" },
              { label: "极致的端侧闭环", text: "Mach 100 芯片加持下，通过模型蒸馏保持高性能，功耗仅为云端运行的 1/10。感知→决策→执行全链路延迟压缩至业界最低。" },
              { label: "L9 Livis 的灵魂", text: "Livis 不再是语音助手，而是基于意图交互（LUI）的「空间 Agent」——理解你「想要什么」，而非只响应「说了什么」。" }
            ]
          },
          {
            icon: "⚙️",
            title: "Mach 100 芯片",
            subtitle: "具身智能的「端侧强心脏」",
            def: "专为大模型推理设计的自研 DSA（专用架构）芯片，针对 MindVLA 2.0 的神经网络结构原生优化，而非通用 GPU 的降格使用，2026 年进入关键量产准备期。",
            points: [
              { label: "突破内存墙", text: "搭载自研 Ultra-HBM 接口，解决端侧运行大模型时最核心的吞吐量瓶颈，MindVLA 2.0 推理延迟降低 40%。" },
              { label: "异构计算优化", text: "针对 Transformer 架构进行指令集级别重构，运行 MindVLA 2.0 时能效比（Perf/Watt）比通用智驾芯片高出 3 倍。" },
              { label: "算法定义芯片", text: "彻底摆脱对通用芯片厂商依赖，理想可根据 MindVLA 2.0 演进实时微调下一代马赫芯片设计——软硬一体护城河的本质。" }
            ]
          },
          {
            icon: "🌐",
            title: "MindSim",
            subtitle: "AI 进化的「数字孪生加速器」",
            def: "基于物理引擎的超大规模世界模拟器。既然现实中的极端工况极难遇到，MindSim 就在虚拟世界中以 1000× 速度批量制造它们，成为 MindVLA 持续进化的核心燃料。",
            points: [
              { label: "生成即训练", text: "通过生成式 AI 每天制造 10 亿公里的复杂路况（暴雨中的逆行车辆、复杂路口的异形障碍物），突破真实数据瓶颈。" },
              { label: "物理常识注入", text: "模拟物体不仅有形状，还有质量、摩擦力和惯性。MindVLA 2.0 出厂前已在虚拟世界完成千万次「死亡学习」，具备真正的物理直觉。" },
              { label: "迭代飞轮", text: "MindVLA 从 1.0 到 2.0 的质变，50% 的功劳来自 MindSim 的千万次虚拟失败——极大缩短迭代周期，构筑持续领先的数据护城河。" }
            ]
          }
        ]
      }
    ]
  },

  /* 04 · 空间 Agent（保留数据，供兼容） */
  lx_space_agent: {
    tagline: "车不是交通工具，而是最大的移动 AI 硬件",

    /* ── 智驾能力三梯队 ── */
    adas_tiers: {
      insight: "自动驾驶能力呈现明显三级分化——ACC/LKA 是当前量产标配，高速 NOA 是新势力基线，全场景城市 NOA 才是真正拉开差距的分水岭。",
      tiers: [
        {
          id: "acc_lka",
          level: "L1 / L2",
          name: "ACC + LKA",
          name_full: "自适应巡航 + 车道保持",
          en: "Adaptive Cruise Control · Lane Keep Assist",
          color: "#8C8A86",
          icon: "🚗",
          desc: "基础执行反射——跟车保距（ACC）+ 居中行驶（LKA），需驾驶员持续监控，遇复杂路况必须接管。2020 年后量产车已接近全球标配。",
          brands: [
            { name: "丰田", system: "TSS 3.0 · Teammate", note: "全球覆盖最广，以辅助安全为核心，整体策略保守" },
            { name: "大众", system: "Travel Assist", note: "欧洲高速 L2，尚未进入 NOA 竞争" },
            { name: "本田", system: "Sensing Elite 2.0", note: "全球 L2 标配，旗舰车型开始测试高速 NOA" },
            { name: "宝马", system: "Drive Pro", note: "高速 L2++，限速 / 限场景下表现较好" },
            { name: "奔驰", system: "Drive Pilot", note: "德国高速 L3 认证（60 km/h 限速），覆盖场景极窄" }
          ]
        },
        {
          id: "highway_noa",
          level: "L2+",
          name: "高速 NOA",
          name_full: "高速领航辅助驾驶",
          en: "Highway Navigate on Autopilot",
          color: "#2563EB",
          icon: "🛣️",
          desc: "场景化决策——高速 / 快速路全程自主，自动变道、超车、匝道进出。是当前主流新势力的基线能力，城区仍需人工接管。",
          brands: [
            { name: "蔚来", system: "NOP+", note: "国内高速 + 快速路全覆盖，城市 NOA 部分城市推进中" },
            { name: "比亚迪", system: "DiPilot 300 / 500 · 天神之眼", note: "高速 NOA 全国可用，城市 NOA 逐步开放" },
            { name: "长城", system: "Coffee Pilot Ultra", note: "魏牌 / 坦克系列搭载，高速 NOA 主力平台" },
            { name: "极氪", system: "NZP · ROBO Drive", note: "极氪 001/007 高速 NOA + 部分城市开放" },
            { name: "特斯拉", system: "Enhanced Autopilot", note: "基础版仅含高速能力，FSD 需额外付费解锁城市" }
          ]
        },
        {
          id: "city_noa",
          level: "L2++",
          name: "全场景 NOA",
          name_full: "城市 + 高速全场景领航",
          en: "Full-Scene City & Highway NOA",
          color: "#E03D1E",
          icon: "🏙️",
          desc: "主动规划，端到端决策——从停车场到停车场全程接管，城区复杂路口、施工绕行、交警手势均可应对。是中美顶尖 AI 车企的真正分水岭。",
          brands: [
            { name: "理想汽车", system: "全场景 NOA · MindVLA 端到端", note: "高速 + 城市 + 泊车三段无缝，城市脱手率 89%", highlight: true },
            { name: "小鹏", system: "XNGP", note: "全国城市无图 NOA 先行者，高速泊车一体化" },
            { name: "华为 / 问界", system: "ADS 2.0", note: "城市 NOA 不依赖高精地图，复杂路口表现出色" },
            { name: "特斯拉", system: "FSD V12（端到端）", note: "城市 FSD 能力行业最强，国内版本仍在推进中" }
          ]
        }
      ]
    },

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

  /* 03 · 理想 i6/i8 & L9 Livis vs Tesla Model Y 对比 */
  comparison_table: {
    note: "两次试乘：第一次 理想 i6 / i8，第二次 理想 L9 Livis；对比 Tesla Model Y 现状",
    dims: [
      {
        dim: "空间设计逻辑",
        tesla:   { val: "极简工具思维",    detail: "冷色调、极简内饰（俗称「毛坯房」），侧重性能与驾驶者控制感。" },
        lixiang: { val: "温馨起居室思维",  detail: "暖色调软包、精致收纳，侧重全家人的「居住感」和情感溢价。" },
        livis:   { val: "沉浸式旗舰舱",    detail: "零重力大床座椅 + 航空级隔音，车身尺寸更大、座舱纵深更深，整体空间体验进一步升级。" },
        insight: { title: "从「车」到「家」", detail: "理想将汽车定义为移动的第三空间，i6/i8 侧重家庭日常出行的居住感，L9 Livis 在此基础上以旗舰尺寸和配置进一步强化这一体验。" }
      },
      {
        dim: "交互边界感",
        tesla:   { val: "单一集成中心",   detail: "几乎所有功能集成在中央大屏，副驾无专属娱乐权。" },
        lixiang: { val: "平权交互架构",   detail: "主副驾独立大屏 + 高清 HUD，信息流按需分配。" },
        livis:   { val: "多屏协同架构",   detail: "前排 29 寸全景屏 + 后排 21 寸 4K 独立屏，各席位信息主权完全独立，MindVLA Agent 统一调度。" },
        insight: { title: "交互主权的分割", detail: "理想的「屏幕哲学」本质是服务的精细化。L9 Livis 将 Agent 化交互延伸至每一位乘客，硬件布局彻底解决多人出行的需求冲突。" }
      },
      {
        dim: "声场处理",
        tesla:   { val: "全局播报",       detail: "导航会中断或降低音乐音量，全车同步接收。" },
        lixiang: { val: "主驾独立声场",   detail: "主驾枕侧 / 前侧定向音响播报导航，不干扰乘客。" },
        livis:   { val: "9.3.6 全景声矩阵", detail: "前排 + 二排 + 顶棚 + 头枕扬声器全覆盖的 9.3.6 环绕声，二排独立音区，主驾导航播报对后排完全无感知。" },
        insight: { title: "计算音频的降维打击", detail: "从主驾独立声场到全车声学分区，这是场景定义产品的典型进化——彻底解决家庭成员信息流与娱乐流的互斥痛点。" }
      },
      {
        dim: "智驾体感",
        tesla:   { val: "技术硬核但略显激进", detail: "操控精准，但对非专业司机有一定压迫感，刹车介入感明显。" },
        lixiang: { val: "类人丝滑（MindVLA）", detail: "避让行人与变道极其柔和，具备「老司机」式预判感。" },
        livis:   { val: "全场景无图 NOA",  detail: "MindVLA-o1 统一基座，城区复杂路口脱手率显著提升，变道决策与人类老司机几乎无差异。" },
        insight: { title: "信任感的建立", detail: "i6 的丝滑感已建立基础信任，L9 Livis 的全场景无图 NOA 则将这种信任延伸至陌生城市——这是 AI 智驾走向普适化的关键一跃。" }
      },
      {
        dim: "上手门槛",
        tesla:   { val: "学习曲线",       detail: "需要适应怀挡、屏幕控制开关等非常规操作，初次上手需适应期。" },
        lixiang: { val: "零压力接管",     detail: "极高清晰度的 AR HUD 让视线始终在路面，降低了驾驶焦虑，智驾接管感知自然。" },
        livis:   { val: "复合语音指令",    detail: "MindVLA-o1 支持「帮我导航回家顺路接孩子」等多步复合语音指令，与 i6/i8 同样无需触屏，但在指令理解复杂度上有所提升。" },
        insight: { title: "AR HUD + Agent 的战略价值", detail: "HUD 解决了视线不离路的问题，Agent 化语音则解决了「动手」的问题——i6/i8 已具备基础能力，L9 Livis 在复杂场景下的指令理解进一步完善。" }
      },
      {
        dim: "家庭角色照顾",
        tesla:   { val: "驾驶者导向",  detail: "后排 / 副驾体验相对单一，产品重心在驾驶者。" },
        lixiang: { val: "全员平权",    detail: "副驾屏、二排舒适性、独立音响——全家人都是产品的第一用户。" },
        livis:   { val: "旗舰级后排配置", detail: "二排零重力座椅、独立温控、隐私玻璃、专属娱乐屏，这些配置在 i6/i8 上部分可选，L9 Livis 作为旗舰车型将其全系标配。" },
        insight: { title: "配置策略的分层", detail: "i6/i8 已做到全家人都是第一用户，L9 Livis 将旗舰买家最关注的后排体验全面标配化——这是产品线的价格分层，而非理念上的不同。" }
      },
      {
        dim: "补能与效率",
        tesla:   { val: "依赖 Supercharger", detail: "充电网络密集但依赖专属桩，峰值功率 250kW（V3）。" },
        lixiang: { val: "5C 超快充",         detail: "配合 800V 高压平台，5C 倍率充电 12 分钟补能 80%。" },
        livis:   { val: "第三代 5C 增程",    detail: "第三代 5C 超级增程系统，纯电续航 420km，馈电油耗 6.3L/100km，增程彻底消除长途里程焦虑。" },
        insight: { title: "续航焦虑的物理解", detail: "5C 超级增程将「充电 12 分钟补能 80%」的快充体验与增程兜底结合——让「续航焦虑」这个话题在 L9 Livis 车主语境里彻底失效。" }
      }
    ]
  },

  /* ─── S01-06 · 形态展望 ─────────────────────── */
  form_factor: {
    software: {
      label: "软件",
      icon: "💻",
      color: "#2563EB",
      tagline: "从工具到智能体 — AI 重塑软件的三场革命",
      tracks: [
        {
          id: "lui",
          icon: "🗣️",
          name: "交互革命",
          title: "从 GUI 到 LUI",
          subtitle: "Graphical User Interface → Language User Interface",
          insights: [
            { label: "浅层理解", text: "以前需要在屏幕上点来点去寻找功能（GUI），现在直接下达指令（LUI）。软件的入口从「图标」变成了「对话框」。" },
            { label: "深层逻辑", text: "软件不再是菜单的组合，而是一个「模糊匹配」的过程。AI 自动理解用户的模糊意图（Intent），并调用对应能力执行。" },
            { label: "演化方向", text: "App 正在消失，Agent 正在兴起。手机里不再是 100 个独立 App，而是一个能调用所有 API 的超级智能体。" }
          ]
        },
        {
          id: "vibe",
          icon: "⚡",
          name: "开发革命",
          title: "Vibe Coding",
          subtitle: "编程民主化",
          insights: [
            { label: "核心变革", text: "过去软件开发是「程序员写逻辑」，现在是「产品经理 / 普通用户描述需求（Vibe）」，AI 实时生成代码、测试并部署。" },
            { label: "行业影响", text: "软件迭代周期从「月」缩短到「小时」。硬件厂商可根据用户使用习惯，实时生成个性化界面或自动化流程。" },
            { label: "本质意义", text: "创造力不再被编程技能门槛拦截，软件变成了人人可表达的媒介——民主化生产工具的历史一页。" }
          ]
        },
        {
          id: "prob",
          icon: "🎲",
          name: "运行革命",
          title: "确定性 → 概率性逻辑",
          subtitle: "软件对齐新命题",
          insights: [
            { label: "底层逻辑", text: "传统软件是 if-then-else 确定性逻辑（点这里一定跳那里），AI 软件是概率性的——根据上下文预测下一步最优行动。" },
            { label: "对齐挑战", text: "引出「软件安全对齐（Alignment）」。软件需理解规则与边界，例如 AI 不应在高速行驶中执行用户的危险玩笑指令。" },
            { label: "演化方向", text: "软件可靠性的评估标准，将从「错误率」转向「边界判断力」与「价值对齐度」——这是整个行业的新课题。" }
          ]
        }
      ]
    },
    hardware: {
      label: "硬件",
      icon: "🔧",
      color: "#D97706",
      tagline: "AI 的三大物理肉身 — 感知 · 空间 · 劳动",
      tracks: [
        {
          id: "glasses",
          icon: "👓",
          name: "个体延伸",
          title: "智能眼镜与穿戴",
          subtitle: "个体感官的无限延伸",
          insights: [
            { label: "定位", text: "AI 的「第一视角」入口。重点不再是 AR 投屏有多大，而是摄像头和麦克风如何实时理解用户看到的内容和听到的话语。" },
            { label: "交互范式", text: "彻底告别手写输入，通过眼动追踪、骨传导语音、多模态语义进行交互——感知无处不在，操作消失于无形。" },
            { label: "典型场景", text: "看到陌生人时自动浮现社交标签；超市购物时实时计算货架商品营养成分并给出个性化购买建议。" }
          ],
          products: [
            { name: "Meta Ray-Ban",      note: "首款规模化 AI 眼镜，日出货量超 100 万副" },
            { name: "雷鸟 Air 3 Pro",    note: "国产 AR 眼镜代表，支持中文多模态理解" },
            { name: "Apple Vision Pro",  note: "空间计算旗舰，M4 芯片 + visionOS 生态" },
            { name: "小米智能眼镜",      note: "主打日常穿戴 + 微型投影" }
          ]
        },
        {
          id: "car",
          icon: "🚗",
          name: "空间交互",
          title: "智能汽车",
          subtitle: "移动的智能生活空间",
          insights: [
            { label: "定位", text: "目前规模最大、算力最强的具身智能终端。车是第一个被 AI 大规模改造的物理空间，也是最大的移动计算节点。" },
            { label: "核心进化", text: "从「交通工具」到「空间 Agent」：车能感知车内成员情绪、健康与需求；软硬深度解耦让端侧算力兼顾智驾与辅助计算。" },
            { label: "未来图景", text: "将「沙发彩电」的物理配置与「感知大模型」结合，创造真正懂家人需求的「AI 移动家」——车不再只是代步。" }
          ],
          products: [
            { name: "理想 L9 Livis",     note: "搭载 MindVLA + 全线控底盘，城区 NOA 脱手率 89%" },
            { name: "问界 M9",            note: "华为乾坤 ADS 3.0，高速 / 城区 NOA 全覆盖" },
            { name: "Tesla Model 3",      note: "FSD v12 端到端，全球量产端到端智驾先驱" },
            { name: "小鹏 X9",            note: "XNGP 城区全国推送，支持 800V 超充生态" }
          ]
        },
        {
          id: "robot",
          icon: "🤖",
          name: "劳动替代",
          title: "具身机器人",
          subtitle: "物理世界的最终劳动力",
          insights: [
            { label: "定位", text: "AI 进化的终极形态——将智能从数字世界延伸到物理世界，在三维空间中完成任意任务。" },
            { label: "核心进化", text: "从「程序控制」到「端到端学习」：机器人通过观察人类动作（视频学习）或在虚拟世界（MindSim）中自我进化，习得物理常识。" },
            { label: "行业标志", text: "人形机器人开始进入汽车工厂「实习」，处理非标准化零件装配；核心零部件进入规模化量产，成本大幅下降。" }
          ],
          products: [
            { name: "宇树 G1",            note: "国内量产最快，已进入汽车工厂试用" },
            { name: "Figure-02",          note: "OpenAI 战略合作，GPT-4o 驱动手部操作" },
            { name: "Tesla Optimus",      note: "自研 FSD 芯片 + 端到端 VLA，目标 2025 年万台" },
            { name: "Boston Dynamics Atlas", note: "液压 → 全电动升级，灵巧性业界标杆" }
          ]
        }
      ]
    }
  },


  /* ═══════════════════════════════════════════════════════════
     SECTION 02 · 行业转向 — 破解三面墙 & 终局畅想
  ═══════════════════════════════════════════════════════════ */

  /* 02 · 破解软件墙 */
  s2_break_software: {
    color: "#2563EB",
    wall: "软件墙",
    dilemma: "传统 If-Then 逻辑无法覆盖长尾场景（Corner Cases），软件陷入规则膨胀。",
    solution_label: "破局关键：大规模合成仿真 + 真实数据闭环",
    trend: "软件不再由程序员一行行编写，而是由 AI 通过观察物理世界自行习得。",
    approaches: [
      {
        icon: "🌐",
        title: "合成数据（Synthetic Data）与具身智能演练",
        subtitle: "从「喂养」到「演化」",
        color: "#2563EB",
        points: [
          { label: "虚拟演练", text: "通过超大规模物理仿真引擎（如 NVIDIA Omniverse、行业自研世界模拟器），AI 在虚拟世界中进行「千万年级」的物理交互演练，彻底甩开受真实路测成本制约的旧模式。" },
          { label: "生成式世界模拟器（World Simulator）", text: "不再依靠人类去「写」场景，而是利用生成式 AI 在虚拟空间制造无限的、具备物理常识的极端工况——暴雨逆行、异形障碍、结冰路面。每天完成相当于人类驾驶 10 亿公里的模拟训练，覆盖 99%+ 的长尾场景。" }
        ]
      },
      {
        icon: "🔁",
        title: "端到端（End-to-End）学习架构",
        subtitle: "从「模块拼接」到「一通到底」",
        color: "#059669",
        points: [
          { label: "神经网络直通", text: "直接输入传感器信号，输出物理动作指令，消除模块间的信息传递损耗。软件系统不再是各司其职的「拼图」，而是整体流动的「水」。VLA（视觉-语言-行动）模型是这一架构的最新形态。" }
        ]
      }
    ],
    data_advantage: {
      headline: "数据从哪来 — 车企的先天优势",
      sub: "拥有路上最大规模的「具身传感器网络」，是车企相比互联网与机器人初创公司的结构性优势",
      items: [
        { icon: "🚗", title: "百万辆级实车车队", text: "头部车企路上拥有数十万至百万量级在网实车，每辆配备多路摄像头、毫米波雷达与超声波传感器，持续不间断地采集真实道路数据。这是机器人初创公司（百台级）无法比拟的先天规模优势。" },
        { icon: "📡", title: "多模态物理传感数据", text: "视觉、雷达、IMU、GPS 等多模态数据同步采集，天然涵盖极端天气（雨雪雾霾）与复杂路况，比互联网公司的文本/图像数据更接近物理世界的「具身」维度——是训练 VLA 模型的天然燃料。" },
        { icon: "🔁", title: "真实 + 合成双轮闭环", text: "真实路测数据提供「物理基准校准」，合成仿真数据补充长尾场景。仿真:真实比可达 1000:1，但真实数据对模型「校准」与「接地气」的作用不可替代——两者缺一不可。" },
        { icon: "🏆", title: "相比其他行业的结构性优势", text: "互联网公司拥有算力与算法，却缺乏物理传感数据；机器人初创公司数据规模受限；医疗/工业 AI 场景封闭且难以泛化。车企是当前最具备大规模具身数据生产与闭环能力的行业之一。" }
      ]
    },
    metric: {
      label: "行业指标 · 2026",
      text: "领先厂商虚拟仿真数据与真实路测数据比例已达 <strong>1000:1</strong>，软件对长尾场景的覆盖率从不足 50% 跃升至 <strong>99%</strong>。"
    }
  },

  /* 03 · 破解硬件墙 */
  s2_break_hardware: {
    color: "#D97706",
    wall: "硬件墙",
    dilemma: "冯·诺依曼架构下的「内存墙」导致高能耗与低效率，端侧芯片「聪明必发烫」。",
    solution_label: "破局关键：芯片设计进入「黄金时代」",
    solution_desc: "通用芯片（GPU/CPU）正被专用 AI 架构（DSA）取代。",
    approaches: [
      {
        icon: "🔧",
        title: "算法定义芯片（DSA）",
        subtitle: "Algorithm-Driven Silicon",
        color: "#D97706",
        points: [
          { label: "量体裁衣", text: "行业领先玩家（苹果、特斯拉及顶尖车企）不再购买「均码」芯片，而是根据自研模型的算子特征定制电路，有效算力利用率从 30% 提升至 80% 以上。将算法逻辑直接「烧录」进硅片，实现算子级的高效对齐。" }
        ]
      },
      {
        icon: "💾",
        title: "近存计算（Near-Memory Computing）",
        subtitle: "破解「内存墙」",
        color: "#7C3AED",
        points: [
          { label: "缩短物理距离", text: "采用 HBM 或更高带宽存储接口，缩短存储与运算单元的物理距离，大幅降低数据「搬运」能耗，让芯片在高负载下依然保持低温。" },
          { label: "代表产品", text: "英伟达 H100（HBM3，3.35 TB/s 带宽）· 苹果 UMA M3 / M4 Max（统一内存架构，CPU/GPU/NPU 共享内存池，消除传统数据搬运瓶颈）" }
        ]
      }
    ],
    conclusion: "硬件墙的破局不在于堆晶体管数量，而在于计算架构与算法内核的深度耦合。"
  },

  /* 04 · 破解云端墙 */
  s2_break_cloud: {
    color: "#E03D1E",
    wall: "云端墙",
    trend: "算力不再向云端汇聚，而是大规模向终端设备（On-device AI）迁移。行业正从「联网才能聪明」进化到「断网即有本能」，实现真正的本地化决策。",
    solution_label: "破局逻辑：端侧 AI 的「生理级进化」",
    approaches: [
      {
        icon: "🗜️",
        title: "极致模型压缩",
        subtitle: "蒸馏（Distillation）× 量化（Quantization）",
        color: "#E03D1E",
        points: [
          { label: "浓缩「智力本能」", text: "将千亿参数模型的推理能力压缩进仅有几瓦功耗的端侧芯片中，不再依赖云端回传。" }
        ]
      },
      {
        icon: "⚡",
        title: "端侧 AI 实时闭环（Real-time Loop）",
        subtitle: "100% 本地决策",
        color: "#059669",
        points: [
          { label: "延迟剧降", text: "响应延迟从云端的 500ms 剧降至 20ms 以下，是自动驾驶瞬时避险、AR 眼镜实时交互、以及工业机器人精细协作的刚需。" }
        ]
      },
      {
        icon: "🔒",
        title: "端侧隐私与带宽脱钩",
        subtitle: "数据不出户",
        color: "#1A1816",
        points: [
          { label: "彻底解决隐私瓶颈", text: "敏感的视觉与语音流在本地处理后即销毁，同时让企业的带宽成本降低 90% 以上。" }
        ]
      }
    ]
  },

  /* 05 · 终局畅想 */
  s2_endgame_2: {
    vertical: {
      title: "商业模式重构：垂直整合与「算法主权」的崛起",
      color: "#7C3AED",
      points: [
        { icon: "🎯", label: "从「买算力」到「定义算力」", text: "领先者的身份高度重叠：既是算法的开创者，也是半导体的设计者。行业正在告别「买通用芯片+写应用软件」的初级阶段。" },
        { icon: "✂️", label: "终结 Tier 2 依赖", text: "自研芯片不再是为了降低成本，而是为了拿回「性能定义权」，成为进入决赛圈的唯一门票。" },
        { icon: "⚡", label: "DSA 的必然", text: "通用架构（CPU/GPU）在运行特定大模型时存在巨大的「算力浪费」。自研 DSA 将算法的逻辑特征直接「烧录」进硅片，实现算子级的高效对齐，硬件成为算法的物理延伸。" }
      ]
    },
    symbiosis: {
      title: "软硬「共生体」",
      color: "#1A1816",
      points: [
        { icon: "🧠", label: "AI 拥有「物理直觉」", text: "不再通过云端逻辑推理，而是像人类躲避飞石一样，实现毫秒级的条件反射。" },
        { icon: "💎", label: "硬件拥有「思维能力」", text: "芯片的晶体管分布、内存的带宽路径，完全根据 AI 的神经网络拓扑结构进行重构（DSA 架构）。" }
      ]
    },
    pareto_pos: {
      title: "帕累托前沿下的「生存位」",
      color: "#2563EB",
      desc: "物理世界不存在无限算力，真正的胜出者是在物理极限（帕累托前沿）上跳舞的人——在保持最高「智商」的同时，实现最低的能耗与延迟。"
    },
    criteria: [
      { icon: "🧠", label: "极致智商", color: "#1A1816", text: "端侧具备处理长尾场景的端到端生成能力。" },
      { icon: "⚡", label: "极致能效", color: "#D97706", text: "在 <50W 的功耗墙内，实现 >900 GB/s 的数据吞吐。" },
      { icon: "⏱", label: "极致响应", color: "#E03D1E", text: "全链路延迟 <20ms，越过「人类感官红线」，达成生理级的安全本能。" }
    ]
  },


  /* ─── S04 附录 · 产品路线图 ─────────────────────── */
  s4_roadmap: {
    brands: {
      /* 国内 + 海外共用 */
      '理想':       { color: '#D97706', priority: true },
      '问界':       { color: '#1D4ED8' },
      '乐道':       { color: '#059669' },
      '小米':       { color: '#EA580C' },
      '特斯拉':     { color: '#DC2626' },
      '蔚来':       { color: '#3B82F6' },
      '小鹏':       { color: '#8B5CF6' },
      /* 海外专属 */
      'Mercedes':   { color: '#6B7280' },
      'Waymo':      { color: '#0EA5E9' },
      'Zoox':       { color: '#F59E0B' },
      '百度Apollo': { color: '#7C3AED' },
    },
    /* ── 国内 ── x 轴年份含小数以错开重叠；★ = 2026年5月为止已上市 */
    domestic: [
      /* 理想 — L 系列（增程）*/
      { year: 2019.0,  brand: '理想',   name: '理想 ONE',    price: 32.8,  pmin: 32.8,  pmax: 32.8  },
      { year: 2022.4,  brand: '理想',   name: 'L9',          price: 44.5,  pmin: 42.98, pmax: 45.98 },
      { year: 2022.8,  brand: '理想',   name: 'L8',          price: 36.0,  pmin: 32.18, pmax: 39.98 },
      { year: 2023.2,  brand: '理想',   name: 'L7',          price: 34.0,  pmin: 30.18, pmax: 37.98 },
      { year: 2024.1,  brand: '理想',   name: 'MEGA',        price: 55.98, pmin: 55.98, pmax: 55.98 },
      { year: 2024.55, brand: '理想',   name: 'L6',          price: 26.5,  pmin: 24.98, pmax: 27.98 },
      /* 理想 — i 系列（纯电）★ 已上市 */
      { year: 2025.6,  brand: '理想',   name: 'i8',          price: 33.98, pmin: 30.98, pmax: 35.98 },
      { year: 2026.3,  brand: '理想',   name: 'i6',          price: 24.98, pmin: 21.98, pmax: 27.98 },
      /* 理想 — 2026年5月 全新 L 系列 ★ 已上市 */
      { year: 2026.38, brand: '理想',   name: 'L9 Ultra',    price: 45.98, pmin: 45.98, pmax: 45.98 },
      { year: 2026.44, brand: '理想',   name: 'L9 Livis',    price: 50.98, pmin: 50.98, pmax: 50.98 },
      /* 理想 — 规划 */
      { year: 2026.9,  brand: '理想',   name: 'M 系列',      price: 40.0,  pmin: 35.0,  pmax: 50.0,  planned: true },
      /* 问界 */
      { year: 2023.35, brand: '问界',   name: '问界 M7',     price: 30.0,  pmin: 25.98, pmax: 33.98 },
      { year: 2023.75, brand: '问界',   name: '问界 M9',     price: 52.0,  pmin: 46.98, pmax: 56.98 },
      { year: 2025.5,  brand: '问界',   name: '问界 M8',     price: 31.98, pmin: 25.98, pmax: 37.98 },
      { year: 2025.8,  brand: '问界',   name: 'M9 Ultra',    price: 59.98, pmin: 56.98, pmax: 62.98 },
      { year: 2026.65, brand: '问界',   name: 'ADS 5.0 新车', price: 42.0, pmin: 35.0,  pmax: 50.0,  planned: true },
      /* 乐道 */
      { year: 2024.8,  brand: '乐道',   name: '乐道 L60',    price: 22.7,  pmin: 20.69, pmax: 24.69 },
      { year: 2026.7,  brand: '乐道',   name: '乐道 L90',    price: 30.0,  pmin: 27.0,  pmax: 33.0,  planned: true },
      /* 小米 */
      { year: 2024.3,  brand: '小米',   name: '小米 SU7',    price: 25.8,  pmin: 21.59, pmax: 29.99 },
      { year: 2025.1,  brand: '小米',   name: 'SU7 Ultra',   price: 67.24, pmin: 52.99, pmax: 81.49 },
      { year: 2026.6,  brand: '小米',   name: '小米 MX11',   price: 31.5,  pmin: 28.0,  pmax: 35.0,  planned: true },
      { year: 2027.1,  brand: '小米',   name: '增程 SUV',    price: 25.0,  pmin: 22.0,  pmax: 28.0,  planned: true },
      /* 特斯拉 */
      { year: 2019.5,  brand: '特斯拉', name: '国产 Model 3', price: 28.0,  pmin: 22.99, pmax: 32.99 },
      { year: 2021.2,  brand: '特斯拉', name: '国产 Model Y', price: 30.2,  pmin: 24.99, pmax: 35.49 },
      { year: 2023.65, brand: '特斯拉', name: 'Model 3 焕新', price: 28.4,  pmin: 23.19, pmax: 33.59 },
      { year: 2025.3,  brand: '特斯拉', name: 'Y Juniper',    price: 29.5,  pmin: 26.99, pmax: 31.99 },
      { year: 2026.5,  brand: '特斯拉', name: 'Model 2',      price: 17.5,  pmin: 15.0,  pmax: 20.0,  planned: true },
      /* 蔚来 */
      { year: 2019.7,  brand: '蔚来',   name: '蔚来 ES6',    price: 41.3,  pmin: 35.80, pmax: 46.80 },
      { year: 2023.3,  brand: '蔚来',   name: 'ES6 换代',    price: 36.7,  pmin: 33.80, pmax: 39.60 },
      { year: 2024.2,  brand: '蔚来',   name: '蔚来 ES8',    price: 45.8,  pmin: 41.8,  pmax: 49.8  },
      { year: 2025.2,  brand: '蔚来',   name: '蔚来 ET9',    price: 78.0,  pmin: 78.0,  pmax: 78.0  },
      { year: 2025.35, brand: '蔚来',   name: '萤火虫',      price: 13.98, pmin: 12.88, pmax: 14.98 },
      { year: 2026.6,  brand: '蔚来',   name: 'ET9 Tour',    price: 55.0,  pmin: 52.0,  pmax: 58.0,  planned: true },
      /* 小鹏 */
      { year: 2020.3,  brand: '小鹏',   name: '小鹏 P7',     price: 29.0,  pmin: 22.99, pmax: 34.99 },
      { year: 2022.6,  brand: '小鹏',   name: '小鹏 G9',     price: 39.0,  pmin: 30.99, pmax: 46.99 },
      { year: 2024.6,  brand: '小鹏',   name: 'MONA M03',    price: 13.8,  pmin: 11.98, pmax: 15.58 },
      { year: 2024.9,  brand: '小鹏',   name: '小鹏 P7+',    price: 21.2,  pmin: 18.68, pmax: 23.68 },
      { year: 2025.9,  brand: '小鹏',   name: 'X9 Ultra',    price: 45.0,  pmin: 39.98, pmax: 49.98 },
      { year: 2026.65, brand: '小鹏',   name: '图灵芯片新车', price: 30.0, pmin: 25.0,  pmax: 40.0,  planned: true },
      { year: 2027.1,  brand: '小鹏',   name: 'VLA 2代车型',  price: 28.0, pmin: 22.0,  pmax: 35.0,  planned: true },
    ],
    price_bands_dom: [
      { label: '15万以下', min: 9,   max: 16, color: 'rgba(148,163,184,0.07)' },
      { label: '16-30万',  min: 16,  max: 30, color: 'rgba(34,197,94,0.05)'   },
      { label: '30-45万',  min: 30,  max: 45, color: 'rgba(59,130,246,0.05)'  },
      { label: '45-65万',  min: 45,  max: 65, color: 'rgba(245,158,11,0.05)'  },
      { label: '65万以上', min: 65,  max: 88, color: 'rgba(239,68,68,0.04)'   },
    ],
    /* ── 海外：已知售价产品（USD 千元）── */
    overseas_scatter: [
      /* 特斯拉 */
      { year: 2021.0,  brand: '特斯拉',   name: 'Model Y',        price: 42,   pmin: 35,   pmax: 49   },
      { year: 2023.8,  brand: '特斯拉',   name: 'Cybertruck',     price: 80.5, pmin: 61,   pmax: 100  },
      { year: 2025.2,  brand: '特斯拉',   name: 'Model Y Juniper',price: 44,   pmin: 37,   pmax: 50   },
      { year: 2026.3,  brand: '特斯拉',   name: 'Model 2',        price: 25,   pmin: 25,   pmax: 25,   planned: true },
      { year: 2026.6,  brand: '特斯拉',   name: 'Cybercab',       price: 30,   pmin: 30,   pmax: 30,   planned: true },
      /* 理想 ★ 已进入海外 */
      { year: 2026.7,  brand: '理想',     name: 'L9 Ultra（中东）',price: 68,  pmin: 60,   pmax: 78,   planned: true },
      { year: 2027.2,  brand: '理想',     name: 'i系列 国际版',   price: 42,   pmin: 36,   pmax: 50,   planned: true },
      /* 蔚来 */
      { year: 2022.0,  brand: '蔚来',     name: 'ET7 欧洲版',     price: 91.5, pmin: 85,   pmax: 98   },
      { year: 2025.5,  brand: '蔚来',     name: 'ET9 海外版',     price: 105,  pmin: 98,   pmax: 115,  planned: true },
      /* 问界 */
      { year: 2025.7,  brand: '问界',     name: 'AITO 9',         price: 65.8, pmin: 65.8, pmax: 65.8 },
      { year: 2026.5,  brand: '问界',     name: 'M8 海外版',      price: 48,   pmin: 42,   pmax: 56,   planned: true },
      /* 小鹏 */
      { year: 2024.2,  brand: '小鹏',     name: '欧版 P7',        price: 54,   pmin: 54,   pmax: 54   },
      { year: 2024.4,  brand: '小鹏',     name: '欧版 G9',        price: 62.3, pmin: 62.3, pmax: 62.3 },
      /* 小米 */
      { year: 2026.9,  brand: '小米',     name: 'SU7 国际版',     price: 38,   pmin: 32,   pmax: 45,   planned: true },
      /* 乐道 */
      { year: 2026.8,  brand: '乐道',     name: 'ONVO L60',       price: 28,   pmin: 22,   pmax: 35,   planned: true },
      /* Mercedes */
      { year: 2022.2,  brand: 'Mercedes', name: 'Drive Pilot',    price: 135,  pmin: 120,  pmax: 150  },
      { year: 2027.0,  brand: 'Mercedes', name: 'MB.OS 新车',     price: 80,   pmin: 60,   pmax: 100,  planned: true },
    ],
    /* ── 海外：TaaS / Robotaxi 服务 ── */
    overseas_taas: [
      { year: 2023,   brand: 'Waymo',      name: 'I-PACE 5th Gen',     ai: '⚡', markets: '凤凰城 · 旧金山',  planned: false },
      { year: 2024,   brand: '百度Apollo', name: '萝卜快跑 RT6（港）', ai: '⚡', markets: '中国香港',          planned: false },
      { year: 2025,   brand: 'Zoox',       name: 'Robotaxi（初代）',   ai: '❌', markets: '拉斯维加斯',        planned: false },
      { year: 2026,   brand: 'Waymo',      name: 'Zeekr RT 6th Gen',  ai: '✨', markets: '全球扩张中',         planned: true  },
      { year: 2026,   brand: 'Zoox',       name: '全面商用版',         ai: '✨', markets: '美国多城',           planned: true  },
      { year: 2026,   brand: '百度Apollo', name: 'RT6 右舵版',         ai: '✨', markets: '英国 · 德国',        planned: true  },
    ],
  },


  /* ═══════════════════════════════════════════════════════════
     SECTION 06 · 发展困境和行业未来
  ═══════════════════════════════════════════════════════════ */

  /* 02 · AI 行业核心 Trade-off（三组六对）*/
  s6_tradeoffs: {
    intro: "每一个 AI 系统都在六条张力线上永久拉锯——没有最优解，只有针对场景的最优取舍",
    groups: [
      {
        group: "算力边界",
        en: "Hardware Limits",
        icon: "⚡",
        color: "#D97706",
        items: [
          {
            left: "算力峰值", leftEn: "Performance",
            right: "功耗上限", rightEn: "Power",
            tension: "高",
            insight: "旗舰车规芯片功耗必须 <50W，但 2026 年 VLA 推理需要 2560 TOPS——每瓦算力成为生死线。",
            resolution: "DSA 近存计算：让算力「就地」生产，能效比提升 3–10×"
          },
          {
            left: "推理精度", leftEn: "Accuracy",
            right: "响应延迟", rightEn: "Latency",
            tension: "高",
            insight: "更大的模型精度更高，但推理延迟更长。智驾场景 <20ms 是生命线——「更聪明但更慢」= 更危险。",
            resolution: "模型蒸馏 + INT4 量化：用 1/10 体积保留 90% 精度"
          }
        ]
      },
      {
        group: "架构选择",
        en: "Architecture",
        icon: "🏗",
        color: "#2563EB",
        items: [
          {
            left: "云端大脑", leftEn: "Cloud Intelligence",
            right: "端侧响应", rightEn: "Edge Latency",
            tension: "高",
            insight: "云端模型参数可达 1T+，但物理定律决定往返延迟 >50ms——高速行驶时等于盲开 1.5 米。",
            resolution: "云边协同：端侧执行决策，云端持续学习更新"
          },
          {
            left: "通用能力", leftEn: "Generalist",
            right: "垂直优化", rightEn: "Specialist",
            tension: "中",
            insight: "通用大模型「什么都会一点」，垂直专用模型「这件事做到极致」。端侧资源稀缺，二选一。",
            resolution: "MoE 架构：统一调度多专家子网络，同时保留广度与深度"
          }
        ]
      },
      {
        group: "商业平衡",
        en: "Business Logic",
        icon: "⚖",
        color: "#E03D1E",
        items: [
          {
            left: "极致智能", leftEn: "Intelligence",
            right: "零事故可靠", rightEn: "Reliability",
            tension: "高",
            insight: "AI 越「创造性」，在安全关键场景就越危险。智驾不允许 AI 即兴发挥——可靠性先于智能。",
            resolution: "分层安全架构：AI 决策层 + 规则兜底层双保险"
          },
          {
            left: "极致降本", leftEn: "Cost Reduction",
            right: "冗余容错", rightEn: "Redundancy",
            tension: "中",
            insight: "每层冗余（备份传感器、校验模型）意味着 BOM 成本提升 30–60%，但单点故障的代价可能是生命。",
            resolution: "分级冗余：核心安全路径 3× 冗余，辅助功能单路径"
          }
        ]
      }
    ]
  },

  /* 03 · 国产 AI 眼镜体验案例（Rokid / 千问光波导）*/
  s6_glasses_case: {
    product: "国产 AI 眼镜",
    icon: "👓",
    year: "2025",
    price: "¥2,000–5,000",
    sold: "Rokid · 千问光波导（个人体验）",
    pitch: "目标成为「随身 AI 助手」，替代手机碎片化操作",
    failures: [
      "无多轮对话：每次交互必须重念唤醒词，语音播报中途不可打断追问",
      "语音识别错误率高：「字幕功能怎么使用」被识别为「字母功能怎么使用」",
      "无系统级权限：核心功能仍依赖手机 App 桥接，无法直接调起网易云、淘宝等第三方应用",
      "生态碎片化严重：支付宝 / 京东智能购 / 天气等接入尚不成熟，跨 App 验证导致用户旅程断档",
      "安全边界模糊：声纹支付与双击支付并存，机制不统一，存在安全隐患"
    ],
    lesson: "当前是「功能演示品」而非「日常工具」——缺乏系统级权限与真实闭环，Apple / Google 才有生态整合的底层能力。"
  },

  /* 03 · 为什么 AI 公司会失控 */
  s6_why_fail: [
    {
      icon: "🎪",
      title: "Demo 驱动幻觉",
      tag: "产品定义",
      desc: "把演示间的「惊艳 5 分钟」等同于产品的「每天可用」。演示条件是受控的，现实场景是混沌的——Rabbit R1 的 LAM 在 Demo 里完美操作 Uber，上市后一分钟内就崩溃。"
    },
    {
      icon: "🔁",
      title: "缺乏真实数据闭环",
      tag: "工程架构",
      desc: "没有「用户真实使用数据」作为反馈的 AI 就像在黑暗中射箭。Humane AI Pin 完全依赖云端，而团队在有 WiFi 的会议室里测试——弱信号区完全失效的问题在上市后才被发现。"
    },
    {
      icon: "💸",
      title: "融资故事 > 用户价值",
      tag: "商业模式",
      desc: "AI 公司容易陷入「算力军备竞赛」，把资本当竞争壁垒而非价值创造。Humane 募资 $2.4 亿，卖出约 1 万台即停产——当融资故事比产品更吸引人时，公司已经偏离轨道。"
    },
    {
      icon: "❌",
      title: "价值主张错位",
      tag: "用户洞察",
      desc: "$699 的 Humane Pin vs. 口袋里免费的 ChatGPT App——用户为什么要多付 $699？如果 AI 设备解决的是「用户不知道自己有的问题」而非「每天都在抱怨的问题」，产品必然失败。"
    },
    {
      icon: "🔀",
      title: "长尾场景死结",
      tag: "泛化极限",
      desc: "Cruise 压人停运、图森未来退市——用无限人工规则覆盖无限物理场景是死路。无法在长尾场景形成端到端泛化的物理 AI，最终在安全红线前耗尽资金与信任。"
    },
    {
      icon: "🫙",
      title: "基座独角兽空心化",
      tag: "竞争结构",
      desc: "Stability AI 与 Inflection 缺乏自营场景与自研算力，开源变现无望。团队被巨头非对称式打包挖空，百亿估值一夜沦为大厂的技术血包。"
    }
  ],

  /* 04 · Physical AI 三阶段 */
  s6_physical_ai_stages: [
    {
      stage: 1, era: "2017–2023",
      name: "数字 AI", en: "Digital AI",
      color: "#94a3b8", icon: "💬",
      desc: "AI 存在于屏幕后——读文章、写代码、画图、对话。一切发生在数字世界，不触碰物理现实。",
      caps: ["自然语言理解", "图像识别", "内容生成"],
      limit: "只能「说」，不能「做」",
      done: true,
      examples: [
        { name: "ChatGPT / GPT-4",  note: "对话生成" },
        { name: "Claude",           note: "长文档推理" },
        { name: "Midjourney",       note: "图像生成" },
        { name: "GitHub Copilot",   note: "代码助手" },
        { name: "Stable Diffusion", note: "开源图像" }
      ]
    },
    {
      stage: 2, era: "2023–2025",
      name: "具身 AI", en: "Embodied AI",
      color: "#2563EB", icon: "👁️",
      desc: "AI 开始感知三维世界。摄像头、麦克风、传感器融合，驱动第一代具身执行。但仍停留在「执行指令」层，需人类逐条下达命令。",
      caps: ["多模态感知", "场景理解", "指令级执行"],
      limit: "需要人类指令，自主规划能力弱",
      done: true,
      examples: [
        { name: "Meta Ray-Ban",       note: "AI 眼镜" },
        { name: "Boston Dynamics Spot", note: "四足机器狗" },
        { name: "宇树 Go2",           note: "国产四足" },
        { name: "Tesla FSD v11",      note: "规则+神经网络混合" },
        { name: "小鹏 XNGP",          note: "城区辅助驾驶" }
      ]
    },
    {
      stage: 3, era: "2025–2027+",
      name: "Physical AI", en: "Physical AI",
      color: "#D97706", icon: "🤖",
      desc: "AI 成为物理世界的自主代理。感知 → 理解 → 规划 → 执行一体化，在三维空间完成任意任务，无需逐条指令。VLA 模型是关键技术载体。",
      caps: ["自主任务规划", "物理操作泛化", "实时环境适应"],
      limit: "长尾鲁棒性与安全对齐仍是前沿挑战",
      done: false,
      examples: [
        { name: "Tesla Optimus Gen 2", note: "弗里蒙特工厂 1000+ 台" },
        { name: "宇树 H1 Pro",         note: "比亚迪工厂量产部署" },
        { name: "Figure-02",           note: "OpenAI 赋能通用操作" },
        { name: "智元远征 A2",          note: "上汽总装线试点" },
        { name: "理想 MindVLA",         note: "城区 NOA 脱手率 89%" }
      ]
    }
  ],

}; // END AI_DATA
