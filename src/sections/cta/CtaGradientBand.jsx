export default function CtaGradientBand({ heading, text, ctaLabel, ctaUrl, secondaryLabel, secondaryUrl, trust, color1, color2, color3, radius, spacing }) {
  return (
    <section className="lp-section cta-gradient-band" data-spacing={spacing} style={{ '--c1': color1, '--c2': color2, '--c3': color3, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cgb-band">
          <span className="cgb-shape cgb-s1" aria-hidden="true" />
          <span className="cgb-shape cgb-s2" aria-hidden="true" />
          <span className="cgb-shape cgb-s3" aria-hidden="true" />
          <div className="cgb-content">
            <h2>{heading}</h2>
            <p className="cgb-text">{text}</p>
            <div className="cgb-actions">
              <a className="lp-btn cgb-primary" href={ctaUrl}>{ctaLabel}</a>
              {secondaryLabel && (
                <a className="lp-btn cgb-secondary" href={secondaryUrl}>
                  {secondaryLabel}
                </a>
              )}
            </div>
            <ul className="cgb-trust">
              {String(trust)
                .split(';')
                .map((t) => t.trim())
                .filter(Boolean)
                .map((t) => (
                  <li key={t}>{t}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
