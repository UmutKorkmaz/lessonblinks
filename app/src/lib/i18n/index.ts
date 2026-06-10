import type { Dictionary } from "./types";
import { DEFAULT_LOCALE, type Locale } from "./config";

import { en } from "./en";
import { tr } from "./tr";
import { es } from "./es";
import { de } from "./de";
import { fr } from "./fr";
import { it } from "./it";
import { pt } from "./pt";
import { ru } from "./ru";
import { ar } from "./ar";
import { hi } from "./hi";
import { id } from "./id";
import { zh } from "./zh";
import { ja } from "./ja";
import { ko } from "./ko";

const DICTIONARIES: Record<string, Dictionary> = {
  en,
  tr,
  es,
  de,
  fr,
  it,
  pt,
  ru,
  ar,
  hi,
  id,
  zh,
  ja,
  ko,
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export * from "./config";
export * from "./types";
