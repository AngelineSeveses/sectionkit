export default function CtaTwoPaths({ heading, paths, accent, background, spacing, radius }) {
  return (
    <section className="lp-section cta-two-paths" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        {heading && <h2 className="ctp-heading">{heading}</h2>}
        <div className="ctp-grid">
          {paths.slice(0, 2).map((p, i) => (
            <article key={p.title} className="ctp-card" data-primary={i === 0}>
              <p className="ctp-for">{p.audience}</p>
              <h3>{p.title}</h3>
              <p className="ctp-text">{p.text}</p>
              <a className="lp-btn ctp-cta" href={p.url}>{p.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
