export default function FormNewsletterInline({ heading, body, placeholder, submitLabel, formAction, note, frequency, background, ink, accent, spacing }) {
  return (
    <section className="lp-section form-newsletter-inline" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container fni-grid">
        <div>
          <p className="fni-frequency">{frequency}</p>
          <h2>{heading}</h2>
          <p className="fni-body">{body}</p>
        </div>
        <form className="fni-form" action={formAction} method="post">
          <label className="lp-sr-only" htmlFor="fni-email">Email address</label>
          <div className="fni-row">
            <input id="fni-email" type="email" name="email" autoComplete="email" placeholder={placeholder} required />
            <button className="lp-btn fni-submit" type="submit">{submitLabel}</button>
          </div>
          <p className="fni-note">{note}</p>
        </form>
      </div>
    </section>
  )
}
