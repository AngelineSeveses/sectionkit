export default function CompareOptionsCards({ heading, intro, criteria, options, recommended, accent, background, spacing, radius }) {
  const labels = criteria.split(',').map((c) => c.trim())
  return (
    <section className="lp-section compare-options-cards" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="coc-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="coc-list">
          {options.map((o, i) => {
            const values = o.values.split(';').map((v) => v.trim())
            const rec = i === recommended - 1
            return (
              <li key={o.name} className="coc-card" data-rec={rec}>
                {rec && <p className="coc-flag">Recommended for most</p>}
                <h3>{o.name}</h3>
                <p className="coc-summary">{o.summary}</p>
                <dl>
                  {labels.map((label, j) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{values[j] ?? '—'}</dd>
                    </div>
                  ))}
                </dl>
                {o.ctaLabel && (
                  <a className="lp-btn coc-cta" href={o.url}>{o.ctaLabel}</a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
