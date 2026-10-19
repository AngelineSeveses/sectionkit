// Covers are typographic and colored per category, so posts look designed without photos.
export default function BlogTypeCovers({ heading, intro, posts, allLabel, allUrl, background, radius, spacing }) {
  return (
    <section className="lp-section blog-type-covers" data-spacing={spacing} style={{ '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="btc-head">
          <div>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
          <a className="btc-all" href={allUrl}>
            {allLabel}
          </a>
        </div>
        <ul className="btc-grid">
          {posts.map((p, i) => (
            <li key={p.title} style={{ '--tone': p.color }} data-shape={(i % 3) + 1}>
              <a href={p.url}>
                <div className="btc-cover" aria-hidden="true">
                  <span className="btc-shape" />
                  <span className="btc-cover-cat">{p.category}</span>
                  <span className="btc-cover-word">{p.coverWord}</span>
                </div>
                <div className="btc-body">
                  <p className="btc-meta">
                    <span className="btc-cat">{p.category}</span>
                    <span>{p.readTime}</span>
                  </p>
                  <h3>{p.title}</h3>
                  <p className="btc-excerpt">{p.excerpt}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
