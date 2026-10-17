const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Questions are grouped by their topic, in the order each topic first appears.
export default function FaqByTopic({ heading, intro, items, contactLabel, contactUrl, accent, background, radius, spacing }) {
  const groups = []
  for (const it of items) {
    const name = it.topic.trim() || 'General'
    let g = groups.find((x) => x.name === name)
    if (!g) {
      g = { name, id: `fbt-${slug(name) || groups.length + 1}`, items: [] }
      groups.push(g)
    }
    g.items.push(it)
  }
  return (
    <section className="lp-section faq-by-topic" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container fbt-grid">
        <aside className="fbt-side">
          <h2>{heading}</h2>
          <p>{intro}</p>
          <nav aria-label="FAQ topics">
            <ul>
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}>
                    {g.name}
                    <span>{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {contactLabel && (
            <a className="fbt-contact" href={contactUrl}>
              {contactLabel}
            </a>
          )}
        </aside>
        <div className="fbt-groups">
          {groups.map((g) => (
            <div key={g.id} className="fbt-group" id={g.id}>
              <h3>{g.name}</h3>
              {g.items.map((it) => (
                <details key={it.question} className="fbt-item">
                  <summary>{it.question}</summary>
                  <p>{it.answer}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
