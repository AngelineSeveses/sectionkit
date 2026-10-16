export default function NavSaasSimple({ brand, links, signInLabel, signInUrl, ctaLabel, ctaUrl, accent, sticky }) {
  return (
    <header className="lp-section nav-saas-simple" data-sticky={sticky} style={{ '--accent': accent }}>
      <div className="lp-container nss-bar">
        <a className="nss-brand" href="/" aria-label={`${brand} home`}>
          <svg viewBox="0 0 28 28" aria-hidden="true">
            <rect width="28" height="28" rx="8" fill="currentColor" />
            <path d="M8 18.5l4.5-9 3.5 6 2-3 2 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{brand}</span>
        </a>
        <nav className="nss-nav" aria-label="Main">
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.url}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nss-actions">
          <a className="nss-signin" href={signInUrl}>{signInLabel}</a>
          <a className="lp-btn nss-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <details className="nss-mobile">
          <summary aria-label="Menu">
            <span aria-hidden="true" />
          </summary>
          <div className="nss-panel">
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.url}>{l.label}</a>
                </li>
              ))}
            </ul>
            <a className="nss-signin" href={signInUrl}>{signInLabel}</a>
            <a className="lp-btn nss-cta" href={ctaUrl}>{ctaLabel}</a>
          </div>
        </details>
      </div>
    </header>
  )
}
