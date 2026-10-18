export default function CtaSocialProof({ avatars, proofText, rating, headline, body, primaryLabel, primaryUrl, secondaryLabel, secondaryUrl, note, accent, background, spacing }) {
  return (
    <section className="lp-section cta-social-proof" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container csp-inner">
        <div className="csp-proof">
          <ul className="csp-avatars" aria-hidden="true">
            {avatars.map((a) => (
              <li key={a.photo}>
                <img src={a.photo} alt="" width="44" height="44" loading="lazy" />
              </li>
            ))}
          </ul>
          <div>
            <p className="csp-stars">
              <span aria-hidden="true">★★★★★</span>
              <strong>{rating}</strong>
            </p>
            <p className="csp-proof-text">{proofText}</p>
          </div>
        </div>
        <h2>{headline}</h2>
        <p className="csp-body">{body}</p>
        <div className="csp-actions">
          <a className="lp-btn csp-primary" href={primaryUrl}>{primaryLabel}</a>
          {secondaryLabel && (
            <a className="lp-btn csp-secondary" href={secondaryUrl}>{secondaryLabel}</a>
          )}
        </div>
        {note && <p className="csp-note">{note}</p>}
      </div>
    </section>
  )
}
