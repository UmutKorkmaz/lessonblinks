import type { LessonExplainerMetadata } from "./types";

export const LESSON_04_TITLE = "Lesson 4 · Swap SOL to USDC";
export const LESSON_04_ICON_PATH = "/icon.svg";
export const LESSON_04_ACTION_PATH = "/api/actions/lesson-4-swap";

/** Amount a real mainnet swap would trade — learner must hold it. */
export const LESSON_04_SWAP_SOL = 0.01;
export const LESSON_04_SWAP_LAMPORTS = 10_000_000;
/** Extra SOL the learner should keep for fees and rent. */
export const LESSON_04_MIN_RESERVE_LAMPORTS = 5_000_000;

export const LESSON_04_EXPLAINER: LessonExplainerMetadata = {
  lessonId: "lesson-04",
  lessonNumber: 4,
  slug: "swap-sol-usdc",
  durationSeconds: 45,
  prerequisites: ["lesson-01", "lesson-02", "lesson-03"],
  learningObjectives: [
    "Define a swap as trading one token for another",
    "Explain what a DEX aggregator like Jupiter does",
    "Understand slippage and fees at a beginner level",
  ],
  explainer: {
    headline: "Swap SOL to USDC",
    summary:
      "A swap trades one token for another onchain. On mainnet, Jupiter routes your trade across DEXs for the best price. Jupiter has no devnet liquidity, so this lesson teaches the mechanics with an honest devnet simulation.",
    steps: [
      {
        order: 1,
        title: "Hold the swap amount",
        body: `A real swap would trade ${LESSON_04_SWAP_SOL} SOL — the lesson requires you to hold it plus a little for fees.`,
      },
      {
        order: 2,
        title: "Learn the route",
        body: "Mainnet aggregators quote SOL → USDC across many DEXs; slippage tolerance protects the final amount.",
      },
      {
        order: 3,
        title: "Sign the demo transaction",
        body: "You sign a real devnet transaction carrying a swap-demo memo — onchain proof you completed the lesson.",
      },
    ],
    callout:
      "Devnet demo mode: no tokens are exchanged. The signing flow is identical to a real mainnet swap.",
    glossary: {
      Swap: "Trading one token for another directly onchain.",
      Jupiter: "Solana's leading swap aggregator across DEXs.",
      Slippage: "The price movement you tolerate between quote and execution.",
    },
  },
  completion: {
    badgeLabel: "Swapper",
    successTitle: "Lesson 4 complete — you understand swaps!",
    successDescription:
      "Your swap-demo memo is onchain. One lesson left: claim your graduation badge.",
    nextLessonActionHref: "/api/actions/lesson-5/claim",
  },
};

export function getLesson04ActionLabel(): string {
  return `Swap ${LESSON_04_SWAP_SOL} SOL (devnet demo)`;
}

export function getLesson04SuccessMessage(): string {
  return [
    `Devnet demo: you signed a swap-lesson completion memo.`,
    `On mainnet this same flow would trade ${LESSON_04_SWAP_SOL} SOL into USDC via Jupiter.`,
  ].join(" ");
}
