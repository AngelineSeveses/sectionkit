// Steps rise like a staircase from left to right; each card takes its own color.
export default function ProcessStaircase({ heading, intro, steps, ctaLabel, ctaUrl, note, background, radius, spacing }) {
  const list = steps.slice(0, 5)
  return (
    <section className="lp-section process-staircase" data-spacing={spacing} style={{ '--bg': background, '--radius': `${radius}px`, '--count': list.length }}>
      <div className="lp-container">
        <div className="psc-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ol className="psc-steps">
          {list.map((s, i) => (
            <li key={s.title} style={{ '--tone': s.color, '--i': i }}>
              <span className="psc-num" aria-hidden="true">{i + 1}</span>
              <p className="psc-when">{s.when}</p>
              <h3>{s.title}</h3>
              <p className="psc-text">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="psc-foot">
          <a className="lp-btn psc-cta" href={ctaUrl}>{ctaLabel}</a>
          <p>{note}</p>
        </div>
      </div>
    </section>
  )
}
