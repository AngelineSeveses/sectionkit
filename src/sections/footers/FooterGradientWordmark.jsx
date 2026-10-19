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

export default function FooterGradientWordmark({ brand, newsletterTitle, newsletterText, formAction, columns, legal, legalLinks, color1, color2, color3, background }) {
  const year = 2026
  return (
    <footer className="lp-section footer-gradient-wordmark" style={{ '--c1': color1, '--c2': color2, '--c3': color3, '--bg': background }}>
      <div className="lp-container">
        <div className="fgw-top">
          <form className="fgw-news" action={formAction} method="post">
            <p className="fgw-news-title">{newsletterTitle}</p>
            <p className="fgw-news-text">{newsletterText}</p>
            <div className="fgw-field">
              <label className="lp-sr-only" htmlFor="fgw-email">
                Email address
              </label>
              <input id="fgw-email" type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
              <button type="submit">Subscribe</button>
            </div>
          </form>
          <nav className="fgw-cols" aria-label="Footer">
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
        <p className="fgw-wordmark" aria-hidden="true">
          {brand}
        </p>
        <div className="fgw-bottom">
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
