import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { filterGroups } from '../data/taxonomy'

const SORTS = ['relevance', 'name', 'recent', 'category']

/** Library state (search, filters, sort, page) lives in the URL so it survives navigation. */
export function useLibraryQuery() {
  const [params, setParams] = useSearchParams()

  const state = useMemo(() => {
    const filters = {}
    for (const g of filterGroups) {
      const raw = params.get(g.param)
      const valid = new Set(g.options.map((o) => o.id))
      filters[g.key] = raw ? raw.split(',').filter((v) => valid.has(v)) : []
    }
    const sort = SORTS.includes(params.get('sort')) ? params.get('sort') : 'relevance'
    const page = Math.max(1, parseInt(params.get('page') ?? '1', 10) || 1)
    return { query: params.get('q') ?? '', filters, sort, page }
  }, [params])

  const patch = useCallback(
    (changes, { resetPage = true } = {}) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          for (const [k, v] of Object.entries(changes)) {
            if (v === null || v === undefined || v === '' || (Array.isArray(v) && !v.length)) next.delete(k)
            else next.set(k, Array.isArray(v) ? v.join(',') : String(v))
          }
          if (resetPage && !('page' in changes)) next.delete('page')
          if (next.get('sort') === 'relevance') next.delete('sort')
          if (next.get('page') === '1') next.delete('page')
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )

  const toggleFilter = useCallback(
    (groupKey, value) => {
      const g = filterGroups.find((x) => x.key === groupKey)
      const current = state.filters[groupKey]
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      patch({ [g.param]: next })
    },
    [state.filters, patch],
  )

  const clearFilters = useCallback(() => {
    patch(Object.fromEntries(filterGroups.map((g) => [g.param, null])))
  }, [patch])

  // One URL update: React Router does not chain consecutive functional updates.
  const clearAll = useCallback(() => {
    patch({ q: null, ...Object.fromEntries(filterGroups.map((g) => [g.param, null])) })
  }, [patch])

  return {
    ...state,
    setQuery: (q) => patch({ q }),
    setSort: (sort) => patch({ sort }),
    setPage: (page) => patch({ page }, { resetPage: false }),
    toggleFilter,
    clearFilters,
    clearAll,
  }
}
