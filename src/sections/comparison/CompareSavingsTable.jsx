const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

// Totals and yearly savings are calculated from the line items. A "with us" cost of 0 shows
// as "Included".
export default function CompareSavingsTable({ heading, intro, colCurrent, colOurs, items, currency, ctaLabel, ctaUrl, note, accent, background, radius, spacing }) {
  const cur = items.reduce((s, it) => s + (Number(it.current) || 0), 0)
  const ours = items.reduce((s, it) => s + (Number(it.ours) || 0), 0)
  const monthly = Math.max(0, cur - ours)
  return (
    <section className="lp-section compare-savings-table" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container cst2-grid">
        <div className="cst2-copy">
          <h2>{heading}</h2>
          <p>{intro}</p>
          <div className="cst2-save">
            <span>You save about</span>
            <strong>{money(monthly * 12, currency)}</strong>
            <span>a year ({money(monthly, currency)} a month)</span>
          </div>
          <a className="lp-btn cst2-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <div className="cst2-card">
          <table>
            <caption className="lp-sr-only">Monthly cost comparison</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="lp-sr-only">Item</span>
                </th>
                <th scope="col">{colCurrent}</th>
                <th scope="col" className="cst2-ours">{colOurs}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.label}>
                  <th scope="row">
                    {it.label}
                    {it.example && <span>{it.example}</span>}
                  </th>
                  <td>{money(Number(it.current) || 0, currency)}</td>
                  <td className="cst2-ours">{Number(it.ours) > 0 ? money(Number(it.ours), currency) : 'Included'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Per month</th>
                <td>{money(cur, currency)}</td>
                <td className="cst2-ours">{money(ours, currency)}</td>
              </tr>
            </tfoot>
          </table>
          {note && <p className="cst2-note">{note}</p>}
        </div>
      </div>
    </section>
  )
}
