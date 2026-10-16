const social = {
  LinkedIn: <path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-4.5a2.5 2.5 0 015 0v4.5M10.5 9.5v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  Instagram: <><rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" /><circle cx="16.6" cy="7.4" r="1" fill="currentColor" /></>,
  YouTube: <><rect x="3" y="6" width="18" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor" /></>,
  X: <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
}

export default function FooterMultiColumn({ brand, tagline, newsletterLabel, formAction, columns, socials, legal, background, ink, accent }) {
  const year = 2026
  return (
    <footer className="lp-section footer-multi-column" style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container">
        <div className="fmc-top">
          <div className="fmc-brand">
            <a href="/" className="fmc-logo">{brand}</a>
            <p>{tagline}</p>
            <form className="fmc-news" action={formAction} method="post">
              <label htmlFor="fmc-email">{newsletterLabel}</label>
              <div>
                <input id="fmc-email" type="email" name="email" autoComplete="email" placeholder="Email address" required />
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
          <nav className="fmc-cols" aria-label="Footer">
            {columns.map((c) => (
              <div key={c.title}>
                <h2>{c.title}</h2>
                <ul>
                  {c.links.split(',').map((l) => (
                    <li key={l}><a href="#">{l.trim()}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="fmc-bottom">
          <p>© {year} {legal}</p>
          <ul className="fmc-social">
            {socials.split(',').map((s) => s.trim()).filter((s) => social[s]).map((s) => (
              <li key={s}>
                <a href="#" aria-label={s}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">{social[s]}</svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
