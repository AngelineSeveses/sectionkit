const area = (sqft, units) => {
  const n = Number(sqft) || 0
  return units === 'm2' ? `${Math.round(n * 0.092903)} m²` : `${n.toLocaleString('en-US')} sq ft`
}

export default function RoomTypes({ heading, intro, rooms, units, priceNote, ctaLabel, accent, background, radius, spacing }) {
  return (
    <section className="lp-section room-types" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="rmt-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="rmt-grid">
          {rooms.map((r) => (
            <li key={r.name} className="rmt-card">
              <img src={r.image} alt={r.imageAlt} loading="lazy" />
              <div className="rmt-body">
                <h3>{r.name}</h3>
                <ul className="rmt-facts">
                  <li>{area(r.size, units)}</li>
                  <li>{r.beds}</li>
                  <li>Sleeps {r.guests}</li>
                </ul>
                <ul className="rmt-amenities">
                  {r.amenities.split(';').map((a) => (
                    <li key={a}>{a.trim()}</li>
                  ))}
                </ul>
                <div className="rmt-foot">
                  <p className="rmt-price">
                    <small>From</small>
                    <strong>{r.price}</strong>
                    <span>{priceNote}</span>
                  </p>
                  <a className="lp-btn rmt-cta" href={r.url}>
                    {ctaLabel}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
