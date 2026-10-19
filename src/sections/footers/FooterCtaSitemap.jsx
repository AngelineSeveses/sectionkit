// Footer links are written as "Label" or "Label=/path", separated by commas. Only web,
// mailto, tel, root-relative and #anchor links are kept; anything else becomes "#".
const safeHref = (href) => (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href) ? href : '#')
const slug = (label) => `/${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
const parseLinks = (s) =>
  String(s)
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [label, href] = l.split('=').map((x) => x.trim())
      return { label, href: href ? safeHref(href) : slug(label) }
    })

export default function FooterCtaSitemap({ ctaHeading, ctaText, ctaLabel, ctaUrl, secondaryLabel, secondaryUrl, brand, columns, statusLabel, statusUrl, legal, legalLinks, accent, background }) {
  const year = 2026
  return (
    <footer className="lp-section footer-cta-sitemap" style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container">
        <div className="fcs-cta">
          <div>
            <h2>{ctaHeading}</h2>
            <p>{ctaText}</p>
          </div>
          <div className="fcs-actions">
            <a className="lp-btn fcs-primary" href={ctaUrl}>{ctaLabel}</a>
            {secondaryLabel && (
              <a className="lp-btn fcs-secondary" href={secondaryUrl}>
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>

        <div className="fcs-main">
          <a className="fcs-brand" href="/" aria-label={`${brand} home`}>
            <span className="fcs-mark" aria-hidden="true" />
            {brand}
          </a>
          <nav className="fcs-cols" aria-label="Footer">
            {columns.map((c) => (
              <div key={c.title}>
                <h3>{c.title}</h3>
                <ul>
                  {parseLinks(c.links).map((l) => (
                    <li key={l.label}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="fcs-bottom">
          <p>
            © {year} {legal}
          </p>
          <ul className="fcs-legal">
            {parseLinks(legalLinks).map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          {statusLabel && (
            <a className="fcs-status" href={statusUrl}>
              <span aria-hidden="true" />
              {statusLabel}
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
