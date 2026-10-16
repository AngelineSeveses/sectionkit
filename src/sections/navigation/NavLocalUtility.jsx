export default function NavLocalUtility({ brand, tagline, serviceArea, hours, phoneLabel, phoneHref, links, ctaLabel, ctaUrl, accent, utilityBackground }) {
  return (
    <header className="lp-section nav-local-utility" style={{ '--accent': accent, '--util': utilityBackground }}>
      <div className="nlu-util">
        <div className="lp-container nlu-util-inner">
          <p>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" fill="currentColor" /></svg>
            {serviceArea}
          </p>
          <p className="nlu-hours">{hours}</p>
        </div>
      </div>
      <div className="lp-container nlu-main">
        <a className="nlu-brand" href="/">
          <span className="nlu-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32"><path d="M4 16L16 5l12 11v11H4z" fill="currentColor" /><path d="M13 27v-7h6v7" fill="#fff" /></svg>
          </span>
          <span className="nlu-brand-text">
            <strong>{brand}</strong>
            <small>{tagline}</small>
          </span>
        </a>
        <nav aria-label="Main" className="nlu-nav">
          <ul>
            {links.map((l) => (
              <li key={l.label}><a href={l.url}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="nlu-actions">
          <a className="nlu-phone" href={phoneHref}>
            <small>Call or text</small>
            {phoneLabel}
          </a>
          <a className="lp-btn nlu-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <div className="nlu-mobile">
          <a className="lp-btn nlu-call" href={phoneHref} aria-label={`Call ${phoneLabel}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" fill="currentColor" /></svg>
            Call
          </a>
          <details>
            <summary>Menu</summary>
            <div className="nlu-panel">
              <ul>
                {links.map((l) => (
                  <li key={l.label}><a href={l.url}>{l.label}</a></li>
                ))}
              </ul>
              <a className="lp-btn nlu-cta" href={ctaUrl}>{ctaLabel}</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
