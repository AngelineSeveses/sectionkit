function Stars({ value, size = 18 }) {
  return (
    <span className="rs-stars" style={{ '--v': value, '--s': `${size}px` }} role="img" aria-label={`${value} out of 5 stars`}>
      <span aria-hidden="true">★★★★★</span>
    </span>
  )
}

export default function ReviewSummary({ heading, average, total, distribution, reviews, sourceNote, ctaLabel, ctaUrl, accent, background, spacing }) {
  const dist = distribution.split(',').map((n) => Number(n.trim()) || 0)
  const max = Math.max(...dist, 1)
  return (
    <section className="lp-section review-summary" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container rs-grid">
        <aside className="rs-summary">
          <h2>{heading}</h2>
          <p className="rs-average">
            <strong>{average.toFixed(1)}</strong>
            <span>
              <Stars value={average} size={20} />
              <span className="rs-total">Based on {total} reviews</span>
            </span>
          </p>
          <ul className="rs-bars" aria-label="Rating distribution">
            {[5, 4, 3, 2, 1].map((star, i) => (
              <li key={star}>
                <span>{star} star</span>
                <span className="rs-bar"><span style={{ width: `${((dist[i] ?? 0) / max) * 100}%` }} /></span>
                <span className="rs-count">{dist[i] ?? 0}</span>
              </li>
            ))}
          </ul>
          <a className="lp-btn rs-cta" href={ctaUrl}>{ctaLabel}</a>
          <p className="rs-source">{sourceNote}</p>
        </aside>
        <ul className="rs-list">
          {reviews.map((r) => (
            <li key={r.name + r.date}>
              <article>
                <header>
                  <span className="rs-avatar" aria-hidden="true">{r.name.slice(0, 1)}</span>
                  <span>
                    <strong>{r.name}</strong>
                    <small>{r.location}</small>
                  </span>
                  <time>{r.date}</time>
                </header>
                <Stars value={r.rating} size={15} />
                <h3>{r.title}</h3>
                <p>{r.text}</p>
                {r.service && <p className="rs-service">Service: {r.service}</p>}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
