import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { LOCALES, type Dictionary, type Locale } from "@/lib/i18n";

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

export function Header({ dict, locale }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          <Image
            src="/icon.svg"
            alt=""
            width={38}
            height={38}
            className="site-header__logo"
            priority
          />
          <div>
            <p className="site-header__title">
              Lesson<em>Blinks</em>
            </p>
            <p className="site-header__tagline">{dict.ui.brandTagline}</p>
          </div>
        </Link>
        <nav className="site-header__nav" aria-label="Site tools">
          <a
            href="https://faucet.solana.com"
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__nav-link"
          >
            {dict.ui.faucetLink}
          </a>
          <LanguageSwitcher
            current={locale}
            locales={LOCALES}
            label={dict.ui.languageLabel}
          />
        </nav>
      </div>
    </header>
  );
}
