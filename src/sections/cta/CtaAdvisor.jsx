export default function CtaAdvisor({ heading, text, photo, name, credentials, languages, slotsLabel, slots, bookUrl, ctaLabel, phoneText, phoneLabel, phoneHref, accent, background, radius, spacing }) {
  return (
    <section className="lp-section cta-advisor" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cad-card">
          <div className="cad-person">
            <img src={photo} alt="" width="240" height="240" loading="lazy" />
            <div>
              <p className="cad-name">{name}</p>
              <p className="cad-cred">{credentials}</p>
              {languages && <p className="cad-lang">{languages}</p>}
            </div>
          </div>
          <div className="cad-main">
            <h2>{heading}</h2>
            <p className="cad-text">{text}</p>
            <p className="cad-slots-label">{slotsLabel}</p>
            <ul className="cad-slots">
              {slots.map((s) => (
                <li key={s.time}>
                  <a href={s.url}>{s.time}</a>
                </li>
              ))}
            </ul>
            <div className="cad-actions">
              <a className="lp-btn cad-cta" href={bookUrl}>{ctaLabel}</a>
              <p>
                {phoneText} <a href={phoneHref}>{phoneLabel}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
