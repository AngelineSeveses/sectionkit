// Dates are entered as YYYY-MM-DD and shown as a calendar block, so the month and day
// always match the date. Times are plain text so they can name a time zone.
const parts = (iso) => {
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return { month: '', day: '', weekday: '' }
  return {
    month: d.toLocaleString('en-US', { month: 'short' }),
    day: d.getDate(),
    weekday: d.toLocaleString('en-US', { weekday: 'long' }),
  }
}

export default function BlogEvents({ heading, intro, events, allLabel, allUrl, accent, background, radius, spacing }) {
  return (
    <section className="lp-section blog-events" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="bev-head">
          <div>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
          <a className="bev-all" href={allUrl}>
            {allLabel}
          </a>
        </div>
        <ul className="bev-list">
          {events.map((e) => {
            const p = parts(e.date)
            return (
              <li key={e.title + e.date}>
                <time className="bev-date" dateTime={e.date}>
                  <span className="bev-month">{p.month}</span>
                  <span className="bev-day">{p.day}</span>
                </time>
                <div className="bev-body">
                  <p className="bev-meta">
                    <span className="bev-format">{e.format}</span>
                    <span>
                      {p.weekday}, {e.time}
                    </span>
                  </p>
                  <h3>
                    <a href={e.url}>{e.title}</a>
                  </h3>
                  <p className="bev-desc">{e.description}</p>
                </div>
                <a className="lp-btn bev-cta" href={e.url} aria-label={`${e.cta}: ${e.title}`}>
                  {e.cta}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
