export default function CtaSplitImage({ heading, body, ctaLabel, ctaUrl, linkLabel, linkUrl, image, imageAlt, imageSide, accent, background, spacing, radius }) {
  return (
    <section className="lp-section cta-split-image" data-spacing={spacing} data-side={imageSide} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="csi-card">
          <div className="csi-copy">
            <h2>{heading}</h2>
            <p>{body}</p>
            <div className="csi-actions">
              <a className="lp-btn csi-cta" href={ctaUrl}>{ctaLabel}</a>
              {linkLabel && <a className="csi-link" href={linkUrl}>{linkLabel}</a>}
            </div>
          </div>
          <figure className="csi-media">
            <img src={image} alt={imageAlt} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}
