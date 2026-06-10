"use client";

import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";

import { LOCALE_COOKIE, type LocaleInfo } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  current: string;
  locales: LocaleInfo[];
  label: string;
}

const ONE_YEAR_SECONDS = 31_536_000;

export function LanguageSwitcher({ current, locales, label }: LanguageSwitcherProps) {
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    document.cookie = `${LOCALE_COOKIE}=${event.target.value}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
    router.refresh();
  }

  return (
    <span className="lang-switch">
      <span className="lang-switch__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3.5 12h17M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
        </svg>
      </span>
      <select
        className="lang-switch__select"
        aria-label={label}
        value={current}
        onChange={handleChange}
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.nativeName}
          </option>
        ))}
      </select>
    </span>
  );
}
