export default function HeroMinimalStatement({ name, headline, subhead, ctaLabel, ctaUrl, note, align, background, ink, accent, spacing, radius }) {
  return (
    <section className="lp-section hero-minimal-statement" data-spacing={spacing} data-align={align} style={{ '--bg': background, '--ink': ink, '--accent': accent, '--radius': `${radius}px` }}>
      <div className="lp-container hms-inner">
        <p className="hms-name">{name}</p>
        <h1 className="hms-title">{headline}</h1>
        <p className="hms-sub">{subhead}</p>
        <a className="lp-btn hms-cta" href={ctaUrl}>{ctaLabel}</a>
        {note && <p className="hms-note">{note}</p>}
      </div>
    </section>
  )
}
