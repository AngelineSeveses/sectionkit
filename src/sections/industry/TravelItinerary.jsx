export default function TravelItinerary({ label, heading, priceFrom, priceNote, days, includes, ctaLabel, ctaUrl, background, ink, accent, spacing, radius }) {
  return (
    <section className="lp-section travel-itinerary" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="ti-head">
          <div>
            <p className="ti-label">{label}</p>
            <h2>{heading}</h2>
          </div>
          <p className="ti-price">
            <span>From</span>
            <strong>{priceFrom}</strong>
            <small>{priceNote}</small>
          </p>
        </div>
        <ol className="ti-days">
          {days.map((d) => (
            <li key={d.day}>
              <figure>
                <img src={d.image} alt={d.imageAlt} loading="lazy" />
              </figure>
              <div>
                <p className="ti-day">{d.day}</p>
                <h3>{d.title}</h3>
                <p className="ti-text">{d.text}</p>
                {d.stay && <p className="ti-stay">Overnight: {d.stay}</p>}
              </div>
            </li>
          ))}
        </ol>
        <div className="ti-foot">
          <div>
            <h3>Included</h3>
            <ul>
              {includes.split(';').map((i) => (
                <li key={i}>{i.trim()}</li>
              ))}
            </ul>
          </div>
          <a className="lp-btn ti-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
