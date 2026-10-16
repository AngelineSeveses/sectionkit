// Favorites are stored as an ordered array of section IDs in localStorage.

const KEY = 'sectionkit:favorites'

export function readFavorites(storage = globalThis.localStorage) {
  try {
    const parsed = JSON.parse(storage?.getItem(KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function writeFavorites(ids, storage = globalThis.localStorage) {
  try {
    storage?.setItem(KEY, JSON.stringify([...new Set(ids)]))
    return true
  } catch {
    return false
  }
}

export function toggleFavorite(ids, id) {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
}

export const FAVORITES_KEY = KEY
