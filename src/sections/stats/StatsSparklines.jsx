// Each card's line, latest value and change are all calculated from the same list of
// numbers, so the chart and the figures can't disagree.
const parse = (s) =>
  String(s)
    .split(',')
    .map((n) => Number(n.trim()))
    .filter((n) => Number.isFinite(n))

const fmt = (n) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(n)

function Spark({ values, w = 200, h = 56 }) {
  if (values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - 4 - ((v - min) / span) * (h - 8)])
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  return (
    <svg className="ssp-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <path className="ssp-area" d={`${line} L${w} ${h} L0 ${h} Z`} />
      <path className="ssp-line" d={line} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default function StatsSparklines({ heading, intro, metrics, period, accent, background, radius, spacing }) {
  return (
    <section className="lp-section stats-sparklines" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="ssp-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="ssp-grid">
          {metrics.map((m) => {
            const values = parse(m.series)
            const first = values[0]
            const last = values[values.length - 1]
            const change = values.length > 1 && first ? ((last - first) / Math.abs(first)) * 100 : 0
            const good = m.lowerIsBetter ? change <= 0 : change >= 0
            return (
              <li key={m.label} data-good={good}>
                <p className="ssp-label">{m.label}</p>
                <p className="ssp-value">
                  {m.prefix}
                  {values.length ? fmt(last) : '–'}
                  {m.suffix}
                </p>
                <p className="ssp-change">
                  <span aria-hidden="true">{change >= 0 ? '↑' : '↓'}</span>
                  {fmt(Math.abs(change))}% {period}
                </p>
                <Spark values={values} />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
