export default function CaseStudyCards({ heading, linkLabel, linkUrl, studies, accent, background, spacing, radius }) {
  return (
    <section className="lp-section case-study-cards" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="csc-head">
          <h2>{heading}</h2>
          <a href={linkUrl}>{linkLabel}</a>
        </div>
        <ul className="csc-list">
          {studies.map((s) => (
            <li key={s.title}>
              <a className="csc-card" href={s.url}>
                <span className="csc-media">
                  <img src={s.image} alt="" loading="lazy" />
                  <span className="csc-tag">{s.industry}</span>
                </span>
                <span className="csc-body">
                  <span className="csc-metric">
                    <strong>{s.metric}</strong>
                    {s.metricLabel}
                  </span>
                  <span className="csc-title">{s.title}</span>
                  <span className="csc-client">{s.client}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
