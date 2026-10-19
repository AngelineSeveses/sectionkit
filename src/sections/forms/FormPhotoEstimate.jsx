// The form posts as multipart/form-data so the photos upload with it. Whatever receives
// the form must accept files; size limits are up to that endpoint.
export default function FormPhotoEstimate({ heading, intro, tips, services, postalLabel, contactOptions, submitLabel, formAction, responseNote, accent, background, radius, spacing }) {
  return (
    <section className="lp-section form-photo-estimate" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container fpe-grid">
        <div className="fpe-copy">
          <h2>{heading}</h2>
          <p className="fpe-intro">{intro}</p>
          <div className="fpe-tips">
            <h3>Photos that help us quote accurately</h3>
            <ul>
              {tips.map((t) => (
                <li key={t.title}>
                  <strong>{t.title}</strong>
                  <span>{t.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form className="fpe-form" action={formAction} method="post" encType="multipart/form-data">
          <fieldset className="fpe-field">
            <legend>What do you need?</legend>
            <div className="fpe-chips">
              {services.split(';').map((s) => (
                <label key={s}>
                  <input type="checkbox" name="services" value={s.trim()} />
                  <span>{s.trim()}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="fpe-field">
            <span>Describe the job</span>
            <textarea name="details" rows={4} placeholder="Size of the area, what is damaged, when it started…" required />
          </label>

          <label className="fpe-field fpe-drop">
            <span>Photos</span>
            <span className="fpe-dropzone">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 16.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <strong>Add photos</strong>
              <small>Up to 10 images, JPG, PNG or HEIC</small>
              <input type="file" name="photos" accept="image/*,.heic" multiple />
            </span>
          </label>

          <div className="fpe-row">
            <label className="fpe-field">
              <span>Name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label className="fpe-field">
              <span>{postalLabel}</span>
              <input type="text" name="postal" autoComplete="postal-code" required />
            </label>
          </div>
          <div className="fpe-row">
            <label className="fpe-field">
              <span>Phone</span>
              <input type="tel" name="phone" autoComplete="tel" required />
            </label>
            <label className="fpe-field">
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" />
            </label>
          </div>

          <fieldset className="fpe-field">
            <legend>Best way to reach you</legend>
            <div className="fpe-chips">
              {contactOptions.split(';').map((c, i) => (
                <label key={c}>
                  <input type="radio" name="contact" value={c.trim()} defaultChecked={i === 0} />
                  <span>{c.trim()}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button className="lp-btn fpe-submit" type="submit">{submitLabel}</button>
          <p className="fpe-note">{responseNote}</p>
        </form>
      </div>
    </section>
  )
}
