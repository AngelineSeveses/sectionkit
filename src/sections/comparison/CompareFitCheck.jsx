const lines = (s) =>
  String(s)
    .split(';')
    .map((x) => x.trim())
    .filter(Boolean)

export default function CompareFitCheck({ heading, intro, fitTitle, fitItems, notFitTitle, notFitItems, altText, altLabel, altUrl, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section compare-fit-check" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cfc-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="cfc-grid">
          <div className="cfc-col cfc-fit">
            <h3>{fitTitle}</h3>
            <ul>
              {lines(fitItems).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a className="lp-btn cfc-cta" href={ctaUrl}>{ctaLabel}</a>
          </div>
          <div className="cfc-col cfc-notfit">
            <h3>{notFitTitle}</h3>
            <ul>
              {lines(notFitItems).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {altText && (
              <p className="cfc-alt">
                {altText}{' '}
                {altLabel && <a href={altUrl}>{altLabel}</a>}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
