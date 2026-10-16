export default function BannerOfferCode({ eyebrow, offer, details, code, expires, ctaLabel, ctaUrl, finePrint, background, ink, accent }) {
  return (
    <section className="lp-section banner-offer-code" style={{ '--bg': background, '--ink': ink, '--accent': accent }}>
      <div className="lp-container boc-inner">
        <div className="boc-offer">
          <p className="boc-eyebrow">{eyebrow}</p>
          <p className="boc-headline">{offer}</p>
          <p className="boc-details">{details}</p>
        </div>
        <div className="boc-code-wrap">
          <p className="boc-code-label">Use code at checkout</p>
          <p className="boc-code">
            <span>{code}</span>
          </p>
          <p className="boc-expires">{expires}</p>
        </div>
        <div className="boc-action">
          <a className="lp-btn boc-cta" href={ctaUrl}>{ctaLabel}</a>
        </div>
      </div>
      {finePrint && <p className="lp-container boc-fine">{finePrint}</p>}
    </section>
  )
}
