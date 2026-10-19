// Benefits that differ by country (retirement plans, health coverage) get a separate
// line for each, so neither group of employees is shown the other's benefit.
export default function TeamBenefits({ heading, intro, benefits, ctaLabel, ctaUrl, note, accent, background, radius, spacing }) {
  return (
    <section className="lp-section team-benefits" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="tbn-head">
          <h2>{heading}</h2>
          <div>
            <p>{intro}</p>
            <a className="lp-btn tbn-cta" href={ctaUrl}>{ctaLabel}</a>
          </div>
        </div>
        <ul className="tbn-grid">
          {benefits.map((b) => (
            <li key={b.title}>
              <p className="tbn-figure">{b.figure}</p>
              <h3>{b.title}</h3>
              <p className="tbn-text">{b.text}</p>
              {(b.us || b.ca) && (
                <dl className="tbn-regions">
                  {b.us && (
                    <div>
                      <dt>US</dt>
                      <dd>{b.us}</dd>
                    </div>
                  )}
                  {b.ca && (
                    <div>
                      <dt>Canada</dt>
                      <dd>{b.ca}</dd>
                    </div>
                  )}
                </dl>
              )}
            </li>
          ))}
        </ul>
        {note && <p className="tbn-note">{note}</p>}
      </div>
    </section>
  )
}
