function Stars({ n }) {
  return (
    <span className="tg-stars" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={i < n ? 'on' : ''} aria-hidden="true">
          <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" fill="currentColor" />
        </svg>
      ))}
    </span>
  )
}

export default function TestimonialsGrid({ heading, subhead, reviews, showStars, accent, background, spacing, radius }) {
  return (
    <section className="lp-section testimonials-grid" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="tg-head">
          <h2>{heading}</h2>
          <p>{subhead}</p>
        </div>
        <ul className="tg-list">
          {reviews.map((r) => (
            <li key={r.name}>
              <figure className="tg-card">
                {showStars && <Stars n={r.rating} />}
                <blockquote>
                  <p>{r.quote}</p>
                </blockquote>
                <figcaption>
                  <img src={r.photo} alt="" width="44" height="44" loading="lazy" />
                  <span>
                    <strong>{r.name}</strong>
                    {r.detail}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
