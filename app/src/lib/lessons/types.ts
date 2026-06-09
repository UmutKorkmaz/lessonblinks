import type { ActionGetResponse, CompletedAction } from "@solana/actions";

/** Stable identifier used in tracking + memo payloads */
export type LessonId =
  | "lesson-01"
  | "lesson-02"
  | "lesson-03"
  | "lesson-04"
  | "lesson-05";

export interface LessonStep {
  /** 1-based step number shown in UI */
  order: number;
  /** Short title, e.g. "Review the tip" */
  title: string;
  /** One sentence the blink client can render inline */
  body: string;
}

/**
 * Explainer metadata — lesson-specific education layer.
 * Stored in code (not in the Actions spec) and merged into GET responses.
 */
export interface LessonExplainerMetadata {
  lessonId: LessonId;
  lessonNumber: number;
  slug: string;
  /** Target time-on-lesson for UX copy */
  durationSeconds: number;
  prerequisites: LessonId[];
  learningObjectives: string[];
  explainer: {
    headline: string;
    summary: string;
    steps: LessonStep[];
    /** Optional "did you know?" box */
    callout?: string;
    glossary?: Record<string, string>;
  };
  completion: {
    badgeLabel: string;
    successTitle: string;
    successDescription: string;
    /** Relative href to next lesson blink */
    nextLessonActionHref?: string;
  };
}

/**
 * Extended GET payload: standard Action fields + lesson explainer block.
 * Blink clients ignore unknown keys; lesson-aware clients can read `lesson`.
 */
export interface LessonActionGetResponse extends ActionGetResponse {
  lesson: LessonExplainerMetadata;
}

/** Off-chain completion record (MVP: log; V2: persist) */
export interface LessonCompletionRecord {
  lessonId: LessonId;
  wallet: string;
  signature: string;
  lamports: number;
  recipient: string;
  network: "mainnet-beta" | "devnet";
  completedAt: string;
  verified: boolean;
}

export type LessonCompletedAction = CompletedAction & {
  lesson: Pick<LessonExplainerMetadata, "lessonId" | "lessonNumber"> & {
    completed: true;
    signature: string;
    nextLessonActionHref?: string;
  };
};