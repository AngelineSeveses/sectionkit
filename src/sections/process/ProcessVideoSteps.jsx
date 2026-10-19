// The poster links to the video (YouTube, Vimeo or a lightbox); no player is embedded,
// so the page stays fast until someone chooses to watch.
export default function ProcessVideoSteps({ heading, intro, poster, posterAlt, videoUrl, videoLabel, duration, steps, ctaLabel, ctaUrl, note, accent, background, radius, spacing }) {
  return (
    <section className="lp-section process-video-steps" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container pvs-grid">
        <a className="pvs-video" href={videoUrl}>
          <img src={poster} alt={posterAlt} width="1200" height="800" loading="lazy" />
          <span className="pvs-play" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
          <span className="pvs-label">
            {videoLabel}
            <small>{duration}</small>
          </span>
        </a>
        <div className="pvs-copy">
          <h2>{heading}</h2>
          <p className="pvs-intro">{intro}</p>
          <ol className="pvs-steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="pvs-num" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="pvs-foot">
            <a className="lp-btn pvs-cta" href={ctaUrl}>{ctaLabel}</a>
            {note && <p>{note}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
