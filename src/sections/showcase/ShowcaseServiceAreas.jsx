// Each city links to its own page (/areas/city-name by default), the structure local search
// relies on. Cities are typed as a comma-separated list per region.
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function ShowcaseServiceAreas({ heading, intro, regions, basePath, asideTitle, asideText, phoneLabel, phoneHref, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  const base = /^\/[a-z0-9/-]*$/i.test(basePath) ? basePath.replace(/\/$/, '') : '/areas'
  return (
    <section className="lp-section showcase-service-areas" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container ssa-grid">
        <div className="ssa-main">
          <h2>{heading}</h2>
          <p className="ssa-intro">{intro}</p>
          <div className="ssa-regions">
            {regions.map((r) => (
              <div key={r.name} className="ssa-region">
                <h3>{r.name}</h3>
                <ul>
                  {String(r.cities)
                    .split(',')
                    .map((c) => c.trim())
                    .filter(Boolean)
                    .map((c) => (
                      <li key={c}>
                        <a href={`${base}/${slug(c)}`}>{c}</a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <aside className="ssa-aside">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-7-6.3-7-11.5a7 7 0 0 1 14 0C19 14.7 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          <h3>{asideTitle}</h3>
          <p>{asideText}</p>
          <a className="ssa-phone" href={phoneHref}>{phoneLabel}</a>
          <a className="lp-btn ssa-cta" href={ctaUrl}>{ctaLabel}</a>
        </aside>
      </div>
    </section>
  )
}
