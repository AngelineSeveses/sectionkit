export default function StatsSplitStory({ label, heading, body, linkLabel, linkUrl, stats, accent, background, spacing, radius }) {
  return (
    <section className="lp-section stats-split-story" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container sss-grid">
        <div className="sss-copy">
          <p className="sss-label">{label}</p>
          <h2>{heading}</h2>
          <p className="sss-body">{body}</p>
          {linkLabel && <a href={linkUrl}>{linkLabel}</a>}
        </div>
        <ul className="sss-stats">
          {stats.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
