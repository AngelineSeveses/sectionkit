const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

// A price of 0 means that level doesn't offer the service and shows a dash.
export default function SalonPriceMenu({ heading, intro, levels, services, currency, note, ctaLabel, ctaUrl, accent, background, spacing }) {
  const tiers = levels.slice(0, 3)
  const keys = ['p1', 'p2', 'p3'].slice(0, tiers.length)
  return (
    <section className="lp-section salon-price-menu" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--cols': tiers.length }}>
      <div className="lp-container spm-inner">
        <div className="spm-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <table className="spm-table">
          <caption className="lp-sr-only">Prices by stylist level</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="lp-sr-only">Service</span>
              </th>
              {tiers.map((t) => (
                <th scope="col" key={t.name}>
                  <span className="spm-level">{t.name}</span>
                  <span className="spm-exp">{t.experience}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.name}>
                <th scope="row">
                  <span className="spm-service">{s.name}</span>
                  <span className="spm-time">{s.duration}</span>
                </th>
                {keys.map((k, i) => (
                  <td key={k} data-level={tiers[i].name}>
                    {Number(s[k]) > 0 ? money(Number(s[k]), currency) : <span aria-label="Not offered">–</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="spm-foot">
          <p>{note}</p>
          <a className="lp-btn spm-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
