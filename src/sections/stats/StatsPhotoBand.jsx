export default function StatsPhotoBand({ heading, stats, image, overlay, accent, spacing }) {
  return (
    <section className="lp-section stats-photo-band" data-spacing={spacing} style={{ '--accent': accent, '--overlay': overlay }}>
      <img className="spb-bg" src={image} alt="" width="1920" height="900" loading="lazy" />
      <div className="lp-container spb-inner">
        <h2>{heading}</h2>
        <dl className="spb-stats">
          {stats.slice(0, 4).map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
