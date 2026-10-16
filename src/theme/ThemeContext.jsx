import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createAppTheme } from './createAppTheme'
import { palettes } from './tokens'

const STORAGE_KEY = 'sectionkit:theme'
const ColorModeContext = createContext({ mode: 'light', toggle: () => {} })

function readInitialMode() {
  // index.html sets data-theme before the bundle loads; trust it first.
  const attr = document.documentElement.dataset.theme
  if (attr === 'light' || attr === 'dark') return attr
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Storage can be unavailable (private mode); fall through to system preference.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState(readInitialMode)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = mode
    root.style.colorScheme = mode
    root.style.background = palettes[mode].bg
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // Non-fatal: the mode still applies for this session.
    }
  }, [mode])

  const toggle = useCallback(() => setMode((m) => (m === 'light' ? 'dark' : 'light')), [])
  const theme = useMemo(() => createAppTheme(mode), [mode])
  const value = useMemo(() => ({ mode, toggle }), [mode, toggle])

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  return useContext(ColorModeContext)
}
