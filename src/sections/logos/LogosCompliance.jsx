// Badges are drawn as generic shields with text, not certification marks. Use the official
// mark where the certifying body requires it.
export default function LogosCompliance({ heading, text, linkLabel, linkUrl, badges, accent, background, spacing }) {
  return (
    <section className="lp-section logos-compliance" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container lcm-grid">
        <div className="lcm-copy">
          <h2>{heading}</h2>
          <p>{text}</p>
          {linkLabel && (
            <a className="lcm-link" href={linkUrl}>
              {linkLabel}
            </a>
          )}
        </div>
        <ul className="lcm-badges">
          {badges.map((b) => (
            <li key={b.name}>
              <svg viewBox="0 0 32 36" aria-hidden="true">
                <path d="M16 2l12 4.5v10c0 8.2-5.2 14.4-12 17.5C9.2 30.9 4 24.7 4 16.5v-10L16 2Z" />
                <path className="lcm-check" d="M11 18l3.6 3.6L21.5 14" />
              </svg>
              <div>
                <strong>{b.name}</strong>
                <span>{b.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
