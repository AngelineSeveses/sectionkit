export default function FinanceRatesTable({ heading, intro, asOf, products, rateLabel, aprLabel, disclosure, ctaLabel, ctaUrl, accent, background, spacing, radius }) {
  return (
    <section className="lp-section finance-rates-table" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="frt-head">
          <div>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
          <p className="frt-asof">
            Rates as of <time>{asOf}</time>
          </p>
        </div>
        <div className="frt-table-wrap" role="region" aria-label={`${heading} table`} tabIndex={0}>
          <table className="frt-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Term</th>
                <th scope="col">{rateLabel}</th>
                <th scope="col">{aprLabel}</th>
                <th scope="col"><span className="lp-sr-only">Action</span></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.name + p.term}>
                  <th scope="row">
                    {p.name}
                    {p.badge && <span className="frt-badge">{p.badge}</span>}
                  </th>
                  <td>{p.term}</td>
                  <td className="frt-rate">{p.rate}</td>
                  <td>{p.apr}</td>
                  <td><a href={p.url}>Details</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="frt-foot">
          <p className="frt-disclosure">{disclosure}</p>
          <a className="lp-btn frt-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
