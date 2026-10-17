export default function NavFloatingPill({ brand, links, ctaLabel, ctaUrl, pageBackground, pillBackground, accent, sticky }) {
  return (
    <header className="lp-section nav-floating-pill" data-sticky={sticky} style={{ '--page': pageBackground, '--pill': pillBackground, '--accent': accent }}>
      <div className="lp-container nfp-wrap">
        <div className="nfp-pill">
          <a className="nfp-brand" href="/" aria-label={`${brand} home`}>
            <span className="nfp-mark" aria-hidden="true" />
            <span>{brand}</span>
          </a>
          <nav className="nfp-nav" aria-label="Main">
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.url}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="lp-btn nfp-cta" href={ctaUrl}>
            {ctaLabel}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <details className="nfp-mobile">
            <summary>
              <span>Menu</span>
            </summary>
            <div className="nfp-panel">
              <ul>
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.url}>{l.label}</a>
                  </li>
                ))}
              </ul>
              <a className="lp-btn nfp-cta" href={ctaUrl}>{ctaLabel}</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
