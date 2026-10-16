export default function FeaturesChecklistImage({ image, imageAlt, statValue, statLabel, label, heading, body, items, ctaLabel, ctaUrl, accent, background, imageSide, spacing, radius }) {
  return (
    <section className="lp-section features-checklist-image" data-spacing={spacing} data-side={imageSide} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container fci-grid">
        <figure className="fci-media">
          <img src={image} alt={imageAlt} loading="lazy" />
          {statValue && (
            <figcaption className="fci-stat">
              <strong>{statValue}</strong>
              <span>{statLabel}</span>
            </figcaption>
          )}
        </figure>
        <div className="fci-copy">
          <p className="fci-label">{label}</p>
          <h2>{heading}</h2>
          <p className="fci-body">{body}</p>
          <ul className="fci-list">
            {items.map((it) => (
              <li key={it.text}>
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {it.text}
              </li>
            ))}
          </ul>
          <a className="lp-btn fci-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
