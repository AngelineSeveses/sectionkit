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

export default function FooterTwoCountry({ brand, tagline, offices, links, newsletterLabel, formAction, legal, legalLinks, accent, background }) {
  const year = 2026
  return (
    <footer className="lp-section footer-two-country" style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container">
        <div className="ftc-top">
          <div className="ftc-brand">
            <a href="/" className="ftc-logo">{brand}</a>
            <p>{tagline}</p>
            <form className="ftc-news" action={formAction} method="post">
              <label htmlFor="ftc-email">{newsletterLabel}</label>
              <div>
                <input id="ftc-email" type="email" name="email" autoComplete="email" placeholder="Email address" required />
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
          <div className="ftc-offices">
            {offices.map((o) => (
              <address key={o.country}>
                <p className="ftc-country">
                  <span>{o.code}</span>
                  {o.country}
                </p>
                <p className="ftc-addr">{o.address}</p>
                <a href={o.phoneHref}>{o.phone}</a>
                <a href={`mailto:${o.email}`}>{o.email}</a>
              </address>
            ))}
          </div>
          <nav className="ftc-links" aria-label="Footer">
            <ul>
              {parseLinks(links).map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="ftc-bottom">
          <p>
            © {year} {legal}
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
