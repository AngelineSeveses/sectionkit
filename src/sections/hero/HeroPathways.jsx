export default function HeroPathways({ headline, subhead, paths, footnote, accent, background, spacing, radius }) {
  return (
    <section className="lp-section hero-pathways" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="hpw-head">
          <h1 className="hpw-title">{headline}</h1>
          <p className="hpw-sub">{subhead}</p>
        </div>
        <ul className="hpw-paths">
          {paths.map((p) => (
            <li key={p.title}>
              <a className="hpw-path" href={p.url}>
                <span className="hpw-audience">{p.audience}</span>
                <span className="hpw-path-title">{p.title}</span>
                <span className="hpw-path-desc">{p.description}</span>
                <span className="hpw-go">
                  {p.action}
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
        {footnote && <p className="hpw-foot">{footnote}</p>}
      </div>
    </section>
  )
}
