function Stars({ value }) {
  const n = Math.max(0, Math.min(5, Math.round(value)))
  return (
    <span className="tor-stars" role="img" aria-label={`${n} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" data-on={i < n}>
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6Z" />
        </svg>
      ))}
    </span>
  )
}

export default function TestimonialsOwnerReplies({ heading, intro, ownerName, ownerRole, ownerPhoto, reviews, linkLabel, linkUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section testimonials-owner-replies" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container tor-inner">
        <div className="tor-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="tor-list">
          {reviews.map((r) => (
            <li key={r.name + r.date}>
              <article>
                <header className="tor-meta">
                  <span className="tor-initial" aria-hidden="true">{r.name.charAt(0)}</span>
                  <div>
                    <h3>{r.name}</h3>
                    <p>
                      {r.service}, {r.date}
                    </p>
                  </div>
                  <Stars value={r.rating} />
                </header>
                <p className="tor-text">{r.text}</p>
                {r.reply && (
                  <div className="tor-reply">
                    <img src={ownerPhoto} alt="" width="32" height="32" loading="lazy" />
                    <div>
                      <p className="tor-reply-by">
                        <strong>{ownerName}</strong> {ownerRole}
                      </p>
                      <p>{r.reply}</p>
                    </div>
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
        {linkLabel && (
          <a className="tor-link" href={linkUrl}>
            {linkLabel}
          </a>
        )}
      </div>
    </section>
  )
}
