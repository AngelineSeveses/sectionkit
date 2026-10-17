export default function BlogPodcastEpisodes({ showName, description, cover, listenLinks, episodes, allLabel, allUrl, background, accent, radius, spacing }) {
  return (
    <section className="lp-section blog-podcast-episodes" data-spacing={spacing} style={{ '--bg': background, '--accent': accent, '--radius': `${radius}px` }}>
      <div className="lp-container bpe-grid">
        <div className="bpe-show">
          <img src={cover} alt="" width="320" height="320" loading="lazy" />
          <h2>{showName}</h2>
          <p>{description}</p>
          <ul className="bpe-listen" aria-label="Listen on">
            {listenLinks.map((l) => (
              <li key={l.label}>
                <a href={l.url}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="bpe-episodes">
          <ol>
            {episodes.map((e) => (
              <li key={e.number} className="bpe-episode">
                <span className="bpe-num">{e.number}</span>
                <div className="bpe-body">
                  <h3>
                    <a href={e.url}>{e.title}</a>
                  </h3>
                  <p className="bpe-guest">{e.guest}</p>
                  <p className="bpe-meta">
                    <span>{e.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{e.duration}</span>
                  </p>
                </div>
                <a className="bpe-play" href={e.url} aria-label={`Play episode ${e.number}: ${e.title}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 6.5v11l9-5.5z" fill="currentColor" />
                  </svg>
                </a>
              </li>
            ))}
          </ol>
          <a className="bpe-all" href={allUrl}>
            {allLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
