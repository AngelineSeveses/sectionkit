// "What's my home worth?" lead form for real estate agents. The address is posted to your
// own valuation page or CRM; no estimate is calculated here.
export default function HomeValueLookup({ heading, text, fieldLabel, placeholder, ctaLabel, formAction, steps, agentName, agentRole, agentPhoto, soldStat, soldLabel, image, accent, background, radius, spacing }) {
  return (
    <section className="lp-section home-value-lookup" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container hvl-grid">
        <div className="hvl-copy">
          <h2>{heading}</h2>
          <p className="hvl-text">{text}</p>
          <form className="hvl-form" action={formAction} method="get">
            <label htmlFor="hvl-address">{fieldLabel}</label>
            <div className="hvl-field">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z" />
              </svg>
              <input id="hvl-address" type="text" name="address" autoComplete="street-address" placeholder={placeholder} required />
              <button className="lp-btn hvl-cta" type="submit">{ctaLabel}</button>
            </div>
          </form>
          <ol className="hvl-steps">
            {String(steps)
              .split(';')
              .map((s) => s.trim())
              .filter(Boolean)
              .map((s, i) => (
                <li key={s}>
                  <span aria-hidden="true">{i + 1}</span>
                  {s}
                </li>
              ))}
          </ol>
        </div>
        <div className="hvl-visual">
          <img className="hvl-house" src={image} alt="" width="900" height="1000" loading="lazy" />
          <div className="hvl-agent">
            <img src={agentPhoto} alt="" width="56" height="56" loading="lazy" />
            <div>
              <strong>{agentName}</strong>
              <span>{agentRole}</span>
            </div>
          </div>
          <div className="hvl-sold">
            <strong>{soldStat}</strong>
            <span>{soldLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
