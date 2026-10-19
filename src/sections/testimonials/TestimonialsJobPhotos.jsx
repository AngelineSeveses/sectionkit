export default function TestimonialsJobPhotos({ heading, intro, rating, ratingNote, reviews, linkLabel, linkUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section testimonials-job-photos" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="tjp-head">
          <div>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
          <p className="tjp-score">
            <strong>{rating}</strong>
            <span>
              <span className="tjp-stars" aria-hidden="true">★★★★★</span>
              {ratingNote}
            </span>
          </p>
        </div>
        <ul className="tjp-grid">
          {reviews.map((r) => (
            <li key={r.name + r.service}>
              <figure>
                <img src={r.photo} alt={r.photoAlt} width="640" height="440" loading="lazy" />
                <figcaption>{r.service}</figcaption>
              </figure>
              <div className="tjp-body">
                <p className="tjp-stars-sm" role="img" aria-label="5 out of 5 stars">
                  ★★★★★
                </p>
                <blockquote>{r.quote}</blockquote>
                <p className="tjp-who">
                  <strong>{r.name}</strong>
                  <span>{r.location}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
        {linkLabel && (
          <a className="lp-btn tjp-link" href={linkUrl}>
            {linkLabel}
          </a>
        )}
      </div>
    </section>
  )
}
