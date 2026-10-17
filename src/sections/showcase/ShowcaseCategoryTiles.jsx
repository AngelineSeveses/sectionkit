export default function ShowcaseCategoryTiles({ heading, linkLabel, linkUrl, categories, accent, background, radius, spacing }) {
  return (
    <section className="lp-section showcase-category-tiles" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="sct-head">
          <h2>{heading}</h2>
          <a href={linkUrl}>
            {linkLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <ul className="sct-grid" data-count={categories.length}>
          {categories.map((c) => (
            <li key={c.name}>
              <a className="sct-tile" href={c.url}>
                <img src={c.image} alt="" loading="lazy" />
                <span className="sct-label">
                  <strong>{c.name}</strong>
                  <span>{c.caption}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
