export type {
  BlinkCardStrings,
  LessonStrings,
  Locale,
  LocaleStrings,
} from "./types";

export { en } from "./en";
export { tr } from "./tr";

import type { Locale } from "./types";
import { en } from "./en";
import { tr } from "./tr";

const locales = { en, tr } as const;

export function getLocaleStrings(locale: Locale) {
  return locales[locale];
}

export const defaultLocale: Locale = "en";