export default function PricingUsageTiers({ eyebrow, heading, intro, notes, unitLabel, tiers, exampleTitle, exampleLines, exampleTotal, ctaLabel, ctaUrl, footnote, accent, background, radius, spacing }) {
  return (
    <section className="lp-section pricing-usage-tiers" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container put-grid">
        <div className="put-copy">
          <p className="put-eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
          <p className="put-intro">{intro}</p>
          <ul className="put-notes">
            {notes.split(';').map((n) => (
              <li key={n}>{n.trim()}</li>
            ))}
          </ul>
          <a className="lp-btn put-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <div className="put-panel">
          <table className="put-table">
            <caption className="lp-sr-only">Volume pricing tiers</caption>
            <thead>
              <tr>
                <th scope="col">Monthly volume</th>
                <th scope="col">{unitLabel}</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <tr key={t.range}>
                  <th scope="row">{t.range}</th>
                  <td data-free={t.free}>{t.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="put-example">
            <p className="put-example-title">{exampleTitle}</p>
            <dl>
              {exampleLines.map((l) => (
                <div key={l.label}>
                  <dt>{l.label}</dt>
                  <dd>{l.amount}</dd>
                </div>
              ))}
              <div className="put-total">
                <dt>Total for the month</dt>
                <dd>{exampleTotal}</dd>
              </div>
            </dl>
          </div>
          {footnote && <p className="put-foot">{footnote}</p>}
        </div>
      </div>
    </section>
  )
}
