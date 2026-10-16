export default function CourseCurriculum({ heading, summary, modules, ctaLabel, ctaUrl, syllabusLabel, syllabusUrl, accent, background, spacing, radius }) {
  return (
    <section className="lp-section course-curriculum" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container ccu-grid">
        <aside className="ccu-side">
          <h2>{heading}</h2>
          <dl className="ccu-summary">
            {summary.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <a className="lp-btn ccu-cta" href={ctaUrl}>{ctaLabel}</a>
          <a className="ccu-syllabus" href={syllabusUrl}>{syllabusLabel}</a>
        </aside>
        <ol className="ccu-modules">
          {modules.map((m, i) => (
            <li key={m.title}>
              <details open={i === 0}>
                <summary>
                  <span className="ccu-week">{m.week}</span>
                  <span className="ccu-title">{m.title}</span>
                  <span className="ccu-meta">{m.meta}</span>
                </summary>
                <ul className="ccu-lessons">
                  {m.lessons.split(';').map((l) => (
                    <li key={l}>{l.trim()}</li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
