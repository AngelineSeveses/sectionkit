export default function FeaturesByRole({ heading, intro, roles, ctaLabel, ctaUrl, ctaNote, accent, background, radius, spacing }) {
  return (
    <section className="lp-section features-by-role" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="fbr-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="fbr-roles">
          {roles.map((r) => (
            <li key={r.role}>
              <p className="fbr-role">{r.role}</p>
              <h3>{r.benefit}</h3>
              <ul className="fbr-points">
                {String(r.points)
                  .split(';')
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .map((p) => (
                    <li key={p}>{p}</li>
                  ))}
              </ul>
              <a className="fbr-link" href={r.url}>
                {r.linkLabel}
              </a>
            </li>
          ))}
        </ul>
        <div className="fbr-foot">
          <a className="lp-btn fbr-cta" href={ctaUrl}>{ctaLabel}</a>
          <p>{ctaNote}</p>
        </div>
      </div>
    </section>
  )
}
