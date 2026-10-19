// Three projects and one stat tile in a fixed bento grid: the first project is the large tile.
export default function PortfolioBento({ heading, intro, projects, statValue, statLabel, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  const items = projects.slice(0, 3)
  return (
    <section className="lp-section portfolio-bento" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="pbn-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="pbn-grid">
          {items.map((p, i) => (
            <li key={p.title} className="pbn-tile" data-slot={i + 1}>
              <a href={p.url}>
                <img src={p.image} alt={p.alt} width="1200" height="900" loading="lazy" />
                <span className="pbn-label">
                  <span className="pbn-cat">{p.category}</span>
                  <strong>{p.title}</strong>
                </span>
              </a>
            </li>
          ))}
          <li className="pbn-stat">
            <p>
              <strong>{statValue}</strong>
              <span>{statLabel}</span>
            </p>
            <a className="lp-btn pbn-cta" href={ctaUrl}>{ctaLabel}</a>
          </li>
        </ul>
      </div>
    </section>
  )
}
