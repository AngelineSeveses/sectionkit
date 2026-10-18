const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: currency === 'CAD' ? 'symbol' : 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

// Bar widths are proportional to each option's total; the lowest total is marked automatically.
export default function CompareCostBars({ heading, intro, horizon, currency, options, assumptions, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  const totals = options.map((o) => Math.max(0, Number(o.total) || 0))
  const max = Math.max(1, ...totals)
  const min = Math.min(...totals)
  return (
    <section className="lp-section compare-cost-bars" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container ccb-grid">
        <div className="ccb-copy">
          <h2>{heading}</h2>
          <p>{intro}</p>
          <h3>Assumptions</h3>
          <ul className="ccb-assumptions">
            {assumptions.split(';').map((a) => (
              <li key={a}>{a.trim()}</li>
            ))}
          </ul>
          <a className="lp-btn ccb-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <div className="ccb-chart">
          <p className="ccb-horizon">{horizon}</p>
          <ul>
            {options.map((o, i) => {
              const best = totals[i] === min
              return (
                <li key={o.name} data-best={best}>
                  <div className="ccb-label">
                    <strong>{o.name}</strong>
                    {best && <span className="ccb-flag">Lowest cost</span>}
                  </div>
                  <div className="ccb-bar">
                    <span style={{ width: `${(totals[i] / max) * 100}%` }} />
                  </div>
                  <div className="ccb-value">
                    <strong>{money(totals[i], currency)}</strong>
                    <span>{o.detail}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
