// Scores are out of 10. Bar widths and each option's average are calculated from the scores.
export default function CompareScorecard({ heading, intro, nameA, nameB, nameC, criteria, ctaLabel, ctaUrl, note, colorA, colorB, colorC, background, radius, spacing }) {
  const opts = [
    { key: 'a', name: nameA, tone: 'a' },
    { key: 'b', name: nameB, tone: 'b' },
    { key: 'c', name: nameC, tone: 'c' },
  ]
  const clamp = (n) => Math.min(10, Math.max(0, Number(n) || 0))
  const avg = (k) => (criteria.length ? criteria.reduce((s, c) => s + clamp(c[k]), 0) / criteria.length : 0)
  return (
    <section className="lp-section compare-scorecard" data-spacing={spacing} style={{ '--ca': colorA, '--cb': colorB, '--cc': colorC, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="csc-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="csc-card">
          <ul className="csc-totals">
            {opts.map((o) => (
              <li key={o.key} data-tone={o.tone}>
                <span className="csc-dot" aria-hidden="true" />
                <span className="csc-name">{o.name}</span>
                <strong>{avg(o.key).toFixed(1)}</strong>
                <span className="csc-out">average out of 10</span>
              </li>
            ))}
          </ul>
          <dl className="csc-rows">
            {criteria.map((c) => (
              <div key={c.label} className="csc-row">
                <dt>{c.label}</dt>
                <dd>
                  {opts.map((o) => (
                    <p key={o.key} data-tone={o.tone}>
                      <span className="lp-sr-only">{o.name}: </span>
                      <span className="csc-bar" style={{ width: `${clamp(c[o.key]) * 10}%` }} aria-hidden="true" />
                      <span className="csc-score">{clamp(c[o.key])}</span>
                    </p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="csc-foot">
          <a className="lp-btn csc-cta" href={ctaUrl}>{ctaLabel}</a>
          <p>{note}</p>
        </div>
      </div>
    </section>
  )
}
