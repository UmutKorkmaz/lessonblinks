import type { LessonExplainerMetadata } from "./types";

export const LESSON_05_TITLE = "Lesson 5 · Claim Your Graduation Badge";
export const LESSON_05_ICON_PATH = "/icon.svg";
export const LESSON_05_ACTION_PATH = "/api/actions/lesson-5/claim";

export const LESSON_05_EXPLAINER: LessonExplainerMetadata = {
  lessonId: "lesson-05",
  lessonNumber: 5,
  slug: "claim-graduation-nft",
  durationSeconds: 30,
  prerequisites: ["lesson-01", "lesson-02", "lesson-03", "lesson-04"],
  learningObjectives: [
    "Understand NFTs as wallet-owned credentials",
    "See how burning mint authority fixes supply at 1",
    "Complete the 5-lesson Blinks onboarding path",
  ],
  explainer: {
    headline: "Mint a credential you actually own",
    summary:
      "Your graduation badge is a real devnet token with a fixed supply of exactly 1. One transaction creates the mint, mints the badge to your wallet, and burns the mint authority so a second copy can never exist — the core idea behind NFTs as credentials.",
    steps: [
      {
        order: 1,
        title: "Finish Lessons 1–4",
        body: "The badge is proof of the full path — on your honor for this devnet MVP.",
      },
      {
        order: 2,
        title: "Sign the mint",
        body: "One signature creates a brand-new token mint, opens your token account, and mints exactly 1 badge.",
      },
      {
        order: 3,
        title: "Supply locked forever",
        body: "The same transaction removes the mint authority. Supply: 1. Owner: you.",
      },
    ],
    callout:
      "Look up the mint address on any explorer afterwards — you'll see supply 1 and mint authority: none.",
    glossary: {
      NFT: "A token with supply 1 — unique, ownable, and transferable.",
      "Mint authority": "The key allowed to create new tokens; removing it locks supply forever.",
      Rent: "A small SOL deposit that keeps an account alive onchain.",
    },
  },
  completion: {
    badgeLabel: "Blinks 101 Graduate",
    successTitle: "You graduated — badge minted!",
    successDescription:
      "A supply-1 token now lives in your wallet as proof you finished Blinks 101. Welcome onchain.",
  },
};

export function getLesson05ActionLabel(): string {
  return "Claim Graduation Badge";
}

export function getLesson05SuccessMessage(mintAddress: string): string {
  return `Graduation badge minted! Supply-1 token ${mintAddress} now belongs to your wallet — look it up on any devnet explorer.`;
}
