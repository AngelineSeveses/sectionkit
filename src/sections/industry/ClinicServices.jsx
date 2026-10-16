export default function ClinicServices({ heading, intro, visits, insurers, ctaLabel, ctaUrl, phoneLabel, phoneHref, emergencyNote, accent, background, spacing, radius }) {
  return (
    <section className="lp-section clinic-services" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cs-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="cs-visits">
          {visits.map((v) => (
            <li key={v.title}>
              <div className="cs-visit-top">
                <h3>{v.title}</h3>
                <span className="cs-mode" data-mode={v.mode}>{v.mode}</span>
              </div>
              <p>{v.text}</p>
              <p className="cs-length">{v.length}</p>
            </li>
          ))}
        </ul>
        <div className="cs-bar">
          <div className="cs-insurers">
            <p>Direct billing with</p>
            <ul>
              {insurers.split(',').map((i) => (
                <li key={i}>{i.trim()}</li>
              ))}
            </ul>
          </div>
          <div className="cs-actions">
            <a className="lp-btn cs-cta" href={ctaUrl}>{ctaLabel}</a>
            <a className="cs-phone" href={phoneHref}>{phoneLabel}</a>
          </div>
        </div>
        <p className="cs-emergency" role="note">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2l8.5 15h-17z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M10 8v4M10 14.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          {emergencyNote}
        </p>
      </div>
    </section>
  )
}
