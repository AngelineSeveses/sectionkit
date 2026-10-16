const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: currency === 'CAD' ? 'symbol' : 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

// The billing switch uses radio inputs and CSS, so it also works in the HTML export.
export default function PricingThreeTier({ heading, subhead, saveLabel, currency, plans, highlighted, footnote, accent, background, spacing, radius }) {
  return (
    <section className="lp-section pricing-three-tier" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="ptt-head">
          <h2>{heading}</h2>
          <p>{subhead}</p>
        </div>
        <div className="ptt-wrap">
          <input className="ptt-radio" type="radio" name="ptt-billing" id="ptt-annual" defaultChecked />
          <input className="ptt-radio" type="radio" name="ptt-billing" id="ptt-monthly" />
          <div className="ptt-switch" role="group" aria-label="Billing period">
            <label htmlFor="ptt-monthly">Monthly</label>
            <label htmlFor="ptt-annual">
              Annual <span>{saveLabel}</span>
            </label>
          </div>
          <ul className="ptt-plans">
            {plans.map((p, i) => {
              const featured = i === highlighted - 1
              return (
                <li key={p.name} className="ptt-plan" data-featured={featured}>
                  {featured && <p className="ptt-flag">Most popular</p>}
                  <h3>{p.name}</h3>
                  <p className="ptt-desc">{p.description}</p>
                  <p className="ptt-price">
                    <span className="ptt-annual">
                      <strong>{money(p.annual, currency)}</strong>
                      <span>{p.unit}, billed yearly</span>
                    </span>
                    <span className="ptt-monthly">
                      <strong>{money(p.monthly, currency)}</strong>
                      <span>{p.unit}, billed monthly</span>
                    </span>
                  </p>
                  <a className="lp-btn ptt-cta" href={p.url}>{p.cta}</a>
                  <ul className="ptt-features">
                    {p.features.split(';').map((f) => (
                      <li key={f}>{f.trim()}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
        <p className="ptt-foot">{footnote}</p>
      </div>
    </section>
  )
}
