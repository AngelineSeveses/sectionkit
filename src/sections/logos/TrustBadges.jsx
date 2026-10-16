const icons = {
  shield: <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6zm-3.2 9l2.2 2.2 4.2-4.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  home: <path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  clock: <><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>,
  badge: <><circle cx="12" cy="9.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M8.5 14l-1.5 7 5-2.5 5 2.5-1.5-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></>,
  user: <><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M4.5 20.5c1.3-3.8 4.2-5.8 7.5-5.8s6.2 2 7.5 5.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>,
  tag: <><path d="M3.5 12.5V4h8.5l8.5 8.5-8.5 8.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="8" cy="8.5" r="1.5" fill="currentColor" /></>,
}

export default function TrustBadges({ heading, badges, layout, background, accent, spacing }) {
  return (
    <section className="lp-section trust-badges" data-spacing={spacing} data-layout={layout} style={{ '--bg': background, '--accent': accent }}>
      <div className="lp-container">
        {heading && <h2 className="tb-heading">{heading}</h2>}
        <ul className="tb-list">
          {badges.map((b) => (
            <li key={b.title} className="tb-item">
              <span className="tb-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{icons[b.icon] ?? icons.shield}</svg>
              </span>
              <span className="tb-text">
                <strong>{b.title}</strong>
                <span>{b.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
