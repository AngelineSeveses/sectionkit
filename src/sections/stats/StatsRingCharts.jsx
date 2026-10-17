export default function StatsRingCharts({ heading, intro, stats, source, accent, track, background, spacing }) {
  return (
    <section className="lp-section stats-ring-charts" data-spacing={spacing} style={{ '--accent': accent, '--track': track, '--bg': background }}>
      <div className="lp-container">
        <div className="src-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="src-grid">
          {stats.map((s) => {
            const v = Math.min(100, Math.max(0, Number(s.value) || 0))
            return (
              <li key={s.label}>
                <div className="src-ring">
                  <svg viewBox="0 0 120 120" aria-hidden="true">
                    <circle className="src-track" cx="60" cy="60" r="52" pathLength="100" />
                    <circle className="src-value" cx="60" cy="60" r="52" pathLength="100" strokeDasharray={`${v} 100`} />
                  </svg>
                  <strong>
                    <span>
                      {v}
                      <small>%</small>
                    </span>
                  </strong>
                </div>
                <h3>{s.label}</h3>
                <p>{s.detail}</p>
              </li>
            )
          })}
        </ul>
        {source && <p className="src-source">{source}</p>}
      </div>
    </section>
  )
}
