export default function StatsDarkCards({ heading, intro, stats, footnote, accent, background, spacing, radius }) {
  return (
    <section className="lp-section stats-dark-cards" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="sdc-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="sdc-list">
          {stats.map((s) => (
            <li key={s.label}>
              <span className="sdc-label">{s.label}</span>
              <strong>{s.value}</strong>
              <div className="sdc-bar" aria-hidden="true">
                <span style={{ width: `${Math.min(100, Math.max(0, Number(s.bar) || 0))}%` }} />
              </div>
              <span className="sdc-detail">{s.detail}</span>
            </li>
          ))}
        </ul>
        {footnote && <p className="sdc-foot">{footnote}</p>}
      </div>
    </section>
  )
}
