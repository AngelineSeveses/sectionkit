export default function StatsMilestones({ heading, intro, milestones, accent, background, spacing }) {
  return (
    <section className="lp-section stats-milestones" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container">
        <div className="sms-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ol className="sms-line">
          {milestones.map((m) => (
            <li key={m.year}>
              <span className="sms-year">{m.year}</span>
              <span className="sms-dot" aria-hidden="true" />
              <strong className="sms-value">{m.value}</strong>
              <span className="sms-label">{m.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
