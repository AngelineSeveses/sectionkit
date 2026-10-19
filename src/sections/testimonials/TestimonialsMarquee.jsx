// Each row is rendered twice so the CSS loop is seamless; the copy is hidden from assistive tech.
// Rows pause on hover and stop moving entirely for visitors who prefer reduced motion.
function Row({ items, reverse, offset }) {
  const cards = (hidden) =>
    items.map((r, i) => (
      <li key={`${hidden ? 'b' : 'a'}-${r.name}`} aria-hidden={hidden || undefined} data-tone={((i + offset) % 4) + 1}>
        <p className="tmq-stars" role={hidden ? undefined : 'img'} aria-label={hidden ? undefined : '5 out of 5 stars'}>
          ★★★★★
        </p>
        <blockquote>{r.quote}</blockquote>
        <p className="tmq-who">
          <strong>{r.name}</strong>
          <span>{r.detail}</span>
        </p>
      </li>
    ))
  return (
    <div className="tmq-row" data-reverse={reverse}>
      <ul className="tmq-track">
        {cards(false)}
        {cards(true)}
      </ul>
    </div>
  )
}

export default function TestimonialsMarquee({ heading, rating, ratingNote, rowOne, rowTwo, speed, color1, color2, color3, color4, background, spacing }) {
  return (
    <section className="lp-section testimonials-marquee" data-spacing={spacing} style={{ '--bg': background, '--c1': color1, '--c2': color2, '--c3': color3, '--c4': color4, '--duration': `${speed}s` }}>
      <div className="lp-container tmq-head">
        <h2>{heading}</h2>
        <p className="tmq-score">
          <strong>{rating}</strong>
          <span>
            <span className="tmq-stars-lg" aria-hidden="true">★★★★★</span>
            {ratingNote}
          </span>
        </p>
      </div>
      <Row items={rowOne} reverse={false} offset={0} />
      {rowTwo.length > 0 && <Row items={rowTwo} reverse offset={2} />}
    </section>
  )
}
