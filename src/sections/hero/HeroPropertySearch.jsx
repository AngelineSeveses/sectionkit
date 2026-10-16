export default function HeroPropertySearch({ image, imageAlt, headline, subhead, locationPlaceholder, propertyTypes, priceRanges, searchLabel, formAction, popular, accent, overlay, radius, spacing }) {
  const modes = ['Buy', 'Rent', 'Sell']
  return (
    <section className="lp-section hero-property-search" data-spacing={spacing} style={{ '--accent': accent, '--radius': `${radius}px`, '--overlay': overlay / 100 }}>
      <img className="hps-bg" src={image} alt={imageAlt} />
      <div className="hps-shade" aria-hidden="true" />
      <div className="lp-container hps-inner">
        <h1 className="hps-title">{headline}</h1>
        <p className="hps-sub">{subhead}</p>

        <form className="hps-search" action={formAction} method="get" role="search">
          <fieldset className="hps-modes">
            <legend className="lp-sr-only">I want to</legend>
            {modes.map((m, i) => (
              <label key={m}>
                <input type="radio" name="mode" value={m.toLowerCase()} defaultChecked={i === 0} />
                <span>{m}</span>
              </label>
            ))}
          </fieldset>
          <div className="hps-fields">
            <label className="hps-field hps-where">
              <span>Location</span>
              <input type="text" name="q" placeholder={locationPlaceholder} autoComplete="address-level2" />
            </label>
            <label className="hps-field">
              <span>Property type</span>
              <select name="type" defaultValue={propertyTypes[0]?.name}>
                {propertyTypes.map((t) => (
                  <option key={t.name}>{t.name}</option>
                ))}
              </select>
            </label>
            <label className="hps-field">
              <span>Price</span>
              <select name="price" defaultValue={priceRanges[0]?.name}>
                {priceRanges.map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
            </label>
            <button className="lp-btn hps-submit" type="submit">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              {searchLabel}
            </button>
          </div>
        </form>

        <p className="hps-popular">
          <span>Popular:</span>
          {popular.map((p) => (
            <a key={p.name} href={p.url}>{p.name}</a>
          ))}
        </p>
      </div>
    </section>
  )
}
