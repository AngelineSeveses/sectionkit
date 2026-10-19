const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

// Good / Better / Best service options. The member price and saving are calculated from the
// regular price and the member discount, so they always agree.
export default function PricingGoodBetterBest({ heading, intro, tiers, recommended, memberDiscount, memberLabel, memberLinkLabel, memberUrl, currency, note, accent, background, radius, spacing }) {
  const list = tiers.slice(0, 3)
  const names = ['Good', 'Better', 'Best']
  return (
    <section className="lp-section pricing-good-better-best" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="pgb-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="pgb-tiers">
          {list.map((t, i) => {
            const member = Math.round(Number(t.price) * (1 - memberDiscount / 100))
            const rec = i + 1 === recommended
            return (
              <li key={t.name} data-rec={rec}>
                {rec && <p className="pgb-rec">Recommended</p>}
                <p className="pgb-level">{names[i]}</p>
                <h3>{t.name}</h3>
                <p className="pgb-price">{money(t.price, currency)}</p>
                {memberDiscount > 0 && (
                  <p className="pgb-member">
                    <strong>{money(member, currency)}</strong> for members
                  </p>
                )}
                <ul className="pgb-incl">
                  {String(t.includes)
                    .split(';')
                    .map((x) => x.trim())
                    .filter(Boolean)
                    .map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                </ul>
                <p className="pgb-warranty">{t.warranty}</p>
                <a className="lp-btn pgb-cta" href={t.url}>{t.cta}</a>
              </li>
            )
          })}
        </ul>
        {memberDiscount > 0 && (
          <div className="pgb-band">
            <p>
              <strong>Members save {memberDiscount}%</strong> {memberLabel}
            </p>
            <a href={memberUrl}>{memberLinkLabel}</a>
          </div>
        )}
        {note && <p className="pgb-note">{note}</p>}
      </div>
    </section>
  )
}
