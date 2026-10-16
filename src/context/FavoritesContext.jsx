import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FAVORITES_KEY, readFavorites, toggleFavorite, writeFavorites } from '../services/favoritesService'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(() => readFavorites())

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === FAVORITES_KEY) setIds(readFavorites())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const idsRef = useRef(ids)
  useEffect(() => {
    idsRef.current = ids
  }, [ids])

  // Returns true when the id was added, false when removed.
  const toggle = useCallback((id) => {
    const next = toggleFavorite(idsRef.current, id)
    idsRef.current = next
    writeFavorites(next)
    setIds(next)
    return next.includes(id)
  }, [])

  const clear = useCallback(() => {
    setIds([])
    writeFavorites([])
  }, [])

  const value = useMemo(() => {
    const set = new Set(ids)
    return { ids, set, has: (id) => set.has(id), toggle, clear }
  }, [ids, toggle, clear])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
