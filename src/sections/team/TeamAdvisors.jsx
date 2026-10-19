export default function TeamAdvisors({ heading, intro, people, bookPrefix, accent, background, radius, spacing }) {
  return (
    <section className="lp-section team-advisors" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="tad-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="tad-grid">
          {people.map((p) => {
            const first = p.name.split(/[ ,]/)[0]
            return (
              <li key={p.name}>
                <div className="tad-top">
                  <img src={p.photo} alt="" width="160" height="160" loading="lazy" />
                  <div>
                    <h3>{p.name}</h3>
                    <p className="tad-cred">{p.credential}</p>
                  </div>
                </div>
                <dl className="tad-facts">
                  <div>
                    <dt>Focus</dt>
                    <dd>{p.focus}</dd>
                  </div>
                  <div>
                    <dt>Languages</dt>
                    <dd>{p.languages}</dd>
                  </div>
                  <div>
                    <dt>Office</dt>
                    <dd>{p.office}</dd>
                  </div>
                </dl>
                <a className="lp-btn tad-book" href={p.url}>
                  {bookPrefix} {first}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
