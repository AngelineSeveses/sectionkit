// Region filter uses radio inputs and CSS, so it works without JavaScript. Up to five regions;
// each location names its region by number (1–5).
export default function ContactRegionFilter({ heading, intro, regions, locations, accent, background, radius, spacing }) {
  const tabs = regions.slice(0, 5)
  const regionOf = (l) => Math.min(Math.max(1, Number(l.region) || 1), tabs.length)
  return (
    <section className="lp-section contact-region-filter" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="clc-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="clc-wrap">
          <input className="clc-radio" type="radio" name="clc-region" id="clc-0" defaultChecked />
          {tabs.map((t, i) => (
            <input key={t.name} className="clc-radio" type="radio" name="clc-region" id={`clc-${i + 1}`} />
          ))}
          <div className="clc-filters" role="group" aria-label="Filter by region">
            <label htmlFor="clc-0">All ({locations.length})</label>
            {tabs.map((t, i) => (
              <label key={t.name} htmlFor={`clc-${i + 1}`}>
                {t.name}
              </label>
            ))}
          </div>
          <ul className="clc-list">
            {locations.map((l) => (
              <li key={l.name} data-region={regionOf(l)}>
                <div className="clc-top">
                  <h3>{l.name}</h3>
                  <span className="clc-tag">{tabs[regionOf(l) - 1]?.name}</span>
                </div>
                <p className="clc-addr">{l.address}</p>
                <p className="clc-hours">{l.hours}</p>
                <div className="clc-actions">
                  <a className="lp-btn clc-call" href={l.phoneHref}>{l.phone}</a>
                  <a className="clc-dir" href={l.mapUrl}>
                    Directions
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
