export default function PortfolioBrowserCards({ heading, intro, projects, ctaLabel, ctaUrl, background, radius, spacing }) {
  return (
    <section className="lp-section portfolio-browser-cards" data-spacing={spacing} style={{ '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="pbc-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="pbc-grid">
          {projects.map((p) => (
            <li key={p.title} style={{ '--tone': p.color }}>
              <a href={p.url}>
                <div className="pbc-stage">
                  <div className="pbc-browser">
                    <div className="pbc-chrome" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <span>{p.domain}</span>
                    </div>
                    <img src={p.image} alt={p.alt} width="960" height="600" loading="lazy" />
                  </div>
                </div>
                <div className="pbc-info">
                  <div>
                    <h3>{p.title}</h3>
                    <p className="pbc-tags">{p.tags}</p>
                  </div>
                  <p className="pbc-result">{p.result}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <a className="lp-btn pbc-cta" href={ctaUrl}>{ctaLabel}</a>
      </div>
    </section>
  )
}
