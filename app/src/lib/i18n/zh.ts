import type { Dictionary } from "./types";

export const zh: Dictionary = {
  ui: {
    siteTitle: "LessonBlinks — 点 5 下，学会 Solana",
    siteDescription:
      "五节 30 秒的微课程，每节都是一个真实的 Solana Action：发送 USDC、用 SOL 打赏、跨境汇款、理解兑换交易，并铸造一枚毕业徽章。",
    lessonMetaTitle: "第 {x} 课：{title} — LessonBlinks",

    brandTagline: "把 Solana Actions 变成 30 秒的微课程",
    faucetLink: "Devnet 水龙头",
    languageLabel: "语言",

    heroEyebrow: "Solana Devnet · 免费体验",
    heroTitlePre: "学会 Solana，只需",
    heroTitleHighlight: "点击五下",
    heroTitlePost: "，而不是啃五篇教程。",
    heroSubtitle:
      "每节课都是一个真实的 Blink —— 用你自己的钱包一键签名的 Solana Action。发送数字美元、打赏创作者、跨境汇款、理解兑换交易，最后铸造一枚链上徽章顺利毕业。",
    statLessons: "节课程",
    statMinutes: "约 {m} 分钟",
    statTotal: "总时长",
    statLiveNow: "已上线",
    statBadge: "枚可铸造徽章",
    pathHeading: "学习路径",
    footerHome:
      "运行在 Solana Devnet 上 —— 每笔交易都是真实的，每一美元都是测试币。在课程页面连接 devnet 钱包即可开始。",

    liveBadge: "已上线",
    comingSoonBadge: "即将上线",
    durationFormat: "约 {s} 秒",
    earnPrefix: "可获得：",
    startLesson: "开始学习",
    comingSoonCta: "敬请期待",

    backToLessons: "全部课程",
    lessonXofY: "第 {x} 课 / 共 {y} 课",
    lessonWord: "课程",
    whatYoullLearn: "你将学到什么",
    whyItMatters: "为什么重要",
    howItWorks: "工作原理",
    doItHere: "动手试试 —— 就在这里",
    wordsYouLearned: "你刚学会的词",
    learningObjectives: "学习目标",
    prerequisites: "前置课程",
    noPrereqs: "无 —— 这里就是学习路径的起点。",
    comingSoonLesson: "本课程即将上线。",
    actionApiLabel: "Action API：",
    didYouKnow: "你知道吗？",
    previous: "上一课",
    next: "下一课",
    footerLesson: "为 Dialect Actions Registry 而建 · Solana Devnet",

    loadingBlink: "正在加载 Blink…",
    blinkError: "无法加载 Blink，请检查 Action URL 和 CORS 响应头。",
  },

  lessons: {
    "1": {
      title: "发送你的第一笔 USDC",
      tagline: "一键即达的数字美元",
      description:
        "USDC 是一种稳定币 —— 由 Circle 发行、始终锚定 1 美元的代币。在 Solana 上，它存放在 SPL token 账户中，这是一种与特定铸币（mint）绑定的独立余额。在本课中，你将向课程金库发送一小笔 USDC，亲眼看到一笔真实转账在 devnet 上几秒内完成结算。",
      whyItMatters:
        "稳定币是加密货币最大的现实应用：不需要美国银行账户也能持有美元储蓄，不依赖银行卡网络也能完成支付，而且价值不会一夜之间波动 10%。如果你只学一项链上技能，那就学会转移 USDC。",
      blinkAction:
        "连接 devnet 钱包，点击发送按钮。钱包会预览一笔 SPL token 转账；签名后，USDC 就会到达金库的 token 账户 —— 通常不到两秒。",
      steps: [
        {
          title: "连接钱包",
          body: "你的钱包持有用于支付手续费的 SOL，以及存放在 SPL token 账户中的 USDC。如果还没有，可以从 Circle 的水龙头领取 devnet USDC。",
        },
        {
          title: "核对转账",
          body: "Blink 会替你构建交易。请在钱包中确认金额和收款方 —— 永远不要盲目签名。",
        },
        {
          title: "签名一次",
          body: "一次签名就能把 USDC 转移到链上。你只需支付极小的 SOL 网络费（不到一美分的零头）。",
        },
      ],
      concepts: ["稳定币", "SPL token", "Token 账户", "网络费"],
      glossary: {
        USDC: "由 Circle 发行、锚定 1 美元的稳定币。",
        "SPL token": "Solana 的代币标准 —— 类似以太坊上的 ERC-20。",
        "Token 账户": "持有某一种特定代币余额的链上账户。",
      },
      funFact:
        "Devnet 上的 USDC 与主网使用完全相同的 SPL 机制 —— 你学的是真本事，却不用承担一分钱风险。",
      learningObjectives: [
        "理解 USDC 是 Solana 上锚定美元的稳定币",
        "发送一笔 SPL token 转账（而非原生 SOL）",
        "在一分钟内通过 Blink 完成一笔真实交易",
      ],
      badgeLabel: "USDC 转账达人",
    },
    "2": {
      title: "用 SOL 打赏创作者",
      tagline: "原生转账、Lamport，以及手续费的真实成本",
      description:
        "SOL 是 Solana 的原生货币 —— 网络上每笔交易都靠它支付费用。与 USDC 不同，它不需要 token 账户：打赏时，lamport 会直接从你的钱包转到创作者的地址。你将发送 0.001 SOL（一百万 lamport），并清楚地看到一笔网络费到底花多少钱。",
      whyItMatters:
        "打赏创作者让支付变得社交化。像这样的 Blink 可以直接嵌入 X 上的帖子里，粉丝几秒钟就能完成打赏 —— 没有平台抽成，没有 3 天的提现等待，中间也没有银行。",
      blinkAction:
        "点击打赏按钮，预览一笔 SystemProgram 转账。在钱包中确认后，将向创作者发送整整 1,000,000 lamport（0.001 SOL），外加约 5,000 lamport 的手续费。",
      steps: [
        {
          title: "连接钱包",
          body: "你需要一点 devnet SOL —— 水龙头会给你足够多。",
        },
        {
          title: "核对打赏金额",
          body: "钱包会显示 0.001 SOL 从你的账户转出。注意单独列出的网络费一行 —— 那才是 Solana 实际收取的费用。",
        },
        {
          title: "链上确认",
          body: "打赏几秒内就会到达创作者的钱包，最终且不可逆。",
        },
      ],
      concepts: ["原生 SOL", "Lamport", "SystemProgram", "最终性"],
      glossary: {
        SOL: "Solana 的原生代币，用于支付手续费和转账。",
        Lamport: "SOL 的最小单位 —— 1 SOL = 1,000,000,000 lamport。",
        网络费: "支付给验证者处理交易的极小额 SOL 费用。",
      },
      funFact:
        "一笔典型的 Solana 交易手续费是 5,000 lamport —— 约 0.001 美元。一笔银行电汇的成本大约是它的 25,000 倍。",
      learningObjectives: [
        "向另一个钱包发送原生 SOL（而非 SPL token）",
        "在钱包预览中读懂 lamport 和网络费",
        "一键完成一笔真实的链上打赏",
      ],
      badgeLabel: "SOL 打赏达人",
    },
    "3": {
      title: "跨境汇一笔钱",
      tagline: "几秒到账的汇款 —— 不用等三个工作日",
      description:
        "跨境汇款 —— 把钱寄回国外的家 —— 是加密货币需求最强烈的应用之一，尤其是在土耳其 ↔ 欧盟/美国这样的汇款走廊上。在本课中，你将向一个海外家人钱包发送一小笔 USDC，体验几秒内完成结算的感觉 —— 没有 SWIFT 的延迟，也没有银行的汇率差价。",
      whyItMatters:
        "传统汇款要收取 5–7% 的费用，还要等上好几天。同样一笔转账在 Solana 上只需不到一美分，页面还没刷新就已结算完成。对海外侨民家庭来说，这不是演示 —— 这是每个月都要面对的痛点，如今被真正解决了。",
      blinkAction:
        "点击发送按钮，预览一笔发往演示汇款钱包的 SPL 转账 —— 想象收款人是「在德国的 Ayşe」。签名一次，这笔付款几秒内就在 Solana 上完成结算。",
      steps: [
        {
          title: "想象收款人",
          body: "演示钱包代表着海外的家人 —— 同样的流程适用于地球上任何一个地址。",
        },
        {
          title: "核对付款",
          body: "和第 1 课学过的 USDC 转账机制完全相同 —— 网络根本不在乎国界。",
        },
        {
          title: "签名并结算",
          body: "结算几秒内即告最终完成。对比一下需要 2–3 天、收费 5% 的 SWIFT 电汇吧。",
        },
      ],
      concepts: ["跨境汇款", "结算速度", "汇率差价", "无国界转账"],
      glossary: {
        跨境汇款: "跨越国界寄出的钱，通常是务工者寄给家乡的家人。",
        SWIFT: "传统的银行间报文网络 —— 电汇需要 1–5 个工作日。",
        结算: "价值真正易手的那一刻，最终且不可逆。",
      },
      funFact:
        "土耳其侨民每年向国内汇款数十亿美元。按 Solana 的手续费计算，相比电汇能省下的钱将是天文数字。",
      learningObjectives: [
        "理解为什么 USDC 汇款胜过传统电汇",
        "向第二个钱包发送 USDC（家人 / 侨民汇款场景）",
        "体会 Solana 的结算速度和超低手续费",
      ],
      badgeLabel: "汇款达人",
    },
    "4": {
      title: "理解你的第一笔兑换",
      tagline: "DEX 如何把一种代币换成另一种",
      description:
        "兑换（swap）是直接在链上把一种代币换成另一种 —— 不需要交易所账户，也没有下单表格。在主网上，像 Jupiter 这样的聚合器会在 Solana 各大 DEX 之间寻找最优路径。由于 Jupiter 在 devnet 上没有流动性，本课是一次诚实的模拟：你将签署一笔真实的 devnet 交易，把一条兑换课程 Memo 记录到链上，同时 Blink 会带你了解报价、路径和滑点。",
      whyItMatters:
        "兑换是通往整个 DeFi 世界的大门 —— 把波动的 SOL 换成稳定的 USDC 是人们保护资产价值的方式，也是你日后会遇到的每个 DEX、聚合器和收益产品背后的核心机制。",
      blinkAction:
        "点击兑换按钮。Action 会检查你是否至少持有 0.01 SOL（真实兑换所需的金额），然后你的钱包会签署一笔携带兑换演示 Memo 的 devnet 交易 —— 这就是你完成本课的链上证明。",
      steps: [
        {
          title: "持有兑换金额",
          body: "真实兑换会用掉 0.01 SOL，所以本课要求你持有这个数额 —— 再加一点点手续费余量。",
        },
        {
          title: "了解兑换路径",
          body: "在主网上，Jupiter 会跨多个 DEX 为 SOL → USDC 报价并选出最优价格。滑点容差则保护你不受价格波动影响。",
        },
        {
          title: "签署演示交易",
          body: "你签署的是一笔附带课程记录 Memo 的真实 devnet 交易 —— 签名流程和主网兑换一模一样。",
        },
      ],
      concepts: ["兑换", "DEX 聚合器", "滑点", "Memo 程序"],
      glossary: {
        兑换: "直接在链上把一种代币换成另一种。",
        Jupiter: "Solana 领先的聚合器 —— 在各大 DEX 之间寻找最优兑换路径。",
        滑点: "你愿意容忍的报价与实际成交之间的价格变动。",
        Memo: "附在交易上的一条小小链上备注 —— 在这里，它就是你的完课证明。",
      },
      funFact:
        "Jupiter 每次报价会路由经过几十个流动性来源。你的 devnet Memo 使用的正是主网应用用来记录凭据的同一个 Memo 程序。",
      learningObjectives: [
        "说清楚什么是兑换，以及 DEX 聚合器的作用",
        "理解滑点，以及报价为什么会变化",
        "签署一笔带链上 Memo 的真实 devnet 交易",
      ],
      badgeLabel: "兑换达人",
    },
    "5": {
      title: "领取你的毕业徽章",
      tagline: "铸造一枚真正属于你的链上凭证",
      description:
        "压轴课程。你将铸造一枚「Blinks 101 毕业生」徽章 —— 一个总量恰好为 1 的真实 devnet 代币，由你的钱包付费并签名，在一笔交易内完成创建。铸币权限会在同一笔交易中被销毁，所以永远没有人能铸出第二枚：这正是 NFT 作为凭证的核心理念。",
      whyItMatters:
        "链上凭证无法伪造，不会被平台吊销，也不会随某家公司倒闭而消失。从活动门票到毕业证书，存放在你自己钱包里的总量为 1 的代币，就是 web3 世界里所有权与证明的运作方式。",
      blinkAction:
        "完成第 1–4 课后，点击领取按钮。你的钱包会签署一笔交易：创建徽章铸币、向你铸造恰好 1 枚代币，并永久锁定总量。租金成本约 0.003 devnet SOL。",
      steps: [
        {
          title: "完成全部课程",
          body: "先学完第 1–4 课 —— 徽章是你走完整条学习路径的证明。在这个 devnet MVP 中，全凭你的自觉。",
        },
        {
          title: "签署铸造交易",
          body: "一笔交易完成三件事：创建一个全新的代币铸币、为你开通 token 账户，并向你的钱包铸造恰好 1 枚徽章。",
        },
        {
          title: "总量永久锁定",
          body: "同一笔交易会移除铸币权限。总量：1。所有者：你。这就是一枚凭证。",
        },
      ],
      concepts: ["NFT 作为凭证", "铸币权限", "固定总量", "租金"],
      glossary: {
        NFT: "总量为 1 的代币 —— 独一无二、可拥有、可转让。",
        铸币权限: "允许铸造新代币的密钥。移除它就永久锁定了总量。",
        租金: "让账户在链上保持存活的一小笔 SOL 押金。",
      },
      funFact:
        "你的徽章是一个真实的 SPL 铸币，可以在任何区块浏览器上查到 —— 搜索铸币地址，你会看到：总量 1，铸币权限：无。",
      learningObjectives: [
        "理解 NFT 是存放在钱包中的个人凭证",
        "了解销毁铸币权限如何把总量固定为 1",
        "走完 5 节课的 Blinks 入门路径",
      ],
      badgeLabel: "Blinks 101 毕业生",
    },
  },
};
