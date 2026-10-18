// Slides scroll with CSS scroll-snap; the numbered links jump to each slide by anchor, so no script is needed.
export default function TestimonialsCarousel({ eyebrow, heading, slides, accent, background, radius, spacing }) {
  return (
    <section className="lp-section testimonials-carousel" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="tcs-head">
          <div>
            <p className="tcs-eyebrow">{eyebrow}</p>
            <h2>{heading}</h2>
          </div>
          <nav className="tcs-dots" aria-label="Testimonials">
            {slides.map((s, i) => (
              <a key={s.name} href={`#tcs-${i + 1}`} aria-label={`Testimonial ${i + 1} of ${slides.length}: ${s.name}`}>
                {String(i + 1).padStart(2, '0')}
              </a>
            ))}
          </nav>
        </div>
        <ul className="tcs-track">
          {slides.map((s, i) => (
            <li key={s.name} id={`tcs-${i + 1}`} className="tcs-slide">
              <img src={s.photo} alt="" loading="lazy" />
              <figure>
                <blockquote>
                  <p>{s.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{s.name}</strong>
                  <span>{s.role}</span>
                </figcaption>
                {s.result && <p className="tcs-result">{s.result}</p>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
