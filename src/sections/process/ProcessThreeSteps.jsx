export default function ProcessThreeSteps({ heading, intro, steps, ctaLabel, ctaUrl, note, accent, background, spacing }) {
  return (
    <section className="lp-section process-three-steps" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container">
        <div className="pts-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ol className="pts-steps" style={{ '--count': steps.length }}>
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="pts-num" aria-hidden="true">{i + 1}</span>
              <span className="pts-time">{s.time}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="pts-foot">
          <a className="lp-btn pts-cta" href={ctaUrl}>{ctaLabel}</a>
          <p>{note}</p>
        </div>
      </div>
    </section>
  )
}
