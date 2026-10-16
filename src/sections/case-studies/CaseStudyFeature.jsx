export default function CaseStudyFeature({ label, client, industry, title, image, imageAlt, challenge, approach, metrics, linkLabel, linkUrl, accent, background, spacing, radius }) {
  return (
    <section className="lp-section case-study-feature" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <p className="csf-label">{label}</p>
        <div className="csf-grid">
          <figure className="csf-media">
            <img src={image} alt={imageAlt} loading="lazy" />
          </figure>
          <div className="csf-copy">
            <p className="csf-client">
              <strong>{client}</strong>
              <span>{industry}</span>
            </p>
            <h2>{title}</h2>
            <dl className="csf-story">
              <div>
                <dt>The challenge</dt>
                <dd>{challenge}</dd>
              </div>
              <div>
                <dt>What we did</dt>
                <dd>{approach}</dd>
              </div>
            </dl>
            <ul className="csf-metrics">
              {metrics.map((m) => (
                <li key={m.label}>
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </li>
              ))}
            </ul>
            <a className="csf-link" href={linkUrl}>
              {linkLabel}
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
