export default function NavCenteredLogo({ brand, leftLinks, rightLinks, ctaLabel, ctaUrl, background, ink }) {
  return (
    <header className="lp-section nav-centered-logo" style={{ '--bg': background, '--ink': ink }}>
      <div className="lp-container ncl-bar">
        <nav className="ncl-left" aria-label="Primary">
          <ul>
            {leftLinks.map((l) => (
              <li key={l.label}><a href={l.url}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <a className="ncl-brand" href="/">{brand}</a>
        <div className="ncl-right">
          <ul>
            {rightLinks.map((l) => (
              <li key={l.label}><a href={l.url}>{l.label}</a></li>
            ))}
          </ul>
          <a className="ncl-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <details className="ncl-mobile">
          <summary>Menu</summary>
          <nav className="ncl-panel" aria-label="Mobile">
            <ul>
              {[...leftLinks, ...rightLinks].map((l) => (
                <li key={l.label}><a href={l.url}>{l.label}</a></li>
              ))}
            </ul>
            <a className="ncl-cta" href={ctaUrl}>{ctaLabel}</a>
          </nav>
        </details>
      </div>
    </header>
  )
}
