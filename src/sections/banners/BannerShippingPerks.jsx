const icons = {
  truck: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="7" cy="17.5" r="1.8" fill="var(--bg)" stroke="currentColor" strokeWidth="1.7" /><circle cx="17" cy="17.5" r="1.8" fill="var(--bg)" stroke="currentColor" strokeWidth="1.7" /></>,
  return: <path d="M9 7L5 11l4 4M5 11h10a4 4 0 010 8h-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M8.5 10.5V7.5a3.5 3.5 0 017 0v3" fill="none" stroke="currentColor" strokeWidth="1.7" /></>,
  leaf: <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14zm0 0l7-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  maple: <path d="M12 3l1.6 3.4 2.6-1-0.6 3.6 3-0.8-1.4 3 2.3 1.2-4.5 2.6.6 2-3.6-.7V21h-1v-3.7l-3.6.7.6-2-4.5-2.6 2.3-1.2-1.4-3 3 .8-.6-3.6 2.6 1z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />,
  chat: <path d="M4.5 18.5l1-3.6A7.5 7.5 0 1112 19.5a7.6 7.6 0 01-3.8-1z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
}

export default function BannerShippingPerks({ perks, background, ink, divider }) {
  return (
    <section className="lp-section banner-shipping-perks" data-divider={divider} style={{ '--bg': background, '--ink': ink }}>
      <ul className="lp-container bsp-list">
        {perks.map((p) => (
          <li key={p.title}>
            <svg viewBox="0 0 24 24" aria-hidden="true">{icons[p.icon] ?? icons.truck}</svg>
            <span>
              <strong>{p.title}</strong>
              {p.detail}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
