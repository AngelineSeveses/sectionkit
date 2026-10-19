const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: currency === 'CAD' ? 'symbol' : 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

export default function HeroEventTicket({ edition, headline, intro, dates, times, venue, city, ctaLabel, ctaUrl, secondaryLabel, secondaryUrl, passName, price, regularPrice, currency, priceNote, speakers, speakerNote, accent, background, radius, spacing }) {
  const saving = regularPrice > price ? regularPrice - price : 0
  return (
    <section className="lp-section hero-event-ticket" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container het-grid">
        <div className="het-copy">
          <p className="het-edition">{edition}</p>
          <h1>{headline}</h1>
          <p className="het-intro">{intro}</p>
          <div className="het-actions">
            <a className="lp-btn het-primary" href={ctaUrl}>{ctaLabel}</a>
            <a className="lp-btn het-secondary" href={secondaryUrl}>{secondaryLabel}</a>
          </div>
          <div className="het-speakers">
            <ul aria-hidden="true">
              {speakers.slice(0, 5).map((s) => (
                <li key={s.photo}>
                  <img src={s.photo} alt="" width="44" height="44" loading="lazy" />
                </li>
              ))}
            </ul>
            <p>{speakerNote}</p>
          </div>
        </div>

        <aside className="het-ticket" aria-label="Event details and pass price">
          <div className="het-ticket-main">
            <dl className="het-facts">
              <div className="het-when">
                <dt>Dates</dt>
                <dd>{dates}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{times}</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>
                  {venue}
                  <span>{city}</span>
                </dd>
              </div>
            </dl>
          </div>
          <div className="het-ticket-stub">
            <p className="het-pass">{passName}</p>
            <p className="het-price">
              <strong>{money(price, currency)}</strong>
              {saving > 0 && (
                <span>
                  <s>{money(regularPrice, currency)}</s>
                  <span className="het-save">Save {money(saving, currency)}</span>
                </span>
              )}
            </p>
            <p className="het-note">{priceNote}</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
