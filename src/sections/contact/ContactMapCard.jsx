export default function ContactMapCard({ businessName, street, city, phone, phoneHref, email, hours, parking, mapUrl, accent, background, spacing, radius }) {
  const hourRows = hours.split(';').map((h) => h.split('|').map((s) => s.trim()))
  return (
    <section className="lp-section contact-map-card" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container cmc-stage">
        <div className="cmc-map" aria-hidden="true">
          <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice">
            <rect width="1200" height="560" fill="#e8ece6" />
            <path d="M0 380 C180 340 320 420 520 360 S860 260 1200 300 L1200 560 L0 560Z" fill="#cfe0e8" />
            <g stroke="#ffffff" strokeLinecap="round" fill="none">
              <path d="M0 140 H1200" strokeWidth="22" />
              <path d="M760 0 V560" strokeWidth="18" />
              <path d="M0 260 L1200 200" strokeWidth="12" />
              <path d="M300 0 L420 560" strokeWidth="12" />
              <path d="M980 0 L1060 560" strokeWidth="10" />
              <path d="M520 0 V330" strokeWidth="8" />
              <path d="M0 60 H1200" strokeWidth="6" />
            </g>
            <g fill="#dde3d8">
              <rect x="560" y="160" width="180" height="30" rx="4" />
              <rect x="790" y="210" width="160" height="70" rx="4" />
              <rect x="440" y="160" width="60" height="80" rx="4" />
            </g>
          </svg>
          <span className="cmc-pin">
            <span />
          </span>
        </div>
        <div className="cmc-card">
          <h2>{businessName}</h2>
          <address>
            {street}
            <br />
            {city}
          </address>
          <div className="cmc-contact">
            <a href={phoneHref}>{phone}</a>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <table className="cmc-hours">
            <caption>Opening hours</caption>
            <tbody>
              {hourRows.map(([day, time]) => (
                <tr key={day}>
                  <th scope="row">{day}</th>
                  <td>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cmc-parking">{parking}</p>
          <a className="lp-btn cmc-cta" href={mapUrl}>Open in Maps</a>
        </div>
      </div>
    </section>
  )
}
