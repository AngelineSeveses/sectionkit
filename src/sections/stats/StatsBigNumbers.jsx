export default function StatsBigNumbers({ heading, stats, source, background, ink, accent, spacing }) {
  return (
    <section className="lp-section stats-big-numbers" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container">
        {heading && <h2 className="sbn-heading">{heading}</h2>}
        <dl className="sbn-list">
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>
                <strong>{s.value}</strong>
                {s.context && <span>{s.context}</span>}
              </dd>
            </div>
          ))}
        </dl>
        {source && <p className="sbn-source">{source}</p>}
      </div>
    </section>
  )
}
