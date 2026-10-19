const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: currency === 'CAD' ? 'symbol' : 'narrowSymbol' }).format(n)

// The bundle price and saving are calculated from the item prices and the discount,
// so the numbers always add up.
export default function ShowcaseBundle({ heading, intro, items, discount, currency, ctaLabel, ctaUrl, note, accent, background, radius, spacing }) {
  const list = items.slice(0, 4)
  const total = list.reduce((n, it) => n + Number(it.price || 0), 0)
  const bundle = Math.round(total * (1 - discount / 100) * 100) / 100
  const saving = Math.round((total - bundle) * 100) / 100
  return (
    <section className="lp-section showcase-bundle" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px`, '--count': list.length }}>
      <div className="lp-container">
        <div className="sbd-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="sbd-layout">
          <ul className="sbd-items">
            {list.map((it, i) => (
              <li key={it.name}>
                <div className="sbd-media">
                  {i > 0 && <span className="sbd-plus" aria-hidden="true">+</span>}
                  <figure>
                    <img src={it.image} alt="" width="480" height="480" loading="lazy" />
                  </figure>
                </div>
                <h3>{it.name}</h3>
                <p className="sbd-detail">{it.detail}</p>
                <p className="sbd-price">{money(it.price, currency)}</p>
              </li>
            ))}
          </ul>
          <aside className="sbd-summary" aria-label="Bundle price">
            <p className="sbd-count">{list.length} items</p>
            <dl>
              <div>
                <dt>Bought separately</dt>
                <dd><s>{money(total, currency)}</s></dd>
              </div>
              <div className="sbd-bundle">
                <dt>Bundle price</dt>
                <dd>{money(bundle, currency)}</dd>
              </div>
            </dl>
            {saving > 0 && <p className="sbd-save">You save {money(saving, currency)} ({discount}%)</p>}
            <a className="lp-btn sbd-cta" href={ctaUrl}>{ctaLabel}</a>
            {note && <p className="sbd-note">{note}</p>}
          </aside>
        </div>
      </div>
    </section>
  )
}
