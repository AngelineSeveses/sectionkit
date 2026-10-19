// The product mock is drawn in HTML/CSS and sized in em, scaled from the container width, so the
// numbered markers stay on the same spots at every screen size. Up to four callouts.
export default function FeaturesAnnotated({ heading, intro, callouts, appName, clientName, accent, background, radius, spacing }) {
  const items = callouts.slice(0, 4)
  return (
    <section className="lp-section features-annotated" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--radius': `${radius}px` }}>
      <div className="lp-container fan-grid">
        <div className="fan-copy">
          <h2>{heading}</h2>
          <p className="fan-intro">{intro}</p>
          <ol className="fan-legend">
            {items.map((c, i) => (
              <li key={c.title} data-slot={i + 1}>
                <span className="fan-num" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="fan-figure">
          <div className="fan-stage">
            <div className="fan-app" aria-hidden="true">
              <div className="fan-top">
                <span className="fan-logo" />
                <strong>{appName}</strong>
                <span className="fan-search" />
                <span className="fan-avatar" />
              </div>
              <div className="fan-body">
                <div className="fan-invoice">
                  <div className="fan-inv-head">
                    <div>
                      <small>Invoice 0142</small>
                      <b>{clientName}</b>
                    </div>
                    <span className="fan-pill">Paid by card</span>
                  </div>
                  <p className="fan-amount">$3,446.50</p>
                  <div className="fan-lines">
                    <p><span>Design retainer, March</span><span>2,400.00</span></p>
                    <p><span>Photography, half day</span><span>650.00</span></p>
                    <p className="fan-tax"><span>HST 13% (ON)</span><span>396.50</span></p>
                    <p className="fan-total"><span>Total</span><span>3,446.50</span></p>
                  </div>
                </div>
                <div className="fan-side">
                  <div className="fan-card">
                    <small>Reminders</small>
                    <p><span>3 days before due</span><i className="fan-toggle" /></p>
                    <p><span>On the due date</span><i className="fan-toggle" /></p>
                    <p><span>7 days late</span><i className="fan-toggle is-off" /></p>
                  </div>
                  <div className="fan-card">
                    <small>Payment link</small>
                    <span className="fan-link" />
                    <span className="fan-btn">Copy link</span>
                  </div>
                </div>
              </div>
            </div>
            {items.map((c, i) => (
              <span key={c.title} className="fan-spot" data-slot={i + 1} aria-hidden="true">{i + 1}</span>
            ))}
          </div>
          <figcaption className="lp-sr-only">Product screen with numbered markers matching the list of features.</figcaption>
        </figure>
      </div>
    </section>
  )
}
