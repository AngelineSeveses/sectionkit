export default function CtaCenteredBand({ heading, body, primaryLabel, primaryUrl, secondaryLabel, secondaryUrl, note, background, ink, spacing, radius }) {
  return (
    <section className="lp-section cta-centered-band" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--radius': `${radius}px` }}>
      <div className="lp-container ccb-inner">
        <h2>{heading}</h2>
        <p className="ccb-body">{body}</p>
        <div className="ccb-actions">
          <a className="lp-btn ccb-primary" href={primaryUrl}>{primaryLabel}</a>
          {secondaryLabel && <a className="lp-btn ccb-secondary" href={secondaryUrl}>{secondaryLabel}</a>}
        </div>
        {note && <p className="ccb-note">{note}</p>}
      </div>
    </section>
  )
}
