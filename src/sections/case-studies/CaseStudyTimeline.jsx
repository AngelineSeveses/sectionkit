// Milestones run left to right; the last one is highlighted as the outcome.
export default function CaseStudyTimeline({ client, heading, intro, logoText, milestones, quote, quoteName, quoteRole, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section case-study-timeline" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px`, '--count': milestones.length }}>
      <div className="lp-container">
        <div className="cst-head">
          <div>
            <p className="cst-client">{client}</p>
            <h2>{heading}</h2>
            <p className="cst-intro">{intro}</p>
          </div>
          <p className="cst-logo" aria-hidden="true">
            {logoText}
          </p>
        </div>
        <ol className="cst-track">
          {milestones.map((m, i) => (
            <li key={m.when} data-last={i === milestones.length - 1}>
              <span className="cst-when">{m.when}</span>
              <span className="cst-dot" aria-hidden="true" />
              <strong className="cst-value">{m.value}</strong>
              <span className="cst-label">{m.label}</span>
              <p className="cst-note">{m.note}</p>
            </li>
          ))}
        </ol>
        <div className="cst-foot">
          <blockquote>
            <p>{quote}</p>
            <footer>
              <strong>{quoteName}</strong>, {quoteRole}
            </footer>
          </blockquote>
          <a className="lp-btn cst-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
