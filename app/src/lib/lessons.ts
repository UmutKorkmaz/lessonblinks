export type LessonStatus = "active" | "coming-soon";

export interface LessonStep {
  title: string;
  body: string;
}

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  status: LessonStatus;
  tagline: string;
  /** Lesson content explanation shown on the detail page */
  description: string;
  /** Why this lesson matters in the real world */
  whyItMatters: string;
  /** What the learner does inside the Blink */
  blinkAction: string;
  /** Step-by-step walkthrough rendered on the detail page */
  steps: LessonStep[];
  /** Key concepts taught, rendered as chips */
  concepts: string[];
  /** Short glossary of terms introduced in this lesson */
  glossary: Record<string, string>;
  /** Optional "did you know?" callout */
  funFact?: string;
  /** Relative Solana Action API path */
  actionPath: string;
  /** Prerequisite lesson ids (empty for Lesson 1) */
  prerequisites: number[];
  durationSeconds: number;
  learningObjectives: string[];
  badgeLabel?: string;
}

const DEFAULT_BASE_URL = "http://localhost:3000";

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL;
}

export function getActionUrl(actionPath: string, baseUrl = getBaseUrl()): string {
  return `${baseUrl.replace(/\/$/, "")}${actionPath}`;
}

/** `solana-action:` URL for @dialectlabs/blinks and wallet clients. */
export function getSolanaActionUrl(
  actionPathOrUrl: string,
  baseUrl = getBaseUrl(),
): string {
  const actionUrl = actionPathOrUrl.startsWith("http")
    ? actionPathOrUrl
    : getActionUrl(actionPathOrUrl, baseUrl);
  return `solana-action:${actionUrl}`;
}

/**
 * Dialect Developer Mode tester — the currently documented hosted surface
 * for previewing Actions on devnet. May be unreachable from some networks;
 * the embedded LessonBlink remains the primary path.
 */
export function getDialDeveloperUrl(
  actionPath: string,
  baseUrl = getBaseUrl(),
): string {
  const actionUrl = getActionUrl(actionPath, baseUrl);
  return `https://dial.to/developer?url=${encodeURIComponent(actionUrl)}&cluster=devnet`;
}

export const LESSONS: Lesson[] = [
  {
    id: 1,
    slug: "tip-usdc",
    status: "active",
    title: "Send your first USDC",
    tagline: "Digital dollars that move in one tap",
    description:
      "USDC is a stablecoin — a token that stays pegged to $1, issued by Circle. On Solana it lives in an SPL token account, a separate balance tied to a specific mint. In this lesson you send a small USDC amount to the course treasury and watch a real transfer settle on devnet in seconds.",
    whyItMatters:
      "Stablecoins are the single biggest real-world use of crypto: dollar savings without a US bank account, payments without card rails, and value that doesn't swing 10% overnight. If you only learn one onchain skill, make it moving USDC.",
    blinkAction:
      "Connect a devnet wallet and tap the send button. Your wallet previews an SPL token transfer; after you sign, the USDC lands in the treasury's token account — usually in under two seconds.",
    steps: [
      {
        title: "Connect your wallet",
        body: "Your wallet holds SOL for fees and USDC in an SPL token account. Grab devnet USDC from Circle's faucet if you don't have any.",
      },
      {
        title: "Review the transfer",
        body: "The Blink builds the transaction for you. Check the amount and recipient in your wallet — never sign blind.",
      },
      {
        title: "Sign once",
        body: "One signature moves the USDC onchain. You pay a tiny SOL network fee (fractions of a cent).",
      },
    ],
    concepts: ["Stablecoins", "SPL tokens", "Token accounts", "Network fees"],
    glossary: {
      USDC: "A stablecoin pegged to $1, issued by Circle.",
      "SPL token": "Solana's token standard — like ERC-20 on Ethereum.",
      "Token account": "An onchain account that holds a balance of one specific token.",
    },
    funFact:
      "Devnet USDC uses the same SPL mechanics as mainnet — you're learning the real thing with zero dollars at risk.",
    actionPath: "/api/actions/lesson-1-usdc",
    prerequisites: [],
    durationSeconds: 30,
    learningObjectives: [
      "Understand USDC as a dollar-pegged stablecoin on Solana",
      "Send an SPL token transfer (not native SOL)",
      "Complete a real transaction from a Blink in under a minute",
    ],
    badgeLabel: "USDC Sender",
  },
  {
    id: 2,
    slug: "tip-creator-sol",
    status: "active",
    title: "Tip a creator in SOL",
    tagline: "Native transfers, lamports, and what fees really cost",
    description:
      "SOL is Solana's native currency — the asset that pays for every transaction on the network. Unlike USDC, it needs no token account: tipping moves lamports straight from your wallet to the creator's address. You'll send 0.001 SOL (one million lamports) and see exactly what a network fee costs.",
    whyItMatters:
      "Creator tipping is how payments become social. A Blink like this one can sit inside a post on X, letting fans tip in seconds with no platform cut, no 3-day payout hold, and no bank in the middle.",
    blinkAction:
      "Tap the tip button to preview a SystemProgram transfer. Confirm in your wallet to send exactly 1,000,000 lamports (0.001 SOL) plus a fee of about 5,000 lamports to the creator.",
    steps: [
      {
        title: "Connect your wallet",
        body: "You need a little devnet SOL — the faucet gives you plenty.",
      },
      {
        title: "Review the tip",
        body: "The wallet shows 0.001 SOL leaving your account. Note the separate network fee line — that's what Solana actually charges.",
      },
      {
        title: "Confirm onchain",
        body: "The tip lands in the creator's wallet in seconds, final and irreversible.",
      },
    ],
    concepts: ["Native SOL", "Lamports", "SystemProgram", "Finality"],
    glossary: {
      SOL: "Solana's native token, used for fees and transfers.",
      Lamport: "The smallest unit of SOL — 1 SOL = 1,000,000,000 lamports.",
      "Network fee": "A tiny SOL cost paid to validators for processing your transaction.",
    },
    funFact:
      "A typical Solana transaction fee is 5,000 lamports — about $0.001. A bank wire costs roughly 25,000× more.",
    actionPath: "/api/actions/lesson-2-tip",
    prerequisites: [1],
    durationSeconds: 30,
    learningObjectives: [
      "Send native SOL (not an SPL token) to another wallet",
      "Read lamports and network fees in a wallet preview",
      "Complete a real onchain tip in one tap",
    ],
    badgeLabel: "SOL Tipper",
  },
  {
    id: 3,
    slug: "remittance",
    status: "active",
    title: "Send money across a border",
    tagline: "Remittance in seconds — not three business days",
    description:
      "Remittance — sending money home across borders — is one of the highest-intent uses of crypto, especially on Turkey ↔ EU/US corridors. In this lesson you send a small USDC payment to a family wallet abroad and experience settlement in seconds, with no SWIFT delays and no bank FX spread.",
    whyItMatters:
      "Traditional remittance costs 5–7% in fees and takes days. The same transfer on Solana costs a fraction of a cent and settles before you can refresh the page. For diaspora families this isn't a demo — it's a monthly pain point solved.",
    blinkAction:
      "Tap the send button to preview an SPL transfer to the demo remittance wallet — think \"Ayşe in Germany\". Sign once and the payment settles on Solana in seconds.",
    steps: [
      {
        title: "Picture the recipient",
        body: "The demo wallet stands in for family abroad — the same flow works for any address on Earth.",
      },
      {
        title: "Review the payment",
        body: "Same USDC transfer mechanics you learned in Lesson 1 — the network doesn't care about borders.",
      },
      {
        title: "Sign and settle",
        body: "Settlement is final in seconds. Compare that with a 2–3 day SWIFT wire and a 5% fee.",
      },
    ],
    concepts: ["Remittance", "Settlement speed", "FX spread", "Borderless transfers"],
    glossary: {
      Remittance: "Money sent across borders, usually by workers to family back home.",
      SWIFT: "The legacy interbank messaging network — wires take 1–5 business days.",
      Settlement: "The moment value actually changes hands, final and irreversible.",
    },
    funFact:
      "Turkey's diaspora sends billions home each year. At Solana fees, the savings versus wire transfers would be enormous.",
    actionPath: "/api/actions/lesson-3-remittance",
    prerequisites: [1, 2],
    durationSeconds: 45,
    learningObjectives: [
      "Understand why USDC remittance beats traditional wire transfers",
      "Send USDC to a second wallet (family / diaspora use case)",
      "Recognize settlement speed and low fees on Solana",
    ],
    badgeLabel: "Remitter",
  },
  {
    id: 4,
    slug: "swap-sol-usdc",
    status: "active",
    title: "Understand your first swap",
    tagline: "How DEXs trade one token for another",
    description:
      "A swap trades one token for another directly onchain — no exchange account, no order form. On mainnet, an aggregator like Jupiter finds the best route across Solana DEXs. Jupiter has no devnet liquidity, so this lesson is an honest simulation: you sign a real devnet transaction that records a swap-lesson memo onchain while the Blink walks you through quotes, routes, and slippage.",
    whyItMatters:
      "Swaps are the gateway to all of DeFi — converting volatile SOL into stable USDC is how people protect value, and it's the mechanic behind every DEX, aggregator, and yield product you'll meet later.",
    blinkAction:
      "Tap the swap button. The Action checks you hold at least 0.01 SOL (the amount a real swap would use), then your wallet signs a devnet transaction carrying a swap-demo memo — proof onchain that you completed the lesson.",
    steps: [
      {
        title: "Hold the swap amount",
        body: "A real swap would trade 0.01 SOL, so the lesson requires you to hold it — plus a little extra for fees.",
      },
      {
        title: "Learn the route",
        body: "On mainnet, Jupiter quotes SOL → USDC across many DEXs and picks the best price. Slippage tolerance protects you from price movement.",
      },
      {
        title: "Sign the demo transaction",
        body: "You sign a real devnet transaction with a memo recording the lesson — the same signing flow a mainnet swap uses.",
      },
    ],
    concepts: ["Swaps", "DEX aggregators", "Slippage", "Memo program"],
    glossary: {
      Swap: "Trading one token for another directly onchain.",
      Jupiter: "Solana's leading aggregator — finds the best swap route across DEXs.",
      Slippage: "The price movement you tolerate between quote and execution.",
      Memo: "A tiny onchain note attached to a transaction — here, your proof of completion.",
    },
    funFact:
      "Jupiter routes through dozens of liquidity sources per quote. Your devnet memo uses the same Memo program that mainnet apps use for receipts.",
    actionPath: "/api/actions/lesson-4-swap",
    prerequisites: [1, 2, 3],
    durationSeconds: 45,
    learningObjectives: [
      "Define a swap and explain what a DEX aggregator does",
      "Understand slippage and why quotes change",
      "Sign a real devnet transaction with an onchain memo",
    ],
    badgeLabel: "Swapper",
  },
  {
    id: 5,
    slug: "claim-graduation-nft",
    status: "active",
    title: "Claim your graduation badge",
    tagline: "Mint an onchain credential you actually own",
    description:
      "The capstone. You mint a Blinks 101 Graduate badge — a real devnet token with a fixed supply of exactly 1, created in a single transaction your wallet pays for and signs. The mint authority is burned in the same transaction, so no one can ever mint a second copy: that's the core idea behind NFTs as credentials.",
    whyItMatters:
      "Onchain credentials can't be faked, revoked by a platform, or lost when a company shuts down. From event tickets to diplomas, supply-1 tokens in your own wallet are how ownership and proof work in web3.",
    blinkAction:
      "Tap the claim button after finishing Lessons 1–4. Your wallet signs one transaction that creates the badge mint, mints exactly 1 token to you, and permanently locks the supply. Costs about 0.003 devnet SOL in rent.",
    steps: [
      {
        title: "Finish the course",
        body: "Lessons 1–4 first — the badge is your proof of the full path, on your honor for this devnet MVP.",
      },
      {
        title: "Sign the mint",
        body: "One transaction creates a brand-new token mint, opens your token account, and mints exactly 1 badge to your wallet.",
      },
      {
        title: "Supply locked forever",
        body: "The same transaction removes the mint authority. Supply: 1. Owner: you. That's a credential.",
      },
    ],
    concepts: ["NFTs as credentials", "Mint authority", "Fixed supply", "Rent"],
    glossary: {
      NFT: "A token with supply 1 — unique, ownable, and transferable.",
      "Mint authority": "The key allowed to create new tokens. Removing it locks supply forever.",
      Rent: "A small SOL deposit that keeps an account alive onchain.",
    },
    funFact:
      "Your badge is a real SPL mint you can look up on any explorer — search the mint address and you'll see supply: 1, mint authority: none.",
    actionPath: "/api/actions/lesson-5/claim",
    prerequisites: [1, 2, 3, 4],
    durationSeconds: 30,
    learningObjectives: [
      "Understand NFTs as wallet-owned credentials",
      "See how burning mint authority fixes supply at 1",
      "Complete the 5-lesson Blinks onboarding path",
    ],
    badgeLabel: "Blinks 101 Graduate",
  },
];

export const LESSON_IDS = LESSONS.map((lesson) => lesson.id);

export const COURSE_DURATION_MINUTES = Math.ceil(
  LESSONS.reduce((total, lesson) => total + lesson.durationSeconds, 0) / 60,
);

export function getLessonById(id: number): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === slug);
}
