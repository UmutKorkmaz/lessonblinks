import type { LessonExplainerMetadata } from "./types";
import { LESSON_02_ID, LESSON_02_TIP_SOL } from "./constants";

export const LESSON_02_TITLE = "Lesson 2 · Tip a creator 0.001 SOL";
export const LESSON_02_ICON_PATH = "/icon.svg";

export const LESSON_02_EXPLAINER: LessonExplainerMetadata = {
  lessonId: LESSON_02_ID,
  lessonNumber: 2,
  slug: "tip-creator-sol",
  durationSeconds: 30,
  prerequisites: ["lesson-01"],
  learningObjectives: [
    "Send native SOL (not USDC) to another wallet",
    "Recognize lamports as the smallest unit of SOL",
    "Complete a real onchain tip in one tap",
  ],
  explainer: {
    headline: "Tip a creator with native SOL",
    summary:
      "SOL is Solana's native currency. Tipping sends lamports directly from your wallet to a creator — no token account required.",
    steps: [
      {
        order: 1,
        title: "Connect your wallet",
        body: "Your wallet holds SOL and signs the transfer.",
      },
      {
        order: 2,
        title: "Review the tip",
        body: "You'll send exactly 0.001 SOL plus a small network fee.",
      },
      {
        order: 3,
        title: "Confirm onchain",
        body: "The tip lands in the creator's wallet in seconds.",
      },
    ],
    callout:
      "1 SOL = 1,000,000,000 lamports. This lesson sends 1,000,000 lamports.",
    glossary: {
      SOL: "Solana's native token used for fees and transfers.",
      Lamports: "Smallest unit of SOL (like cents to a dollar).",
      "Network fee":
        "Small SOL cost paid to validators for processing your transaction.",
    },
  },
  completion: {
    badgeLabel: "SOL Tipper",
    successTitle: "Lesson 2 complete — you tipped 0.001 SOL!",
    successDescription:
      "You just made a native SOL transfer on Solana. Next up: explore staking or NFT claims in later lessons.",
    nextLessonActionHref: "/api/actions/lesson-3-remittance",
  },
};

export function getLesson02ActionLabel(): string {
  return `Tip ${LESSON_02_TIP_SOL} SOL`;
}

export function getLesson02TransferMessage(recipient: string): string {
  return `Tip ${LESSON_02_TIP_SOL} SOL to ${recipient}. Review in your wallet before signing.`;
}