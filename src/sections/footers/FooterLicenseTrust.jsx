// Footer links are written as "Label=/path", separated by commas. Only web, mailto, tel,
// root-relative and #anchor links are kept; anything else becomes "#".
const safeHref = (href) => (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href) ? href : '#')
const parseLinks = (s) =>
  String(s)
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [label, href] = l.split('=').map((x) => x.trim())
      return { label, href: href ? safeHref(href) : '#' }
    })

export default function FooterLicenseTrust({ brand, about, phoneLabel, phoneHref, emergency, columns, trust, licences, legal, legalLinks, accent, background }) {
  const year = 2026
  return (
    <footer className="lp-section footer-license-trust" style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container">
        <div className="flt-top">
          <div className="flt-brand">
            <a className="flt-logo" href="/">
              {brand}
            </a>
            <p>{about}</p>
            <a className="flt-phone" href={phoneHref}>{phoneLabel}</a>
            {emergency && <p className="flt-emergency">{emergency}</p>}
          </div>
          <nav className="flt-cols" aria-label="Footer">
            {columns.map((c) => (
              <div key={c.title}>
                <h2>{c.title}</h2>
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
        <ul className="flt-trust">
          {String(trust)
            .split(';')
            .map((t) => t.trim())
            .filter(Boolean)
            .map((t) => (
              <li key={t}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3l7 3v6c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-3Zm-3 9l2 2 4-4" />
                </svg>
                {t}
              </li>
            ))}
        </ul>
        <div className="flt-bottom">
          <p>
            © {year} {legal}. {licences}
          </p>
          <ul>
            {parseLinks(legalLinks).map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
