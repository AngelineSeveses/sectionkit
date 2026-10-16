function Cell({ value }) {
  const v = value.trim()
  if (v === 'yes') {
    return (
      <span className="cpm-yes">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span className="lp-sr-only">Included</span>
      </span>
    )
  }
  if (v === 'no' || v === '') {
    return (
      <span className="cpm-no">
        <span aria-hidden="true">—</span>
        <span className="lp-sr-only">Not included</span>
      </span>
    )
  }
  return <span>{v}</span>
}

export default function ComparePlanMatrix({ heading, plans, groups, highlighted, accent, background, spacing }) {
  const planList = plans.split(',').map((p) => p.trim())
  return (
    <section className="lp-section compare-plan-matrix" data-spacing={spacing} style={{ '--accent': accent, '--bg': background, '--cols': planList.length }}>
      <div className="lp-container">
        <h2 className="cpm-heading">{heading}</h2>
        <div className="cpm-scroll" tabIndex={0} role="region" aria-label={`${heading}, scrollable`}>
          <table className="cpm-table">
            <thead>
              <tr>
                <td />
                {planList.map((p, i) => (
                  <th key={p} scope="col" data-hl={i === highlighted - 1}>{p}</th>
                ))}
              </tr>
            </thead>
            {groups.map((g) => (
              <tbody key={g.title}>
                <tr className="cpm-group">
                  <th scope="rowgroup" colSpan={planList.length + 1}>{g.title}</th>
                </tr>
                {g.rows.split(';').map((line) => {
                  const [label, ...values] = line.split('|')
                  return (
                    <tr key={label}>
                      <th scope="row">{label.trim()}</th>
                      {planList.map((p, i) => (
                        <td key={p} data-hl={i === highlighted - 1}>
                          <Cell value={values[i] ?? ''} />
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  )
}
