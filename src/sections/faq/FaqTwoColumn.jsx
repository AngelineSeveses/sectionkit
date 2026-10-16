export default function FaqTwoColumn({ heading, intro, items, cardTitle, cardText, phoneLabel, phoneHref, email, accent, background, spacing, radius }) {
  return (
    <section className="lp-section faq-two-column" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container ftc2-grid">
        <aside className="ftc2-side">
          <h2>{heading}</h2>
          <p className="ftc2-intro">{intro}</p>
          <div className="ftc2-card">
            <h3>{cardTitle}</h3>
            <p>{cardText}</p>
            <a className="ftc2-phone" href={phoneHref}>{phoneLabel}</a>
            <a className="ftc2-email" href={`mailto:${email}`}>{email}</a>
          </div>
        </aside>
        <div className="ftc2-list">
          {items.map((it) => (
            <details key={it.question}>
              <summary>{it.question}</summary>
              <p>{it.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
