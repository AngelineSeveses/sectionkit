export default function TestimonialsMasonry({ heading, subhead, quotes, highlightFirst, accent, background, spacing, radius }) {
  return (
    <section className="lp-section testimonials-masonry" data-spacing={spacing} data-highlight={highlightFirst} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="tm-head">
          <h2>{heading}</h2>
          <p>{subhead}</p>
        </div>
        <ul className="tm-wall">
          {quotes.map((q) => (
            <li key={q.name}>
              <figure>
                <blockquote>
                  <p>{q.quote}</p>
                </blockquote>
                <figcaption>
                  <img src={q.photo} alt="" width="36" height="36" loading="lazy" />
                  <span>
                    <strong>{q.name}</strong>
                    {q.role}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
