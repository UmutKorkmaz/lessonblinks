import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { LessonId } from "./types";

/** Circle USDC mint on Solana devnet */
export const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

export const USDC_DECIMALS = 6;

export const LESSON_01_ID: LessonId = "lesson-01";
export const LESSON_01_TRANSFER_USDC = 0.01;
/** Raw SPL amount: 0.01 * 10^6 */
export const LESSON_01_TRANSFER_AMOUNT = 10_000;
export const LESSON_01_ACTION_PATH = "/api/actions/lesson-1-usdc";
export const LESSON_01_ICON_PATH = "/icon.svg";

export const CREATOR_WALLET_PUBKEY =
  process.env.CREATOR_WALLET_PUBKEY ??
  process.env.NEXT_PUBLIC_CREATOR_WALLET_PUBKEY;

export const TREASURY_WALLET_PUBKEY =
  process.env.TREASURY_WALLET_PUBKEY ??
  process.env.NEXT_PUBLIC_TREASURY_WALLET_PUBKEY;

export const EDUCATION_WALLET_PUBKEY =
  process.env.EDUCATION_WALLET_PUBKEY ??
  process.env.NEXT_PUBLIC_EDUCATION_WALLET_PUBKEY;

export const LESSON_01_RECIPIENT_PUBKEY =
  EDUCATION_WALLET_PUBKEY ?? TREASURY_WALLET_PUBKEY ?? CREATOR_WALLET_PUBKEY;

export const DEFAULT_RECIPIENT_PUBKEY =
  CREATOR_WALLET_PUBKEY ?? TREASURY_WALLET_PUBKEY;

export const LESSON_02_ID: LessonId = "lesson-02";
export const LESSON_02_TIP_SOL = 0.001;
export const LESSON_02_TIP_LAMPORTS = LESSON_02_TIP_SOL * LAMPORTS_PER_SOL;

export const SOLANA_RPC =
  process.env.SOLANA_RPC ??
  process.env.SOLANA_RPC_URL ??
  "https://api.devnet.solana.com";

export const SOLANA_NETWORK = (process.env.SOLANA_NETWORK ?? "devnet") as
  | "mainnet-beta"
  | "devnet";

export const LESSON_02_ACTION_PATH = "/api/actions/lesson-2-tip";