// Written in the visitor's voice: each card starts with the doubt as they would think it.
export default function FaqObjections({ heading, intro, items, ctaHeading, ctaLabel, ctaUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section faq-objections" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="fob-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="fob-grid">
          {items.map((it) => (
            <li key={it.doubt}>
              <h3>
                <span aria-hidden="true">“</span>
                {it.doubt}
                <span aria-hidden="true">”</span>
              </h3>
              <p>{it.answer}</p>
              {it.proof && <p className="fob-proof">{it.proof}</p>}
            </li>
          ))}
          <li className="fob-cta">
            <p>{ctaHeading}</p>
            <a className="lp-btn" href={ctaUrl}>{ctaLabel}</a>
          </li>
        </ul>
      </div>
    </section>
  )
}
