const icons = {
  bolt: <path d="M13 3L5 13h6l-1 8 8-10h-6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M8.5 10.5V7.5a3.5 3.5 0 017 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" /></>,
  chart: <path d="M4 20V10m6 10V4m6 16v-7m4 7H3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  users: <><circle cx="9" cy="8.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M2.5 20c.9-3.4 3.4-5 6.5-5s5.6 1.6 6.5 5M16 5.5a3.5 3.5 0 010 6.5m2 3c1.8.6 3 2.2 3.5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>,
  sync: <path d="M4 12a8 8 0 0113.7-5.6L20 9M20 4v5h-5M20 12a8 8 0 01-13.7 5.6L4 15m0 5v-5h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  globe: <><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5z" fill="none" stroke="currentColor" strokeWidth="1.8" /></>,
}

export default function FeaturesThreeColumn({ heading, intro, features, align, accent, background, spacing }) {
  return (
    <section className="lp-section features-three-column" data-spacing={spacing} data-align={align} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container">
        <div className="ftc-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="ftc-list">
          {features.map((f) => (
            <li key={f.title}>
              <span className="ftc-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{icons[f.icon] ?? icons.bolt}</svg>
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              {f.linkLabel && (
                <a href={f.url}>
                  {f.linkLabel}
                  <span className="lp-sr-only"> about {f.title}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
