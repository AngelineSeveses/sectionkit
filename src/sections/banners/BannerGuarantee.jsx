export default function BannerGuarantee({ sealTop, sealBottom, heading, body, termsLabel, termsUrl, points, accent, background, spacing, radius }) {
  return (
    <section className="lp-section banner-guarantee" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="bg-card">
          <div className="bg-seal" aria-hidden="true">
            <svg viewBox="0 0 160 160">
              <defs>
                <path id="bg-arc" d="M80 80 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0" />
              </defs>
              <circle cx="80" cy="80" r="76" className="bg-ring" />
              <circle cx="80" cy="80" r="44" className="bg-core" />
              <text className="bg-arc-text">
                <textPath href="#bg-arc" startOffset="0">{`${sealTop} • ${sealTop} • `}</textPath>
              </text>
              <text x="80" y="90" textAnchor="middle" className="bg-big">{sealBottom}</text>
            </svg>
          </div>
          <div className="bg-copy">
            <h2>{heading}</h2>
            <p>{body}</p>
            <ul>
              {points.map((p) => (
                <li key={p.text}>{p.text}</li>
              ))}
            </ul>
            <a href={termsUrl}>{termsLabel}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
