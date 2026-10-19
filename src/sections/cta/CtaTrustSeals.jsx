// Seals are drawn in CSS with your own wording; they are not third-party certification marks.
export default function CtaTrustSeals({ heading, text, ctaLabel, ctaUrl, phoneLabel, phoneHref, seals, accent, background, radius, spacing }) {
  return (
    <section className="lp-section cta-trust-seals" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container cts-grid">
        <div className="cts-copy">
          <h2>{heading}</h2>
          <p>{text}</p>
          <div className="cts-actions">
            <a className="lp-btn cts-cta" href={ctaUrl}>{ctaLabel}</a>
            <a className="cts-phone" href={phoneHref}>
              <span>or call</span>
              {phoneLabel}
            </a>
          </div>
        </div>
        <ul className="cts-seals">
          {seals.slice(0, 4).map((s) => (
            <li key={s.top}>
              <span className="cts-seal">
                <span className="cts-top">{s.top}</span>
                <strong>{s.big}</strong>
                <span className="cts-bottom">{s.bottom}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
