import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PreviewFrame from '../components/preview/PreviewFrame'
import { useSection } from '../components/preview/useSection'
import { sections } from '../data/sectionRegistry'

// Development-only page: renders every section at one width (?w=390) so
// layout regressions (horizontal overflow, broken images) can be checked in bulk.
function QaFrame({ entry, width }) {
  const section = useSection(entry)
  if (section.status !== 'ready') return <Typography variant="caption">Loading {entry.id}…</Typography>
  return (
    <Box data-qa-id={entry.id} sx={{ width, outline: '1px solid #ccc', overflow: 'hidden' }}>
      <PreviewFrame css={section.css} fonts={entry.fonts} width={width} title={entry.id} interactive={false}>
        <section.Component {...entry.defaults} />
      </PreviewFrame>
    </Box>
  )
}

export default function QaPage() {
  const [params] = useSearchParams()
  const width = Number(params.get('w')) || 390
  const only = params.get('cat')
  const list = only ? sections.filter((s) => s.category === only) : sections

  useEffect(() => {
    // Exposed for automated checks from the browser console.
    window.__qaReport = () =>
      [...document.querySelectorAll('[data-qa-id] iframe')].map((f) => {
        const doc = f.contentDocument
        const root = doc?.documentElement
        const overflow = root ? root.scrollWidth - width : 0
        const offenders = []
        if (overflow > 1) {
          for (const el of doc.querySelectorAll('.lp-section *')) {
            const r = el.getBoundingClientRect()
            if (r.right > width + 1 && r.width > 0) offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} → ${Math.round(r.right)}`)
            if (offenders.length > 4) break
          }
        }
        const broken = [...(doc?.images ?? [])].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src.slice(0, 80))
        return { id: f.title, overflow, offenders, broken }
      })
    return () => {
      delete window.__qaReport
    }
  }, [width])

  return (
    <Box component="main" sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start' }}>
      {list.map((e) => (
        <QaFrame key={e.id} entry={e} width={width} />
      ))}
    </Box>
  )
}
