/** Supported UI locales */
export type Locale = "en" | "tr";

/** Curriculum card copy for a single lesson */
export interface LessonStrings {
  /** Display number, e.g. 1 */
  number: number;
  /** Full lesson title shown on landing cards */
  title: string;
  /** Short title for compact UI */
  shortTitle: string;
  /** One-paragraph lesson summary */
  description: string;
  /** Core concept taught (badge / meta) */
  concept: string;
  /** Human-readable duration, e.g. "~30 sec" */
  durationLabel: string;
}

/**
 * Solana Action / Blink GET metadata for lessons 1–3.
 * Maps to `title`, `description`, and `label` in ActionGetResponse.
 */
export interface BlinkCardStrings {
  title: string;
  description: string;
  actionLabel: string;
  /** POST response `message` (may include placeholders) */
  postMessage: string;
  /** Shown when wallet balance is too low */
  insufficientBalance: string;
}

export interface LocaleStrings {
  locale: Locale;

  landing: {
    pageTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroTagline: string;
    heroSubtitle: string;
    startLessonCta: string;
    viewCurriculumCta: string;
    howItWorksTitle: string;
    stepConnect: string;
    stepRead: string;
    stepSign: string;
    stepGraduate: string;
    curriculumTitle: string;
    curriculumSubtitle: string;
    graduateTitle: string;
    graduateDescription: string;
    footerTagline: string;
  };

  lessons: {
    lesson01: LessonStrings;
    lesson02: LessonStrings;
    lesson03: LessonStrings;
    lesson04: LessonStrings;
    lesson05: LessonStrings;
  };

  blink: {
    lesson01: BlinkCardStrings;
    lesson02: BlinkCardStrings;
    lesson03: BlinkCardStrings;
  };
}