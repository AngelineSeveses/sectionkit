import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { categories } from '../data/categories'
import { countsByCategory, sections, rejectedSections } from '../data/sectionRegistry'

export default function CoveragePage() {
  const totalTarget = categories.reduce((n, c) => n + c.target, 0)
  const total = sections.length

  return (
    <Box component="main" id="main" sx={{ maxWidth: 880, mx: 'auto', px: { xs: 2, sm: 3 }, py: { xs: 3, md: 5 } }}>
      <Typography variant="h1">Library coverage</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 640 }}>
        Implemented sections compared with the long-term target for each category. Counts come straight from the
        registry; only entries that pass validation and resolve to a component file are counted.
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, mt: 3, mb: 4, flexWrap: 'wrap' }}>
        <Box>
          <Typography sx={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{total}</Typography>
          <Typography variant="body2" color="text.secondary">implemented sections</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{totalTarget}</Typography>
          <Typography variant="body2" color="text.secondary">planned across {categories.length} categories</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
            {Math.round((total / totalTarget) * 100)}%
          </Typography>
          <Typography variant="body2" color="text.secondary">of the target</Typography>
        </Box>
      </Box>

      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': { textAlign: 'left', py: 1.1, px: 1, borderBottom: 1, borderColor: 'divider', typography: 'body2' },
          '& th:first-of-type, & td:first-of-type': { pl: 0 },
          '& th:last-of-type, & td:last-of-type': { pr: 0 },
          '& th': { color: 'text.secondary', fontWeight: 500, typography: 'caption' },
          '& .progress-col': { display: { xs: 'none', sm: 'table-cell' } },
        }}
      >
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col" className="progress-col" style={{ width: '40%' }}>Progress</th>
            <th scope="col" style={{ textAlign: 'right' }}>Implemented</th>
            <th scope="col" style={{ textAlign: 'right' }}>Target</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => {
            const n = countsByCategory[c.id] ?? 0
            const pct = Math.min(100, (n / c.target) * 100)
            return (
              <tr key={c.id}>
                <td>
                  <Link component={RouterLink} to={`/category/${c.id}`} color="inherit" underline="hover">
                    {c.label}
                  </Link>
                </td>
                <td className="progress-col">
                  <Box sx={{ height: 6, borderRadius: 3, bgcolor: 'custom.subtle', overflow: 'hidden', mr: 2 }} role="presentation">
                    <Box sx={{ height: '100%', width: `${pct}%`, bgcolor: 'primary.main', borderRadius: 3 }} />
                  </Box>
                </td>
                <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{n}</td>
                <Box component="td" sx={{ textAlign: 'right', color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}>{c.target}</Box>
              </tr>
            )
          })}
        </tbody>
      </Box>

      {rejectedSections.length > 0 && (
        <Box sx={{ mt: 4, p: 2, borderRadius: 2, border: 1, borderColor: 'error.main' }}>
          <Typography variant="h3" color="error">{rejectedSections.length} registry entries failed validation</Typography>
          <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2.5 }}>
            {rejectedSections.map((r) => (
              <Typography component="li" variant="body2" key={r.id + r.file}>
                <code>{r.id}</code> ({r.file}): {r.problems.join('; ')}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      <Box component="section" sx={{ mt: 5 }}>
        <Typography variant="h2">Adding a section</Typography>
        <Box component="ol" sx={{ pl: 2.5, mt: 1.5, display: 'grid', gap: 1, '& li': { typography: 'body1' } }}>
          <li>
            Create <code>src/sections/&lt;category&gt;/MySection.jsx</code> and <code>MySection.css</code>. The root element
            needs <code>className="lp-section my-section"</code>; scope every rule under <code>.my-section</code>.
          </li>
          <li>
            Add a metadata entry to <code>src/data/sections/&lt;category&gt;.js</code> with <code>file: '&lt;category&gt;/MySection'</code>.
            Fields defined with the helpers in <code>src/data/fields.js</code> become both the default props and the editor.
          </li>
          <li>Reload. Invalid entries are listed on this page and excluded from the gallery.</li>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
          The full guide is in the project README.
        </Typography>
      </Box>
    </Box>
  )
}
