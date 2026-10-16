export default function PricingPriceList({ heading, intro, groups, note, ctaLabel, ctaUrl, background, ink, accent, spacing }) {
  return (
    <section className="lp-section pricing-price-list" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container">
        <div className="ppl2-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="ppl2-groups">
          {groups.map((g) => (
            <div className="ppl2-group" key={g.title}>
              <h3>{g.title}</h3>
              <dl>
                {g.items.split(';').map((line) => {
                  const [name, price, detail] = line.split('|').map((s) => s?.trim())
                  return (
                    <div key={name} className="ppl2-item">
                      <dt>
                        <span>{name}</span>
                        {detail && <small>{detail}</small>}
                      </dt>
                      <dd>{price}</dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          ))}
        </div>
        <div className="ppl2-foot">
          <p>{note}</p>
          <a className="ppl2-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
