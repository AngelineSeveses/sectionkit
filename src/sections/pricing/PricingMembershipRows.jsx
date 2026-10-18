export default function PricingMembershipRows({ heading, intro, plans, highlighted, highlightLabel, period, footnote, accent, background, radius, spacing }) {
  return (
    <section className="lp-section pricing-membership-rows" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="pmr-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="pmr-list">
          {plans.map((p, i) => {
            const featured = i === highlighted - 1
            return (
              <li key={p.name} className="pmr-row" data-featured={featured}>
                <div className="pmr-name">
                  <h3>
                    {p.name}
                    {featured && <span className="pmr-flag">{highlightLabel}</span>}
                  </h3>
                  <p>{p.tagline}</p>
                </div>
                <ul className="pmr-perks">
                  {p.perks.split(';').map((perk) => (
                    <li key={perk}>{perk.trim()}</li>
                  ))}
                </ul>
                <p className="pmr-price">
                  <strong>{p.price}</strong>
                  <span>{period}</span>
                </p>
                <a className="lp-btn pmr-cta" href={p.url}>
                  {p.cta}
                </a>
              </li>
            )
          })}
        </ul>
        {footnote && <p className="pmr-foot">{footnote}</p>}
      </div>
    </section>
  )
}
