export default function PortfolioProjectList({ heading, count, projects, background, ink, accent, spacing }) {
  return (
    <section className="lp-section portfolio-project-list" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container">
        <div className="ppl-head">
          <h2>{heading}</h2>
          <span>{count}</span>
        </div>
        <ul className="ppl-list">
          {projects.map((p) => (
            <li key={p.title}>
              <a href={p.url} className="ppl-row">
                <span className="ppl-year">{p.year}</span>
                <span className="ppl-title">{p.title}</span>
                <span className="ppl-client">{p.client}</span>
                <span className="ppl-disc">{p.discipline}</span>
                <span className="ppl-thumb" aria-hidden="true">
                  <img src={p.image} alt="" loading="lazy" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
