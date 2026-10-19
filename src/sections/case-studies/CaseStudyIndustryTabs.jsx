// Industry tabs use radio inputs and CSS, so they also switch in the HTML export. Up to four.
export default function CaseStudyIndustryTabs({ heading, intro, stories, linkLabel, accent, background, radius, spacing }) {
  const items = stories.slice(0, 4)
  return (
    <section className="lp-section case-study-industry-tabs" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="cit-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="cit-wrap">
          {items.map((s, i) => (
            <input key={s.industry} className="cit-radio" type="radio" name="cit-ind" id={`cit-${i + 1}`} defaultChecked={i === 0} />
          ))}
          <div className="cit-tabs" role="group" aria-label="Choose your industry">
            {items.map((s, i) => (
              <label key={s.industry} htmlFor={`cit-${i + 1}`}>
                {s.industry}
              </label>
            ))}
          </div>
          {items.map((s, i) => (
            <article key={s.industry} className="cit-panel" data-slot={i + 1}>
              <img src={s.image} alt="" width="800" height="900" loading="lazy" />
              <div className="cit-body">
                <p className="cit-client">{s.client}</p>
                <h3>{s.headline}</h3>
                <dl className="cit-story">
                  <div>
                    <dt>Challenge</dt>
                    <dd>{s.challenge}</dd>
                  </div>
                  <div>
                    <dt>What we did</dt>
                    <dd>{s.solution}</dd>
                  </div>
                </dl>
                <div className="cit-results">
                  <p>
                    <strong>{s.metric1}</strong>
                    <span>{s.metric1Label}</span>
                  </p>
                  <p>
                    <strong>{s.metric2}</strong>
                    <span>{s.metric2Label}</span>
                  </p>
                </div>
                <a className="lp-btn cit-cta" href={s.url}>
                  {linkLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
