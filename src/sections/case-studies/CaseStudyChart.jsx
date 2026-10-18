const parse = (s) =>
  s
    .split(',')
    .map((v) => Number(v.trim()))
    .filter((n) => Number.isFinite(n) && n >= 0)

// Bars are drawn from the comma-separated values; bars from `switchAt` onward use the accent color.
export default function CaseStudyChart({ client, tags, headline, summary, chartTitle, unit, labels, values, switchAt, switchLabel, metrics, quote, quoteName, linkLabel, linkUrl, accent, background, radius, spacing }) {
  const data = parse(values)
  const names = labels.split(',').map((l) => l.trim())
  const max = Math.max(1, ...data)
  const W = 640
  const H = 240
  const gap = 8
  const bw = data.length ? (W - gap * (data.length - 1)) / data.length : 0
  const split = Math.min(Math.max(switchAt, 1), data.length)
  const splitX = (split - 1) * (bw + gap) - gap / 2

  return (
    <section className="lp-section case-study-chart" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container csc-grid">
        <div className="csc-copy">
          <p className="csc-client">
            {client}
            {tags.split(',').map((t) => (
              <span key={t}>{t.trim()}</span>
            ))}
          </p>
          <h2>{headline}</h2>
          <p className="csc-summary">{summary}</p>
          <dl className="csc-metrics">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
          {quote && (
            <blockquote className="csc-quote">
              <p>{quote}</p>
              <footer>{quoteName}</footer>
            </blockquote>
          )}
          <a className="csc-link" href={linkUrl}>
            {linkLabel} <span aria-hidden="true">→</span>
          </a>
        </div>
        <figure className="csc-chart">
          <figcaption>
            <strong>{chartTitle}</strong>
            <span>{unit}</span>
          </figcaption>
          <div className="csc-plot">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${chartTitle}, ${unit}`} preserveAspectRatio="none">
              {[0.25, 0.5, 0.75, 1].map((f) => (
                <line key={f} className="csc-grid-line" x1="0" x2={W} y1={H - H * f} y2={H - H * f} />
              ))}
              {data.map((v, i) => {
                const h = Math.max(2, (v / max) * (H - 8))
                const x = i * (bw + gap)
                return (
                  <rect key={i} className={i >= split - 1 ? 'csc-bar-after' : 'csc-bar-before'} x={x} y={H - h} width={bw} height={h} rx={Math.min(6, bw / 3)} />
                )
              })}
              {split > 1 && <line className="csc-switch" x1={splitX} x2={splitX} y1="0" y2={H} />}
            </svg>
            {split > 1 && (
              <span className="csc-switch-label" style={{ left: `${(splitX / W) * 100}%` }} aria-hidden="true">
                {switchLabel}
              </span>
            )}
          </div>
          <div className="csc-axis" aria-hidden="true" style={{ gap: `${(gap / W) * 100}%` }}>
            {data.map((_, i) => (
              <span key={i}>{names[i] ?? ''}</span>
            ))}
          </div>
          <table className="lp-sr-only">
            <caption>{chartTitle}</caption>
            <tbody>
              {data.map((v, i) => (
                <tr key={i}>
                  <th scope="row">{names[i] ?? i + 1}</th>
                  <td>
                    {v} {unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </div>
    </section>
  )
}
