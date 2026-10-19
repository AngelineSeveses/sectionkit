// Each card has its own Before/After switch made of two radio inputs, so it works without
// JavaScript and in the HTML export. "After" is shown first.
export default function PortfolioBeforeAfter({ heading, intro, projects, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section portfolio-before-after" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="pba-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="pba-grid">
          {projects.slice(0, 6).map((p, i) => (
            <li key={p.title} className="pba-card">
              <input className="pba-radio pba-r-before" type="radio" name={`pba-${i}`} id={`pba-${i}-b`} />
              <input className="pba-radio pba-r-after" type="radio" name={`pba-${i}`} id={`pba-${i}-a`} defaultChecked />
              <div className="pba-media">
                <img className="pba-before" src={p.before} alt={`Before: ${p.title}`} width="800" height="600" loading="lazy" />
                <img className="pba-after" src={p.after} alt={`After: ${p.title}`} width="800" height="600" loading="lazy" />
                <div className="pba-switch">
                  <label htmlFor={`pba-${i}-b`}>Before</label>
                  <label htmlFor={`pba-${i}-a`}>After</label>
                </div>
              </div>
              <div className="pba-info">
                <h3>{p.title}</h3>
                <p>{p.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <a className="lp-btn pba-cta" href={ctaUrl}>{ctaLabel}</a>
      </div>
    </section>
  )
}
