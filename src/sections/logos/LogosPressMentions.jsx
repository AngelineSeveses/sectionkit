// Outlet names are typeset as wordmarks so the section works without logo files.
export default function LogosPressMentions({ label, mentions, background, ink, accent, spacing }) {
  return (
    <section className="lp-section logos-press-mentions" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container">
        <p className="lpm-label">{label}</p>
        <ul className="lpm-list">
          {mentions.map((m) => (
            <li key={m.outlet}>
              <figure>
                <blockquote>
                  <p>{m.quote}</p>
                </blockquote>
                <figcaption>
                  <a className="lpm-outlet" data-face={m.face} href={m.url}>
                    {m.outlet}
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
