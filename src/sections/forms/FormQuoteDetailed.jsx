export default function FormQuoteDetailed({ heading, intro, services, timelines, postalLabel, submitLabel, formAction, responseNote, consentText, accent, background, spacing, radius }) {
  return (
    <section className="lp-section form-quote-detailed" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container fqd-wrap">
        <div className="fqd-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <form className="fqd-form" action={formAction} method="post" encType="multipart/form-data">
          <fieldset className="fqd-group">
            <legend>What do you need help with?</legend>
            <div className="fqd-chips">
              {services.map((s) => (
                <label key={s.name} className="fqd-chip">
                  <input type="checkbox" name="services" value={s.name} />
                  <span>{s.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="fqd-group">
            <legend>When would you like to start?</legend>
            <div className="fqd-radios">
              {timelines.map((t, i) => (
                <label key={t.name} className="fqd-radio">
                  <input type="radio" name="timeline" value={t.name} defaultChecked={i === 0} />
                  <span>{t.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="fqd-grid">
            <label className="fqd-field">
              <span>First name</span>
              <input type="text" name="firstName" autoComplete="given-name" required />
            </label>
            <label className="fqd-field">
              <span>Last name</span>
              <input type="text" name="lastName" autoComplete="family-name" required />
            </label>
            <label className="fqd-field">
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label className="fqd-field">
              <span>Phone</span>
              <input type="tel" name="phone" autoComplete="tel" />
            </label>
            <label className="fqd-field fqd-wide">
              <span>Street address</span>
              <input type="text" name="address" autoComplete="street-address" />
            </label>
            <label className="fqd-field">
              <span>{postalLabel}</span>
              <input type="text" name="postal" autoComplete="postal-code" required />
            </label>
            <label className="fqd-field">
              <span>
                Photos <em>(optional)</em>
              </span>
              <input type="file" name="photos" accept="image/*" multiple />
            </label>
            <label className="fqd-field fqd-wide">
              <span>
                Project details <em>(optional)</em>
              </span>
              <textarea name="details" rows={4} placeholder="Size of the space, what you would like changed, anything we should know." />
            </label>
          </div>

          <label className="fqd-consent">
            <input type="checkbox" name="consent" required />
            <span>{consentText}</span>
          </label>

          <div className="fqd-submit-row">
            <button className="lp-btn fqd-submit" type="submit">{submitLabel}</button>
            <p>{responseNote}</p>
          </div>
        </form>
      </div>
    </section>
  )
}
