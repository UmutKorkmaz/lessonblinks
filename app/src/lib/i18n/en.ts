import type { LocaleStrings } from "./types";

export const en: LocaleStrings = {
  locale: "en",

  landing: {
    pageTitle: "Blinks 101 — Learn Solana in 30 Seconds",
    metaDescription:
      "Five one-tap Solana Actions that teach tipping, staking, swapping, and NFTs — right inside your social feed.",
    heroTitle: "Blinks as Micro-Lessons",
    heroTagline: "One-tap Actions as 30-second lessons",
    heroSubtitle:
      "Skip static tutorials. Each Blink is a real onchain action with inline explainers — tip USDC, send SOL, swap tokens, stake, and claim your graduation NFT.",
    startLessonCta: "Start Lesson 1",
    viewCurriculumCta: "View all 5 lessons",
    howItWorksTitle: "How it works",
    stepConnect: "Connect your wallet in Phantom, Backpack, or any Blink client.",
    stepRead: "Read the inline explainer — no docs tab required.",
    stepSign: "Sign one transaction and learn by doing on Solana.",
    stepGraduate: "Finish all five lessons and claim your Graduate Badge NFT.",
    curriculumTitle: "The 5-lesson path",
    curriculumSubtitle:
      "Each lesson builds on the last. Real funds, tiny amounts, maximum learning.",
    graduateTitle: "Graduate with an onchain badge",
    graduateDescription:
      "Complete Lessons 1–4 to unlock a compressed NFT — portable proof you finished Blinks 101. Show it on X, LinkedIn, or in your wallet.",
    footerTagline: "Education is distribution. Built for Solana onboarding.",
  },

  lessons: {
    lesson01: {
      number: 1,
      title: "Tip $1 USDC",
      shortTitle: "USDC Tip",
      description:
        "Send a dollar-pegged stablecoin to a creator. Learn SPL token transfers, associated token accounts, and why USDC is the on-ramp for everyday payments on Solana.",
      concept: "SPL transfers & stablecoins",
      durationLabel: "~30 sec",
    },
    lesson02: {
      number: 2,
      title: "Tip a creator 0.001 SOL",
      shortTitle: "SOL Tip",
      description:
        "Send native SOL — not an SPL token — directly to a creator's wallet. Understand lamports, network fees, and how Solana's base currency differs from USDC.",
      concept: "Native SOL transfers",
      durationLabel: "~30 sec",
    },
    lesson03: {
      number: 3,
      title: "Swap SOL to USDC",
      shortTitle: "Token Swap",
      description:
        "Trade a tiny 0.01 SOL into USDC via Jupiter. Learn what a swap is, how aggregators find the best route, and why you keep extra SOL for fees.",
      concept: "DeFi routing & slippage",
      durationLabel: "~45 sec",
    },
    lesson04: {
      number: 4,
      title: "Stake 0.01 SOL",
      shortTitle: "Stake SOL",
      description:
        "Delegate SOL to secure the network and earn rewards. Choose Marinade liquid staking (mSOL) or native delegation — both in one real devnet transaction.",
      concept: "Staking & validators",
      durationLabel: "~45 sec",
    },
    lesson05: {
      number: 5,
      title: "Claim your graduation NFT",
      shortTitle: "Graduation NFT",
      description:
        "Mint a compressed NFT that proves you completed Blinks 101. Wallet-owned credentials you can share anywhere — sponsored mint, almost zero cost.",
      concept: "NFTs as credentials",
      durationLabel: "~30 sec",
    },
  },

  blink: {
    lesson01: {
      title: "Lesson 1 · Tip $1 USDC",
      description: [
        "USDC is a dollar-pegged stablecoin on Solana — useful for tips, payments, and saving value without SOL's price swings.",
        "",
        "You'll send exactly $1 USDC to a creator. Your wallet signs an SPL token transfer; the recipient receives USDC in their token account.",
        "",
        "Tip: you need a little SOL in your wallet for the network fee.",
      ].join("\n"),
      actionLabel: "Tip $1 USDC",
      postMessage:
        "Send $1 USDC to the creator. Review the recipient and amount in your wallet before signing.",
      insufficientBalance:
        "You need USDC for the tip and a little SOL for fees. Add funds to your wallet and try again.",
    },
    lesson02: {
      title: "Lesson 2 · Tip a creator 0.001 SOL",
      description: [
        "SOL is Solana's native currency. Tipping sends lamports directly from your wallet to a creator — no token account required.",
        "",
        "Steps:",
        "1. Connect your wallet — Your wallet holds SOL and signs the transfer.",
        "2. Review the tip — You'll send exactly 0.001 SOL plus a small network fee.",
        "3. Confirm onchain — The tip lands in the creator's wallet in seconds.",
        "",
        "1 SOL = 1,000,000,000 lamports. This lesson sends 1,000,000 lamports.",
      ].join("\n"),
      actionLabel: "Tip 0.001 SOL",
      postMessage:
        "Send 0.001 SOL to the creator plus a small network fee. Confirm in your wallet preview.",
      insufficientBalance:
        "You need at least 0.002 SOL (tip + fees). Add a little SOL and try again.",
    },
    lesson03: {
      title: "Lesson 3 · Swap SOL to USDC",
      description: [
        "A swap trades one token for another. Here you'll swap a tiny 0.01 SOL into USDC — a stablecoin pegged to $1.",
        "",
        "Jupiter finds the best price across Solana DEXs. You'll sign one transaction; your wallet sends it.",
        "",
        "Tip: keep a little SOL in your wallet for network fees.",
        "",
        "Next up after this: Lesson 4 — Stake SOL.",
      ].join("\n"),
      actionLabel: "Swap 0.01 SOL",
      postMessage:
        "Swap 0.01 SOL → ~{outUsdc} USDC via Jupiter. Review amounts in your wallet before signing.",
      insufficientBalance:
        "You need a bit more SOL for this swap and fees. Try adding ~0.02 SOL total.",
    },
  },
};