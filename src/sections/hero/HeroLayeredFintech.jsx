export default function HeroLayeredFintech({ headline, subhead, ctaLabel, ctaUrl, secondaryLabel, secondaryUrl, disclaimer, cardholder, accent, background, spacing, radius }) {
  return (
    <section className="lp-section hero-layered-fintech" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container hlf-grid">
        <div className="hlf-copy">
          <h1 className="hlf-title">{headline}</h1>
          <p className="hlf-sub">{subhead}</p>
          <div className="hlf-actions">
            <a className="lp-btn hlf-primary" href={ctaUrl}>{ctaLabel}</a>
            <a className="lp-btn hlf-secondary" href={secondaryUrl}>{secondaryLabel}</a>
          </div>
          <p className="hlf-disclaimer">{disclaimer}</p>
        </div>

        <div className="hlf-stage" aria-hidden="true">
          <div className="hlf-card">
            <div className="hlf-card-top">
              <span className="hlf-chip" />
              <span className="hlf-brand">Harbor</span>
            </div>
            <div className="hlf-number">•••• •••• •••• 2048</div>
            <div className="hlf-card-foot">
              <span>{cardholder}</span>
              <span>09/29</span>
            </div>
          </div>

          <div className="hlf-panel hlf-balance">
            <small>Business checking</small>
            <strong>$84,392.17</strong>
            <div className="hlf-spark">
              <svg viewBox="0 0 160 40" preserveAspectRatio="none">
                <path d="M0 32 L20 28 L40 30 L60 20 L80 24 L100 14 L120 16 L140 8 L160 6" />
              </svg>
            </div>
          </div>

          <div className="hlf-panel hlf-txns">
            <div><i className="in" /><span>Invoice #1042 paid</span><b>+$3,200.00</b></div>
            <div><i /><span>Payroll, Oct 15</span><b>−$12,840.55</b></div>
            <div><i /><span>Office rent</span><b>−$2,450.00</b></div>
          </div>

          <div className="hlf-toast">
            <span className="hlf-toast-dot" />
            Transfer to Savings scheduled
          </div>
        </div>
      </div>
    </section>
  )
}
