const icons = {
  sales: <path d="M4 17V9m5 8V5m5 12v-6m5 6V8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  support: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4.5 13v-2a7.5 7.5 0 0 1 15 0v2" />
      <rect x="3.5" y="12.5" width="4" height="6" rx="1.5" />
      <rect x="16.5" y="12.5" width="4" height="6" rx="1.5" />
    </g>
  ),
  billing: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </g>
  ),
  press: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5h11v14H6a1 1 0 0 1-1-1z" />
      <path d="M16 9h3v8.5a1.5 1.5 0 0 1-3 0M8 9h5M8 12.5h5M8 16h3" />
    </g>
  ),
  partners: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="8.5" cy="9" r="3" />
      <circle cx="16" cy="10" r="2.5" />
      <path d="M3.5 18.5a5 5 0 0 1 10 0M13.5 18.5a4 4 0 0 1 7 0" />
    </g>
  ),
}

export default function ContactChannels({ heading, intro, channels, footnote, accent, background, radius, spacing }) {
  return (
    <section className="lp-section contact-channels" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cch-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="cch-grid" data-count={channels.length}>
          {channels.map((c) => (
            <li key={c.title} className="cch-card">
              <span className="cch-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{icons[c.icon] ?? icons.support}</svg>
              </span>
              <h3>{c.title}</h3>
              <p className="cch-text">{c.text}</p>
              <p className="cch-response">
                <span aria-hidden="true" />
                {c.response}
              </p>
              <a className="cch-action" href={c.url}>
                {c.action}
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        {footnote && <p className="cch-foot">{footnote}</p>}
      </div>
    </section>
  )
}
