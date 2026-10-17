export default function PortfolioScrollRow({ heading, intro, linkLabel, linkUrl, projects, background, ink, radius, spacing }) {
  return (
    <section className="lp-section portfolio-scroll-row" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--radius': `${radius}px` }}>
      <div className="lp-container psr-head">
        <h2>{heading}</h2>
        <div className="psr-aside">
          <p>{intro}</p>
          <a href={linkUrl}>{linkLabel}</a>
        </div>
      </div>
      <ul className="psr-row" aria-label="Projects">
        {projects.map((p, i) => (
          <li key={p.title}>
            <a className="psr-card" href={p.url}>
              <span className="psr-media">
                <img src={p.image} alt={p.imageAlt} loading="lazy" />
              </span>
              <span className="psr-meta">
                <span className="psr-index">{String(i + 1).padStart(2, '0')}</span>
                <strong>{p.title}</strong>
                <span className="psr-tags">{p.tags}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
