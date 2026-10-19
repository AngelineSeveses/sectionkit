const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: currency === 'CAD' ? 'symbol' : 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

export default function PricingColorBands({ heading, intro, plans, featured, currency, unit, footnote, background, radius, spacing }) {
  const tiers = plans.slice(0, 4)
  return (
    <section className="lp-section pricing-color-bands" data-spacing={spacing} style={{ '--bg': background, '--radius': `${radius}px`, '--cols': tiers.length }}>
      <div className="lp-container">
        <div className="pcb-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="pcb-plans">
          {tiers.map((p, i) => (
            <li key={p.name} style={{ '--tone': p.color }} data-featured={i + 1 === featured}>
              <div className="pcb-band">
                {i + 1 === featured && <p className="pcb-flag">Best value</p>}
                <h3>{p.name}</h3>
                <p className="pcb-price">
                  <strong>{money(p.price, currency)}</strong>
                  <span>{unit}</span>
                </p>
                <p className="pcb-for">{p.forWho}</p>
              </div>
              <div className="pcb-body">
                <ul>
                  {String(p.features)
                    .split(';')
                    .map((f) => f.trim())
                    .filter(Boolean)
                    .map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                </ul>
                <a className="lp-btn pcb-cta" href={p.url}>{p.cta}</a>
              </div>
            </li>
          ))}
        </ul>
        {footnote && <p className="pcb-foot">{footnote}</p>}
      </div>
    </section>
  )
}
