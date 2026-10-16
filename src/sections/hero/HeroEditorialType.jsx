export default function HeroEditorialType({ studio, location, headlineTop, headlineBottom, intro, ctaLabel, ctaUrl, disciplines, availability, background, ink, spacing }) {
  return (
    <section className="lp-section hero-editorial-type" data-spacing={spacing} style={{ '--bg': background, '--ink': ink }}>
      <div className="lp-container het-inner">
        <div className="het-meta">
          <span>{studio}</span>
          <span>{location}</span>
          <span className="het-avail">
            <i aria-hidden="true" />
            {availability}
          </span>
        </div>
        <h1 className="het-title">
          <span className="het-line">{headlineTop}</span>
          <span className="het-line het-line-2">{headlineBottom}</span>
        </h1>
        <div className="het-foot">
          <p className="het-intro">{intro}</p>
          <ul className="het-disciplines" aria-label="Disciplines">
            {disciplines.map((d) => (
              <li key={d.name}>{d.name}</li>
            ))}
          </ul>
          <a className="het-cta" href={ctaUrl}>
            <span>{ctaLabel}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
