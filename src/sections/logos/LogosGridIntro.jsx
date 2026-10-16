export default function LogosGridIntro({ heading, body, linkLabel, linkUrl, logos, background, ink, spacing }) {
  return (
    <section className="lp-section logos-grid-intro" data-spacing={spacing} style={{ '--bg': background, '--ink': ink }}>
      <div className="lp-container lgi-grid">
        <div className="lgi-copy">
          <h2>{heading}</h2>
          <p>{body}</p>
          <a href={linkUrl}>{linkLabel}</a>
        </div>
        <ul className="lgi-cells">
          {logos.map((l, i) => (
            <li key={l.name}>
              <span className={`lgi-mark lgi-mark-${i % 4}`} aria-hidden="true" />
              <span className="lgi-name">{l.name}</span>
              <span className="lgi-sector">{l.sector}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
