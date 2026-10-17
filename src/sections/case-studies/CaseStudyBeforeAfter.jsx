export default function CaseStudyBeforeAfter({ label, title, summary, beforeImage, beforeAlt, afterImage, afterAlt, facts, quote, quoteName, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section case-study-before-after" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="csba-head">
          <p className="csba-label">{label}</p>
          <h2>{title}</h2>
          <p className="csba-summary">{summary}</p>
        </div>
        <div className="csba-pair">
          <figure>
            <img src={beforeImage} alt={beforeAlt} loading="lazy" />
            <figcaption data-kind="before">Before</figcaption>
          </figure>
          <figure>
            <img src={afterImage} alt={afterAlt} loading="lazy" />
            <figcaption data-kind="after">After</figcaption>
          </figure>
        </div>
        <div className="csba-foot">
          <dl className="csba-facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="csba-side">
            {quote && (
              <blockquote>
                <p>{quote}</p>
                <footer>{quoteName}</footer>
              </blockquote>
            )}
            <a className="lp-btn csba-cta" href={ctaUrl}>{ctaLabel}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
