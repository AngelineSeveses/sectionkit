import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { sectionBySlug } from '../data/sectionRegistry'
import { readCustomization } from '../services/customizationService'
import { sanitizeProps } from '../utils/validation'
import { baseCss, googleFontsHref } from '../services/sectionLoader'
import { useSection } from '../components/preview/useSection'
import NotFoundPage from './NotFoundPage'

// Unlike the other previews, the full view renders the section straight into
// this document rather than an iframe, so design-capture tools (Figma plugins,
// html.to.design) can read it. The section's CSS and fonts are added to <head>
// only while this page is open.
function useSectionStyles(css, fonts) {
  useEffect(() => {
    if (css == null) return
    const nodes = []
    const href = googleFontsHref(fonts)
    if (href) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      nodes.push(link)
    }
    for (const text of [baseCss, css]) {
      const style = document.createElement('style')
      style.textContent = text
      nodes.push(style)
    }
    for (const n of nodes) {
      n.dataset.sectionkitView = ''
      document.head.appendChild(n)
    }
    return () => nodes.forEach((n) => n.remove())
  }, [css, fonts])
}

// Shows the back button while the pointer moves, then hides it so it stays
// out of screenshots and design captures. Keyboard focus keeps it visible.
function useIdleVisible(delay = 2500) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    let timer = setTimeout(() => setVisible(false), delay)
    const wake = () => {
      setVisible(true)
      clearTimeout(timer)
      timer = setTimeout(() => setVisible(false), delay)
    }
    window.addEventListener('pointermove', wake)
    window.addEventListener('keydown', wake)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('pointermove', wake)
      window.removeEventListener('keydown', wake)
    }
  }, [delay])
  return visible
}

// Links and forms inside the section must not navigate away from the view.
function stopNavigation(e) {
  const a = e.target.closest?.('a[href]')
  if (!a) return
  e.preventDefault()
  const href = a.getAttribute('href')
  if (href?.startsWith('#') && href.length > 1) {
    document.getElementById(href.slice(1))?.scrollIntoView({ block: 'start' })
  }
}

/** Full-window render at the real browser width, with saved edits applied. */
export default function StandaloneViewPage() {
  const { slug } = useParams()
  const entry = sectionBySlug.get(slug)
  const section = useSection(entry)
  const props = useMemo(() => (entry ? sanitizeProps(entry.fields, readCustomization(entry) ?? entry.defaults) : {}), [entry])
  const ready = section.status === 'ready'
  useSectionStyles(ready ? section.css : null, entry?.fonts)
  const showBack = useIdleVisible()

  useEffect(() => {
    if (entry) document.title = `${entry.name} · Full view`
  }, [entry])

  if (!entry) return <NotFoundPage message="That section doesn’t exist." />

  return (
    <Box component="main" id="main" sx={{ minHeight: '100dvh', bgcolor: '#ffffff' }}>
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
          visibility: showBack ? 'visible' : 'hidden',
          '&:focus-visible': { visibility: 'visible' },
          backdropFilter: 'blur(10px)',
          bgcolor: (t) => (t.palette.mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(34,35,32,0.85)'),
          boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
        }}
      >
        Back to details
      </Button>
      {ready ? (
        // Resets the two app-wide styles that would otherwise reach the section:
        // dark-mode color-scheme (form controls) and the app's font features.
        <div
          onClick={stopNavigation}
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'flow-root', background: '#ffffff', colorScheme: 'light', fontFeatureSettings: 'normal', color: '#000000' }}
        >
          <section.Component {...props} />
        </div>
      ) : (
        <Skeleton variant="rectangular" sx={{ height: 600 }} />
      )}
    </Box>
  )
}
