import { useEffect, useState } from 'react'
import { loadSection } from '../../services/sectionLoader'

/** Loads a section's component and CSS. `enabled` defers loading for off-screen cards. */
export function useSection(entry, enabled = true) {
  const [state, setState] = useState({ status: 'idle', entryId: null })

  useEffect(() => {
    if (!entry || !enabled) return
    let cancelled = false
    loadSection(entry)
      .then(({ Component, css }) => {
        if (!cancelled) setState({ status: 'ready', entryId: entry.id, Component, css })
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', entryId: entry.id, error })
      })
    return () => {
      cancelled = true
    }
  }, [entry, enabled])

  // Never return a previous entry's component while the next one loads.
  if (!entry || state.entryId !== entry.id) return { status: enabled ? 'loading' : 'idle' }
  return state
}
