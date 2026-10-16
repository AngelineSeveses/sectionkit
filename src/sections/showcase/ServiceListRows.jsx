export default function ServiceListRows({ label, heading, services, background, ink, accent, spacing }) {
  return (
    <section className="lp-section service-list-rows" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container slr-grid">
        <div className="slr-head">
          <p className="slr-label">{label}</p>
          <h2>{heading}</h2>
        </div>
        <ul className="slr-list">
          {services.map((s) => (
            <li key={s.title}>
              <a className="slr-row" href={s.url}>
                <span className="slr-title">{s.title}</span>
                <span className="slr-desc">{s.description}</span>
                <span className="slr-for">{s.forWho}</span>
                <span className="slr-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
