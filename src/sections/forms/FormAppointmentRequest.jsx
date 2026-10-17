export default function FormAppointmentRequest({ heading, intro, hours, phoneLabel, phoneHref, services, timeOptions, submitLabel, formAction, consentText, privacyNote, accent, panelBackground, background, radius, spacing }) {
  return (
    <section className="lp-section form-appointment-request" data-spacing={spacing} style={{ '--accent': accent, '--panel': panelBackground, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container far-card">
        <div className="far-info">
          <h2>{heading}</h2>
          <p className="far-intro">{intro}</p>
          <dl className="far-hours">
            {hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="far-call">
            Need to be seen today? <a href={phoneHref}>{phoneLabel}</a>
          </p>
        </div>
        <form className="far-form" action={formAction} method="post">
          <label className="far-field">
            <span>Service</span>
            <select name="service" defaultValue="" required>
              <option value="" disabled>
                Choose a service
              </option>
              {services.split(';').map((s) => (
                <option key={s}>{s.trim()}</option>
              ))}
            </select>
          </label>
          <div className="far-row">
            <label className="far-field">
              <span>Preferred date</span>
              <input type="date" name="date" />
            </label>
            <fieldset className="far-field far-chips">
              <legend>Time of day</legend>
              <div>
                {timeOptions.split(';').map((t, i) => (
                  <label key={t}>
                    <input type="radio" name="time" value={t.trim()} defaultChecked={i === 0} />
                    <span>{t.trim()}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <fieldset className="far-field far-chips">
            <legend>Have you visited us before?</legend>
            <div>
              <label>
                <input type="radio" name="patient" value="new" defaultChecked />
                <span>No, I’m new</span>
              </label>
              <label>
                <input type="radio" name="patient" value="returning" />
                <span>Yes, returning</span>
              </label>
            </div>
          </fieldset>
          <div className="far-row">
            <label className="far-field">
              <span>Full name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label className="far-field">
              <span>Mobile phone</span>
              <input type="tel" name="phone" autoComplete="tel" required />
            </label>
          </div>
          <label className="far-field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label className="far-field">
            <span>
              Anything we should know? <small>Optional</small>
            </span>
            <textarea name="notes" rows={3} />
          </label>
          <label className="far-consent">
            <input type="checkbox" name="consent" required />
            <span>{consentText}</span>
          </label>
          <button className="lp-btn far-submit" type="submit">{submitLabel}</button>
          <p className="far-privacy">{privacyNote}</p>
        </form>
      </div>
    </section>
  )
}
