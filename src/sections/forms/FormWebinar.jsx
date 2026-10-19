const split = (s) =>
  String(s)
    .split(';')
    .map((x) => x.trim())
    .filter(Boolean)

export default function FormWebinar({ label, title, dateLine, timeLine, learn, speakers, formTitle, recordingNote, submitLabel, formAction, consent, color1, color2, radius, spacing }) {
  return (
    <section className="lp-section form-webinar" data-spacing={spacing} style={{ '--c1': color1, '--c2': color2, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="fwb-card">
          <div className="fwb-info">
            <p className="fwb-label">{label}</p>
            <h2>{title}</h2>
            <div className="fwb-when">
              <p>
                <span>Date</span>
                {dateLine}
              </p>
              <p>
                <span>Time</span>
                {timeLine}
              </p>
            </div>
            <h3>You will learn</h3>
            <ul className="fwb-learn">
              {split(learn).map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <ul className="fwb-speakers">
              {speakers.map((s) => (
                <li key={s.name}>
                  <img src={s.photo} alt="" width="48" height="48" loading="lazy" />
                  <span>
                    <strong>{s.name}</strong>
                    {s.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <form className="fwb-form" action={formAction} method="post">
            <p className="fwb-form-title">{formTitle}</p>
            <label>
              <span>First name</span>
              <input type="text" name="first_name" autoComplete="given-name" required />
            </label>
            <label>
              <span>Work email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label>
              <span>Company</span>
              <input type="text" name="company" autoComplete="organization" />
            </label>
            <label className="fwb-check">
              <input type="checkbox" name="consent" value="yes" />
              <span>{consent}</span>
            </label>
            <button className="lp-btn fwb-submit" type="submit">{submitLabel}</button>
            {recordingNote && <p className="fwb-small">{recordingNote}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
