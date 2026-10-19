export default function FaqColorPanel({ heading, intro, items, contactTitle, contactText, chatLabel, chatUrl, phoneLabel, phoneHref, accent, accent2, background, radius, spacing }) {
  return (
    <section className="lp-section faq-color-panel" data-spacing={spacing} style={{ '--accent': accent, '--accent2': accent2, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container fcp-grid">
        <aside className="fcp-panel">
          <h2>{heading}</h2>
          <p className="fcp-intro">{intro}</p>
          <div className="fcp-contact">
            <p className="fcp-contact-title">{contactTitle}</p>
            <p>{contactText}</p>
            <div className="fcp-actions">
              <a className="lp-btn fcp-chat" href={chatUrl}>{chatLabel}</a>
              <a className="fcp-phone" href={phoneHref}>{phoneLabel}</a>
            </div>
          </div>
        </aside>
        <div className="fcp-list">
          {items.map((it, i) => (
            <details key={it.question} className="fcp-item" open={i === 0}>
              <summary>
                <span>{it.question}</span>
                <span className="fcp-icon" aria-hidden="true" />
              </summary>
              <p>{it.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
