// Three steps driven by radio inputs and CSS, so the form works without JavaScript and in the
// HTML export. The step radios sit outside the form so they are never submitted. Only the last
// step has required fields, because browsers cannot point to a required field on a hidden step.
const split = (s) =>
  String(s)
    .split(';')
    .map((x) => x.trim())
    .filter(Boolean)

export default function FormMultiStep({ heading, intro, assurances, step1Title, services, step2Title, budgets, timelines, step3Title, submitLabel, formAction, privacyNote, accent, background, radius, spacing }) {
  return (
    <section className="lp-section form-multi-step" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container fms-grid">
        <div className="fms-copy">
          <h2>{heading}</h2>
          <p className="fms-intro">{intro}</p>
          <ul className="fms-assure">
            {split(assurances).map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="fms-card">
          <input className="fms-step" type="radio" name="fms-step" id="fms-1" defaultChecked aria-label="Step 1" />
          <input className="fms-step" type="radio" name="fms-step" id="fms-2" aria-label="Step 2" />
          <input className="fms-step" type="radio" name="fms-step" id="fms-3" aria-label="Step 3" />
          <div className="fms-progress" aria-hidden="true">
            <span data-n="1" />
            <span data-n="2" />
            <span data-n="3" />
          </div>
          <form action={formAction} method="post">
            <fieldset className="fms-panel" data-step="1">
              <legend>
                <span className="fms-count">Step 1 of 3</span>
                {step1Title}
              </legend>
              <div className="fms-options">
                {split(services).map((s, i) => (
                  <label key={s}>
                    <input type="radio" name="service" value={s} defaultChecked={i === 0} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
              <div className="fms-nav">
                <label className="lp-btn fms-next" htmlFor="fms-2">Continue</label>
              </div>
            </fieldset>

            <fieldset className="fms-panel" data-step="2">
              <legend>
                <span className="fms-count">Step 2 of 3</span>
                {step2Title}
              </legend>
              <p className="fms-sub">Budget</p>
              <div className="fms-chips">
                {split(budgets).map((b, i) => (
                  <label key={b}>
                    <input type="radio" name="budget" value={b} defaultChecked={i === 0} />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
              <p className="fms-sub">Timing</p>
              <div className="fms-chips">
                {split(timelines).map((t, i) => (
                  <label key={t}>
                    <input type="radio" name="timeline" value={t} defaultChecked={i === 0} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
              <label className="fms-field">
                <span>
                  Anything else? <small>Optional</small>
                </span>
                <textarea name="details" rows={3} />
              </label>
              <div className="fms-nav">
                <label className="fms-back" htmlFor="fms-1">Back</label>
                <label className="lp-btn fms-next" htmlFor="fms-3">Continue</label>
              </div>
            </fieldset>

            <fieldset className="fms-panel" data-step="3">
              <legend>
                <span className="fms-count">Step 3 of 3</span>
                {step3Title}
              </legend>
              <div className="fms-row">
                <label className="fms-field">
                  <span>Full name</span>
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label className="fms-field">
                  <span>Company</span>
                  <input type="text" name="company" autoComplete="organization" />
                </label>
              </div>
              <div className="fms-row">
                <label className="fms-field">
                  <span>Work email</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <label className="fms-field">
                  <span>Phone</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
              </div>
              <div className="fms-nav">
                <label className="fms-back" htmlFor="fms-2">Back</label>
                <button className="lp-btn fms-next" type="submit">{submitLabel}</button>
              </div>
              <p className="fms-privacy">{privacyNote}</p>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  )
}
