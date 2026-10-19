// The language switch is a plain link to the other-language page, so it works in any CMS
// and in the HTML export. The current language is marked with aria-current.
export default function NavBilingual({ brand, regionNote, links, currentLang, altLang, altLangName, altLangUrl, signInLabel, signInUrl, ctaLabel, ctaUrl, accent, background }) {
  const switcher = (
    <p className="nbl-lang">
      <span aria-current="true">{currentLang}</span>
      <a href={altLangUrl} hrefLang={altLang.toLowerCase()} lang={altLang.toLowerCase()}>
        <span aria-hidden="true">{altLang}</span>
        <span className="lp-sr-only">{altLangName}</span>
      </a>
    </p>
  )
  return (
    <header className="lp-section nav-bilingual" style={{ '--accent': accent, '--bg': background }}>
      <div className="nbl-utility">
        <div className="lp-container nbl-utility-inner">
          <p>{regionNote}</p>
          {switcher}
        </div>
      </div>
      <div className="lp-container nbl-bar">
        <a className="nbl-brand" href="/" aria-label={`${brand} home`}>
          <span className="nbl-mark" aria-hidden="true">{brand.charAt(0)}</span>
          <span>{brand}</span>
        </a>
        <nav className="nbl-nav" aria-label="Main">
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.url}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nbl-actions">
          <a className="nbl-signin" href={signInUrl}>{signInLabel}</a>
          <a className="lp-btn nbl-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <details className="nbl-mobile">
          <summary>
            <span className="nbl-burger" aria-hidden="true" />
            <span className="lp-sr-only">Menu</span>
          </summary>
          <div className="nbl-panel">
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.url}>{l.label}</a>
                </li>
              ))}
              <li>
                <a href={signInUrl}>{signInLabel}</a>
              </li>
            </ul>
            <a className="lp-btn nbl-cta" href={ctaUrl}>{ctaLabel}</a>
          </div>
        </details>
      </div>
    </header>
  )
}
