export default function CtaNextSteps({ heading, text, ctaLabel, ctaUrl, altLabel, altUrl, stepsHeading, steps, accent, background, radius, spacing }) {
  return (
    <section className="lp-section cta-next-steps" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cns-panel">
          <div className="cns-copy">
            <h2>{heading}</h2>
            <p>{text}</p>
            <div className="cns-actions">
              <a className="lp-btn cns-primary" href={ctaUrl}>{ctaLabel}</a>
              {altLabel && (
                <a className="cns-alt" href={altUrl}>
                  {altLabel}
                </a>
              )}
            </div>
          </div>
          <div className="cns-steps">
            <h3>{stepsHeading}</h3>
            <ol>
              {steps.map((s) => (
                <li key={s.title}>
                  <span className="cns-when">{s.when}</span>
                  <strong>{s.title}</strong>
                  <span className="cns-detail">{s.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
