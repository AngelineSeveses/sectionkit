export default function HeroVideoCourse({ label, headline, subhead, ctaLabel, ctaUrl, priceNote, image, imageAlt, videoLabel, videoUrl, videoLength, facts, accent, background, spacing, radius }) {
  return (
    <section className="lp-section hero-video-course" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container hvc-grid">
        <div className="hvc-copy">
          <p className="hvc-label">{label}</p>
          <h1 className="hvc-title">{headline}</h1>
          <p className="hvc-sub">{subhead}</p>
          <div className="hvc-actions">
            <a className="lp-btn hvc-primary" href={ctaUrl}>{ctaLabel}</a>
            <span className="hvc-price">{priceNote}</span>
          </div>
        </div>

        <a className="hvc-video" href={videoUrl} aria-label={`${videoLabel}, ${videoLength}`}>
          <img src={image} alt={imageAlt} />
          <span className="hvc-play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
          <span className="hvc-caption" aria-hidden="true">
            <b>{videoLabel}</b>
            <span>{videoLength}</span>
          </span>
        </a>
      </div>

      <div className="lp-container">
        <dl className="hvc-facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
