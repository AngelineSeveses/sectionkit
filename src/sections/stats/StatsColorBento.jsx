// The first stat is the large tile; up to four more fill the grid around it.
export default function StatsColorBento({ heading, intro, stats, source, background, radius, spacing }) {
  const items = stats.slice(0, 5)
  return (
    <section className="lp-section stats-color-bento" data-spacing={spacing} style={{ '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="scb-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <dl className="scb-grid">
          {items.map((s, i) => (
            <div key={s.label} className={i === 0 ? 'scb-tile scb-big' : 'scb-tile'} style={{ '--tone': s.color }}>
              <dt>{s.label}</dt>
              <dd>
                <strong>{s.value}</strong>
                {s.detail && <span>{s.detail}</span>}
              </dd>
            </div>
          ))}
        </dl>
        {source && <p className="scb-source">{source}</p>}
      </div>
    </section>
  )
}
