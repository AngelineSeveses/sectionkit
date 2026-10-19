// The featured article is a one-item list so it can be edited like the others.
export default function BlogMagazine({ heading, feature, popularTitle, popular, newsTitle, newsText, formAction, accent, background, radius, spacing }) {
  const f = feature[0] ?? {}
  return (
    <section className="lp-section blog-magazine" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <h2 className="bmg-heading">{heading}</h2>
        <div className="bmg-grid">
          <article className="bmg-feature">
            <a href={f.url}>
              <img src={f.image} alt="" width="1200" height="720" loading="lazy" />
              <p className="bmg-meta">
                <span>{f.category}</span> {f.readTime}
              </p>
              <h3>{f.title}</h3>
              <p className="bmg-excerpt">{f.excerpt}</p>
            </a>
          </article>
          <aside className="bmg-side">
            <h3 className="bmg-side-title">{popularTitle}</h3>
            <ol className="bmg-popular">
              {popular.map((p, i) => (
                <li key={p.title}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <a href={p.url}>
                    {p.title}
                    <small>{p.readTime}</small>
                  </a>
                </li>
              ))}
            </ol>
            <form className="bmg-news" action={formAction} method="post">
              <p className="bmg-news-title">{newsTitle}</p>
              <p>{newsText}</p>
              <label className="lp-sr-only" htmlFor="bmg-email">
                Email address
              </label>
              <input id="bmg-email" type="email" name="email" autoComplete="email" placeholder="Email address" required />
              <button className="lp-btn" type="submit">Subscribe</button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  )
}
