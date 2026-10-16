const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: currency === 'CAD' ? 'symbol' : 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

export default function ProductGridShop({ heading, viewAllLabel, viewAllUrl, products, currency, accent, background, spacing, radius }) {
  return (
    <section className="lp-section product-grid-shop" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="pgs-head">
          <h2>{heading}</h2>
          <a href={viewAllUrl}>{viewAllLabel}</a>
        </div>
        <ul className="pgs-list">
          {products.map((p) => {
            const price = currency === 'CAD' ? p.priceCad : p.priceUsd
            return (
              <li key={p.name} className="pgs-item">
                <a className="pgs-media" href={p.url}>
                  <img src={p.image} alt={p.name} loading="lazy" />
                  {p.badge && <span className="pgs-badge">{p.badge}</span>}
                </a>
                <div className="pgs-info">
                  <h3><a href={p.url}>{p.name}</a></h3>
                  <p className="pgs-meta">{p.meta}</p>
                  <p className="pgs-price">
                    {money(price, currency)} <span>{currency}</span>
                  </p>
                </div>
                <button className="pgs-add" type="button" aria-label={`Add ${p.name} to cart`}>
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
