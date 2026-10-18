export default function PortfolioSpotlight({ label, title, description, mainImage, mainAlt, thumbs, facts, linkLabel, linkUrl, nextLabel, nextUrl, background, ink, radius, spacing }) {
  return (
    <section className="lp-section portfolio-spotlight" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--radius': `${radius}px` }}>
      <div className="lp-container psp-grid">
        <div className="psp-media">
          <img className="psp-main" src={mainImage} alt={mainAlt} loading="lazy" />
          <ul className="psp-thumbs">
            {thumbs.map((t) => (
              <li key={t.image}>
                <img src={t.image} alt={t.alt} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
        <aside className="psp-info">
          <p className="psp-label">{label}</p>
          <h2>{title}</h2>
          <p className="psp-desc">{description}</p>
          <dl className="psp-facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="psp-links">
            <a className="lp-btn psp-cta" href={linkUrl}>{linkLabel}</a>
            {nextLabel && (
              <a className="psp-next" href={nextUrl}>
                {nextLabel} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
