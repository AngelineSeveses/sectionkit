export default function CtaEditorialLink({ prompt, linkText, linkUrl, email, background, ink, spacing }) {
  return (
    <section className="lp-section cta-editorial-link" data-spacing={spacing} style={{ '--bg': background, '--ink': ink }}>
      <div className="lp-container">
        <p className="cel-prompt">{prompt}</p>
        <a className="cel-link" href={linkUrl}>
          <span>{linkText}</span>
          <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 36L36 12M16 12h20v20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" /></svg>
        </a>
        <p className="cel-email">
          Or write to <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </section>
  )
}
