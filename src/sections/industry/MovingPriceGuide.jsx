const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

// Each cell is a low–high range. A home size with 0 for both shows "Quote only".
export default function MovingPriceGuide({ heading, intro, colLocal, colRegional, colLong, sizes, currency, includes, ctaLabel, ctaUrl, note, accent, background, radius, spacing }) {
  const cols = [
    { label: colLocal, lo: 'localLow', hi: 'localHigh' },
    { label: colRegional, lo: 'regLow', hi: 'regHigh' },
    { label: colLong, lo: 'longLow', hi: 'longHigh' },
  ]
  const cell = (s, c) => {
    const lo = Number(s[c.lo]) || 0
    const hi = Number(s[c.hi]) || 0
    if (!lo && !hi) return <span className="mpg-quote">Quote only</span>
    return (
      <>
        {money(Math.min(lo, hi), currency)}
        <span aria-hidden="true">–</span>
        <span className="lp-sr-only"> to </span>
        {money(Math.max(lo, hi), currency)}
      </>
    )
  }
  return (
    <section className="lp-section moving-price-guide" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container mpg-grid">
        <div className="mpg-copy">
          <h2>{heading}</h2>
          <p>{intro}</p>
          <ul className="mpg-includes">
            {String(includes)
              .split(';')
              .map((x) => x.trim())
              .filter(Boolean)
              .map((x) => (
                <li key={x}>{x}</li>
              ))}
          </ul>
          <a className="lp-btn mpg-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <div className="mpg-card">
          <div className="mpg-scroll">
            <table>
              <caption className="lp-sr-only">Typical moving prices by home size and distance</caption>
              <thead>
                <tr>
                  <th scope="col">Home size</th>
                  {cols.map((c) => (
                    <th scope="col" key={c.label}>{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.size}>
                    <th scope="row">
                      {s.size}
                      <span>{s.crew}</span>
                    </th>
                    {cols.map((c) => (
                      <td key={c.label}>{cell(s, c)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mpg-note">{note}</p>
        </div>
      </div>
    </section>
  )
}
