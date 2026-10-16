export default function FormDemoRequest({ heading, intro, agenda, quote, quoteName, quoteRole, sizes, submitLabel, formAction, note, accent, background, spacing, radius }) {
  return (
    <section className="lp-section form-demo-request" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container fdr-grid">
        <div className="fdr-copy">
          <h2>{heading}</h2>
          <p className="fdr-intro">{intro}</p>
          <p className="fdr-agenda-title">In 30 minutes we will</p>
          <ul className="fdr-agenda">
            {agenda.map((a) => (
              <li key={a.text}>{a.text}</li>
            ))}
          </ul>
          <figure className="fdr-quote">
            <blockquote><p>{quote}</p></blockquote>
            <figcaption><strong>{quoteName}</strong>, {quoteRole}</figcaption>
          </figure>
        </div>
        <form className="fdr-form" action={formAction} method="post">
          <label className="fdr-field">
            <span>Work email</span>
            <input type="email" name="email" autoComplete="email" required placeholder="you@company.com" />
          </label>
          <div className="fdr-two">
            <label className="fdr-field">
              <span>First name</span>
              <input type="text" name="firstName" autoComplete="given-name" required />
            </label>
            <label className="fdr-field">
              <span>Last name</span>
              <input type="text" name="lastName" autoComplete="family-name" required />
            </label>
          </div>
          <label className="fdr-field">
            <span>Job title</span>
            <input type="text" name="title" autoComplete="organization-title" />
          </label>
          <fieldset className="fdr-sizes">
            <legend>Company size</legend>
            <div>
              {sizes.map((s, i) => (
                <label key={s.name}>
                  <input type="radio" name="size" value={s.name} defaultChecked={i === 1} />
                  <span>{s.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <button className="lp-btn fdr-submit" type="submit">{submitLabel}</button>
          <p className="fdr-note">{note}</p>
        </form>
      </div>
    </section>
  )
}
