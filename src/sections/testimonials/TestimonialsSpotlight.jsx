export default function TestimonialsSpotlight({ quote, name, role, company, photo, photoAlt, metrics, linkLabel, linkUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section testimonials-spotlight" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <figure className="tsp-card">
          <div className="tsp-photo">
            <img src={photo} alt={photoAlt} width="720" height="900" loading="lazy" />
            <p className="tsp-company">{company}</p>
          </div>
          <div className="tsp-body">
            <svg className="tsp-mark" viewBox="0 0 48 36" aria-hidden="true">
              <path d="M0 36V22C0 9.6 6.4 2.3 19.2 0l2 5.4C14.4 7.4 11 11.6 10.6 18H20v18H0Zm28 0V22C28 9.6 34.4 2.3 47.2 0l2 5.4C42.4 7.4 39 11.6 38.6 18H48v18H28Z" />
            </svg>
            <blockquote>
              <p>{quote}</p>
            </blockquote>
            <figcaption>
              <strong>{name}</strong>
              <span>{role}</span>
            </figcaption>
            <dl className="tsp-metrics">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
            {linkLabel && (
              <a className="tsp-link" href={linkUrl}>
                {linkLabel}
              </a>
            )}
          </div>
        </figure>
      </div>
    </section>
  )
}
