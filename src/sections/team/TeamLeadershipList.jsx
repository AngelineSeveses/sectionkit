export default function TeamLeadershipList({ label, heading, intro, people, accent, background, radius, spacing }) {
  return (
    <section className="lp-section team-leadership-list" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container tll-grid">
        <div className="tll-head">
          <p className="tll-label">{label}</p>
          <h2>{heading}</h2>
          <p className="tll-intro">{intro}</p>
        </div>
        <ul className="tll-list">
          {people.map((p) => (
            <li key={p.name} className="tll-person">
              <img src={p.photo} alt="" width="96" height="96" loading="lazy" />
              <div className="tll-body">
                <h3>{p.name}</h3>
                <p className="tll-role">{p.role}</p>
                {p.credentials && <p className="tll-creds">{p.credentials}</p>}
                <details>
                  <summary>
                    <span className="tll-more">Read bio</span>
                    <span className="tll-less">Hide bio</span>
                    <span className="lp-sr-only"> for {p.name}</span>
                  </summary>
                  <p>{p.bio}</p>
                </details>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
