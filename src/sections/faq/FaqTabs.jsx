// Topic tabs use radio inputs and CSS, so they also work in the HTML export. Up to four
// topics; each question names its topic by number.
export default function FaqTabs({ heading, intro, topics, items, contactText, contactLabel, contactUrl, accent, background, radius, spacing }) {
  const tabs = topics.slice(0, 4)
  const topicOf = (it) => Math.min(Math.max(1, Number(it.topic) || 1), tabs.length)
  return (
    <section className="lp-section faq-tabs" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="fqt-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="fqt-wrap">
          {tabs.map((t, i) => (
            <input key={t.label} className="fqt-radio" type="radio" name="fqt-topic" id={`fqt-${i + 1}`} defaultChecked={i === 0} />
          ))}
          <div className="fqt-tabs" role="group" aria-label="Question topics">
            {tabs.map((t, i) => (
              <label key={t.label} htmlFor={`fqt-${i + 1}`}>
                {t.label}
                <span>{items.filter((it) => topicOf(it) === i + 1).length}</span>
              </label>
            ))}
          </div>
          {tabs.map((t, i) => (
            <div key={t.label} className="fqt-panel" data-slot={i + 1}>
              <h3 className="lp-sr-only">{t.label}</h3>
              {items
                .filter((it) => topicOf(it) === i + 1)
                .map((it) => (
                  <details key={it.question} className="fqt-item">
                    <summary>
                      <span>{it.question}</span>
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <p>{it.answer}</p>
                  </details>
                ))}
            </div>
          ))}
        </div>
        <p className="fqt-contact">
          {contactText} <a href={contactUrl}>{contactLabel}</a>
        </p>
      </div>
    </section>
  )
}
