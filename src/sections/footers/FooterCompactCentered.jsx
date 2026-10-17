const icons = {
  linkedin: <path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-4.5a2.5 2.5 0 015 0v4.5M10.5 9.5v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor" />
    </>
  ),
  facebook: <path d="M14.5 4.5h-1.8A3.2 3.2 0 009.5 7.7v2.3H7.5v3h2v6.5h3V13h2.3l.5-3h-2.8V8.2c0-.5.4-.7.8-.7h1.2z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
}
const names = { linkedin: 'LinkedIn', instagram: 'Instagram', youtube: 'YouTube', facebook: 'Facebook' }

export default function FooterCompactCentered({ brand, tagline, links, socials, copyright, legalLinks, background, ink, accent }) {
  return (
    <footer className="lp-section footer-compact-centered" style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container fcc-inner">
        <a className="fcc-brand" href="/">
          <span className="fcc-mark" aria-hidden="true" />
          {brand}
        </a>
        {tagline && <p className="fcc-tagline">{tagline}</p>}
        <nav aria-label="Footer">
          <ul className="fcc-links">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.url}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="fcc-social">
          {socials.map((s) => (
            <li key={s.network}>
              <a href={s.url} aria-label={names[s.network] ?? s.network}>
                <svg viewBox="0 0 24 24" aria-hidden="true">{icons[s.network] ?? icons.linkedin}</svg>
              </a>
            </li>
          ))}
        </ul>
        <div className="fcc-legal">
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
