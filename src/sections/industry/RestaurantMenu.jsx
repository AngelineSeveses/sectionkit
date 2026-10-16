export default function RestaurantMenu({ heading, subhead, sections, legend, reserveLabel, reserveUrl, background, ink, accent, spacing }) {
  return (
    <section className="lp-section restaurant-menu" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container">
        <header className="rm-head">
          <h2>{heading}</h2>
          <p>{subhead}</p>
        </header>
        <div className="rm-sections">
          {sections.map((s) => (
            <section key={s.title} className="rm-section" aria-label={s.title}>
              <h3>{s.title}</h3>
              <ul>
                {s.items.split(';').map((line) => {
                  const [name, price, desc, tags] = line.split('|').map((x) => x?.trim())
                  return (
                    <li key={name}>
                      <div className="rm-line">
                        <span className="rm-name">
                          {name}
                          {tags && (
                            <span className="rm-tags">
                              {tags.split(' ').map((t) => (
                                <abbr key={t} title={t === 'V' ? 'Vegetarian' : t === 'VG' ? 'Vegan' : t === 'GF' ? 'Gluten free' : t}>{t}</abbr>
                              ))}
                            </span>
                          )}
                        </span>
                        <span className="rm-dots" aria-hidden="true" />
                        <span className="rm-price">{price}</span>
                      </div>
                      {desc && <p>{desc}</p>}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
        <footer className="rm-foot">
          <p>{legend}</p>
          <a href={reserveUrl}>{reserveLabel}</a>
        </footer>
      </div>
    </section>
  )
}
