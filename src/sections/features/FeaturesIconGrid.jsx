const icons = {
  calendar: <><rect x="4" y="5.5" width="16" height="14.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M4 10h16M8.5 3.5v4m7-4v4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
  video: <><rect x="3.5" y="6.5" width="12" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M15.5 10.5l5-3v9l-5-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></>,
  pill: <><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M9.6 8.6l4.8 6.8" stroke="currentColor" strokeWidth="1.7" /></>,
  card: <><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M3 10h18M7 14.5h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
  chat: <path d="M4.5 18.5l1-3.6A7.5 7.5 0 1112 19.5a7.6 7.6 0 01-3.8-1z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
  heart: <path d="M12 19.5s-7.5-4.4-7.5-10A4 4 0 0112 7a4 4 0 017.5 2.5c0 5.6-7.5 10-7.5 10z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
  file: <><path d="M6.5 3.5h7l4 4v13h-11z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M13.5 3.5v4h4M9 12.5h6M9 16h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
  pin: <><path d="M12 21s6.5-6.2 6.5-11.5a6.5 6.5 0 00-13 0C5.5 14.8 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="9.5" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.7" /></>,
}

export default function FeaturesIconGrid({ label, heading, body, ctaLabel, ctaUrl, features, accent, background, spacing }) {
  return (
    <section className="lp-section features-icon-grid" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container fig-grid">
        <div className="fig-intro">
          <p className="fig-label">{label}</p>
          <h2>{heading}</h2>
          <p className="fig-body">{body}</p>
          {ctaLabel && <a className="lp-btn fig-cta" href={ctaUrl}>{ctaLabel}</a>}
        </div>
        <ul className="fig-list">
          {features.map((f) => (
            <li key={f.title}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{icons[f.icon] ?? icons.heart}</svg>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
