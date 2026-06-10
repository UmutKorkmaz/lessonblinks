export const LOCALE_CODES = [
  "en",
  "tr",
  "es",
  "de",
  "fr",
  "it",
  "pt",
  "ru",
  "ar",
  "hi",
  "id",
  "zh",
  "ja",
  "ko",
] as const;

export type Locale = (typeof LOCALE_CODES)[number];

export interface LocaleInfo {
  code: Locale;
  /** Language name in its own language, shown in the switcher */
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const LOCALES: LocaleInfo[] = [
  { code: "en", nativeName: "English", dir: "ltr" },
  { code: "tr", nativeName: "Türkçe", dir: "ltr" },
  { code: "es", nativeName: "Español", dir: "ltr" },
  { code: "de", nativeName: "Deutsch", dir: "ltr" },
  { code: "fr", nativeName: "Français", dir: "ltr" },
  { code: "it", nativeName: "Italiano", dir: "ltr" },
  { code: "pt", nativeName: "Português", dir: "ltr" },
  { code: "ru", nativeName: "Русский", dir: "ltr" },
  { code: "ar", nativeName: "العربية", dir: "rtl" },
  { code: "hi", nativeName: "हिन्दी", dir: "ltr" },
  { code: "id", nativeName: "Bahasa Indonesia", dir: "ltr" },
  { code: "zh", nativeName: "中文", dir: "ltr" },
  { code: "ja", nativeName: "日本語", dir: "ltr" },
  { code: "ko", nativeName: "한국어", dir: "ltr" },
];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "lb-locale";

export function isLocale(value: string): value is Locale {
  return (LOCALE_CODES as readonly string[]).includes(value);
}

export function getLocaleInfo(code: Locale): LocaleInfo {
  return LOCALES.find((locale) => locale.code === code) ?? LOCALES[0];
}
