export default function NavSearchHeader({ brand, section, searchPlaceholder, searchAction, links, signInLabel, signInUrl, accent }) {
  return (
    <header className="lp-section nav-search-header" style={{ '--accent': accent }}>
      <div className="lp-container nsh-bar">
        <a className="nsh-brand" href="/" aria-label={`${brand} ${section} home`}>
          <span className="nsh-mark" aria-hidden="true">{brand.slice(0, 1)}</span>
          <span>{brand}</span>
          <span className="nsh-section">{section}</span>
        </a>
        <form className="nsh-search" role="search" action={searchAction} method="get">
          <label className="lp-sr-only" htmlFor="nsh-q">
            {searchPlaceholder}
          </label>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="M13.2 13.2 17 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <input id="nsh-q" type="search" name="q" placeholder={searchPlaceholder} autoComplete="off" />
          <kbd aria-hidden="true">/</kbd>
        </form>
        <nav className="nsh-nav" aria-label="Help center">
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.url}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="lp-btn nsh-signin" href={signInUrl}>{signInLabel}</a>
        <details className="nsh-mobile">
          <summary aria-label="Menu">
            <span aria-hidden="true" />
          </summary>
          <div className="nsh-panel">
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.url}>{l.label}</a>
                </li>
              ))}
            </ul>
            <a className="lp-btn nsh-signin" href={signInUrl}>{signInLabel}</a>
          </div>
        </details>
      </div>
    </header>
  )
}
