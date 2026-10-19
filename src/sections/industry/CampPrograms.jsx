const money = (n, currency) =>
  new Intl.NumberFormat(currency === 'CAD' ? 'en-CA' : 'en-US', { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(n)

// Spots left and the "Almost full" label are calculated from capacity and enrolled.
export default function CampPrograms({ heading, intro, programs, currency, priceUnit, note, ctaLabel, background, radius, spacing }) {
  return (
    <section className="lp-section camp-programs" data-spacing={spacing} style={{ '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cpg-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="cpg-list">
          {programs.map((p) => {
            const cap = Math.max(1, Number(p.capacity) || 1)
            const left = Math.max(0, cap - (Number(p.enrolled) || 0))
            const status = left === 0 ? 'full' : left <= Math.ceil(cap * 0.2) ? 'low' : 'open'
            return (
              <li key={p.name} style={{ '--tone': p.color }}>
                <div className="cpg-age">
                  <span>Ages</span>
                  <strong>{p.ages}</strong>
                </div>
                <div className="cpg-main">
                  <h3>{p.name}</h3>
                  <p className="cpg-desc">{p.description}</p>
                  <p className="cpg-meta">
                    <span>{p.dates}</span>
                    <span>{p.times}</span>
                  </p>
                </div>
                <div className="cpg-side">
                  <p className="cpg-price">
                    {money(p.price, currency)} <span>{priceUnit}</span>
                  </p>
                  <p className="cpg-spots" data-status={status}>
                    {status === 'full' ? 'Full, join waitlist' : status === 'low' ? `Almost full: ${left} left` : `${left} spots left`}
                  </p>
                  <a className="lp-btn cpg-cta" href={p.url} aria-label={`${status === 'full' ? 'Join waitlist' : ctaLabel}: ${p.name}`}>
                    {status === 'full' ? 'Join waitlist' : ctaLabel}
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
        {note && <p className="cpg-note">{note}</p>}
      </div>
    </section>
  )
}
