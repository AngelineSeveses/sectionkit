export default function TestimonialsVideoCards({ eyebrow, heading, videos, background, accent, radius, spacing }) {
  return (
    <section className="lp-section testimonials-video-cards" data-spacing={spacing} style={{ '--bg': background, '--accent': accent, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="tvc-head">
          <p className="tvc-eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
        </div>
        <ul className="tvc-grid">
          {videos.map((v) => (
            <li key={v.name}>
              <figure className="tvc-card">
                <a className="tvc-thumb" href={v.videoUrl} aria-label={`Watch ${v.name}’s story (${v.duration})`}>
                  <img src={v.image} alt="" loading="lazy" />
                  <span className="tvc-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="tvc-duration">{v.duration}</span>
                </a>
                <blockquote>
                  <p>{v.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{v.name}</strong>
                  <span>{v.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
