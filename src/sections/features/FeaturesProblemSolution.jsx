export default function FeaturesProblemSolution({ heading, intro, beforeLabel, afterLabel, pairs, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section features-problem-solution" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="fps-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="fps-grid">
          {pairs.map((p) => (
            <li key={p.problem} className="fps-card">
              <div className="fps-before">
                <p className="fps-tag">
                  <span aria-hidden="true">✕</span>
                  {beforeLabel}
                </p>
                <p className="fps-problem">{p.problem}</p>
              </div>
              <div className="fps-after">
                <p className="fps-tag">
                  <span aria-hidden="true">✓</span>
                  {afterLabel}
                </p>
                <h3>{p.solution}</h3>
                <p>{p.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        {ctaLabel && (
          <div className="fps-foot">
            <a className="lp-btn fps-cta" href={ctaUrl}>{ctaLabel}</a>
          </div>
        )}
      </div>
    </section>
  )
}
