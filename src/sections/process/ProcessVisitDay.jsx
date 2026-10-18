export default function ProcessVisitDay({ label, heading, intro, events, noteTitle, notes, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section process-visit-day" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container pvd-grid">
        <div className="pvd-intro">
          <p className="pvd-label">{label}</p>
          <h2>{heading}</h2>
          <p className="pvd-text">{intro}</p>
          <div className="pvd-note">
            <h3>{noteTitle}</h3>
            <ul>
              {notes.split(';').map((n) => (
                <li key={n}>{n.trim()}</li>
              ))}
            </ul>
          </div>
          <a className="lp-btn pvd-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <ol className="pvd-timeline">
          {events.map((e) => (
            <li key={`${e.time}-${e.title}`}>
              <time>{e.time}</time>
              <span className="pvd-node" aria-hidden="true" />
              <div>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
