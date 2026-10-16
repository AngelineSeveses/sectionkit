export default function NavMegaMenu({ announcement, announcementUrl, brand, menuLabel, columns, featureTitle, featureText, featureImage, featureUrl, links, showMenuOpen, accent }) {
  return (
    <header className="lp-section nav-mega-menu" style={{ '--accent': accent }}>
      <a className="nmm-announce" href={announcementUrl}>{announcement}</a>
      <div className="lp-container nmm-bar">
        <a className="nmm-brand" href="/">{brand}</a>
        <nav className="nmm-nav" aria-label="Main">
          <ul>
            <li>
              <details className="nmm-mega" open={showMenuOpen}>
                <summary>
                  {menuLabel}
                  <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </summary>
                <div className="nmm-panel">
                  <div className="lp-container nmm-panel-inner">
                    {columns.map((c) => (
                      <div className="nmm-col" key={c.title}>
                        <p className="nmm-col-title">{c.title}</p>
                        <ul>
                          {c.items.split(',').map((item) => (
                            <li key={item}><a href="#">{item.trim()}</a></li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <a className="nmm-feature" href={featureUrl}>
                      <img src={featureImage} alt="" />
                      <span>
                        <strong>{featureTitle}</strong>
                        {featureText}
                      </span>
                    </a>
                  </div>
                </div>
              </details>
            </li>
            {links.map((l) => (
              <li key={l.label}><a href={l.url}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="nmm-tools">
          <a href="/search" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </a>
          <a href="/account" aria-label="Account">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M4.5 20c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </a>
          <a href="/cart" aria-label="Cart, 2 items" className="nmm-cart">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14l-1.2 11.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 9V6a3 3 0 016 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            <span>2</span>
          </a>
        </div>
      </div>
    </header>
  )
}
