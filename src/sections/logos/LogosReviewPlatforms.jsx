// Ratings are shown as text with drawn stars (filled to the decimal), not platform logos.
function Stars({ value }) {
  const pct = Math.max(0, Math.min(5, Number(value) || 0)) * 20
  return (
    <span className="lrp-stars" aria-hidden="true">
      <span className="lrp-stars-base">★★★★★</span>
      <span className="lrp-stars-fill" style={{ width: `${pct}%` }}>
        ★★★★★
      </span>
    </span>
  )
}

export default function LogosReviewPlatforms({ heading, platforms, linkLabel, linkUrl, accent, background, spacing }) {
  return (
    <section className="lp-section logos-review-platforms" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container lrp-inner">
        <h2>{heading}</h2>
        <ul className="lrp-list">
          {platforms.map((p) => (
            <li key={p.name}>
              <a href={p.url}>
                <span className="lrp-name">{p.name}</span>
                <span className="lrp-score">
                  <strong>{p.rating}</strong>
                  <Stars value={p.rating} />
                </span>
                <span className="lrp-count">
                  {p.count} reviews
                  <span className="lp-sr-only">, rated {p.rating} out of 5 on {p.name}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        {linkLabel && (
          <a className="lrp-link" href={linkUrl}>
            {linkLabel}
          </a>
        )}
      </div>
    </section>
  )
}
