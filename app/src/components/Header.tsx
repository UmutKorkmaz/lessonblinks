export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <span className="site-header__logo" aria-hidden="true">
            ◎
          </span>
          <div>
            <h1 className="site-header__title">LessonBlinks</h1>
            <p className="site-header__tagline">One-tap Actions as 30-second lessons</p>
          </div>
        </div>
        <nav className="site-header__nav">
          <a
            href="https://www.blinks.xyz/inspector"
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__registry-link"
          >
            Blinks Inspector
          </a>
          <a
            href="https://dial.to/register"
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__registry-link"
          >
            Dialect Registry
          </a>
        </nav>
      </div>
    </header>
  );
}