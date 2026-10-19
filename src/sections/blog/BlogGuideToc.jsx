export default function BlogGuideToc({ kicker, title, summary, meta, coverTitle, coverSub, chapters, ctaLabel, ctaUrl, secondaryLabel, secondaryUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section blog-guide-toc" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container bgt-grid">
        <div className="bgt-cover" aria-hidden="true">
          <div className="bgt-book">
            <span className="bgt-book-kicker">{kicker}</span>
            <strong>{coverTitle}</strong>
            <span className="bgt-book-sub">{coverSub}</span>
          </div>
        </div>
        <div className="bgt-body">
          <p className="bgt-kicker">{kicker}</p>
          <h2>{title}</h2>
          <p className="bgt-summary">{summary}</p>
          <p className="bgt-meta">{meta}</p>
          <ol className="bgt-toc">
            {chapters.map((c, i) => (
              <li key={c.title}>
                <span className="bgt-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="bgt-title">{c.title}</span>
                <span className="bgt-time">{c.time}</span>
              </li>
            ))}
          </ol>
          <div className="bgt-actions">
            <a className="lp-btn bgt-cta" href={ctaUrl}>{ctaLabel}</a>
            {secondaryLabel && (
              <a className="bgt-alt" href={secondaryUrl}>
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
