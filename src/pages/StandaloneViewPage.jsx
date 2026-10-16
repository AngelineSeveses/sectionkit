import { useEffect, useMemo, useRef } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { sectionBySlug } from '../data/sectionRegistry'
import { readCustomization } from '../services/customizationService'
import { sanitizeProps } from '../utils/validation'
import { useSection } from '../components/preview/useSection'
import { useElementSize } from '../hooks/useElementSize'
import PreviewFrame from '../components/preview/PreviewFrame'
import NotFoundPage from './NotFoundPage'

/** Full-window render at the real browser width, with saved edits applied. */
export default function StandaloneViewPage() {
  const { slug } = useParams()
  const entry = sectionBySlug.get(slug)
  const section = useSection(entry)
  const ref = useRef(null)
  const { width } = useElementSize(ref)
  const props = useMemo(() => (entry ? sanitizeProps(entry.fields, readCustomization(entry) ?? entry.defaults) : {}), [entry])

  useEffect(() => {
    if (entry) document.title = `${entry.name} · Full view`
  }, [entry])

  if (!entry) return <NotFoundPage message="That section doesn’t exist." />

  return (
    <Box ref={ref} component="main" id="main" sx={{ minHeight: '100dvh', bgcolor: 'custom.canvas' }}>
      <Button
        component={RouterLink}
        to={`/c/${entry.slug}`}
        size="small"
        variant="outlined"
        startIcon={<ArrowBackRoundedIcon sx={{ fontSize: '16px !important' }} />}
        sx={{
          position: 'fixed',
          left: 12,
          bottom: 12,
          zIndex: 10,
          backdropFilter: 'blur(10px)',
          bgcolor: (t) => (t.palette.mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(34,35,32,0.85)'),
          boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
        }}
      >
        Back to details
      </Button>
      {section.status === 'ready' && width > 0 ? (
        <PreviewFrame css={section.css} fonts={entry.fonts} width={width} title={entry.name}>
          <section.Component {...props} />
        </PreviewFrame>
      ) : (
        <Skeleton variant="rectangular" sx={{ height: 600 }} />
      )}
    </Box>
  )
}
