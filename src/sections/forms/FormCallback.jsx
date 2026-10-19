const split = (s) =>
  String(s)
    .split(';')
    .map((x) => x.trim())
    .filter(Boolean)

export default function FormCallback({ heading, intro, agents, statusLabel, promise, timeOptions, submitLabel, formAction, consent, phoneText, phoneLabel, phoneHref, accent, background, radius, spacing }) {
  return (
    <section className="lp-section form-callback" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="fcb-card">
          <div className="fcb-copy">
            <ul className="fcb-agents" aria-hidden="true">
              {agents.slice(0, 4).map((a) => (
                <li key={a.photo}>
                  <img src={a.photo} alt="" width="52" height="52" loading="lazy" />
                </li>
              ))}
              {statusLabel && (
                <li className="fcb-live">
                  <span />
                  {statusLabel}
                </li>
              )}
            </ul>
            <h2>{heading}</h2>
            <p className="fcb-intro">{intro}</p>
            <p className="fcb-promise">{promise}</p>
          </div>
          <form className="fcb-form" action={formAction} method="post">
            <label className="fcb-field">
              <span>First name</span>
              <input type="text" name="first_name" autoComplete="given-name" required />
            </label>
            <label className="fcb-field">
              <span>Phone number</span>
              <input type="tel" name="phone" autoComplete="tel" placeholder="(555) 555-0100" required />
            </label>
            <fieldset className="fcb-field fcb-times">
              <legend>Best time to call</legend>
              <div>
                {split(timeOptions).map((t, i) => (
                  <label key={t}>
                    <input type="radio" name="call_time" value={t} defaultChecked={i === 0} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="fcb-consent">
              <input type="checkbox" name="consent" value="yes" required />
              <span>{consent}</span>
            </label>
            <button className="lp-btn fcb-submit" type="submit">{submitLabel}</button>
            <p className="fcb-phone">
              {phoneText} <a href={phoneHref}>{phoneLabel}</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
