function Spec({ s }) {
  return (
    <li>
      <strong>{s.value}</strong>
      <span className="pss-spec-title">{s.title}</span>
      <span className="pss-spec-text">{s.text}</span>
    </li>
  )
}

export default function ProductSpotlightSpecs({ label, heading, image, imageAlt, specs, ctaLabel, ctaUrl, background, accent, spacing }) {
  const left = specs.filter((_, i) => i % 2 === 0)
  const right = specs.filter((_, i) => i % 2 === 1)
  return (
    <section className="lp-section product-spotlight-specs" data-spacing={spacing} style={{ '--bg': background, '--accent': accent }}>
      <div className="lp-container">
        <div className="pss-head">
          <p>{label}</p>
          <h2>{heading}</h2>
        </div>
        <div className="pss-stage">
          <ul className="pss-col pss-left">
            {left.map((s) => <Spec key={s.title} s={s} />)}
          </ul>
          <figure className="pss-media">
            <img src={image} alt={imageAlt} loading="lazy" />
          </figure>
          <ul className="pss-col pss-right">
            {right.map((s) => <Spec key={s.title} s={s} />)}
          </ul>
        </div>
        <div className="pss-foot">
          <a className="lp-btn pss-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
