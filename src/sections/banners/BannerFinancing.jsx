export default function BannerFinancing({ label, headline, monthly, monthlyNote, points, ctaLabel, ctaUrl, secondaryLabel, secondaryUrl, disclosure, accent, background, radius, spacing }) {
  return (
    <section className="lp-section banner-financing" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="bfn-card">
          <div className="bfn-main">
            <p className="bfn-label">{label}</p>
            <h2>{headline}</h2>
            <ul className="bfn-points">
              {points.split(';').map((p) => (
                <li key={p}>{p.trim()}</li>
              ))}
            </ul>
          </div>
          <div className="bfn-offer">
            <p className="bfn-price">
              <span>As low as</span>
              <strong>{monthly}</strong>
              <span>{monthlyNote}</span>
            </p>
            <a className="lp-btn bfn-cta" href={ctaUrl}>{ctaLabel}</a>
            {secondaryLabel && (
              <a className="bfn-secondary" href={secondaryUrl}>{secondaryLabel}</a>
            )}
          </div>
        </div>
        <p className="bfn-disclosure">{disclosure}</p>
      </div>
    </section>
  )
}
