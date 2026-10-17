// Tabs use radio inputs and CSS, so they also switch in the HTML export. Up to four tabs.
export default function FeaturesTabbed({ eyebrow, heading, intro, tabs, accent, background, radius, spacing }) {
  const items = tabs.slice(0, 4)
  return (
    <section className="lp-section features-tabbed" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="ftb-head">
          <p className="ftb-eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
          <p className="ftb-intro">{intro}</p>
        </div>
        <div className="ftb-wrap">
          {items.map((t, i) => (
            <input key={t.label} className="ftb-radio" type="radio" name="ftb-tab" id={`ftb-t${i + 1}`} defaultChecked={i === 0} />
          ))}
          <div className="ftb-tabs">
            {items.map((t, i) => (
              <label key={t.label} htmlFor={`ftb-t${i + 1}`}>
                <span className="ftb-num">{String(i + 1).padStart(2, '0')}</span>
                {t.label}
              </label>
            ))}
          </div>
          <div className="ftb-panels">
            {items.map((t, i) => (
              <article key={t.label} className="ftb-panel" data-slot={i + 1}>
                <div className="ftb-text">
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                  <ul>
                    {t.points.split(';').map((p) => (
                      <li key={p}>{p.trim()}</li>
                    ))}
                  </ul>
                </div>
                <img src={t.image} alt={t.imageAlt} width="720" height="540" loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
