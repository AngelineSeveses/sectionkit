// Thumbnails are labels for radio inputs, so the gallery works without JavaScript,
// including in the HTML export. Up to six images.
export default function PortfolioViewer({ heading, intro, projects, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  const items = projects.slice(0, 6)
  return (
    <section className="lp-section portfolio-viewer" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="pvw-head">
          <div>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
          <a className="lp-btn pvw-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <div className="pvw-gallery">
          {items.map((p, i) => (
            <input key={p.title} className="pvw-radio" type="radio" name="pvw-pick" id={`pvw-${i + 1}`} defaultChecked={i === 0} />
          ))}
          <div className="pvw-stage">
            {items.map((p, i) => (
              <figure key={p.title} className="pvw-slide" data-slot={i + 1}>
                <img src={p.image} alt={p.alt} width="1600" height="1000" loading={i === 0 ? 'eager' : 'lazy'} />
                <figcaption>
                  <strong>{p.title}</strong>
                  <span>{p.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="pvw-thumbs">
            {items.map((p, i) => (
              <label key={p.title} htmlFor={`pvw-${i + 1}`}>
                <img src={p.image} alt="" width="240" height="160" loading="lazy" />
                <span className="lp-sr-only">Show {p.title}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
