import { LAMPORTS_PER_SOL } from "@solana/web3.js";

/** Circle USDC mint on Solana devnet */
export const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

export const USDC_DECIMALS = 6;

/**
 * Treasury / sponsor wallet pubkey.
 * Set `TREASURY_PUBKEY` in env before production; placeholder is all-1s.
 */
export const TREASURY_PUBKEY =
  process.env.TREASURY_PUBKEY ??
  process.env.TREASURY_WALLET_PUBKEY ??
  process.env.FEE_PAYER_PUBKEY ??
  "11111111111111111111111111111111";

export const SOLANA_RPC_URL =
  process.env.SOLANA_RPC_URL ??
  process.env.SOLANA_RPC ??
  "https://api.devnet.solana.com";

export const SOLANA_CLUSTER = (process.env.SOLANA_CLUSTER ??
  process.env.SOLANA_NETWORK ??
  "devnet") as "devnet" | "mainnet-beta";

export const COURSE_ID = "lessonblinks-101";

// ── Lesson fixed amounts (single source of truth) ───────────────────────────

/** Lesson 1 — tip $1 USDC (1_000_000 base units, 6 decimals) */
export const LESSON_01_USDC_AMOUNT = 1_000_000;

/** Lesson 2 — tip 0.001 SOL */
export const LESSON_02_SOL_TIP_LAMPORTS = 0.001 * LAMPORTS_PER_SOL;

/** Lesson 3 — remittance $0.50 USDC */
export const LESSON_03_USDC_AMOUNT = 500_000;

/** Lesson 4 — stake or swap 0.01 SOL */
export const LESSON_04_SOL_LAMPORTS = 0.01 * LAMPORTS_PER_SOL;

/** Lesson 5 — optional anti-spam treasury transfer (0.001 SOL) */
export const LESSON_05_SPAM_LAMPORTS = 0.001 * LAMPORTS_PER_SOL;

/** Minimum wallet balance buffer for fee + rent checks (~0.005 SOL) */
export const MIN_SOL_FEE_BUFFER_LAMPORTS = 5_000_000;
