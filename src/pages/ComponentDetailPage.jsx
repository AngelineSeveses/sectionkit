import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined'
import TabletMacOutlinedIcon from '@mui/icons-material/TabletMacOutlined'
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import { sectionBySlug, relatedSections } from '../data/sectionRegistry'
import { categoryById } from '../data/categories'
import { sanitizeProps } from '../utils/validation'
import { readCustomization, writeCustomization, clearCustomization } from '../services/customizationService'
import { buildElementor } from '../services/exportService'
import { useSection } from '../components/preview/useSection'
import { useToast } from '../context/ToastContext'
import PreviewCanvas from '../components/preview/PreviewCanvas'
import PropertyEditor from '../components/preview/PropertyEditor'
import CodePanel from '../components/preview/CodePanel'
import CodeBlock from '../components/preview/CodeBlock'
import DetailsPanel from '../components/preview/DetailsPanel'
import FavoriteButton from '../components/ui/FavoriteButton'
import SectionCard from '../components/library/SectionCard'
import NotFoundPage from './NotFoundPage'

const VIEWPORTS = [
  { id: 'desktop', label: 'Desktop', width: 1440, Icon: DesktopWindowsOutlinedIcon },
  { id: 'tablet', label: 'Tablet', width: 768, Icon: TabletMacOutlinedIcon },
  { id: 'mobile', label: 'Mobile', width: 390, Icon: PhoneIphoneOutlinedIcon },
]

const TABS = ['customize', 'details', 'code', 'elementor']

function useCustomization(entry) {
  const [values, setValues] = useState(() => (entry ? readCustomization(entry) ?? entry.defaults : {}))
  const [entryId, setEntryId] = useState(entry?.id)
  if (entry && entry.id !== entryId) {
    setEntryId(entry.id)
    setValues(readCustomization(entry) ?? entry.defaults)
  }
  const timer = useRef()

  const update = useCallback(
    (key, value) => {
      setValues((prev) => {
        const next = { ...prev, [key]: value }
        clearTimeout(timer.current)
        timer.current = setTimeout(() => writeCustomization(entry, next), 300)
        return next
      })
    },
    [entry],
  )

  const reset = useCallback(() => {
    clearTimeout(timer.current)
    clearCustomization(entry)
    setValues(entry.defaults)
  }, [entry])

  const edited = useMemo(() => entry && JSON.stringify(values) !== JSON.stringify(entry.defaults), [values, entry])
  return { values, update, reset, edited }
}

export default function ComponentDetailPage() {
  const { slug } = useParams()
  const entry = sectionBySlug.get(slug)
  const section = useSection(entry)
  const notify = useToast()
  const { values, update, reset, edited } = useCustomization(entry)
  const props = useMemo(() => (entry ? sanitizeProps(entry.fields, values) : {}), [entry, values])
  const [width, setWidth] = useState(1440)
  const [fit, setFit] = useState(true)
  const [tab, setTab] = useState('customize')
  const related = useMemo(() => (entry ? relatedSections(entry, 6) : []), [entry])

  useEffect(() => {
    if (entry) document.title = `${entry.name} · Sectionkit`
    return () => {
      document.title = 'Sectionkit'
    }
  }, [entry])

  const onBlockedAction = useCallback(
    (kind, href) => {
      notify(
        kind === 'form'
          ? 'Forms don’t submit in the preview. Wire the form action when you build the page.'
          : `Links are inactive in the preview${href && href !== '#' ? ` (points to ${href.slice(0, 60)})` : ''}`,
        'info',
      )
    },
    [notify],
  )

  if (!entry) return <NotFoundPage message="That section doesn’t exist, or its ID changed." />

  const category = categoryById[entry.category]
  const viewport = VIEWPORTS.find((v) => v.width === width)?.id ?? null

  return (
    <Box component="main" id="main" sx={{ px: { xs: 0, md: 3, lg: 4 }, pt: { xs: 2, md: 3 }, pb: 8 }}>
      {/* Title row */}
      <Box sx={{ px: { xs: 2, md: 0 }, mb: 2 }}>
        <Button
          component={RouterLink}
          to={`/category/${entry.category}`}
          size="small"
          startIcon={<ArrowBackRoundedIcon sx={{ fontSize: '16px !important' }} />}
          sx={{ ml: -1, mb: 1, color: 'text.secondary', fontWeight: 400 }}
        >
          {category.label}
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ minWidth: 0, maxWidth: 760 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="h1">{entry.name}</Typography>
              {edited && <Chip size="small" label="Edited" sx={{ bgcolor: 'custom.accentSoft', borderColor: 'transparent' }} />}
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.75 }}>
              {entry.description}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <FavoriteButton entry={entry} size="medium" />
            <Tooltip title="Open full-window view">
              <IconButton component={RouterLink} to={`/view/${entry.slug}`} aria-label="Open full-window view">
                <OpenInNewRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Viewport controls: sit above the canvas, never on top of it */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexWrap: 'wrap',
          px: { xs: 2, md: 0 },
          mb: 1.25,
        }}
      >
        <ToggleButtonGroup
          exclusive
          size="small"
          value={viewport}
          onChange={(_, v) => v && setWidth(VIEWPORTS.find((x) => x.id === v).width)}
          aria-label="Preview viewport"
        >
          {VIEWPORTS.map(({ id, label, width: w, Icon }) => (
            <ToggleButton key={id} value={id} aria-label={`${label}, ${w} pixels`}>
              <Icon sx={{ fontSize: 16 }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {label}
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="body2" sx={{ fontVariantNumeric: 'tabular-nums', color: 'text.secondary', minWidth: 64 }} aria-live="polite">
          {width}px
        </Typography>
        <Box sx={{ flex: 1 }} />
        <FormControlLabel
          control={<Switch size="small" checked={fit} onChange={(e) => setFit(e.target.checked)} />}
          label={<Typography variant="body2" color="text.secondary">Fit to panel</Typography>}
          sx={{ mr: 0, gap: 0.75, ml: 0 }}
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 380px' },
          gap: { xs: 3, lg: 3 },
          alignItems: 'start',
        }}
      >
        <PreviewCanvas
          entry={entry}
          section={section}
          props={props}
          width={width}
          onWidthChange={setWidth}
          fit={fit}
          onBlockedAction={onBlockedAction}
        />

        <Box
          component="aside"
          aria-label="Section tools"
          sx={{
            position: { lg: 'sticky' },
            top: { lg: 72 },
            maxHeight: { lg: 'calc(100dvh - 88px)' },
            display: 'flex',
            flexDirection: 'column',
            border: { xs: 0, md: 1 },
            borderTop: 1,
            borderColor: { xs: 'divider', md: 'divider' },
            borderRadius: { xs: 0, md: 2.5 },
            bgcolor: 'background.paper',
            mx: { xs: 0, md: 0 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider', pr: 1 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              aria-label="Section tools"
              variant="scrollable"
              scrollButtons={false}
              sx={{ flex: 1, px: 1 }}
            >
              <Tab value="customize" label="Customize" id="tab-customize" aria-controls="panel-customize" />
              <Tab value="details" label="Details" id="tab-details" aria-controls="panel-details" />
              <Tab value="code" label="Code" id="tab-code" aria-controls="panel-code" />
              <Tab value="elementor" label="Elementor" id="tab-elementor" aria-controls="panel-elementor" />
            </Tabs>
          </Box>
          <Box sx={{ overflowY: 'auto', p: 2, scrollbarWidth: 'thin' }}>
            {TABS.map((t) => (
              <Box key={t} role="tabpanel" id={`panel-${t}`} aria-labelledby={`tab-${t}`} hidden={tab !== t}>
                {tab === t && t === 'customize' && (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {edited ? 'Edits are saved in this browser.' : 'Showing default content.'}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        disabled={!edited}
                        onClick={() => {
                          reset()
                          notify('Restored default content and styles')
                        }}
                        startIcon={<RestartAltRoundedIcon sx={{ fontSize: '16px !important' }} />}
                      >
                        Reset
                      </Button>
                    </Box>
                    <PropertyEditor key={entry.id} entry={entry} values={values} onChange={update} />
                  </>
                )}
                {tab === t && t === 'details' && <DetailsPanel entry={entry} />}
                {tab === t && t === 'code' && <CodePanel entry={entry} section={section} props={props} />}
                {tab === t && t === 'elementor' && (
                  <Box sx={{ display: 'grid', gap: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      A manual build guide for Elementor's container layout, using your current colors.
                    </Typography>
                    <CodeBlock label="Elementor recipe" code={buildElementor(entry, props)} successMessage="Copied Elementor recipe" wrap maxHeight={560} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {related.length > 0 && (
        <Box component="section" aria-labelledby="related-heading" sx={{ mt: 6, px: { xs: 2, md: 0 } }}>
          <Typography id="related-heading" variant="h2" sx={{ mb: 2 }}>
            Related sections
          </Typography>
          <Box
            component="ul"
            sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
          >
            {related.map((r) => (
              <li key={r.id}>
                <SectionCard entry={r} />
              </li>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
