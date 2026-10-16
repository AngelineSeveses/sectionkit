export default function RealEstateListings({ heading, viewAllLabel, viewAllUrl, units, listings, accent, background, spacing, radius }) {
  const areaUnit = units === 'metric' ? 'm²' : 'sq ft'
  return (
    <section className="lp-section real-estate-listings" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="rel-head">
          <h2>{heading}</h2>
          <a href={viewAllUrl}>{viewAllLabel}</a>
        </div>
        <ul className="rel-list">
          {listings.map((l) => (
            <li key={l.address}>
              <a className="rel-card" href={l.url}>
                <span className="rel-media">
                  <img src={l.image} alt={`Exterior of ${l.address}`} loading="lazy" />
                  {l.status && <span className="rel-status">{l.status}</span>}
                </span>
                <span className="rel-body">
                  <span className="rel-price">{l.price}</span>
                  <span className="rel-specs">
                    <span><strong>{l.beds}</strong> bd</span>
                    <span><strong>{l.baths}</strong> ba</span>
                    <span><strong>{l.area}</strong> {areaUnit}</span>
                  </span>
                  <span className="rel-address">{l.address}</span>
                  <span className="rel-city">{l.city}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
