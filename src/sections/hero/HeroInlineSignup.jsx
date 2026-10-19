// The calendar on the right is drawn in HTML/CSS, so it stays sharp and can be recolored.
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const bookings = [
  { d: 0, start: 0, len: 2, label: 'Haircut' },
  { d: 0, start: 3, len: 1, label: 'Consult' },
  { d: 1, start: 1, len: 3, label: 'Colour' },
  { d: 2, start: 0, len: 1, label: 'Trim' },
  { d: 2, start: 2, len: 2, label: 'Haircut' },
  { d: 3, start: 1, len: 1, label: 'Consult' },
  { d: 3, start: 3, len: 2, label: 'Blowout' },
  { d: 4, start: 0, len: 2, label: 'Colour' },
  { d: 4, start: 4, len: 1, label: 'Trim' },
]

export default function HeroInlineSignup({ headline, subhead, emailPlaceholder, ctaLabel, formAction, microcopy, rating, ratingNote, notifyTitle, notifyText, accent, background, radius, spacing }) {
  return (
    <section className="lp-section hero-inline-signup" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container his-grid">
        <div className="his-copy">
          <h1>{headline}</h1>
          <p className="his-sub">{subhead}</p>
          <form className="his-form" action={formAction} method="post">
            <label className="lp-sr-only" htmlFor="his-email">
              Work email
            </label>
            <input id="his-email" type="email" name="email" autoComplete="email" placeholder={emailPlaceholder} required />
            <button className="lp-btn his-cta" type="submit">{ctaLabel}</button>
          </form>
          <p className="his-micro">{microcopy}</p>
          <div className="his-proof">
            <span className="his-stars" role="img" aria-label={`Rated ${rating} out of 5`}>
              ★★★★★
            </span>
            <p>
              <strong>{rating}/5</strong> {ratingNote}
            </p>
          </div>
        </div>

        <div className="his-visual" aria-hidden="true">
          <div className="his-cal">
            <div className="his-cal-head">
              <strong>This week</strong>
              <span>32 bookings</span>
            </div>
            <div className="his-cal-grid">
              {days.map((d, i) => (
                <div key={d} className="his-day">
                  <span className="his-day-name">{d}</span>
                  <div className="his-slots">
                    {bookings
                      .filter((b) => b.d === i)
                      .map((b) => (
                        <span key={b.start} className="his-booking" style={{ gridRow: `${b.start + 1} / span ${b.len}` }}>
                          {b.label}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="his-notify">
            <span className="his-notify-dot" />
            <div>
              <strong>{notifyTitle}</strong>
              <span>{notifyText}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
