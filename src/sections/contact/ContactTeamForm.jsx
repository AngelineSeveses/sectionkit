const split = (s) =>
  String(s)
    .split(';')
    .map((x) => x.trim())
    .filter(Boolean)

export default function ContactTeamForm({ heading, intro, team, replyTime, topics, submitLabel, formAction, channels, accent, background, radius, spacing }) {
  return (
    <section className="lp-section contact-team-form" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container ctf-inner">
        <div className="ctf-head">
          <ul className="ctf-avatars" aria-hidden="true">
            {team.slice(0, 5).map((t) => (
              <li key={t.photo}>
                <img src={t.photo} alt="" width="56" height="56" loading="lazy" />
              </li>
            ))}
          </ul>
          <h2>{heading}</h2>
          <p>{intro}</p>
          <p className="ctf-reply">
            <span aria-hidden="true" />
            {replyTime}
          </p>
        </div>
        <form className="ctf-form" action={formAction} method="post">
          <div className="ctf-row">
            <label className="ctf-field">
              <span>Name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label className="ctf-field">
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
          </div>
          <label className="ctf-field">
            <span>Topic</span>
            <select name="topic" defaultValue="">
              <option value="" disabled>
                Choose a topic
              </option>
              {split(topics).map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="ctf-field">
            <span>How can we help?</span>
            <textarea name="message" rows={5} required />
          </label>
          <button className="lp-btn ctf-submit" type="submit">{submitLabel}</button>
        </form>
        <ul className="ctf-channels">
          {channels.map((c) => (
            <li key={c.label}>
              <span>{c.label}</span>
              <a href={c.url}>{c.value}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
