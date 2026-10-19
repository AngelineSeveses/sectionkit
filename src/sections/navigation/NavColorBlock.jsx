// The call-to-action sits in a full-height color block at the right edge of the header.
export default function NavColorBlock({ brand, links, blockLabel, phoneLabel, phoneHref, ctaLabel, ctaUrl, accent, accent2, background }) {
  return (
    <header className="lp-section nav-color-block" style={{ '--accent': accent, '--accent2': accent2, '--bg': background }}>
      <div className="ncb-bar">
        <a className="ncb-brand" href="/" aria-label={`${brand} home`}>
          <span className="ncb-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="ncb-name">{brand}</span>
        </a>
        <nav className="ncb-nav" aria-label="Main">
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.url}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ncb-block">
          <div className="ncb-call">
            <span>{blockLabel}</span>
            <a href={phoneHref}>{phoneLabel}</a>
          </div>
          <a className="lp-btn ncb-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <details className="ncb-mobile">
          <summary>Menu</summary>
          <div className="ncb-panel">
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.url}>{l.label}</a>
                </li>
              ))}
            </ul>
            <a className="lp-btn ncb-cta" href={ctaUrl}>{ctaLabel}</a>
            <a className="lp-btn ncb-phone" href={phoneHref}>{phoneLabel}</a>
          </div>
        </details>
      </div>
    </header>
  )
}
