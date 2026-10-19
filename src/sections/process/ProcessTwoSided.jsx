// The audience switch uses two radio inputs and CSS, so it also works in the HTML export.
function Steps({ steps, ctaLabel, ctaUrl, slot }) {
  return (
    <div className="pts2-panel" data-slot={slot}>
      <ol>
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="pts2-num" aria-hidden="true">{i + 1}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <a className="lp-btn pts2-cta" href={ctaUrl}>{ctaLabel}</a>
    </div>
  )
}

export default function ProcessTwoSided({ heading, intro, labelA, stepsA, ctaLabelA, ctaUrlA, labelB, stepsB, ctaLabelB, ctaUrlB, accent, background, radius, spacing }) {
  return (
    <section className="lp-section process-two-sided" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container pts2-grid">
        <div className="pts2-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="pts2-body">
          <input className="pts2-radio" type="radio" name="pts2-side" id="pts2-a" defaultChecked />
          <input className="pts2-radio" type="radio" name="pts2-side" id="pts2-b" />
          <div className="pts2-switch">
            <label htmlFor="pts2-a">{labelA}</label>
            <label htmlFor="pts2-b">{labelB}</label>
            <span className="pts2-thumb" aria-hidden="true" />
          </div>
          <div className="pts2-card">
            <Steps steps={stepsA} ctaLabel={ctaLabelA} ctaUrl={ctaUrlA} slot="a" />
            <Steps steps={stepsB} ctaLabel={ctaLabelB} ctaUrl={ctaUrlB} slot="b" />
          </div>
        </div>
      </div>
    </section>
  )
}
