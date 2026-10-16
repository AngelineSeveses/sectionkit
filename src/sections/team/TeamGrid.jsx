export default function TeamGrid({ heading, intro, members, hiringLabel, hiringUrl, accent, background, spacing, radius }) {
  return (
    <section className="lp-section team-grid" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="tmg-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="tmg-list">
          {members.map((m) => (
            <li key={m.name}>
              <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" />
              <h3>{m.name}</h3>
              <p className="tmg-role">{m.role}</p>
              <p className="tmg-bio">{m.bio}</p>
              {m.profileUrl && m.profileUrl !== '#' && (
                <a href={m.profileUrl} className="tmg-link">
                  Profile<span className="lp-sr-only"> of {m.name}</span>
                </a>
              )}
            </li>
          ))}
          {hiringLabel && (
            <li className="tmg-hiring">
              <a href={hiringUrl}>
                <span>{hiringLabel}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}
