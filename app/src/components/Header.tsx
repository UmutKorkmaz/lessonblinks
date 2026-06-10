import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          <span className="site-header__logo" aria-hidden="true">
            ◎
          </span>
          <div>
            <p className="site-header__title">
              Lesson<em>Blinks</em>
            </p>
            <p className="site-header__tagline">Solana Actions as 30-second lessons</p>
          </div>
        </Link>
        <nav className="site-header__nav" aria-label="External resources">
          <a
            href="https://dial.to/developer?cluster=devnet"
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__nav-link"
          >
            Blink Tester
          </a>
          <a
            href="https://dial.to/register"
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__nav-link"
          >
            Dialect Registry
          </a>
        </nav>
      </div>
    </header>
  );
}
