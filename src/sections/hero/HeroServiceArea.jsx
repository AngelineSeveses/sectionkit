export default function HeroServiceArea({ badge, headline, subhead, ctaLabel, ctaUrl, phoneLabel, phoneHref, areaTitle, areas, hours, accent, background, spacing, radius }) {
  return (
    <section className="lp-section hero-service-area" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container hsa-grid">
        <div className="hsa-copy">
          <p className="hsa-badge">
            <span aria-hidden="true" />
            {badge}
          </p>
          <h1 className="hsa-title">{headline}</h1>
          <p className="hsa-sub">{subhead}</p>
          <div className="hsa-actions">
            <a className="lp-btn hsa-primary" href={ctaUrl}>{ctaLabel}</a>
            <a className="lp-btn hsa-phone" href={phoneHref}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" fill="currentColor" /></svg>
              {phoneLabel}
            </a>
          </div>
          <p className="hsa-hours">{hours}</p>
        </div>

        <div className="hsa-map">
          <svg className="hsa-map-art" viewBox="0 0 400 320" aria-hidden="true">
            <defs>
              <pattern id="hsa-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.08" />
              </pattern>
            </defs>
            <rect width="400" height="320" fill="url(#hsa-grid)" />
            <path d="M-10 230 C80 200 120 250 200 210 S330 170 410 190" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="14" strokeLinecap="round" />
            <path d="M120 -10 L150 120 L140 330" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="6" />
            <path d="M-10 90 L410 120" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="6" />
            <path d="M290 -10 L260 330" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="4" />
            <circle cx="200" cy="150" r="118" className="hsa-radius" />
            <circle cx="200" cy="150" r="8" className="hsa-pin" />
          </svg>
          <div className="hsa-areas">
            <h2>{areaTitle}</h2>
            <ul>
              {areas.map((a) => (
                <li key={a.name}>{a.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
