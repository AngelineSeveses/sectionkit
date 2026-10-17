export default function HeroClinicBooking({ eyebrow, headline, body, ctaLabel, ctaUrl, phoneLabel, phoneHref, image, imageAlt, slotsTitle, slots, slotsLinkLabel, slotsUrl, note, accent, background, radius, spacing }) {
  return (
    <section className="lp-section hero-clinic-booking" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container hcb-grid">
        <div className="hcb-copy">
          <p className="hcb-eyebrow">
            <span aria-hidden="true" />
            {eyebrow}
          </p>
          <h1>{headline}</h1>
          <p className="hcb-body">{body}</p>
          <div className="hcb-actions">
            <a className="lp-btn hcb-primary" href={ctaUrl}>{ctaLabel}</a>
            <a className="hcb-phone" href={phoneHref}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.5 2.8 7.7 2.3l1.6 3.9-1.8 1.4a10 10 0 0 0 4.9 4.9l1.4-1.8 3.9 1.6-.5 2.2a2 2 0 0 1-2 1.5C8.6 15.6 4.4 11.4 4 5a2 2 0 0 1 1.5-2.2Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <span>
                <small>Prefer to call?</small>
                {phoneLabel}
              </span>
            </a>
          </div>
          {note && <p className="hcb-note">{note}</p>}
        </div>
        <div className="hcb-visual">
          <img src={image} alt={imageAlt} width="720" height="840" />
          <div className="hcb-slots">
            <p className="hcb-slots-title">{slotsTitle}</p>
            <ul>
              {slots.map((s) => (
                <li key={`${s.day}-${s.time}`}>
                  <a href={slotsUrl}>
                    <span className="hcb-day">{s.day}</span>
                    <span className="hcb-time">{s.time}</span>
                    <span className="hcb-type">{s.type}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a className="hcb-more" href={slotsUrl}>{slotsLinkLabel}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
