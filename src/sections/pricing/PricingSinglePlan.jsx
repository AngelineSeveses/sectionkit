export default function PricingSinglePlan({ heading, subhead, planName, price, priceNote, includes, ctaLabel, ctaUrl, guaranteeTitle, guaranteeText, accent, background, spacing, radius }) {
  return (
    <section className="lp-section pricing-single-plan" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container psp-grid">
        <div className="psp-copy">
          <h2>{heading}</h2>
          <p>{subhead}</p>
          <div className="psp-guarantee">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M13 20.5l4.5 4.5L27 15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <strong>{guaranteeTitle}</strong>
              <span>{guaranteeText}</span>
            </div>
          </div>
        </div>
        <div className="psp-card">
          <p className="psp-name">{planName}</p>
          <p className="psp-price">{price}</p>
          <p className="psp-note">{priceNote}</p>
          <a className="lp-btn psp-cta" href={ctaUrl}>{ctaLabel}</a>
          <p className="psp-includes-title">Everything included</p>
          <ul className="psp-includes">
            {includes.map((it) => (
              <li key={it.text}>{it.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
