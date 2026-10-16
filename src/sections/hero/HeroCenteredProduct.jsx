export default function HeroCenteredProduct({
  eyebrow,
  headline,
  subhead,
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
  logosLabel,
  logos,
  accent,
  spacing,
  radius,
}) {
  const columns = [
    { title: 'Scoping', cards: [['Kitchen reno: Patel', 'Site visit Thu'], ['Basement suite', 'Permit drawings']] },
    { title: 'In progress', cards: [['Lakeview condo', 'Tile, day 3 of 5'], ['Roof: Ortega', 'Materials on site'], ['Deck rebuild', 'Awaiting inspection']] },
    { title: 'Invoiced', cards: [['Main floor paint', 'Paid'], ['Window install', 'Due Nov 2']] },
  ]
  return (
    <section className="lp-section hero-centered-product" data-spacing={spacing} style={{ '--accent': accent, '--radius': `${radius}px` }}>
      <div className="lp-container hcp-inner">
        <p className="hcp-eyebrow">{eyebrow}</p>
        <h1 className="hcp-title">{headline}</h1>
        <p className="hcp-sub">{subhead}</p>
        <div className="hcp-actions">
          <a className="lp-btn hcp-primary" href={primaryUrl}>{primaryLabel}</a>
          <a className="lp-btn hcp-secondary" href={secondaryUrl}>
            {secondaryLabel}
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        <div className="hcp-shot" aria-hidden="true">
          <div className="hcp-toolbar">
            <span className="hcp-logo" />
            <span className="hcp-crumb">Projects</span>
            <span className="hcp-crumb dim">/ October board</span>
            <span className="hcp-avatars"><i /><i /><i /></span>
          </div>
          <div className="hcp-board">
            {columns.map((col) => (
              <div className="hcp-col" key={col.title}>
                <div className="hcp-col-head">{col.title}<em>{col.cards.length}</em></div>
                {col.cards.map(([t, s]) => (
                  <div className="hcp-card" key={t}>
                    <b>{t}</b>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="hcp-col hcp-col-panel">
              <div className="hcp-col-head">This week</div>
              <div className="hcp-bars">
                {[62, 80, 45, 92, 70].map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="hcp-total"><small>Billed</small><b>$48,210</b></div>
            </div>
          </div>
        </div>

        <div className="hcp-logos">
          <p>{logosLabel}</p>
          <ul>
            {logos.map((l) => (
              <li key={l.name}>{l.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
