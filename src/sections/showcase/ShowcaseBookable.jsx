const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

export default function ShowcaseBookable({ heading, intro, services, currency, pricePrefix, bookLabel, note, accent, background, radius, spacing }) {
  return (
    <section className="lp-section showcase-bookable" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="sbk-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="sbk-grid">
          {services.map((s) => (
            <li key={s.name}>
              <img src={s.image} alt="" width="320" height="320" loading="lazy" />
              <div className="sbk-body">
                <div className="sbk-top">
                  <h3>{s.name}</h3>
                  <span className="sbk-duration">{s.duration}</span>
                </div>
                <p className="sbk-desc">{s.description}</p>
                {s.tag && <p className="sbk-tag">{s.tag}</p>}
                <div className="sbk-foot">
                  <p className="sbk-price">
                    <span>{pricePrefix}</span> {money(s.price, currency)}
                  </p>
                  <a className="lp-btn sbk-book" href={s.url} aria-label={`${bookLabel}: ${s.name}`}>
                    {bookLabel}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {note && <p className="sbk-note">{note}</p>}
      </div>
    </section>
  )
}
