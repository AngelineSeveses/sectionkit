export default function FormConsultationSplit({ heading, intro, expectations, contactName, contactRole, contactPhoto, revenueOptions, submitLabel, formAction, privacyNote, accent, background, spacing, radius }) {
  return (
    <section className="lp-section form-consultation-split" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container fcs-grid">
        <div className="fcs-copy">
          <h2>{heading}</h2>
          <p className="fcs-intro">{intro}</p>
          <h3>What to expect</h3>
          <ol className="fcs-steps">
            {expectations.map((e) => (
              <li key={e.text}>{e.text}</li>
            ))}
          </ol>
          <div className="fcs-person">
            <img src={contactPhoto} alt="" width="52" height="52" loading="lazy" />
            <p>
              <strong>{contactName}</strong>
              {contactRole}
            </p>
          </div>
        </div>
        <form className="fcs-form" action={formAction} method="post">
          <div className="fcs-row">
            <label className="fcs-field">
              <span>Full name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label className="fcs-field">
              <span>Work email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
          </div>
          <div className="fcs-row">
            <label className="fcs-field">
              <span>Company</span>
              <input type="text" name="company" autoComplete="organization" />
            </label>
            <label className="fcs-field">
              <span>Annual revenue</span>
              <select name="revenue" defaultValue="">
                <option value="" disabled>Select a range</option>
                {revenueOptions.map((r) => (
                  <option key={r.name}>{r.name}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="fcs-field">
            <span>How can we help?</span>
            <textarea name="message" rows={5} />
          </label>
          <button className="lp-btn fcs-submit" type="submit">{submitLabel}</button>
          <p className="fcs-privacy">{privacyNote}</p>
        </form>
      </div>
    </section>
  )
}
