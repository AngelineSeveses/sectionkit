export default function ProcessTimeline({ label, heading, body, phases, accent, background, spacing }) {
  return (
    <section className="lp-section process-timeline" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container ptl-grid">
        <div className="ptl-intro">
          <p className="ptl-label">{label}</p>
          <h2>{heading}</h2>
          <p className="ptl-body">{body}</p>
        </div>
        <ol className="ptl-list">
          {phases.map((p) => (
            <li key={p.title}>
              <span className="ptl-when">{p.when}</span>
              <div className="ptl-card">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                {p.deliverable && (
                  <p className="ptl-deliverable">
                    <span>You receive</span>
                    {p.deliverable}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
