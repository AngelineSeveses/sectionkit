export default function FooterLocalBusiness({ brand, street, city, phone, phoneHref, email, hours, areas, links, licence, ctaLabel, ctaUrl, background, accent }) {
  const hourRows = hours.split(';').map((h) => h.split('|').map((s) => s.trim()))
  return (
    <footer className="lp-section footer-local-business" style={{ '--bg': background, '--accent': accent }}>
      <div className="flb-cta">
        <div className="lp-container flb-cta-inner">
          <p>Ready when you are.</p>
          <div>
            <a className="lp-btn flb-cta-btn" href={ctaUrl}>{ctaLabel}</a>
            <a className="flb-cta-phone" href={phoneHref}>{phone}</a>
          </div>
        </div>
      </div>
      <div className="lp-container flb-grid">
        <div>
          <p className="flb-brand">{brand}</p>
          <address>
            {street}
            <br />
            {city}
            <br />
            <a href={phoneHref}>{phone}</a>
            <br />
            <a href={`mailto:${email}`}>{email}</a>
          </address>
        </div>
        <div>
          <h2>Hours</h2>
          <dl className="flb-hours">
            {hourRows.map(([d, t]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{t}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>Service areas</h2>
          <ul className="flb-areas">
            {areas.split(',').map((a) => (
              <li key={a}>{a.trim()}</li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer">
          <h2>Company</h2>
          <ul className="flb-links">
            {links.map((l) => (
              <li key={l.label}><a href={l.url}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="lp-container flb-legal">
        <p>© 2026 {brand}. {licence}</p>
        <p><a href="/privacy">Privacy</a> <a href="/terms">Terms</a> <a href="/accessibility">Accessibility</a></p>
      </div>
    </footer>
  )
}
