export default function TeamFounderLetter({ label, photo, photoAlt, heading, letter, name, role, background, ink, accent, spacing }) {
  const paragraphs = letter.split('\n').map((p) => p.trim()).filter(Boolean)
  return (
    <section className="lp-section team-founder-letter" data-spacing={spacing} style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container tfl-grid">
        <figure className="tfl-photo">
          <img src={photo} alt={photoAlt} loading="lazy" />
        </figure>
        <div className="tfl-letter">
          <p className="tfl-label">{label}</p>
          <h2>{heading}</h2>
          {paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="tfl-para">{p}</p>
          ))}
          <p className="tfl-sign">
            <span className="tfl-name">{name}</span>
            <span className="tfl-role">{role}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
