export default function HeroSplitDashboard({
  badge,
  badgeUrl,
  headline,
  subhead,
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
  assurances,
  accent,
  imageSide,
  spacing,
  radius,
}) {
  return (
    <section
      className="lp-section hero-split-dashboard"
      data-spacing={spacing}
      data-side={imageSide}
      style={{ '--accent': accent, '--radius': `${radius}px` }}
    >
      <div className="lp-container hsd-grid">
        <div className="hsd-copy">
          {badge && (
            <a className="hsd-badge" href={badgeUrl}>
              <span className="hsd-badge-dot" aria-hidden="true" />
              {badge}
            </a>
          )}
          <h1 className="hsd-title">{headline}</h1>
          <p className="hsd-sub">{subhead}</p>
          <div className="hsd-actions">
            <a className="lp-btn hsd-primary" href={primaryUrl}>
              {primaryLabel}
            </a>
            <a className="lp-btn hsd-secondary" href={secondaryUrl}>
              {secondaryLabel}
            </a>
          </div>
          <ul className="hsd-assurances">
            {assurances.map((a) => (
              <li key={a.text}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {a.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="hsd-visual" aria-hidden="true">
          <div className="hsd-window">
            <div className="hsd-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="hsd-app">
              <div className="hsd-side">
                <i className="on" />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="hsd-main">
                <div className="hsd-head">
                  <b>Month-end close</b>
                  <em>October</em>
                </div>
                <div className="hsd-kpis">
                  <div>
                    <small>Reconciled</small>
                    <strong>1,284</strong>
                    <span className="up">+18%</span>
                  </div>
                  <div>
                    <small>Exceptions</small>
                    <strong>12</strong>
                    <span className="down">−41%</span>
                  </div>
                  <div>
                    <small>Days to close</small>
                    <strong>3.5</strong>
                    <span className="up">−4 days</span>
                  </div>
                </div>
                <div className="hsd-chart">
                  <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                    <path d="M0 78 C30 74 45 60 75 62 S120 40 150 44 S205 22 230 26 S280 12 300 8 L300 100 L0 100Z" className="area" />
                    <path d="M0 78 C30 74 45 60 75 62 S120 40 150 44 S205 22 230 26 S280 12 300 8" className="line" />
                  </svg>
                </div>
                <div className="hsd-rows">
                  <div><span className="tag ok" />Chase operating ••4417<em>Matched</em></div>
                  <div><span className="tag ok" />RBC USD ••2093<em>Matched</em></div>
                  <div><span className="tag warn" />Stripe payouts<em>2 to review</em></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hsd-float">
            <small>Auto-matched today</small>
            <strong>96.4%</strong>
            <div className="hsd-meter"><span /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
