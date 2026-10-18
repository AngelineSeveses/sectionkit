export default function HeroAppDownload({ eyebrow, headline, body, appStoreUrl, playStoreUrl, rating, ratingNote, appName, balanceLabel, balance, items, badge, accent, background, spacing }) {
  return (
    <section className="lp-section hero-app-download" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container had-grid">
        <div className="had-copy">
          <p className="had-eyebrow">{eyebrow}</p>
          <h1>{headline}</h1>
          <p className="had-body">{body}</p>
          <div className="had-stores">
            <a className="had-store" href={appStoreUrl}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span>
                <small>Download on the</small>
                App Store
              </span>
            </a>
            <a className="had-store" href={playStoreUrl}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 3.5v17l13-8.5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <span>
                <small>Get it on</small>
                Google Play
              </span>
            </a>
          </div>
          {rating && (
            <p className="had-rating">
              <span className="had-stars" aria-hidden="true">★★★★★</span>
              <strong>{rating}</strong>
              <span>{ratingNote}</span>
            </p>
          )}
        </div>
        <div className="had-visual" aria-hidden="true">
          <div className="had-phone">
            <div className="had-screen">
              <div className="had-status">
                <span>9:41</span>
                <span className="had-notch" />
                <span>●●●</span>
              </div>
              <p className="had-app">{appName}</p>
              <div className="had-balance">
                <small>{balanceLabel}</small>
                <strong>{balance}</strong>
                <div className="had-bars">
                  {[40, 62, 35, 80, 55, 70, 48].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <ul className="had-items">
                {items.map((it) => (
                  <li key={it.label}>
                    <span className="had-dot" />
                    <span className="had-label">{it.label}</span>
                    <span className="had-amount">{it.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {badge && (
            <div className="had-badge">
              <span>✓</span>
              {badge}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
