const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: 'narrowSymbol' }).format(n)

// Each tile and its drawn can take the flavor's own color. Use a product photo instead
// by replacing the can with an image if you have consistent packshots.
export default function ShowcaseFlavorTiles({ heading, intro, brand, flavors, currency, packLabel, addLabel, note, background, radius, spacing }) {
  return (
    <section className="lp-section showcase-flavor-tiles" data-spacing={spacing} style={{ '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="sft-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="sft-grid">
          {flavors.map((f) => (
            <li key={f.name} style={{ '--tone': f.color }}>
              <div className="sft-stage" aria-hidden="true">
                <div className="sft-can">
                  <span className="sft-can-brand">{brand}</span>
                  <span className="sft-can-name">{f.name}</span>
                </div>
              </div>
              <div className="sft-body">
                <h3>{f.name}</h3>
                <p className="sft-notes">{f.notes}</p>
                <div className="sft-foot">
                  <p className="sft-price">
                    {money(f.price, currency)} <span>{packLabel}</span>
                  </p>
                  <a className="lp-btn sft-add" href={f.url} aria-label={`${addLabel}: ${f.name}`}>
                    {addLabel}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {note && <p className="sft-note">{note}</p>}
      </div>
    </section>
  )
}
