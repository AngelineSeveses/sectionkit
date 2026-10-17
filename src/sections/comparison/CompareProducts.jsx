export default function CompareProducts({ heading, intro, products, specs, highlighted, highlightLabel, accent, background, radius, spacing }) {
  const items = products.slice(0, 4)
  const valuesFor = (p) => p.values.split(';').map((v) => v.trim())
  return (
    <section className="lp-section compare-products" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px`, '--n': items.length }}>
      <div className="lp-container">
        <div className="cpr-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <table className="cpr-table">
          <caption className="lp-sr-only">{heading}</caption>
          <thead>
            <tr>
              <td className="cpr-corner" />
              {items.map((p, i) => (
                <th key={p.name} scope="col" data-featured={i === highlighted - 1}>
                  {i === highlighted - 1 && <span className="cpr-flag">{highlightLabel}</span>}
                  <img src={p.image} alt="" loading="lazy" />
                  <span className="cpr-name">{p.name}</span>
                  <span className="cpr-tagline">{p.tagline}</span>
                  <span className="cpr-price">{p.price}</span>
                  <a className="lp-btn cpr-cta" href={p.url}>
                    Shop <span className="lp-sr-only">{p.name}</span>
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((s, row) => (
              <tr key={s.label}>
                <th scope="row">{s.label}</th>
                {items.map((p, i) => {
                  const v = valuesFor(p)[row] ?? '—'
                  return (
                    <td key={p.name} data-featured={i === highlighted - 1} data-empty={v === '—' || v === ''}>
                      {v || '—'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
