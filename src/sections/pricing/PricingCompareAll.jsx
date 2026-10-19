const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: currency === 'CAD' ? 'symbol' : 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

// In the comparison table, "yes" shows a check, "no" or an empty cell shows a dash,
// and any other text is shown as written.
function Cell({ value }) {
  const v = String(value ?? '').trim()
  if (/^yes$/i.test(v))
    return (
      <span className="pca-yes" role="img" aria-label="Included">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  if (!v || /^no$/i.test(v))
    return (
      <span className="pca-no">
        <span aria-hidden="true">–</span>
        <span className="lp-sr-only">Not included</span>
      </span>
    )
  return <span>{v}</span>
}

export default function PricingCompareAll({ heading, intro, plans, featured, currency, unit, rows, compareLabel, accent, background, radius, spacing }) {
  const tiers = plans.slice(0, 3)
  const keys = ['p1', 'p2', 'p3'].slice(0, tiers.length)
  return (
    <section className="lp-section pricing-compare-all" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px`, '--cols': tiers.length }}>
      <div className="lp-container">
        <div className="pca-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="pca-plans">
          {tiers.map((p, i) => (
            <li key={p.name} data-featured={i + 1 === featured}>
              {i + 1 === featured && <p className="pca-flag">Most chosen</p>}
              <h3>{p.name}</h3>
              <p className="pca-desc">{p.description}</p>
              <p className="pca-price">
                <strong>{money(p.price, currency)}</strong> <span>{unit}</span>
              </p>
              <a className="lp-btn pca-cta" href={p.url}>{p.cta}</a>
              <p className="pca-key">{p.highlight}</p>
            </li>
          ))}
        </ul>
        <details className="pca-compare">
          <summary>
            {compareLabel}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="pca-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="lp-sr-only">Feature</span>
                  </th>
                  {tiers.map((p) => (
                    <th scope="col" key={p.name}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.feature}>
                    <th scope="row">{r.feature}</th>
                    {keys.map((k) => (
                      <td key={k}>
                        <Cell value={r[k]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </section>
  )
}
