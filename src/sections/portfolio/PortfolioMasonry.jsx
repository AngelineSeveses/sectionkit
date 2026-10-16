export default function PortfolioMasonry({ heading, intro, projects, ctaLabel, ctaUrl, background, ink, spacing }) {
  return (
    <section className="lp-section portfolio-masonry" data-spacing={spacing} style={{ '--bg': background, '--ink': ink }}>
      <div className="lp-container">
        <div className="pm-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="pm-wall">
          {projects.map((p, i) => (
            <li key={p.title} className={`pm-item pm-shape-${i % 3}`}>
              <a href={p.url}>
                <img src={p.image} alt={p.imageAlt} loading="lazy" />
                <span className="pm-caption">
                  <strong>{p.title}</strong>
                  <span>{p.category}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="pm-foot">
          <a href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
