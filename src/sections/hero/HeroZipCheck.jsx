const icons = {
  shield: <path d="M12 3l7 3v6c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-3Zm-3 9l2 2 4-4" />,
  badge: <path d="M12 3l2.4 2 3.1-.3.8 3 2.6 1.8-1.2 2.9 1.2 2.9-2.6 1.8-.8 3-3.1-.3L12 21l-2.4-2-3.1.3-.8-3-2.6-1.8 1.2-2.9-1.2-2.9 2.6-1.8.8-3 3.1.3L12 3Zm-3 9l2 2 4-4" />,
  card: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10.5h18M7 15h4" />
    </>
  ),
}

export default function HeroZipCheck({ eyebrow, headline, subhead, fieldLabel, placeholder, ctaLabel, formAction, trust, rating, ratingNote, image, imageAlt, accent, spacing }) {
  const items = trust.slice(0, 3)
  return (
    <section className="lp-section hero-zip-check" data-spacing={spacing} style={{ '--accent': accent }}>
      <img className="hzc-bg" src={image} alt={imageAlt} width="1920" height="1080" />
      <div className="lp-container hzc-inner">
        <div className="hzc-copy">
          <p className="hzc-eyebrow">{eyebrow}</p>
          <h1>{headline}</h1>
          <p className="hzc-sub">{subhead}</p>
          <form className="hzc-form" action={formAction} method="get">
            <label htmlFor="hzc-zip">{fieldLabel}</label>
            <div className="hzc-field">
              <input id="hzc-zip" name="postal" type="text" inputMode="text" autoComplete="postal-code" placeholder={placeholder} maxLength={10} required />
              <button className="lp-btn hzc-cta" type="submit">{ctaLabel}</button>
            </div>
          </form>
          <p className="hzc-rating">
            <span aria-hidden="true">★★★★★</span>
            <strong>{rating}</strong> {ratingNote}
          </p>
        </div>
      </div>
      <div className="hzc-trust">
        <ul className="lp-container">
          {items.map((t, i) => (
            <li key={t.title}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {icons[['shield', 'badge', 'card'][i]]}
              </svg>
              <span>
                <strong>{t.title}</strong>
                {t.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
