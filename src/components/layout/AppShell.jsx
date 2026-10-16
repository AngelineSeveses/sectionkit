import { useMemo, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppHeader from './AppHeader'
import { LayoutContext } from './LayoutContext'
import { useSettings } from '../../context/SettingsContext'

const LIBRARY_PATHS = /^\/(category\/[^/]+|favorites)?$/

export default function AppShell() {
  const location = useLocation()
  const settings = useSettings()
  const desktop = useMediaQuery((t) => t.breakpoints.up('md'))
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const onLibrary = LIBRARY_PATHS.test(location.pathname)

  const toggleSidebar = () => {
    if (desktop) settings.update({ sidebarOpen: !settings.sidebarOpen })
    else setMobileNavOpen((o) => !o)
  }
  const sidebarLabel = desktop
    ? settings.sidebarOpen
      ? 'Hide sidebar'
      : 'Show sidebar'
    : 'Categories and filters'

  const value = useMemo(() => ({ mobileNavOpen, setMobileNavOpen, desktop }), [mobileNavOpen, desktop])

  return (
    <LayoutContext.Provider value={value}>
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'absolute',
          left: 8,
          top: -48,
          zIndex: 2000,
          px: 1.5,
          py: 1,
          borderRadius: 1.5,
          bgcolor: 'text.primary',
          color: 'background.default',
          textDecoration: 'none',
          '&:focus': { top: 8 },
        }}
      >
        Skip to content
      </Box>
      <AppHeader onToggleSidebar={toggleSidebar} sidebarAvailable={onLibrary} sidebarLabel={sidebarLabel} />
      <Outlet />
      <ScrollRestoration getKey={(loc) => loc.pathname + loc.search} />
    </LayoutContext.Provider>
  )
}
