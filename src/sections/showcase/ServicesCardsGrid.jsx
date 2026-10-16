export default function ServicesCardsGrid({ heading, intro, services, pricePrefix, linkLabel, accent, background, spacing, radius }) {
  return (
    <section className="lp-section services-cards-grid" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="scg-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="scg-list">
          {services.map((s) => (
            <li key={s.title}>
              <a className="scg-card" href={s.url}>
                <span className="scg-media">
                  <img src={s.image} alt="" loading="lazy" />
                </span>
                <span className="scg-body">
                  <span className="scg-title">{s.title}</span>
                  <span className="scg-text">{s.text}</span>
                  <span className="scg-foot">
                    <span className="scg-price">
                      {pricePrefix} <strong>{s.price}</strong>
                    </span>
                    <span className="scg-link">
                      {linkLabel}
                      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
