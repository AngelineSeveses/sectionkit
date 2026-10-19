const icons = {
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </>
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  chat: <path d="M5 18l-1 3 4-2h9a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v9c0 .7.3 1.4.8 2Z" />,
  shield: <path d="M12 3l7 3v6c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-3Z" />,
  card: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10.5h18M7 15h4" />
    </>
  ),
  bolt: <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7Z" />,
}

export default function FeaturesColorCards({ heading, intro, cards, ctaLabel, ctaUrl, background, radius, spacing }) {
  return (
    <section className="lp-section features-color-cards" data-spacing={spacing} style={{ '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="fcc-head">
          <h2>{heading}</h2>
          <div>
            <p>{intro}</p>
            <a className="lp-btn fcc-cta" href={ctaUrl}>{ctaLabel}</a>
          </div>
        </div>
        <ul className="fcc-grid">
          {cards.map((c) => (
            <li key={c.title} style={{ '--tone': c.color }}>
              <span className="fcc-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{icons[c.icon] ?? icons.bolt}</svg>
              </span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
