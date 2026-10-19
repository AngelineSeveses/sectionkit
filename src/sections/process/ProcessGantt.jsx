// Bars are placed on a week grid from each phase's start week and length, and the
// total length is calculated from the phases, so the chart always matches the text.
export default function ProcessGantt({ heading, intro, phases, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  const rows = phases.map((p) => ({ ...p, start: Math.max(1, Number(p.start) || 1), weeks: Math.max(1, Number(p.weeks) || 1) }))
  const total = Math.max(...rows.map((p) => p.start + p.weeks - 1), 1)
  const range = (p) => (p.weeks === 1 ? `Week ${p.start}` : `Weeks ${p.start}–${p.start + p.weeks - 1}`)
  return (
    <section className="lp-section process-gantt" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px`, '--weeks': total }}>
      <div className="lp-container">
        <div className="pgt-head">
          <div>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
          <p className="pgt-total">
            <strong>{total}</strong> weeks from kickoff to launch
          </p>
        </div>
        <div className="pgt-chart">
          <div className="pgt-scale" aria-hidden="true">
            <span />
            <div>
              {Array.from({ length: total }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
          </div>
          <ol className="pgt-rows">
            {rows.map((p, i) => (
              <li key={p.name}>
                <div className="pgt-label">
                  <h3>{p.name}</h3>
                  <p>{p.deliverable}</p>
                  <p className="pgt-when">{range(p)}</p>
                </div>
                <div className="pgt-track">
                  <span className="pgt-bar" data-tone={i % 3} style={{ gridColumn: `${p.start} / span ${p.weeks}` }} aria-hidden="true">
                    {range(p)}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <a className="lp-btn pgt-cta" href={ctaUrl}>{ctaLabel}</a>
      </div>
    </section>
  )
}
