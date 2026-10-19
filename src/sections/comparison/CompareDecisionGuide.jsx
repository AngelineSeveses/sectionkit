// Each row matches a situation to an option. Options are defined once, so a row only
// names which one (1–3) it recommends and the badge colors stay consistent.
export default function CompareDecisionGuide({ heading, intro, options, rows, footText, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  const opts = options.slice(0, 3)
  return (
    <section className="lp-section compare-decision-guide" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cdg-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="cdg-key" aria-label="Options">
          {opts.map((o, i) => (
            <li key={o.name} data-opt={i + 1}>
              <span className="cdg-badge">{o.name}</span>
              <span>{o.summary}</span>
            </li>
          ))}
        </ul>
        <table className="cdg-table">
          <caption className="lp-sr-only">Which option fits each situation</caption>
          <thead>
            <tr>
              <th scope="col">If you…</th>
              <th scope="col">Choose</th>
              <th scope="col">Why</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const idx = Math.min(Math.max(1, Number(r.option) || 1), opts.length)
              return (
                <tr key={r.situation}>
                  <th scope="row">{r.situation}</th>
                  <td data-opt={idx}>
                    <span className="cdg-badge">{opts[idx - 1]?.name}</span>
                  </td>
                  <td>{r.why}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="cdg-foot">
          <p>{footText}</p>
          <a className="lp-btn cdg-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
