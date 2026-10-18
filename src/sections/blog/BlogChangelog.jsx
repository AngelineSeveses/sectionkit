export default function BlogChangelog({ heading, intro, subscribeLabel, subscribeUrl, entries, allLabel, allUrl, accent, background, spacing }) {
  return (
    <section className="lp-section blog-changelog" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container bcl-grid">
        <div className="bcl-side">
          <h2>{heading}</h2>
          <p>{intro}</p>
          <a className="bcl-subscribe" href={subscribeUrl}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 3a10 10 0 0 1 10 10M3 7a6 6 0 0 1 6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="3.5" cy="12.5" r="1.3" fill="currentColor" />
            </svg>
            {subscribeLabel}
          </a>
        </div>
        <div className="bcl-entries">
          {entries.map((e) => (
            <article key={`${e.date}-${e.title}`} className="bcl-entry">
              <p className="bcl-meta">
                <time>{e.date}</time>
                {e.version && <span className="bcl-version">{e.version}</span>}
              </p>
              <div className="bcl-body">
                <p className="bcl-tag" data-kind={e.kind}>
                  {e.kind}
                </p>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
                {e.linkLabel && (
                  <a href={e.url}>
                    {e.linkLabel} <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
          <a className="bcl-all" href={allUrl}>
            {allLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
