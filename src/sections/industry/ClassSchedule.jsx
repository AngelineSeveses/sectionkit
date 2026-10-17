const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DAY_NAMES = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' }

// Classes are grouped into day columns in weekday order; days without classes are left out.
export default function ClassSchedule({ heading, intro, classes, ctaLabel, ctaUrl, note, accent, background, radius, spacing }) {
  const days = DAYS.map((d) => ({ day: d, items: classes.filter((c) => c.day === d) })).filter((d) => d.items.length)
  return (
    <section className="lp-section class-schedule" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px`, '--days': days.length }}>
      <div className="lp-container">
        <div className="csc-head">
          <div>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
          <a className="lp-btn csc-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
        <div className="csc-week">
          {days.map((d) => (
            <div key={d.day} className="csc-day">
              <h3>
                <abbr title={DAY_NAMES[d.day]}>{d.day}</abbr>
                <span className="csc-day-full">{DAY_NAMES[d.day]}</span>
              </h3>
              <ul>
                {d.items.map((c) => (
                  <li key={`${c.time}-${c.name}`} className="csc-class" data-level={c.level}>
                    <time>{c.time}</time>
                    <strong>{c.name}</strong>
                    <span className="csc-meta">
                      {c.instructor} · {c.duration}
                    </span>
                    <span className="csc-level">{c.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {note && <p className="csc-note">{note}</p>}
      </div>
    </section>
  )
}
