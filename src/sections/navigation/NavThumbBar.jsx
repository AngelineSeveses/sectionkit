// On phones the header adds a row of three large actions (call, text, book) under the logo,
// the pattern most US and Canadian service sites use to turn mobile visits into calls.
// The text link is entered as free text so sms: works; only sms:, tel: and web links are kept.
const safeHref = (href) => (/^(sms:|tel:|https?:\/\/|\/)/i.test(String(href).trim()) ? String(href).trim() : '#')

export default function NavThumbBar({ brand, tagline, promo, promoUrl, links, phoneLabel, phoneHref, textHref, ctaLabel, ctaUrl, accent, background }) {
  return (
    <header className="lp-section nav-thumb-bar" style={{ '--accent': accent, '--bg': background }}>
      {promo && (
        <a className="ntb-promo" href={promoUrl}>
          {promo}
        </a>
      )}
      <div className="lp-container ntb-main">
        <a className="ntb-brand" href="/" aria-label={`${brand} home`}>
          <span className="ntb-mark" aria-hidden="true">
            {brand.charAt(0)}
          </span>
          <span className="ntb-name">
            <strong>{brand}</strong>
            <small>{tagline}</small>
          </span>
        </a>
        <nav className="ntb-nav" aria-label="Main">
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.url}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ntb-actions">
          <a className="ntb-phone" href={phoneHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.6 3h2.8l1.4 4.2-2.1 1.4a12 12 0 0 0 6.7 6.7l1.4-2.1 4.2 1.4v2.8A2.6 2.6 0 0 1 18.4 20 15.4 15.4 0 0 1 4 5.6 2.6 2.6 0 0 1 6.6 3Z" />
            </svg>
            {phoneLabel}
          </a>
          <a className="lp-btn ntb-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
      <nav className="ntb-thumb" aria-label="Quick actions">
        <a href={phoneHref}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.6 3h2.8l1.4 4.2-2.1 1.4a12 12 0 0 0 6.7 6.7l1.4-2.1 4.2 1.4v2.8A2.6 2.6 0 0 1 18.4 20 15.4 15.4 0 0 1 4 5.6 2.6 2.6 0 0 1 6.6 3Z" />
          </svg>
          Call
        </a>
        <a href={safeHref(textHref)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 18l-1 3 4-2h9a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v9c0 .7.3 1.4.8 2Z" />
          </svg>
          Text
        </a>
        <a className="ntb-thumb-book" href={ctaUrl}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="5" width="16" height="15" rx="3" />
            <path d="M4 10h16M9 3v4M15 3v4" />
          </svg>
          {ctaLabel}
        </a>
      </nav>
    </header>
  )
}
