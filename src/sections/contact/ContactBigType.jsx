export default function ContactBigType({ label, email, phoneLabel, phoneHref, studios, socials, availability, background, ink, accent, spacing }) {
  return (
    <section className="lp-section contact-big-type" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container">
        <p className="cbt-label">
          <span aria-hidden="true" />
          {availability}
        </p>
        <h2 className="lp-sr-only">{label}</h2>
        <a className="cbt-email" href={`mailto:${email}`}>
          {email}
        </a>
        <a className="cbt-phone" href={phoneHref}>
          {phoneLabel}
        </a>
        <div className="cbt-foot">
          {studios.map((s) => (
            <address key={s.city}>
              <strong>{s.city}</strong>
              {s.address.split(',').map((line) => (
                <span key={line}>{line.trim()}</span>
              ))}
            </address>
          ))}
          <ul className="cbt-social">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.url}>
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
