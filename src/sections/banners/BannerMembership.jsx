const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

// The yearly value is the sum of the perk values, and the yearly price is the monthly price
// times 12, so the comparison always adds up.
export default function BannerMembership({ badge, headline, text, monthly, currency, perks, ctaLabel, ctaUrl, terms, accent, background, radius, spacing }) {
  const value = perks.reduce((s, p) => s + (Number(p.value) || 0), 0)
  const yearly = Number(monthly) * 12
  return (
    <section className="lp-section banner-membership" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="bms-card">
          <div className="bms-copy">
            <p className="bms-badge">{badge}</p>
            <h2>{headline}</h2>
            <p className="bms-text">{text}</p>
            <ul className="bms-perks">
              {perks.map((p) => (
                <li key={p.label}>
                  <span>{p.label}</span>
                  {Number(p.value) > 0 && <span className="bms-val">{money(p.value, currency)} value</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="bms-offer">
            <p className="bms-price">
              <strong>{money(monthly, currency)}</strong>
              <span>a month</span>
            </p>
            {value > yearly && (
              <p className="bms-compare">
                {money(value, currency)} of service a year for {money(yearly, currency)}
              </p>
            )}
            <a className="lp-btn bms-cta" href={ctaUrl}>{ctaLabel}</a>
            <p className="bms-terms">{terms}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
