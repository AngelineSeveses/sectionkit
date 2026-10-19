const icons = {
  parking: <path d="M7 20V4h6a5 5 0 0 1 0 10H7" />,
  transit: (
    <>
      <rect x="5" y="3" width="14" height="14" rx="3" />
      <path d="M5 11h14M8.5 14h.01M15.5 14h.01M8 21l1.5-4M16 21l-1.5-4" />
    </>
  ),
  access: (
    <>
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M5 8.5l7 1.5 7-1.5M12 10v4.5M12 14.5L8.5 21M12 14.5l3.5 6.5" />
    </>
  ),
}

export default function ContactVisitInfo({ heading, image, imageAlt, address, directionsLabel, directionsUrl, phoneLabel, phoneHref, hours, hoursNote, parking, transit, accessibility, accent, background, radius, spacing }) {
  const notes = [
    { key: 'parking', title: 'Parking', text: parking },
    { key: 'transit', title: 'Transit', text: transit },
    { key: 'access', title: 'Accessibility', text: accessibility },
  ].filter((n) => n.text)
  return (
    <section className="lp-section contact-visit-info" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container cvi-grid">
        <figure className="cvi-photo">
          <img src={image} alt={imageAlt} width="900" height="1100" loading="lazy" />
        </figure>
        <div className="cvi-info">
          <h2>{heading}</h2>
          <address className="cvi-address">{address}</address>
          <div className="cvi-actions">
            <a className="lp-btn cvi-primary" href={directionsUrl}>{directionsLabel}</a>
            <a className="lp-btn cvi-secondary" href={phoneHref}>{phoneLabel}</a>
          </div>
          <div className="cvi-hours">
            <h3>Hours</h3>
            <dl>
              {hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
            {hoursNote && <p>{hoursNote}</p>}
          </div>
          <ul className="cvi-notes">
            {notes.map((n) => (
              <li key={n.key}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {icons[n.key]}
                </svg>
                <div>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
