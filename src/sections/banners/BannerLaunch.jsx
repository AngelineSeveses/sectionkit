export default function BannerLaunch({ badge, headline, text, ctaLabel, ctaUrl, secondaryLabel, secondaryUrl, color1, color2, color3, background, radius, spacing }) {
  return (
    <section className="lp-section banner-launch" data-spacing={spacing} style={{ '--c1': color1, '--c2': color2, '--c3': color3, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="bln-card">
          <span className="bln-confetti" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <p className="bln-badge">
            <span>New</span>
            {badge}
          </p>
          <h2>{headline}</h2>
          <p className="bln-text">{text}</p>
          <div className="bln-actions">
            <a className="lp-btn bln-primary" href={ctaUrl}>{ctaLabel}</a>
            {secondaryLabel && (
              <a className="bln-secondary" href={secondaryUrl}>
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
