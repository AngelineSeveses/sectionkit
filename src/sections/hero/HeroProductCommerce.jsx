const formatPrice = (amount, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: currency === 'CAD' ? 'symbol' : 'narrowSymbol' }).format(amount)

export default function HeroProductCommerce({ image, imageAlt, collection, name, rating, reviewCount, description, priceUsd, priceCad, currency, colors, ctaLabel, ctaUrl, shippingNote, returnsNote, background, accent, radius, spacing }) {
  const price = currency === 'CAD' ? priceCad : priceUsd
  return (
    <section className="lp-section hero-product-commerce" data-spacing={spacing} style={{ '--bg': background, '--accent': accent, '--radius': `${radius}px` }}>
      <div className="lp-container hpc-grid">
        <div className="hpc-media">
          <img src={image} alt={imageAlt} />
        </div>
        <div className="hpc-info">
          <p className="hpc-collection">{collection}</p>
          <h1 className="hpc-name">{name}</h1>
          <a className="hpc-rating" href="#reviews">
            <span className="hpc-stars" style={{ '--rating': rating }} aria-hidden="true">★★★★★</span>
            <span>
              {rating.toFixed(1)} <span className="lp-sr-only">out of 5 stars,</span> ({reviewCount} reviews)
            </span>
          </a>
          <p className="hpc-price">
            {formatPrice(price, currency)}
            <small>{currency}</small>
          </p>
          <p className="hpc-desc">{description}</p>

          <fieldset className="hpc-colors">
            <legend>Color</legend>
            <div>
              {colors.map((c, i) => (
                <label key={c.name} title={c.name}>
                  <input type="radio" name="color" value={c.name} defaultChecked={i === 0} />
                  <span style={{ background: c.swatch }} />
                  <span className="lp-sr-only">{c.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <a className="lp-btn hpc-cta" href={ctaUrl}>{ctaLabel}</a>
          <ul className="hpc-notes">
            <li>{shippingNote}</li>
            <li>{returnsNote}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
