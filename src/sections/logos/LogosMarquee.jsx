// Each row is rendered twice so the CSS loop is seamless; the copy is hidden from assistive tech.
function Row({ items, reverse }) {
  const chips = (hidden) =>
    items.map((it) => (
      <li key={`${hidden ? 'b' : 'a'}-${it.name}`} aria-hidden={hidden || undefined}>
        <span className="lmq-mark" style={{ background: it.color }}>
          {it.name.slice(0, 1)}
        </span>
        {it.name}
      </li>
    ))
  return (
    <div className="lmq-row" data-reverse={reverse}>
      <ul className="lmq-track">
        {chips(false)}
        {chips(true)}
      </ul>
    </div>
  )
}

export default function LogosMarquee({ heading, linkLabel, linkUrl, rowOne, rowTwo, speed, background, accent, spacing }) {
  return (
    <section className="lp-section logos-marquee" data-spacing={spacing} style={{ '--bg': background, '--accent': accent, '--duration': `${speed}s` }}>
      <div className="lp-container lmq-head">
        <h2>{heading}</h2>
        {linkLabel && <a href={linkUrl}>{linkLabel}</a>}
      </div>
      <Row items={rowOne} reverse={false} />
      {rowTwo.length > 0 && <Row items={rowTwo} reverse />}
    </section>
  )
}
