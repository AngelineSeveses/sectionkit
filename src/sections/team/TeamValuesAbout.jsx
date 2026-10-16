export default function TeamValuesAbout({ heading, intro, facts, values, images, accent, background, spacing, radius }) {
  return (
    <section className="lp-section team-values-about" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="tva-head">
          <h2>{heading}</h2>
          <div>
            <p>{intro}</p>
            <dl className="tva-facts">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <ul className="tva-images">
          {images.map((im) => (
            <li key={im.image}>
              <img src={im.image} alt={im.alt} loading="lazy" />
            </li>
          ))}
        </ul>
        <ul className="tva-values">
          {values.map((v) => (
            <li key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
