export default function PricingPackages({ label, heading, intro, packages, ctaLabel, ctaUrl, note, background, ink, accent, spacing, radius }) {
  return (
    <section className="lp-section pricing-packages" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="pp-head">
          <div>
            <p className="pp-label">{label}</p>
            <h2>{heading}</h2>
          </div>
          <p>{intro}</p>
        </div>
        <ul className="pp-list">
          {packages.map((p) => (
            <li key={p.name} className="pp-pack">
              <div className="pp-top">
                <h3>{p.name}</h3>
                <p className="pp-price">
                  <span>Starting at</span>
                  <strong>{p.price}</strong>
                </p>
                <p className="pp-time">{p.timeline}</p>
              </div>
              <p className="pp-best">{p.bestFor}</p>
              <ul className="pp-includes">
                {p.includes.split(';').map((it) => (
                  <li key={it}>{it.trim()}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="pp-foot">
          <a className="lp-btn pp-cta" href={ctaUrl}>{ctaLabel}</a>
          <p>{note}</p>
        </div>
      </div>
    </section>
  )
}
