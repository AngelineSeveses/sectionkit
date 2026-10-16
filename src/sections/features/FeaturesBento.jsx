export default function FeaturesBento({ heading, intro, tiles, accent, background, spacing, radius }) {
  const [a, b, c, d, e] = tiles
  return (
    <section className="lp-section features-bento" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container">
        <div className="fb-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="fb-grid">
          {a && (
            <article className="fb-tile fb-a">
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <div className="fb-viz fb-viz-inbox" aria-hidden="true">
                {['Refund request', 'Order #4471 delayed', 'Wholesale inquiry', 'Address change'].map((t, i) => (
                  <div key={t} className={i === 0 ? 'on' : ''}>
                    <i />
                    <span>{t}</span>
                    <em>{['Billing', 'Shipping', 'Sales', 'Orders'][i]}</em>
                  </div>
                ))}
              </div>
            </article>
          )}
          {b && (
            <article className="fb-tile fb-b">
              <h3>{b.title}</h3>
              <p>{b.text}</p>
              <div className="fb-viz fb-viz-ring" aria-hidden="true">
                <svg viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="48" />
                  <circle cx="60" cy="60" r="48" className="fill" />
                </svg>
                <span className="fb-ring-label">
                  <strong>2m 40s</strong>
                  <small>median first reply</small>
                </span>
              </div>
            </article>
          )}
          {c && (
            <article className="fb-tile fb-c">
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <div className="fb-viz fb-viz-langs" aria-hidden="true">
                <span>EN</span><span>FR</span><span>ES</span>
              </div>
            </article>
          )}
          {d && (
            <article className="fb-tile fb-d">
              <h3>{d.title}</h3>
              <p>{d.text}</p>
              <div className="fb-viz fb-viz-toggles" aria-hidden="true">
                <div><span>Auto-tag by intent</span><i className="on" /></div>
                <div><span>Escalate VIP customers</span><i className="on" /></div>
                <div><span>Close after 7 days idle</span><i /></div>
              </div>
            </article>
          )}
          {e && (
            <article className="fb-tile fb-e">
              <h3>{e.title}</h3>
              <p>{e.text}</p>
              <div className="fb-viz fb-viz-apps" aria-hidden="true">
                {Array.from({ length: 8 }, (_, i) => <i key={i} />)}
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}
