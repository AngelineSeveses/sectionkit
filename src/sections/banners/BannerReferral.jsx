export default function BannerReferral({ headline, giveAmount, giveLabel, getAmount, getLabel, ctaLabel, ctaUrl, terms, accent, background, radius, spacing }) {
  return (
    <section className="lp-section banner-referral" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="brf-card">
          <h2>{headline}</h2>
          <div className="brf-swap">
            <div className="brf-side">
              <p className="brf-amount">{giveAmount}</p>
              <p className="brf-label">{giveLabel}</p>
            </div>
            <span className="brf-arrows" aria-hidden="true">
              <svg viewBox="0 0 40 24">
                <path d="M4 8h30m0 0l-5-5m5 5l-5 5M36 16H6m0 0l5-5m-5 5l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="brf-side">
              <p className="brf-amount">{getAmount}</p>
              <p className="brf-label">{getLabel}</p>
            </div>
          </div>
          <div className="brf-foot">
            <a className="lp-btn brf-cta" href={ctaUrl}>{ctaLabel}</a>
            <p className="brf-terms">{terms}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
