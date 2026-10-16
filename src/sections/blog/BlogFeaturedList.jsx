// The first post is featured with its image and excerpt; the rest form the list.
export default function BlogFeaturedList({ heading, posts, background, ink, accent, spacing, radius }) {
  const [featured, ...rest] = posts
  return (
    <section className="lp-section blog-featured-list" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <h2 className="bfl-heading">{heading}</h2>
        <div className="bfl-grid">
          <article className="bfl-featured">
            <a className="bfl-media" href={featured.url} tabIndex={-1} aria-hidden="true">
              <img src={featured.image} alt="" loading="lazy" />
            </a>
            <p className="bfl-cat">{featured.category}</p>
            <h3><a href={featured.url}>{featured.title}</a></h3>
            <p className="bfl-excerpt">{featured.excerpt}</p>
            <p className="bfl-meta">{featured.meta}</p>
          </article>
          <ul className="bfl-list">
            {rest.map((p) => (
              <li key={p.title}>
                <article>
                  <p className="bfl-cat">{p.category}</p>
                  <h3><a href={p.url}>{p.title}</a></h3>
                  <p className="bfl-meta">{p.meta}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
