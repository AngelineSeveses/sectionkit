export default function CtaFullBleedPhoto({ eyebrow, headline, body, primaryLabel, primaryUrl, secondaryLabel, secondaryUrl, image, overlay, align, accent, spacing }) {
  return (
    <section className="lp-section cta-full-bleed-photo" data-spacing={spacing} data-align={align} style={{ '--accent': accent, '--overlay': overlay / 100 }}>
      <img className="cfb-bg" src={image} alt="" loading="lazy" />
      <div className="lp-container cfb-inner">
        <div className="cfb-copy">
          {eyebrow && <p className="cfb-eyebrow">{eyebrow}</p>}
          <h2>{headline}</h2>
          <p className="cfb-body">{body}</p>
          <div className="cfb-actions">
            <a className="lp-btn cfb-primary" href={primaryUrl}>{primaryLabel}</a>
            {secondaryLabel && (
              <a className="lp-btn cfb-secondary" href={secondaryUrl}>{secondaryLabel}</a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
