export default function ProcessGettingStarted({ heading, intro, steps, checklistTitle, checklist, checklistNote, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section process-getting-started" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container pgs-grid">
        <div className="pgs-main">
          <h2>{heading}</h2>
          <p className="pgs-intro">{intro}</p>
          <ol className="pgs-steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="pgs-num" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3>
                    {s.title}
                    {s.time && <span className="pgs-time">{s.time}</span>}
                  </h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="pgs-card" aria-labelledby="pgs-card-title">
          <h3 id="pgs-card-title">{checklistTitle}</h3>
          <ul>
            {checklist.map((c) => (
              <li key={c.item}>
                <span className="pgs-box" aria-hidden="true" />
                <span>
                  {c.item}
                  {c.detail && <small>{c.detail}</small>}
                </span>
              </li>
            ))}
          </ul>
          {checklistNote && <p className="pgs-note">{checklistNote}</p>}
          <a className="lp-btn pgs-cta" href={ctaUrl}>{ctaLabel}</a>
        </aside>
      </div>
    </section>
  )
}
