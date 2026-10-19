export default function BannerWelcomeOffer({ offer, headline, text, image, imageAlt, placeholder, ctaLabel, formAction, finePrint, accent, background, radius, spacing }) {
  return (
    <section className="lp-section banner-welcome-offer" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="bwo-card">
          <div className="bwo-media">
            <img src={image} alt={imageAlt} width="720" height="720" loading="lazy" />
            <p className="bwo-offer">{offer}</p>
          </div>
          <div className="bwo-body">
            <h2>{headline}</h2>
            <p className="bwo-text">{text}</p>
            <form className="bwo-form" action={formAction} method="post">
              <label className="lp-sr-only" htmlFor="bwo-email">
                Email address
              </label>
              <input id="bwo-email" type="email" name="email" autoComplete="email" placeholder={placeholder} required />
              <button className="lp-btn bwo-cta" type="submit">{ctaLabel}</button>
            </form>
            <p className="bwo-fine">{finePrint}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
