/** Translated content for one lesson. Structural data lives in lessons.ts. */
export interface LessonContent {
  title: string;
  tagline: string;
  description: string;
  whyItMatters: string;
  blinkAction: string;
  steps: { title: string; body: string }[];
  concepts: string[];
  glossary: Record<string, string>;
  funFact?: string;
  learningObjectives: string[];
  badgeLabel: string;
  /** Button label inside the Blink, e.g. "Send 0.01 USDC" */
  actionLabel: string;
  /** Post-build message shown by the Blink client. Templates: {recipient}, {mint} */
  successMessage: string;
}

export interface UIStrings {
  // Metadata
  siteTitle: string;
  siteDescription: string;
  /** Template: {x} = lesson number, {title} = lesson title */
  lessonMetaTitle: string;

  // Header
  brandTagline: string;
  faucetLink: string;
  languageLabel: string;

  // Home hero
  heroEyebrow: string;
  heroTitlePre: string;
  heroTitleHighlight: string;
  heroTitlePost: string;
  heroSubtitle: string;
  statLessons: string;
  /** Template: {m} = minutes */
  statMinutes: string;
  statTotal: string;
  statLiveNow: string;
  statBadge: string;
  pathHeading: string;
  footerHome: string;

  // Lesson cards
  liveBadge: string;
  comingSoonBadge: string;
  /** Template: {s} = seconds */
  durationFormat: string;
  earnPrefix: string;
  startLesson: string;
  comingSoonCta: string;

  // Lesson detail
  backToLessons: string;
  /** Template: {x} = current, {y} = total */
  lessonXofY: string;
  lessonWord: string;
  whatYoullLearn: string;
  whyItMatters: string;
  howItWorks: string;
  doItHere: string;
  wordsYouLearned: string;
  learningObjectives: string;
  prerequisites: string;
  noPrereqs: string;
  comingSoonLesson: string;
  actionApiLabel: string;
  didYouKnow: string;
  previous: string;
  next: string;
  footerLesson: string;

  // Embedded Blink
  loadingBlink: string;
  blinkError: string;
  /** Explains that the Blink card is an Action API response (English on external surfaces) */
  blinkApiNote: string;
}

export interface Dictionary {
  ui: UIStrings;
  /** Keyed by lesson id: "1".."5" */
  lessons: Record<string, LessonContent>;
}

/** Replace {placeholders} in a translated template string. */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}
