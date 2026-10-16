export default function BlogCards({ heading, viewAllLabel, viewAllUrl, posts, accent, background, spacing, radius }) {
  return (
    <section className="lp-section blog-cards" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="bc-head">
          <h2>{heading}</h2>
          <a href={viewAllUrl}>{viewAllLabel}</a>
        </div>
        <ul className="bc-list">
          {posts.map((p) => (
            <li key={p.title}>
              <article className="bc-card">
                <a className="bc-media" href={p.url} tabIndex={-1} aria-hidden="true">
                  <img src={p.image} alt="" loading="lazy" />
                </a>
                <p className="bc-meta">
                  <span className="bc-cat">{p.category}</span>
                  <span>{p.readTime}</span>
                </p>
                <h3><a href={p.url}>{p.title}</a></h3>
                <p className="bc-excerpt">{p.excerpt}</p>
                <p className="bc-author">
                  {p.author} <time>{p.date}</time>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
