export default function CaseStudyStory({ kicker, title, image, imageAlt, facts, chapters, quote, quoteName, quoteRole, results, ctaLabel, ctaUrl, accent, background, spacing }) {
  const [first, ...rest] = chapters
  return (
    <section className="lp-section case-study-story" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container">
        <header className="css-head">
          <p className="css-kicker">{kicker}</p>
          <h2>{title}</h2>
        </header>
        <figure className="css-photo">
          <img src={image} alt={imageAlt} width="1600" height="800" loading="lazy" />
        </figure>
        <div className="css-body">
          <aside className="css-aside">
            <dl className="css-facts">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <dl className="css-results">
              {results.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            <a className="lp-btn css-cta" href={ctaUrl}>{ctaLabel}</a>
          </aside>
          <div className="css-story">
            {first && (
              <section className="css-chapter">
                <h3>{first.heading}</h3>
                <p>{first.text}</p>
              </section>
            )}
            <blockquote className="css-quote">
              <p>{quote}</p>
              <footer>
                <strong>{quoteName}</strong>
                <span>{quoteRole}</span>
              </footer>
            </blockquote>
            {rest.map((c) => (
              <section key={c.heading} className="css-chapter">
                <h3>{c.heading}</h3>
                <p>{c.text}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
