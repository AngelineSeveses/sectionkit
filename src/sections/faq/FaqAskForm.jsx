export default function FaqAskForm({ heading, intro, items, askTitle, askText, submitLabel, formAction, hours, phoneLabel, phoneHref, accent, background, radius, spacing }) {
  return (
    <section className="lp-section faq-ask-form" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container faf-grid">
        <div className="faf-main">
          <h2>{heading}</h2>
          <p className="faf-intro">{intro}</p>
          <div className="faf-list">
            {items.map((it) => (
              <details key={it.question}>
                <summary>
                  {it.question}
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p>{it.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <aside className="faf-aside">
          <form className="faf-form" action={formAction} method="post">
            <h3>{askTitle}</h3>
            <p>{askText}</p>
            <label>
              <span>Your question</span>
              <textarea name="question" rows={4} required />
            </label>
            <label>
              <span>Email for the answer</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <button className="lp-btn faf-submit" type="submit">{submitLabel}</button>
          </form>
          <div className="faf-call">
            <p>{hours}</p>
            <a href={phoneHref}>{phoneLabel}</a>
          </div>
        </aside>
      </div>
    </section>
  )
}
