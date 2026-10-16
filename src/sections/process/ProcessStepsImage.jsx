export default function ProcessStepsImage({ heading, image, imageAlt, steps, ctaLabel, ctaUrl, phoneLabel, phoneHref, accent, background, spacing, radius }) {
  return (
    <section className="lp-section process-steps-image" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container psi-grid">
        <figure className="psi-media">
          <img src={image} alt={imageAlt} loading="lazy" />
        </figure>
        <div className="psi-copy">
          <h2>{heading}</h2>
          <ol className="psi-steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="psi-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="psi-actions">
            <a className="lp-btn psi-cta" href={ctaUrl}>{ctaLabel}</a>
            <a className="psi-phone" href={phoneHref}>or call {phoneLabel}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
