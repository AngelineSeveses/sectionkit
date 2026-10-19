const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: currency === 'CAD' ? 'symbol' : 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

// The currency switch uses radio inputs and CSS, so it also works in the HTML export.
// Each plan carries both prices; they are set separately rather than converted at a rate.
export default function PricingCurrencySwitch({ heading, intro, plans, unit, taxNoteUSD, taxNoteCAD, defaultCurrency, accent, background, spacing }) {
  const tiers = plans.slice(0, 4)
  return (
    <section className="lp-section pricing-currency-switch" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--count': tiers.length }}>
      <div className="lp-container">
        <div className="pcs-wrap">
          <input className="pcs-radio" type="radio" name="pcs-cur" id="pcs-usd" defaultChecked={defaultCurrency !== 'CAD'} />
          <input className="pcs-radio" type="radio" name="pcs-cur" id="pcs-cad" defaultChecked={defaultCurrency === 'CAD'} />
          <div className="pcs-head">
            <div>
              <h2>{heading}</h2>
              <p>{intro}</p>
            </div>
            <div className="pcs-switch" role="group" aria-label="Currency">
              <label htmlFor="pcs-usd">
                <span className="pcs-code">USD</span> United States
              </label>
              <label htmlFor="pcs-cad">
                <span className="pcs-code">CAD</span> Canada
              </label>
            </div>
          </div>
          <ul className="pcs-strip">
            {tiers.map((p) => (
              <li key={p.name}>
                <h3>{p.name}</h3>
                <p className="pcs-for">{p.forWho}</p>
                <p className="pcs-price">
                  <span className="pcs-usd">
                    <strong>{money(p.usd, 'USD')}</strong>
                  </span>
                  <span className="pcs-cad">
                    <strong>{money(p.cad, 'CAD')}</strong>
                  </span>
                  <span className="pcs-unit">{unit}</span>
                </p>
                <p className="pcs-includes">{p.includes}</p>
                <a className="pcs-link" href={p.url}>
                  {p.cta}
                </a>
              </li>
            ))}
          </ul>
          <p className="pcs-note">
            <span className="pcs-usd">{taxNoteUSD}</span>
            <span className="pcs-cad">{taxNoteCAD}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
