import type { Dictionary, LessonContent } from "./i18n/types";

export type LessonStatus = "active" | "coming-soon";

/** Structural, language-independent lesson data. Text lives in i18n dictionaries. */
export interface LessonBase {
  id: number;
  slug: string;
  status: LessonStatus;
  /** Relative Solana Action API path */
  actionPath: string;
  /** Prerequisite lesson ids (empty for Lesson 1) */
  prerequisites: number[];
  durationSeconds: number;
}

/** A lesson merged with its translated content for the active locale. */
export type Lesson = LessonBase & LessonContent;

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

export const LESSON_BASES: LessonBase[] = [
  {
    id: 1,
    slug: "tip-usdc",
    status: "active",
    actionPath: "/api/actions/lesson-1-usdc",
    prerequisites: [],
    durationSeconds: 30,
  },
  {
    id: 2,
    slug: "tip-creator-sol",
    status: "active",
    actionPath: "/api/actions/lesson-2-tip",
    prerequisites: [1],
    durationSeconds: 30,
  },
  {
    id: 3,
    slug: "remittance",
    status: "active",
    actionPath: "/api/actions/lesson-3-remittance",
    prerequisites: [1, 2],
    durationSeconds: 45,
  },
  {
    id: 4,
    slug: "swap-sol-usdc",
    status: "active",
    actionPath: "/api/actions/lesson-4-swap",
    prerequisites: [1, 2, 3],
    durationSeconds: 45,
  },
  {
    id: 5,
    slug: "claim-graduation-nft",
    status: "active",
    actionPath: "/api/actions/lesson-5/claim",
    prerequisites: [1, 2, 3, 4],
    durationSeconds: 30,
  },
];

export const LESSON_IDS = LESSON_BASES.map((lesson) => lesson.id);

export const COURSE_DURATION_MINUTES = Math.ceil(
  LESSON_BASES.reduce((total, lesson) => total + lesson.durationSeconds, 0) / 60,
);

function mergeLesson(base: LessonBase, dict: Dictionary): Lesson {
  return { ...base, ...dict.lessons[String(base.id)] };
}

export function getLessons(dict: Dictionary): Lesson[] {
  return LESSON_BASES.map((base) => mergeLesson(base, dict));
}

export function getLessonById(dict: Dictionary, id: number): Lesson | undefined {
  const base = LESSON_BASES.find((lesson) => lesson.id === id);
  return base ? mergeLesson(base, dict) : undefined;
}

export function getLessonBaseBySlug(slug: string): LessonBase | undefined {
  return LESSON_BASES.find((lesson) => lesson.slug === slug);
}
