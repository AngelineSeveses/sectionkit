// Leaves are placed along a circle, so the wreath stays even at any size.
const leaves = [122, 141, 160, 179, 198, 217, 236].map((a) => {
  const r = (a * Math.PI) / 180
  return { a, x: 50 + 44 * Math.cos(r), y: 54 + 44 * Math.sin(r) }
})

function Wreath() {
  const branch = (
    <g>
      <path d="M34 93 C12 82 4 58 10 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {leaves.map((l) => (
        <ellipse key={l.a} cx={l.x} cy={l.y} rx="2.6" ry="7.2" transform={`rotate(${l.a + 22} ${l.x} ${l.y})`} fill="currentColor" />
      ))}
    </g>
  )
  return (
    <svg className="law-wreath" viewBox="0 0 100 100" aria-hidden="true">
      {branch}
      <g transform="translate(100 0) scale(-1 1)">{branch}</g>
    </svg>
  )
}

export default function LogosAwardLaurels({ intro, awards, accent, background, textColor, spacing }) {
  return (
    <section className="lp-section logos-award-laurels" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--ink': textColor }}>
      <div className="lp-container">
        {intro && <p className="law-intro">{intro}</p>}
        <ul className="law-row">
          {awards.map((a) => (
            <li key={a.title + a.year}>
              <Wreath />
              <div className="law-text">
                <span className="law-year">{a.year}</span>
                <strong>{a.title}</strong>
                <span className="law-issuer">{a.issuer}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
