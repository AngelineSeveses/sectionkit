import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import CodeBlock from './CodeBlock'
import { baseCss, loadSectionSource } from '../../services/sectionLoader'
import {
  buildCss,
  buildHtmlDocument,
  buildHtmlSnippet,
  buildReact,
  componentName,
  downloadText,
  renderMarkup,
} from '../../services/exportService'
import { useToast } from '../../context/ToastContext'

export default function CodePanel({ entry, section, props }) {
  const [format, setFormat] = useState('html')
  const [markup, setMarkup] = useState('')
  const [source, setSource] = useState('')
  const notify = useToast()

  // Re-render the export from the real component whenever props change.
  useEffect(() => {
    if (section.status !== 'ready') return
    let cancelled = false
    const t = setTimeout(() => {
      renderMarkup(section.Component, props)
        .then((m) => !cancelled && setMarkup(m))
        .catch(() => !cancelled && setMarkup('<!-- Export failed to render -->'))
    }, 150)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [section, props])

  useEffect(() => {
    let cancelled = false
    loadSectionSource(entry).then((s) => !cancelled && setSource(s))
    return () => {
      cancelled = true
    }
  }, [entry])

  const css = section.status === 'ready' ? buildCss(baseCss, section.css) : ''
  const react = source ? buildReact(entry, source, props) : null
  const name = componentName(entry)
  const rootClass = section.css?.match(/^\.([a-z][a-z0-9-]*)/m)?.[1] ?? 'lp-section'

  return (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      <ToggleButtonGroup exclusive size="small" value={format} onChange={(_, v) => v && setFormat(v)} aria-label="Code format" fullWidth>
        <ToggleButton value="html">HTML</ToggleButton>
        <ToggleButton value="css">CSS</ToggleButton>
        <ToggleButton value="react">React</ToggleButton>
      </ToggleButtonGroup>

      {format === 'html' && (
        <>
          <Typography variant="body2" color="text.secondary">
            Rendered from the component with your current edits. Pair it with the CSS tab.
          </Typography>
          <CodeBlock
            label={`${entry.slug}.html`}
            code={markup ? buildHtmlSnippet(entry, markup) : ''}
            successMessage="Copied HTML markup"
            actions={
              <Button
                size="small"
                disabled={!markup}
                startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: '15px !important' }} />}
                onClick={() => {
                  downloadText(`${entry.slug}.html`, buildHtmlDocument(entry, markup, css))
                  notify(`Downloaded ${entry.slug}.html`)
                }}
                sx={{ minHeight: 28, fontSize: 12 }}
              >
                Page
              </Button>
            }
          />
        </>
      )}

      {format === 'css' && (
        <>
          <Typography variant="body2" color="text.secondary">
            Scoped to <code>.{rootClass}</code>. The base layer only needs to be included once per page.
          </Typography>
          <CodeBlock label={`${name}.css`} code={css} successMessage="Copied CSS" />
        </>
      )}

      {format === 'react' && (
        <>
          <Typography variant="body2" color="text.secondary">
            The component's actual source. Import its CSS file alongside it; content arrives as props.
          </Typography>
          <CodeBlock label={`${name}.jsx`} code={react?.component ?? ''} successMessage={`Copied ${name}.jsx`} maxHeight={360} />
          <CodeBlock label="Usage with current props" code={react?.usage ?? ''} successMessage="Copied usage example" maxHeight={260} />
        </>
      )}
    </Box>
  )
}
