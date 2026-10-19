// Portraits sit on circles that rotate through the team's colors.
export default function TeamColorPortraits({ heading, intro, people, ctaText, ctaLabel, ctaUrl, color1, color2, color3, color4, background, spacing }) {
  return (
    <section className="lp-section team-color-portraits" data-spacing={spacing} style={{ '--c1': color1, '--c2': color2, '--c3': color3, '--c4': color4, '--bg': background }}>
      <div className="lp-container">
        <div className="tcp-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="tcp-grid">
          {people.map((p, i) => (
            <li key={p.name} data-tone={(i % 4) + 1}>
              <div className="tcp-photo">
                <img src={p.photo} alt="" width="320" height="320" loading="lazy" />
              </div>
              <h3>{p.name}</h3>
              <p className="tcp-role">{p.role}</p>
              <p className="tcp-fact">{p.fact}</p>
            </li>
          ))}
        </ul>
        <div className="tcp-cta">
          <p>{ctaText}</p>
          <a className="lp-btn" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
