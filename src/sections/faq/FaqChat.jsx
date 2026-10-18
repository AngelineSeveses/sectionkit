export default function FaqChat({ heading, intro, agentName, agentPhoto, agentStatus, items, composeText, ctaLabel, ctaUrl, accent, background, spacing }) {
  return (
    <section className="lp-section faq-chat" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container fch-inner">
        <div className="fch-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="fch-window">
          <div className="fch-bar">
            <img src={agentPhoto} alt="" width="40" height="40" loading="lazy" />
            <p>
              <strong>{agentName}</strong>
              <span>
                <i aria-hidden="true" />
                {agentStatus}
              </span>
            </p>
          </div>
          <dl className="fch-thread">
            {items.map((it) => (
              <div key={it.question} className="fch-pair">
                <dt>
                  <span className="lp-sr-only">Question: </span>
                  {it.question}
                </dt>
                <dd>
                  <span className="lp-sr-only">Answer: </span>
                  {it.answer}
                </dd>
              </div>
            ))}
          </dl>
          <div className="fch-compose">
            <span>{composeText}</span>
            <a className="lp-btn fch-cta" href={ctaUrl}>{ctaLabel}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
