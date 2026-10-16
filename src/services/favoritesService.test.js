import { describe, expect, it } from 'vitest'
import { FAVORITES_KEY, readFavorites, toggleFavorite, writeFavorites } from './favoritesService'

function memoryStorage(initial = {}) {
  const data = { ...initial }
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = String(v)
    },
    data,
  }
}

describe('favoritesService', () => {
  it('round-trips ids through storage (survives a "reload")', () => {
    const storage = memoryStorage()
    writeFavorites(['a', 'b'], storage)
    // A new read simulates a page reload with the same storage.
    expect(readFavorites(storage)).toEqual(['a', 'b'])
  })

  it('de-duplicates on write', () => {
    const storage = memoryStorage()
    writeFavorites(['a', 'a', 'b'], storage)
    expect(JSON.parse(storage.data[FAVORITES_KEY])).toEqual(['a', 'b'])
  })

  it('toggles ids on and off', () => {
    expect(toggleFavorite([], 'a')).toEqual(['a'])
    expect(toggleFavorite(['a', 'b'], 'a')).toEqual(['b'])
  })

  it('recovers from corrupt or unexpected data', () => {
    expect(readFavorites(memoryStorage({ [FAVORITES_KEY]: '{not json' }))).toEqual([])
    expect(readFavorites(memoryStorage({ [FAVORITES_KEY]: '{"a":1}' }))).toEqual([])
    expect(readFavorites(memoryStorage({ [FAVORITES_KEY]: '["a", 3, null]' }))).toEqual(['a'])
  })

  it('reports failure when storage throws', () => {
    const broken = { getItem: () => { throw new Error('blocked') }, setItem: () => { throw new Error('full') } }
    expect(readFavorites(broken)).toEqual([])
    expect(writeFavorites(['a'], broken)).toBe(false)
  })
})
