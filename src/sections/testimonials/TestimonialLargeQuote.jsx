export default function TestimonialLargeQuote({ quote, name, role, company, photo, resultValue, resultLabel, linkLabel, linkUrl, background, ink, accent, spacing }) {
  return (
    <section className="lp-section testimonial-large-quote" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container tlq-inner">
        <figure className="tlq-figure">
          <blockquote>
            <p>{quote}</p>
          </blockquote>
          <figcaption>
            <img src={photo} alt="" width="64" height="64" loading="lazy" />
            <span className="tlq-who">
              <strong>{name}</strong>
              {role}, {company}
            </span>
            {resultValue && (
              <span className="tlq-result">
                <strong>{resultValue}</strong>
                {resultLabel}
              </span>
            )}
          </figcaption>
        </figure>
        {linkLabel && (
          <a className="tlq-link" href={linkUrl}>
            {linkLabel}
          </a>
        )}
      </div>
    </section>
  )
}
