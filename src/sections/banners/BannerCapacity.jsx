// "Seats left" and the bar are computed from the two numbers, so they always agree.
export default function BannerCapacity({ label, headline, details, total, taken, deadline, ctaLabel, ctaUrl, note, accent, background, radius, spacing }) {
  const cap = Math.max(1, total)
  const used = Math.min(Math.max(0, taken), cap)
  const left = cap - used
  const pct = Math.round((used / cap) * 100)
  return (
    <section className="lp-section banner-capacity" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="bcp-card">
          <div className="bcp-copy">
            <p className="bcp-label">{label}</p>
            <h2>{headline}</h2>
            <p className="bcp-details">{details}</p>
          </div>
          <div className="bcp-status">
            <p className="bcp-left">
              <strong>{left}</strong> of {cap} {left === 1 ? 'spot' : 'spots'} left
            </p>
            <div className="bcp-bar" role="img" aria-label={`${used} of ${cap} spots taken`}>
              <span style={{ width: `${pct}%` }} />
            </div>
            <p className="bcp-deadline">{deadline}</p>
            <a className="lp-btn bcp-cta" href={ctaUrl}>{ctaLabel}</a>
            {note && <p className="bcp-note">{note}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
