import {
  DEFAULT_LOCALE,
  format,
  getDictionary,
  isLocale,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

/**
 * Locale for a Solana Action request. The Actions spec has no language
 * negotiation, so our embedded Blink client passes `?lang=`; external
 * clients (X, wallets, registry) omit it and get English.
 */
export function getActionLocale(requestUrl: URL): Locale {
  const lang = requestUrl.searchParams.get("lang");
  return lang && isLocale(lang) ? lang : DEFAULT_LOCALE;
}

export function getActionDict(requestUrl: URL): Dictionary {
  return getDictionary(getActionLocale(requestUrl));
}

export interface ActionStrings {
  title: string;
  description: string;
  label: string;
  /** Localized post-build message. Templates: {recipient}, {mint} */
  successMessage: string;
}

/** Build the localized GET-response text for a lesson Blink. */
export function buildActionStrings(dict: Dictionary, lessonId: number): ActionStrings {
  const lesson = dict.lessons[String(lessonId)];

  const steps = lesson.steps.map(
    (step, index) => `${index + 1}. ${step.title} — ${step.body}`,
  );
  const objectives = lesson.learningObjectives.map((objective) => `• ${objective}`);

  return {
    title: `${dict.ui.lessonWord} ${lessonId} · ${lesson.title}`,
    description: [
      lesson.description,
      "",
      ...steps,
      ...(lesson.funFact ? ["", `${dict.ui.didYouKnow} ${lesson.funFact}`] : []),
      "",
      `${dict.ui.whatYoullLearn}:`,
      ...objectives,
    ].join("\n"),
    label: lesson.actionLabel,
    successMessage: lesson.successMessage,
  };
}

export function formatSuccessMessage(
  strings: ActionStrings,
  values: Record<string, string | number> = {},
): string {
  return format(strings.successMessage, values);
}
