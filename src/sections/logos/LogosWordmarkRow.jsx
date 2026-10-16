export default function LogosWordmarkRow({ label, logos, tone, background, divider }) {
  return (
    <section className="lp-section logos-wordmark-row" data-tone={tone} data-divider={divider} style={{ '--bg': background }}>
      <div className="lp-container lwr-inner">
        <p className="lwr-label">{label}</p>
        <ul className="lwr-list">
          {logos.map((l, i) => (
            <li key={l.name} className={`lwr-logo lwr-style-${(i % 6) + 1}`}>
              {i % 3 === 0 && (
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2.2" />
                  <circle cx="10" cy="10" r="3" fill="currentColor" />
                </svg>
              )}
              {i % 3 === 1 && (
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2 16L10 3l8 13z" fill="currentColor" />
                </svg>
              )}
              <span>{l.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
