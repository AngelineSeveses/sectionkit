export default function FaqGrid({ heading, items, background, ink, spacing }) {
  return (
    <section className="lp-section faq-grid" data-spacing={spacing} style={{ '--bg': background, '--ink': ink }}>
      <div className="lp-container">
        <h2>{heading}</h2>
        <dl className="fg-list">
          {items.map((it) => (
            <div key={it.question}>
              <dt>{it.question}</dt>
              <dd>{it.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
