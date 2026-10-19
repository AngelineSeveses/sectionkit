export default function TeamTechnicians({ heading, intro, badge, techs, accent, background, radius, spacing }) {
  return (
    <section className="lp-section team-technicians" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="ttc-head">
          <div>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
          {badge && (
            <p className="ttc-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3l7 3v6c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-3Zm-3 9l2 2 4-4" />
              </svg>
              {badge}
            </p>
          )}
        </div>
        <ul className="ttc-grid">
          {techs.map((t) => (
            <li key={t.name}>
              <div className="ttc-photo">
                <img src={t.photo} alt={`${t.name}, ${t.role}`} width="480" height="520" loading="lazy" />
                <span className="ttc-years">{t.years}</span>
              </div>
              <div className="ttc-body">
                <h3>{t.name}</h3>
                <p className="ttc-role">{t.role}</p>
                <ul className="ttc-certs">
                  {String(t.certs)
                    .split(';')
                    .map((c) => c.trim())
                    .filter(Boolean)
                    .map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                </ul>
                <p className="ttc-quote">“{t.quote}”</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
