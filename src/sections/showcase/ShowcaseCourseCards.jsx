export default function ShowcaseCourseCards({ eyebrow, heading, linkLabel, linkUrl, courses, accent, background, radius, spacing }) {
  return (
    <section className="lp-section showcase-course-cards" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="scc-head">
          <div>
            <p className="scc-eyebrow">{eyebrow}</p>
            <h2>{heading}</h2>
          </div>
          <a href={linkUrl}>{linkLabel}</a>
        </div>
        <ul className="scc-grid">
          {courses.map((c) => (
            <li key={c.title}>
              <a className="scc-card" href={c.url}>
                <span className="scc-media">
                  <img src={c.image} alt="" loading="lazy" />
                  <span className="scc-level">{c.level}</span>
                </span>
                <span className="scc-body">
                  <strong className="scc-title">{c.title}</strong>
                  <span className="scc-desc">{c.description}</span>
                  <span className="scc-meta">
                    <span>{c.duration}</span>
                    <span>{c.format}</span>
                  </span>
                  <span className="scc-foot">
                    <span className="scc-start">
                      <small>Next start</small>
                      {c.start}
                    </span>
                    <span className="scc-price">{c.price}</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
