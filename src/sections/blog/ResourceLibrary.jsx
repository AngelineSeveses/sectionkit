const typeIcons = {
  Guide: <path d="M5 4.5h9.5L19 9v10.5H5zM14 4.5V9h5M8.5 13h7M8.5 16.5h5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />,
  Webinar: <><rect x="3.5" y="5" width="17" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M10.5 8.5l4 2-4 2zM8 20h8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" /></>,
  Template: <><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M4 9.5h16M10 9.5V20" fill="none" stroke="currentColor" strokeWidth="1.7" /></>,
  Checklist: <path d="M5 7l1.5 1.5L9 6M5 12.5L6.5 14 9 11.5M5 18l1.5 1.5L9 17M12 7.5h7M12 13h7M12 18.5h7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  Calculator: <><rect x="5" y="3.5" width="14" height="17" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M8 7.5h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 15.5h.01M12 15.5h.01M15.5 15.5h.01" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></>,
}

export default function ResourceLibrary({ heading, intro, resources, accent, background, spacing, radius }) {
  return (
    <section className="lp-section resource-library" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="rl-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <ul className="rl-list">
          {resources.map((r) => (
            <li key={r.title}>
              <a className="rl-card" href={r.url} data-type={r.type}>
                <span className="rl-type">
                  <svg viewBox="0 0 24 24" aria-hidden="true">{typeIcons[r.type] ?? typeIcons.Guide}</svg>
                  {r.type}
                </span>
                <span className="rl-title">{r.title}</span>
                <span className="rl-desc">{r.description}</span>
                <span className="rl-foot">
                  <span>{r.format}</span>
                  <span className="rl-action">{r.action}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
