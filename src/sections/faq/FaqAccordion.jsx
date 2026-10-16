export default function FaqAccordion({ heading, intro, items, openFirst, contactLabel, contactUrl, accent, background, spacing }) {
  return (
    <section className="lp-section faq-accordion" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container fqa-inner">
        <div className="fqa-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="fqa-list">
          {items.map((it, i) => (
            <details key={it.question} className="fqa-item" open={openFirst && i === 0}>
              <summary>
                <span>{it.question}</span>
                <span className="fqa-icon" aria-hidden="true" />
              </summary>
              <div className="fqa-answer">
                <p>{it.answer}</p>
              </div>
            </details>
          ))}
        </div>
        {contactLabel && (
          <p className="fqa-contact">
            Still have a question? <a href={contactUrl}>{contactLabel}</a>
          </p>
        )}
      </div>
    </section>
  )
}
