import { cookies, headers } from "next/headers";

import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from "./config";

/**
 * Resolve the request locale: explicit cookie (set by the language switcher)
 * wins, then the browser's Accept-Language, then English.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (fromCookie && isLocale(fromCookie)) {
    return fromCookie;
  }

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language") ?? "";

  for (const part of acceptLanguage.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase();
    if (!tag) continue;

    if (isLocale(tag)) return tag;

    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return DEFAULT_LOCALE;
}
