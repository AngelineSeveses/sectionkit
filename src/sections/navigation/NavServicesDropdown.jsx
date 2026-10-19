// The Services menu is a details element, so it opens without JavaScript and in the HTML export.
export default function NavServicesDropdown({ brand, services, links, rating, reviewCount, promoTitle, promoText, promoUrl, phoneLabel, phoneHref, ctaLabel, ctaUrl, showMenuOpen, accent, background }) {
  return (
    <header className="lp-section nav-services-dropdown" style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container nsd-bar">
        <a className="nsd-brand" href="/" aria-label={`${brand} home`}>
          <span className="nsd-mark" aria-hidden="true" />
          <span className="nsd-brand-name">{brand}</span>
        </a>
        <nav className="nsd-nav" aria-label="Main">
          <ul>
            <li>
              <details className="nsd-menu" open={showMenuOpen}>
                <summary>
                  Services
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="nsd-panel">
                  <ul className="nsd-services">
                    {services.map((s) => (
                      <li key={s.name}>
                        <a href={s.url}>
                          <strong>{s.name}</strong>
                          <span>{s.text}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a className="nsd-promo" href={promoUrl}>
                    <strong>{promoTitle}</strong>
                    <span>{promoText}</span>
                    <span className="nsd-promo-link">Book now</span>
                  </a>
                </div>
              </details>
            </li>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.url}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nsd-actions">
          <p className="nsd-rating">
            <span className="nsd-stars" aria-hidden="true">★★★★★</span>
            <span>
              <strong>{rating}</strong> from {reviewCount} reviews
            </span>
          </p>
          <a className="nsd-phone" href={phoneHref}>{phoneLabel}</a>
          <a className="lp-btn nsd-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <details className="nsd-mobile">
          <summary>Menu</summary>
          <div className="nsd-mpanel">
            <p className="nsd-mlabel">Services</p>
            <ul>
              {services.map((s) => (
                <li key={s.name}>
                  <a href={s.url}>{s.name}</a>
                </li>
              ))}
            </ul>
            <ul className="nsd-mlinks">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.url}>{l.label}</a>
                </li>
              ))}
            </ul>
            <a className="lp-btn nsd-cta" href={ctaUrl}>{ctaLabel}</a>
            <a className="lp-btn nsd-mphone" href={phoneHref}>{phoneLabel}</a>
          </div>
        </details>
      </div>
    </header>
  )
}
