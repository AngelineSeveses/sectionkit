export default function HeroHospitalityCollage({ property, region, headline, subhead, imageMain, imageMainAlt, imageTop, imageTopAlt, imageBottom, imageBottomAlt, ctaLabel, ctaUrl, formAction, note, background, ink, accent, spacing }) {
  return (
    <section className="lp-section hero-hospitality-collage" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container hhc-grid">
        <div className="hhc-copy">
          <p className="hhc-property">
            {property}
            <span>{region}</span>
          </p>
          <h1 className="hhc-title">{headline}</h1>
          <p className="hhc-sub">{subhead}</p>

          <form className="hhc-book" action={formAction} method="get">
            <label>
              <span>Check in</span>
              <input type="date" name="checkin" />
            </label>
            <label>
              <span>Check out</span>
              <input type="date" name="checkout" />
            </label>
            <label>
              <span>Guests</span>
              <select name="guests" defaultValue="2">
                <option value="1">1 adult</option>
                <option value="2">2 adults</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
              </select>
            </label>
            <button type="submit" className="lp-btn hhc-submit">{ctaLabel}</button>
          </form>
          <p className="hhc-note">
            {note} <a href={ctaUrl}>Best-rate details</a>
          </p>
        </div>

        <div className="hhc-collage">
          <figure className="hhc-main"><img src={imageMain} alt={imageMainAlt} /></figure>
          <figure className="hhc-top"><img src={imageTop} alt={imageTopAlt} /></figure>
          <figure className="hhc-bottom"><img src={imageBottom} alt={imageBottomAlt} /></figure>
        </div>
      </div>
    </section>
  )
}
