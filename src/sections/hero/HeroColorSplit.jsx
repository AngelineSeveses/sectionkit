export default function HeroColorSplit({ eyebrow, headline, subhead, ctaLabel, ctaUrl, secondaryLabel, secondaryUrl, points, image, imageAlt, offerLabel, offerPrice, offerNote, rating, ratingNote, accent, accent2, background, radius, spacing }) {
  return (
    <section className="lp-section hero-color-split" data-spacing={spacing} style={{ '--accent': accent, '--accent2': accent2, '--bg': background, '--radius': `${radius}px` }}>
      <div className="hcs-grid">
        <div className="hcs-panel">
          <div className="hcs-copy">
            <p className="hcs-eyebrow">{eyebrow}</p>
            <h1>{headline}</h1>
            <p className="hcs-sub">{subhead}</p>
            <div className="hcs-actions">
              <a className="lp-btn hcs-primary" href={ctaUrl}>{ctaLabel}</a>
              <a className="lp-btn hcs-secondary" href={secondaryUrl}>{secondaryLabel}</a>
            </div>
            <ul className="hcs-points">
              {String(points)
                .split(';')
                .map((p) => p.trim())
                .filter(Boolean)
                .map((p) => (
                  <li key={p}>{p}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className="hcs-media">
          <img src={image} alt={imageAlt} width="1200" height="1400" />
          <div className="hcs-offer">
            <p className="hcs-offer-label">{offerLabel}</p>
            <p className="hcs-offer-price">{offerPrice}</p>
            <p className="hcs-offer-note">{offerNote}</p>
          </div>
          <p className="hcs-rating">
            <span aria-hidden="true">★</span>
            <strong>{rating}</strong> {ratingNote}
          </p>
        </div>
      </div>
    </section>
  )
}
