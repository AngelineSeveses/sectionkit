export default function CaseStudyResultsTable({ heading, intro, rows, footnote, accent, background, spacing }) {
  return (
    <section className="lp-section case-study-results-table" data-spacing={spacing} style={{ '--accent': accent, '--bg': background }}>
      <div className="lp-container">
        <div className="csr-head">
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="csr-table" role="table" aria-label={heading}>
          <div className="csr-row csr-row-head" role="row">
            <span role="columnheader">Client</span>
            <span role="columnheader">Where they started</span>
            <span role="columnheader">What changed</span>
            <span role="columnheader">Result</span>
          </div>
          {rows.map((r) => (
            <div className="csr-row" role="row" key={r.client}>
              <span role="cell" className="csr-client">
                <strong>{r.client}</strong>
                <small>{r.sector}</small>
              </span>
              <span role="cell" data-label="Where they started">{r.before}</span>
              <span role="cell" data-label="What changed">{r.change}</span>
              <span role="cell" className="csr-result" data-label="Result">
                <strong>{r.result}</strong>
                <small>{r.period}</small>
              </span>
            </div>
          ))}
        </div>
        {footnote && <p className="csr-foot">{footnote}</p>}
      </div>
    </section>
  )
}
