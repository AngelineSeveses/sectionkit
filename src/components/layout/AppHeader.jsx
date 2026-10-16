import { useEffect, useRef, useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined'
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined'
import { useColorMode } from '../../theme/ThemeContext'
import { useFavorites } from '../../context/FavoritesContext'
import SettingsMenu from './SettingsMenu'

const LIBRARY_PATHS = /^\/(category\/[^/]+|favorites)?$/

export function Wordmark() {
  return (
    <Box
      component={RouterLink}
      to="/"
      aria-label="Sectionkit home"
      sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary', textDecoration: 'none', flexShrink: 0, borderRadius: 1 }}
    >
      <Box component="svg" viewBox="0 0 32 32" sx={{ width: 22, height: 22 }} aria-hidden>
        <rect width="32" height="32" rx="7" fill="currentColor" />
        <rect x="8" y="8" width="16" height="4" rx="1" fill="var(--wm-fg)" />
        <rect x="8" y="14" width="7" height="10" rx="1" fill="var(--wm-fg)" />
        <rect x="17" y="14" width="7" height="10" rx="1" fill="var(--wm-fg)" opacity=".55" />
      </Box>
      <Typography
        component="span"
        sx={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.02em', display: { xs: 'none', sm: 'inline' } }}
      >
        Sectionkit
      </Typography>
    </Box>
  )
}

function HeaderSearch() {
  const location = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const onLibrary = LIBRARY_PATHS.test(location.pathname)
  const urlQuery = onLibrary ? params.get('q') ?? '' : ''
  const [value, setValue] = useState(urlQuery)
  const [syncedQuery, setSyncedQuery] = useState(urlQuery)
  const inputRef = useRef(null)
  const timer = useRef()

  // Adopt the URL value when it changes elsewhere (clear filters, back button).
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery)
    setValue(urlQuery)
  }

  // "/" focuses search, like most documentation sites.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const commit = (q) => {
    if (onLibrary) {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (q) next.set('q', q)
          else next.delete('q')
          next.delete('page')
          return next
        },
        { replace: true },
      )
    } else if (q) {
      navigate(`/?q=${encodeURIComponent(q)}`)
    }
  }

  const onChange = (e) => {
    const q = e.target.value
    setValue(q)
    clearTimeout(timer.current)
    if (onLibrary) timer.current = setTimeout(() => commit(q.trim()), 120)
  }

  return (
    <Box component="form" role="search" onSubmit={(e) => { e.preventDefault(); clearTimeout(timer.current); commit(value.trim()) }} sx={{ flex: 1, maxWidth: 520, minWidth: 0 }}>
      <TextField
        inputRef={inputRef}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            if (value) { setValue(''); commit('') } else e.currentTarget.querySelector('input')?.blur()
          }
        }}
        placeholder="Search sections, industries, goals…"
        size="small"
        fullWidth
        slotProps={{
          htmlInput: { 'aria-label': 'Search sections', type: 'search', enterKeyHint: 'search' },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton size="small" aria-label="Clear search" onClick={() => { setValue(''); commit('') }} sx={{ mr: -0.75, p: 0.5 }}>
                  <CloseRoundedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </InputAdornment>
            ) : (
              <InputAdornment position="end" sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Box
                  component="kbd"
                  sx={{ fontSize: 11, color: 'text.secondary', border: 1, borderColor: 'divider', borderRadius: 1, px: 0.75, lineHeight: '18px', fontFamily: 'inherit' }}
                >
                  /
                </Box>
              </InputAdornment>
            ),
            sx: {
              bgcolor: 'custom.subtle',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              '& input::-webkit-search-cancel-button': { display: 'none' },
            },
          },
        }}
      />
    </Box>
  )
}

export default function AppHeader({ onToggleSidebar, sidebarAvailable, sidebarLabel }) {
  const { mode, toggle } = useColorMode()
  const favorites = useFavorites()
  const nextMode = mode === 'light' ? 'dark' : 'light'

  return (
    <AppBar position="sticky" sx={{ '--wm-fg': (t) => t.palette.background.default }}>
      <Toolbar sx={{ px: { xs: 1.5, sm: 2 } }}>
        {sidebarAvailable && (
          <Tooltip title={sidebarLabel}>
            <IconButton onClick={onToggleSidebar} aria-label={sidebarLabel} edge="start" size="small">
              <ViewSidebarOutlinedIcon sx={{ fontSize: 20, transform: 'scaleX(-1)' }} />
            </IconButton>
          </Tooltip>
        )}
        <Wordmark />
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0, px: { xs: 0.5, md: 2 } }}>
          <HeaderSearch />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          <Tooltip title="Favorites">
            <IconButton component={RouterLink} to="/favorites" aria-label={`Favorites (${favorites.ids.length})`} size="small">
              <Badge
                badgeContent={favorites.ids.length}
                max={99}
                sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16, px: 0.5, bgcolor: 'text.primary', color: 'background.default' } }}
              >
                <BookmarksOutlinedIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title={`Switch to ${nextMode} mode`}>
            <IconButton onClick={toggle} aria-label={`Switch to ${nextMode} mode`} size="small">
              {mode === 'light' ? <DarkModeOutlinedIcon sx={{ fontSize: 20 }} /> : <LightModeOutlinedIcon sx={{ fontSize: 20 }} />}
            </IconButton>
          </Tooltip>
          <SettingsMenu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
