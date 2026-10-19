const icons = {
  phone: <path d="M6.6 3h2.8l1.4 4.2-2.1 1.4a12 12 0 0 0 6.7 6.7l1.4-2.1 4.2 1.4v2.8A2.6 2.6 0 0 1 18.4 20 15.4 15.4 0 0 1 4 5.6 2.6 2.6 0 0 1 6.6 3Z" />,
  text: <path d="M5 18l-1 3 4-2h9a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v9c0 .7.3 1.4.8 2ZM8 10h8M8 13.5h5" />,
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  visit: (
    <>
      <path d="M12 21s-7-6.3-7-11.5a7 7 0 0 1 14 0C19 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
}

// Links are entered as text so sms: works too. Only web, mailto, tel, sms, root-relative and
// #anchor links are kept; anything else becomes "#".
const safeHref = (href) => (/^(https?:\/\/|mailto:|tel:|sms:|\/|#)/i.test(String(href).trim()) ? String(href).trim() : '#')

export default function ContactChannelTiles({ heading, intro, channels, background, radius, spacing }) {
  return (
    <section className="lp-section contact-channel-tiles" data-spacing={spacing} style={{ '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cct-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="cct-grid">
          {channels.map((c) => (
            <li key={c.title} style={{ '--tone': c.color }}>
              <a href={safeHref(c.url)}>
                <span className="cct-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{icons[c.icon] ?? icons.phone}</svg>
                </span>
                <span className="cct-title">{c.title}</span>
                <span className="cct-value">{c.value}</span>
                <span className="cct-hours">{c.hours}</span>
                <span className="cct-reply">{c.reply}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
