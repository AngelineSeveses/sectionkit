const icons = {
  phone: <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" fill="currentColor" />,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 7l8.5 6 8.5-6" fill="none" stroke="currentColor" strokeWidth="1.8" /></>,
  pin: <><path d="M12 21s6.5-6.2 6.5-11.5a6.5 6.5 0 00-13 0C5.5 14.8 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="9.5" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.8" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>,
}

export default function ContactSplitForm({ heading, intro, phoneLabel, phoneHref, email, address, hours, topics, submitLabel, formAction, accent, background, spacing, radius }) {
  const rows = [
    { icon: 'phone', label: 'Call', value: phoneLabel, href: phoneHref },
    { icon: 'mail', label: 'Email', value: email, href: `mailto:${email}` },
    { icon: 'pin', label: 'Visit', value: address },
    { icon: 'clock', label: 'Hours', value: hours },
  ]
  return (
    <section className="lp-section contact-split-form" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container csf2-grid">
        <div className="csf2-info">
          <h2>{heading}</h2>
          <p className="csf2-intro">{intro}</p>
          <ul className="csf2-rows">
            {rows.map((r) => (
              <li key={r.label}>
                <span className="csf2-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{icons[r.icon]}</svg></span>
                <span className="csf2-text">
                  <small>{r.label}</small>
                  {r.href ? <a href={r.href}>{r.value}</a> : <span>{r.value}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <form className="csf2-form" action={formAction} method="post">
          <label className="csf2-field">
            <span>Name</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label className="csf2-field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label className="csf2-field">
            <span>Topic</span>
            <select name="topic" defaultValue={topics[0]?.name}>
              {topics.map((t) => (
                <option key={t.name}>{t.name}</option>
              ))}
            </select>
          </label>
          <label className="csf2-field">
            <span>Message</span>
            <textarea name="message" rows={5} required />
          </label>
          <button className="lp-btn csf2-submit" type="submit">{submitLabel}</button>
        </form>
      </div>
    </section>
  )
}
