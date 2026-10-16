// Filtering works with plain radio inputs and CSS (up to four filters),
// so the exported HTML needs no JavaScript.
export default function PortfolioFilterGrid({ heading, allLabel, filters, projects, accent, background, spacing, radius }) {
  const slots = filters.slice(0, 4)
  return (
    <section className="lp-section portfolio-filter-grid" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <h2 className="pfg-heading">{heading}</h2>
        <div className="pfg-wrap">
          <input className="pfg-radio" type="radio" name="pfg-filter" id="pfg-all" defaultChecked />
          {slots.map((f, i) => (
            <input key={f.name} className="pfg-radio" type="radio" name="pfg-filter" id={`pfg-f${i + 1}`} />
          ))}
          <div className="pfg-filters" role="group" aria-label="Filter projects">
            <label htmlFor="pfg-all">{allLabel}</label>
            {slots.map((f, i) => (
              <label key={f.name} htmlFor={`pfg-f${i + 1}`}>{f.name}</label>
            ))}
          </div>
          <ul className="pfg-grid">
            {projects.map((p) => (
              <li key={p.title} className="pfg-item" data-slot={p.filter}>
                <figure>
                  <img src={p.image} alt={p.imageAlt} loading="lazy" />
                  <figcaption>
                    <strong>{p.title}</strong>
                    <span>{p.location}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
