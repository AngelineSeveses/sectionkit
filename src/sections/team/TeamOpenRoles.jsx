export default function TeamOpenRoles({ label, heading, intro, perks, roles, noteText, noteLinkLabel, noteLinkUrl, accent, background, spacing }) {
  return (
    <section className="lp-section team-open-roles" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container tor-grid">
        <div className="tor-intro">
          <p className="tor-label">{label}</p>
          <h2>{heading}</h2>
          <p className="tor-text">{intro}</p>
          <ul className="tor-perks">
            {perks.split(';').map((p) => (
              <li key={p}>{p.trim()}</li>
            ))}
          </ul>
        </div>
        <div className="tor-roles">
          <p className="tor-count">
            {roles.length} open {roles.length === 1 ? 'role' : 'roles'}
          </p>
          <ul>
            {roles.map((r) => (
              <li key={r.title}>
                <a className="tor-role" href={r.url}>
                  <span className="tor-title">{r.title}</span>
                  <span className="tor-meta">
                    <span>{r.team}</span>
                    <span>{r.location}</span>
                    <span>{r.type}</span>
                    {r.pay && <span>{r.pay}</span>}
                  </span>
                  <span className="tor-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {noteText && (
            <p className="tor-note">
              {noteText} <a href={noteLinkUrl}>{noteLinkLabel}</a>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
