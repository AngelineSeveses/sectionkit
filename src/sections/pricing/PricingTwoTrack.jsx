function Track({ t, dark }) {
  const features = t.features.split(';').map((x) => x.trim()).filter(Boolean)
  return (
    <article className={dark ? 'p2t-card p2t-enterprise' : 'p2t-card'}>
      <p className="p2t-name">{t.name}</p>
      <p className="p2t-price">
        <strong>{t.price}</strong>
        <span>{t.unit}</span>
      </p>
      <p className="p2t-desc">{t.description}</p>
      <ul>
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <a className="lp-btn p2t-cta" href={t.url}>{t.cta}</a>
    </article>
  )
}

export default function PricingTwoTrack({ heading, tracks, logosLabel, logos, accent, background, spacing, radius }) {
  return (
    <section className="lp-section pricing-two-track" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <h2 className="p2t-heading">{heading}</h2>
        <div className="p2t-grid">
          {tracks.slice(0, 2).map((t, i) => (
            <Track key={t.name} t={t} dark={i === 1} />
          ))}
        </div>
        <div className="p2t-logos">
          <p>{logosLabel}</p>
          <ul>
            {logos.split(',').map((l) => (
              <li key={l}>{l.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
