export default function FooterStore({ newsletterHeading, newsletterText, formAction, submitLabel, columns, regions, payments, copyright, legalLinks, background, ink, accent }) {
  return (
    <footer className="lp-section footer-store" style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container">
        <div className="fst-top">
          <div className="fst-news">
            <h2>{newsletterHeading}</h2>
            <p>{newsletterText}</p>
            <form action={formAction} method="post">
              <label className="lp-sr-only" htmlFor="fst-email">
                Email address
              </label>
              <input id="fst-email" type="email" name="email" placeholder="Email address" autoComplete="email" required />
              <button className="lp-btn fst-join" type="submit">
                {submitLabel}
              </button>
            </form>
          </div>
          <nav className="fst-cols" aria-label="Footer">
            {columns.map((c) => (
              <div key={c.title}>
                <h3>{c.title}</h3>
                <ul>
                  {c.links.split(',').map((l) => (
                    <li key={l}>
                      <a href={`/${l.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{l.trim()}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="fst-mid">
          <div className="fst-region" role="group" aria-label="Region and currency">
            {regions.map((r, i) => (
              <a key={r.label} href={r.url} aria-current={i === 0 ? 'true' : undefined}>
                {r.label}
              </a>
            ))}
          </div>
          <ul className="fst-pay" aria-label="Accepted payment methods">
            {payments.split(',').map((p) => (
              <li key={p}>{p.trim()}</li>
            ))}
          </ul>
        </div>
        <div className="fst-legal">
          <p>{copyright}</p>
          <ul>
            {legalLinks.map((l) => (
              <li key={l.label}>
                <a href={l.url}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
