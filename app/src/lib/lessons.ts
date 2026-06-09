export type LessonStatus = "active" | "coming-soon";

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  status: LessonStatus;
  tagline: string;
  /** Lesson content explanation shown on the detail page */
  description: string;
  /** What the learner does inside the Blink */
  blinkAction: string;
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
 * Hosted inspector (blinks.xyz) is parked as of 2026-06 — redirects to /lander.
 * For protocol debugging, run the local inspector:
 * https://github.com/solana-developers/blinks-xyz
 */
export const LOCAL_BLINK_INSPECTOR_REPO =
  "https://github.com/solana-developers/blinks-xyz";

/** @deprecated Hosted blinks.xyz/inspector is parked; use embedded LessonBlink or local inspector. */
export function getBlinkInspectorUrl(
  actionPath: string,
  baseUrl = getBaseUrl(),
): string {
  const actionUrl = getActionUrl(actionPath, baseUrl);
  return `${LOCAL_BLINK_INSPECTOR_REPO}#action=${encodeURIComponent(actionUrl)}`;
}

/** @deprecated dial.to interstitial is down (DEPLOYMENT_PAUSED). */
export function getDialToUrl(actionPath: string, baseUrl = getBaseUrl()): string {
  const actionUrl = getActionUrl(actionPath, baseUrl);
  return `https://dial.to/?action=${encodeURIComponent(getSolanaActionUrl(actionUrl))}`;
}

export const LESSONS: Lesson[] = [
  {
    id: 1,
    slug: "tip-usdc",
    status: "active",
    title: "Tip $1 USDC",
    tagline: "Learn SPL transfers with a stablecoin tip",
    description:
      "USDC is a dollar-pegged stablecoin on Solana. Unlike native SOL, it lives in an SPL token account. In this lesson you'll send exactly $1 USDC to a creator — a real onchain transfer you can complete in one tap from a Blink.",
    blinkAction:
      "Connect your wallet and tap \"Tip $1 USDC\". Your wallet previews an SPL token transfer; after you sign, $1 USDC moves to the creator's token account.",
    actionPath: "/api/actions/lesson-1-usdc",
    prerequisites: [],
    durationSeconds: 30,
    learningObjectives: [
      "Understand USDC as a stablecoin on Solana",
      "Send an SPL token transfer (not native SOL)",
      "Complete a real transaction from a Blink in under a minute",
    ],
    badgeLabel: "USDC Tipper",
  },
  {
    id: 2,
    slug: "tip-creator-sol",
    status: "active",
    title: "Tip a creator 0.001 SOL",
    tagline: "Send native SOL with lamports and network fees",
    description:
      "SOL is Solana's native currency. Tipping with SOL moves lamports directly from your wallet to another address — no token account required. You'll also see how a small network fee is paid on top of the tip amount.",
    blinkAction:
      "Tap \"Tip 0.001 SOL\" to preview a SystemProgram transfer. Confirm in your wallet to send 1,000,000 lamports (0.001 SOL) plus a small fee to the creator.",
    actionPath: "/api/actions/lesson-2-tip",
    prerequisites: [1],
    durationSeconds: 30,
    learningObjectives: [
      "Send native SOL (not USDC) to another wallet",
      "Recognize lamports as the smallest unit of SOL",
      "Complete a real onchain tip in one tap",
    ],
    badgeLabel: "SOL Tipper",
  },
  {
    id: 3,
    slug: "remittance",
    status: "active",
    title: "Send USDC abroad",
    tagline: "Cross-border remittance in seconds, not days",
    description:
      "Remittance is one of the highest-intent crypto use cases — especially for Turkey ↔ EU/US corridors. In this lesson you send a small USDC payment to a family wallet address, experiencing near-instant settlement without bank FX spreads.",
    blinkAction:
      "Tap \"Send 0.05 USDC\" to preview an SPL transfer to a remittance wallet. Sign once — your payment settles on Solana in seconds.",
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
    status: "coming-soon",
    title: "Swap SOL to USDC",
    tagline: "Trade tokens with Jupiter in one signature",
    description:
      "A swap trades one token for another on-chain. Here you'll swap a tiny 0.01 SOL into USDC — a stablecoin pegged to $1. Jupiter aggregates liquidity across Solana DEXs to find a competitive route.",
    blinkAction:
      "Tap \"Swap 0.01 SOL\" and review the Jupiter-built transaction in your wallet. Sign once to swap ~0.01 SOL into USDC; keep a little extra SOL for fees and rent.",
    actionPath: "/api/actions/lesson-4-swap",
    prerequisites: [1, 2, 3],
    durationSeconds: 45,
    learningObjectives: [
      "Understand swaps and why USDC is useful for saving value",
      "See how Jupiter routes trades across DEXs",
      "Recognize slippage and network fees on a real swap",
    ],
    badgeLabel: "Swapper",
  },
  {
    id: 5,
    slug: "claim-graduation-nft",
    status: "coming-soon",
    title: "Claim your graduation NFT",
    tagline: "Earn an onchain credential for finishing the course",
    description:
      "Lesson 5 is the capstone. After completing Lessons 1–4, you can claim a Blinks 101 Graduate Badge — a compressed NFT (cNFT) that lives in your wallet as proof you finished the micro-course. The mint is sponsored; you only sign to receive it.",
    blinkAction:
      "Tap \"Claim Badge\" once you've completed Lessons 1–4. Your wallet signs a sponsored mint transaction and the graduation cNFT appears in your collectibles.",
    actionPath: "/api/actions/lesson-5/claim",
    prerequisites: [1, 2, 3, 4],
    durationSeconds: 30,
    learningObjectives: [
      "Understand NFTs as wallet-owned credentials",
      "Experience a compressed NFT mint on Solana",
      "Complete the 5-lesson Blinks onboarding path",
    ],
    badgeLabel: "Blinks 101 Graduate",
  },
];

export const LESSON_IDS = LESSONS.map((lesson) => lesson.id);

export function getLessonById(id: number): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === slug);
}