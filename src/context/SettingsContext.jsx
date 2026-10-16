import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const KEY = 'sectionkit:settings'
const defaults = { density: 'comfortable', sidebarOpen: true }
const SettingsContext = createContext({ ...defaults, update: () => {} })

function read() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '{}')
    return {
      density: parsed.density === 'compact' ? 'compact' : 'comfortable',
      sidebarOpen: parsed.sidebarOpen !== false,
    }
  } catch {
    return defaults
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings))
    } catch {
      // ignore
    }
  }, [settings])

  const update = useCallback((patch) => setSettings((s) => ({ ...s, ...patch })), [])
  const value = useMemo(() => ({ ...settings, update }), [settings, update])
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  return useContext(SettingsContext)
}
