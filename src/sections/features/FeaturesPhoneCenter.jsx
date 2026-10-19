// Up to six features: the first half sit left of the phone, the rest on the right.
// The phone screen is drawn in HTML so it can be recolored.
function Item({ f }) {
  return (
    <li>
      <span className="fpc-dot" aria-hidden="true" />
      <h3>{f.title}</h3>
      <p>{f.text}</p>
    </li>
  )
}

export default function FeaturesPhoneCenter({ heading, intro, features, appName, balance, ctaLabel, ctaUrl, accent, background, spacing }) {
  const list = features.slice(0, 6)
  const half = Math.ceil(list.length / 2)
  return (
    <section className="lp-section features-phone-center" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container">
        <div className="fpc-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="fpc-grid">
          <ul className="fpc-col fpc-left">
            {list.slice(0, half).map((f) => (
              <Item key={f.title} f={f} />
            ))}
          </ul>
          <div className="fpc-phone" aria-hidden="true">
            <div className="fpc-screen">
              <div className="fpc-top">
                <span>9:41</span>
                <span className="fpc-notch" />
                <span>100%</span>
              </div>
              <p className="fpc-app">{appName}</p>
              <div className="fpc-balance">
                <small>Available balance</small>
                <strong>{balance}</strong>
                <span className="fpc-chip">+$1,240 this month</span>
              </div>
              <div className="fpc-bars">
                {[42, 64, 38, 80, 56, 92, 70].map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
              <ul className="fpc-tx">
                <li>
                  <span>Client payment</span>
                  <b>+$2,400</b>
                </li>
                <li>
                  <span>Office rent</span>
                  <b>−$1,850</b>
                </li>
                <li>
                  <span>GST/HST set aside</span>
                  <b>−$312</b>
                </li>
              </ul>
            </div>
          </div>
          <ul className="fpc-col fpc-right">
            {list.slice(half).map((f) => (
              <Item key={f.title} f={f} />
            ))}
          </ul>
        </div>
        <div className="fpc-foot">
          <a className="lp-btn fpc-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
    </section>
  )
}
