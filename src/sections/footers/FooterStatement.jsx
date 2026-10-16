export default function FooterStatement({ statement, email, links, city, background, ink }) {
  return (
    <footer className="lp-section footer-statement" style={{ '--bg': background, '--ink': ink }}>
      <div className="lp-container">
        <p className="fs-statement">{statement}</p>
        <a className="fs-email" href={`mailto:${email}`}>{email}</a>
        <div className="fs-bottom">
          <ul>
            {links.map((l) => (
              <li key={l.label}><a href={l.url}>{l.label}</a></li>
            ))}
          </ul>
          <p>{city}</p>
          <p>© 2026</p>
        </div>
      </div>
    </footer>
  )
}
