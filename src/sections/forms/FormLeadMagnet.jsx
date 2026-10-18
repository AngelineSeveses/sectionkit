export default function FormLeadMagnet({ coverKicker, coverTitle, coverFooter, heading, intro, inside, fileNote, roles, submitLabel, formAction, consentText, accent, coverColor, background, radius, spacing }) {
  return (
    <section className="lp-section form-lead-magnet" data-spacing={spacing} style={{ '--accent': accent, '--cover': coverColor, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container flm-grid">
        <div className="flm-visual" aria-hidden="true">
          <div className="flm-book">
            <p className="flm-kicker">{coverKicker}</p>
            <p className="flm-title">{coverTitle}</p>
            <p className="flm-footer">{coverFooter}</p>
          </div>
        </div>
        <div className="flm-copy">
          <h2>{heading}</h2>
          <p className="flm-intro">{intro}</p>
          <ul className="flm-inside">
            {inside.map((it) => (
              <li key={it.text}>{it.text}</li>
            ))}
          </ul>
          <form className="flm-form" action={formAction} method="post">
            <div className="flm-row">
              <label className="flm-field">
                <span>First name</span>
                <input type="text" name="first_name" autoComplete="given-name" required />
              </label>
              <label className="flm-field">
                <span>Work email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
            </div>
            <label className="flm-field">
              <span>
                Your role <small>Optional</small>
              </span>
              <select name="role" defaultValue="">
                <option value="">Select one</option>
                {roles.split(';').map((r) => (
                  <option key={r}>{r.trim()}</option>
                ))}
              </select>
            </label>
            <label className="flm-consent">
              <input type="checkbox" name="consent" required />
              <span>{consentText}</span>
            </label>
            <div className="flm-submit-row">
              <button className="lp-btn flm-submit" type="submit">
                {submitLabel}
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 2.5v8m-3.5-3.5L8 10.5 11.5 7M3 13.5h10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="flm-note">{fileNote}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
