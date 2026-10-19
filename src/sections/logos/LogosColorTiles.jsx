// Client names are set as type on tiles that cycle through four brand colors. Swap them for
// real logo files when you have permission to use them.
export default function LogosColorTiles({ count, label, text, clients, color1, color2, color3, color4, background, spacing }) {
  return (
    <section className="lp-section logos-color-tiles" data-spacing={spacing} style={{ '--c1': color1, '--c2': color2, '--c3': color3, '--c4': color4, '--bg': background }}>
      <div className="lp-container lct-grid">
        <div className="lct-copy">
          <p className="lct-count">{count}</p>
          <h2>{label}</h2>
          <p>{text}</p>
        </div>
        <ul className="lct-tiles">
          {clients.map((c, i) => (
            <li key={c.name} data-tone={(i % 4) + 1} data-type={(i % 4) + 1}>
              <span className="lct-name">{c.name}</span>
              <span className="lct-kind">{c.kind}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
