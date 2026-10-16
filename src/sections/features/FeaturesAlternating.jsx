export default function FeaturesAlternating({ heading, rows, startSide, accent, background, spacing, radius }) {
  return (
    <section className="lp-section features-alternating" data-spacing={spacing} data-start={startSide} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        {heading && <h2 className="fa-heading">{heading}</h2>}
        <div className="fa-rows">
          {rows.map((r, i) => (
            <article className="fa-row" key={r.title} data-flip={i % 2 === 1}>
              <figure className="fa-media">
                <img src={r.image} alt={r.imageAlt} loading="lazy" />
              </figure>
              <div className="fa-copy">
                <p className="fa-label">{r.label}</p>
                <h3>{r.title}</h3>
                <p className="fa-text">{r.text}</p>
                {r.points && (
                  <ul>
                    {r.points.split(';').map((p) => (
                      <li key={p}>{p.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
