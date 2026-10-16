export default function HeroTestimonialPro({ firm, headline, subhead, ctaLabel, ctaUrl, secondaryLabel, secondaryUrl, credentials, quote, quoteName, quoteRole, quotePhoto, accent, spacing, radius }) {
  return (
    <section className="lp-section hero-testimonial-pro" data-spacing={spacing} style={{ '--accent': accent, '--radius': `${radius}px` }}>
      <div className="lp-container htp-grid">
        <div className="htp-copy">
          <p className="htp-firm">{firm}</p>
          <h1 className="htp-title">{headline}</h1>
          <p className="htp-sub">{subhead}</p>
          <div className="htp-actions">
            <a className="lp-btn htp-primary" href={ctaUrl}>{ctaLabel}</a>
            <a className="htp-link" href={secondaryUrl}>{secondaryLabel}</a>
          </div>
          <ul className="htp-creds">
            {credentials.map((c) => (
              <li key={c.title}>
                <strong>{c.title}</strong>
                <span>{c.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="htp-quote">
          <svg className="htp-mark" viewBox="0 0 48 36" aria-hidden="true">
            <path d="M0 36V22C0 9.6 6.4 2.3 19.2 0l2 4.4C14 6.3 10.3 10.6 10 17h9v19H0zm26.8 0V22c0-12.4 6.4-19.7 19.2-22l2 4.4c-7.2 1.9-10.9 6.2-11.2 12.6h9v19H26.8z" fill="currentColor" />
          </svg>
          <blockquote>
            <p>{quote}</p>
          </blockquote>
          <figcaption>
            <img src={quotePhoto} alt="" width="56" height="56" />
            <span>
              <strong>{quoteName}</strong>
              {quoteRole}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
