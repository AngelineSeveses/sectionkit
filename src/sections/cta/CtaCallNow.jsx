export default function CtaCallNow({ badge, heading, body, phoneLabel, phoneHref, secondaryLabel, secondaryUrl, hours, accent, background, spacing }) {
  return (
    <section className="lp-section cta-call-now" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container ccn-grid">
        <div className="ccn-copy">
          <p className="ccn-badge">
            <span className="ccn-pulse" aria-hidden="true" />
            {badge}
          </p>
          <h2>{heading}</h2>
          <p className="ccn-body">{body}</p>
        </div>
        <div className="ccn-action">
          <a className="ccn-phone" href={phoneHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" fill="currentColor" /></svg>
            <span>
              <small>Tap to call</small>
              {phoneLabel}
            </span>
          </a>
          <p className="ccn-hours">{hours}</p>
          <a className="ccn-secondary" href={secondaryUrl}>{secondaryLabel}</a>
        </div>
      </div>
    </section>
  )
}
