// Bars and the percent change are calculated from the before and after numbers.
const fmt = (n) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(n)

export default function StatsBeforeAfter({ heading, intro, beforeLabel, afterLabel, metrics, source, accent, background, radius, spacing }) {
  return (
    <section className="lp-section stats-before-after" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="sba-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
          <p className="sba-legend" aria-hidden="true">
            <span className="sba-key sba-key-before" />
            {beforeLabel}
            <span className="sba-key sba-key-after" />
            {afterLabel}
          </p>
        </div>
        <ul className="sba-list">
          {metrics.map((m) => {
            const b = Number(m.before) || 0
            const a = Number(m.after) || 0
            const max = Math.max(b, a, 1)
            const change = b ? ((a - b) / b) * 100 : 0
            const better = m.lowerIsBetter ? a <= b : a >= b
            return (
              <li key={m.label}>
                <div className="sba-top">
                  <h3>{m.label}</h3>
                  <p className="sba-change" data-better={better}>
                    {change > 0 ? '+' : change < 0 ? '−' : ''}
                    {fmt(Math.abs(change))}%
                  </p>
                </div>
                <dl className="sba-bars">
                  <div>
                    <dt>{beforeLabel}</dt>
                    <dd>
                      <span className="sba-bar sba-before" style={{ width: `${(b / max) * 100}%` }} />
                      <span className="sba-val">
                        {fmt(b)}
                        {m.unit}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt>{afterLabel}</dt>
                    <dd>
                      <span className="sba-bar sba-after" style={{ width: `${(a / max) * 100}%` }} />
                      <span className="sba-val">
                        {fmt(a)}
                        {m.unit}
                      </span>
                    </dd>
                  </div>
                </dl>
              </li>
            )
          })}
        </ul>
        {source && <p className="sba-source">{source}</p>}
      </div>
    </section>
  )
}
