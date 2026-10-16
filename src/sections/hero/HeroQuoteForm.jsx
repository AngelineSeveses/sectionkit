export default function HeroQuoteForm({
  image,
  imageAlt,
  kicker,
  headline,
  subhead,
  phoneLabel,
  phoneHref,
  trustPoints,
  formTitle,
  formNote,
  services,
  postalLabel,
  submitLabel,
  formAction,
  accent,
  overlay,
  radius,
  spacing,
}) {
  return (
    <section
      className="lp-section hero-quote-form"
      data-spacing={spacing}
      style={{ '--accent': accent, '--radius': `${radius}px`, '--overlay': overlay / 100 }}
    >
      <img className="hqf-bg" src={image} alt={imageAlt} />
      <div className="hqf-shade" aria-hidden="true" />
      <div className="lp-container hqf-grid">
        <div className="hqf-copy">
          <p className="hqf-kicker">{kicker}</p>
          <h1 className="hqf-title">{headline}</h1>
          <p className="hqf-sub">{subhead}</p>
          <a className="hqf-phone" href={phoneHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"
                fill="currentColor"
              />
            </svg>
            <span>
              <small>Prefer to talk? Call us</small>
              {phoneLabel}
            </span>
          </a>
          <ul className="hqf-trust">
            {trustPoints.map((t) => (
              <li key={t.text}>{t.text}</li>
            ))}
          </ul>
        </div>

        <form className="hqf-form" action={formAction} method="post">
          <h2 className="hqf-form-title">{formTitle}</h2>
          <p className="hqf-form-note">{formNote}</p>
          <div className="hqf-fields">
            <label className="hqf-field">
              <span>Full name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label className="hqf-field">
              <span>Phone</span>
              <input type="tel" name="phone" autoComplete="tel" required />
            </label>
            <label className="hqf-field">
              <span>{postalLabel}</span>
              <input type="text" name="postal" autoComplete="postal-code" required />
            </label>
            <label className="hqf-field">
              <span>Service needed</span>
              <select name="service" defaultValue="">
                <option value="" disabled>
                  Choose a service
                </option>
                {services.map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </select>
            </label>
          </div>
          <button className="lp-btn hqf-submit" type="submit">
            {submitLabel}
          </button>
          <p className="hqf-privacy">We only use your details to prepare your quote. No spam, no sharing.</p>
        </form>
      </div>
    </section>
  )
}
