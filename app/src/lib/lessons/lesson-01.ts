import type { LessonExplainerMetadata } from "./types";
import {
  LESSON_01_ID,
  LESSON_01_TRANSFER_USDC,
} from "./constants";

export const LESSON_01_TITLE = "Lesson 1 · First USDC Transfer";

export const LESSON_01_EXPLAINER: LessonExplainerMetadata = {
  lessonId: LESSON_01_ID,
  lessonNumber: 1,
  slug: "first-usdc-transfer",
  durationSeconds: 30,
  prerequisites: [],
  learningObjectives: [
    "Understand USDC as a stablecoin on Solana",
    "Send an SPL token transfer (not native SOL)",
    "Complete a real transaction from a Blink in under a minute",
  ],
  explainer: {
    headline: "Send your first USDC on Solana",
    summary:
      "USDC is a dollar-pegged stablecoin. Unlike native SOL, it lives in an SPL token account — a separate balance tied to a specific mint address.",
    steps: [
      {
        order: 1,
        title: "Connect your wallet",
        body: "Your wallet holds SOL for fees and USDC in an SPL token account.",
      },
      {
        order: 2,
        title: "Review the transfer",
        body: `You'll send exactly ${LESSON_01_TRANSFER_USDC} USDC to the education treasury wallet.`,
      },
      {
        order: 3,
        title: "Sign the transaction",
        body: "One signature moves USDC onchain. You pay a small SOL fee for network processing.",
      },
    ],
    callout:
      "Did you know? USDC on devnet uses mint 4zMMC9… — same SPL mechanics as mainnet, zero real dollars at risk.",
    glossary: {
      USDC: "A stablecoin pegged to $1, issued by Circle.",
      "SPL token": "Solana's token standard — like ERC-20 on Ethereum.",
      "Token account": "An onchain account that holds a specific SPL token balance.",
    },
  },
  completion: {
    badgeLabel: "USDC Sender",
    successTitle: "Lesson 1 complete — you sent USDC!",
    successDescription:
      "You just made your first SPL token transfer on Solana. Next up: tip a creator with native SOL in Lesson 2.",
    nextLessonActionHref: "/api/actions/lesson-2-tip",
  },
};

export function getLesson01ActionLabel(): string {
  return `Send ${LESSON_01_TRANSFER_USDC} USDC`;
}

export function getLesson01TransferMessage(recipient: string): string {
  return `Send ${LESSON_01_TRANSFER_USDC} USDC to the education treasury (${recipient}). Review in your wallet before signing.`;
}