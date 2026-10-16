export default function FeaturesDarkSpotlight({ heading, intro, spotlightTitle, spotlightText, spotlightLinkLabel, spotlightUrl, items, accent, background, spacing, radius }) {
  return (
    <section className="lp-section features-dark-spotlight" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="fds-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="fds-grid">
          <article className="fds-spot">
            <div className="fds-spot-copy">
              <h3>{spotlightTitle}</h3>
              <p>{spotlightText}</p>
              <a href={spotlightUrl}>{spotlightLinkLabel}</a>
            </div>
            <div className="fds-terminal" aria-hidden="true">
              <div className="fds-term-bar"><i /><i /><i /><span>deploy.log</span></div>
              <pre>
                <span className="dim">$</span> ship deploy --env production{'\n'}
                <span className="dim">→</span> Building 14 services…{'\n'}
                <span className="ok">✓</span> api          <span className="dim">  1.8s</span>{'\n'}
                <span className="ok">✓</span> web          <span className="dim">  4.2s</span>{'\n'}
                <span className="ok">✓</span> workers      <span className="dim">  2.1s</span>{'\n'}
                <span className="dim">→</span> Health checks passing in us-east, ca-central{'\n'}
                <span className="ok">✓</span> Live in 38s. Rollback ready.
              </pre>
            </div>
          </article>
          <ul className="fds-items">
            {items.map((it) => (
              <li key={it.title}>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
