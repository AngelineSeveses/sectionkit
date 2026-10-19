// One client story told as a bento: photo headline, three colored result tiles and a quote.
export default function CaseStudyBento({ heading, client, headline, image, imageAlt, metrics, quote, quoteName, quoteRole, ctaLabel, ctaUrl, color1, color2, color3, background, radius, spacing }) {
  const tiles = metrics.slice(0, 3)
  return (
    <section className="lp-section case-study-bento" data-spacing={spacing} style={{ '--c1': color1, '--c2': color2, '--c3': color3, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <h2 className="csb-heading">{heading}</h2>
        <div className="csb-grid">
          <article className="csb-hero">
            <img src={image} alt={imageAlt} width="1200" height="900" loading="lazy" />
            <div className="csb-hero-text">
              <p className="csb-client">{client}</p>
              <h3>{headline}</h3>
              <a className="lp-btn csb-cta" href={ctaUrl}>{ctaLabel}</a>
            </div>
          </article>
          {tiles.map((m, i) => (
            <div key={m.label} className="csb-metric" data-tone={i + 1}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
          <figure className="csb-quote">
            <blockquote>{quote}</blockquote>
            <figcaption>
              <strong>{quoteName}</strong>
              <span>{quoteRole}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
