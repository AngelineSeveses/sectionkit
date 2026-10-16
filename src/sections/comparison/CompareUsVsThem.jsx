export default function CompareUsVsThem({ heading, intro, themLabel, usLabel, rows, ctaLabel, ctaUrl, accent, background, spacing, radius }) {
  return (
    <section className="lp-section compare-us-vs-them" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cuv-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="cuv-grid">
          <div className="cuv-col cuv-them">
            <h3>{themLabel}</h3>
            <ul>
              {rows.map((r) => (
                <li key={r.them}>
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  {r.them}
                </li>
              ))}
            </ul>
          </div>
          <div className="cuv-col cuv-us">
            <h3>{usLabel}</h3>
            <ul>
              {rows.map((r) => (
                <li key={r.us}>
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {r.us}
                </li>
              ))}
            </ul>
            <a className="lp-btn cuv-cta" href={ctaUrl}>{ctaLabel}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
