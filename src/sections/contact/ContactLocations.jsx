export default function ContactLocations({ heading, intro, locations, accent, background, spacing, radius }) {
  return (
    <section className="lp-section contact-locations" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cl-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="cl-list">
          {locations.map((l) => (
            <li key={l.city} className="cl-card">
              <figure className="cl-media">
                <img src={l.image} alt={l.imageAlt} loading="lazy" />
                <figcaption>{l.country}</figcaption>
              </figure>
              <div className="cl-body">
                <h3>{l.city}</h3>
                <address>
                  {l.street}
                  <br />
                  {l.region}
                </address>
                <a className="cl-phone" href={l.phoneHref}>{l.phone}</a>
                <p className="cl-hours">{l.hours}</p>
                <a className="cl-directions" href={l.mapUrl}>Get directions</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
