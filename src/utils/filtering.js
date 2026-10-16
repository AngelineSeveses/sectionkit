// Pure search, filter, facet and sort functions. They take entries as input
// (no registry import) so they are easy to test with fixtures.

export const FILTER_KEYS = ['industries', 'goals', 'layout', 'styles', 'markets', 'traits']

const valuesOf = (entry, key) => {
  const v = entry[key]
  return Array.isArray(v) ? v : v ? [v] : []
}

export function tokenize(query) {
  return (query ?? '')
    .toLowerCase()
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter(Boolean)
}

/** Relevance score; 0 means the entry does not match every token. */
export function scoreEntry(entry, tokens) {
  if (!tokens.length) return 1
  const name = entry.name.toLowerCase()
  const text = entry.searchText ?? name
  let score = 0
  for (const t of tokens) {
    if (!text.includes(t)) return 0
    if (name.includes(t)) score += name.split(/\s+/).some((w) => w.startsWith(t)) ? 6 : 4
    else if ((entry.tags ?? []).some((tag) => tag.includes(t))) score += 3
    else if (entry.category.includes(t)) score += 2.5
    else if (entry.description.toLowerCase().includes(t)) score += 1.5
    else score += 1
  }
  return score
}

/** Within a group, any selected value matches (OR). Across groups, all must match (AND). */
export function matchesFilters(entry, filters, ignoreKey) {
  for (const key of FILTER_KEYS) {
    if (key === ignoreKey) continue
    const selected = filters[key]
    if (!selected?.length) continue
    const values = valuesOf(entry, key)
    if (!selected.some((s) => values.includes(s))) return false
  }
  return true
}

export function filterSections(entries, { category, query, filters = {}, ids } = {}) {
  const tokens = tokenize(query)
  const out = []
  for (const entry of entries) {
    if (category && entry.category !== category) continue
    if (ids && !ids.has(entry.id)) continue
    if (!matchesFilters(entry, filters)) continue
    const score = scoreEntry(entry, tokens)
    if (score === 0) continue
    out.push({ entry, score })
  }
  return out
}

export function sortResults(results, sort, categoryOrder = {}) {
  const arr = [...results]
  const byName = (a, b) => a.entry.name.localeCompare(b.entry.name)
  switch (sort) {
    case 'name':
      return arr.sort(byName)
    case 'recent':
      return arr.sort((a, b) => (b.entry.addedAt ?? '').localeCompare(a.entry.addedAt ?? '') || byName(a, b))
    case 'category':
      return arr.sort(
        (a, b) => (categoryOrder[a.entry.category] ?? 99) - (categoryOrder[b.entry.category] ?? 99) || byName(a, b),
      )
    case 'relevance':
    default:
      return arr.sort(
        (a, b) =>
          b.score - a.score ||
          (categoryOrder[a.entry.category] ?? 99) - (categoryOrder[b.entry.category] ?? 99) ||
          (a.entry.order ?? 0) - (b.entry.order ?? 0) ||
          byName(a, b),
      )
  }
}

/**
 * Counts per option for one filter group, applying every other active
 * constraint. Shows how many results selecting the option would add.
 */
export function facetCounts(entries, { category, query, filters = {}, ids } = {}, key) {
  const tokens = tokenize(query)
  const counts = {}
  for (const entry of entries) {
    if (category && entry.category !== category) continue
    if (ids && !ids.has(entry.id)) continue
    if (!matchesFilters(entry, filters, key)) continue
    if (scoreEntry(entry, tokens) === 0) continue
    for (const v of valuesOf(entry, key)) counts[v] = (counts[v] ?? 0) + 1
  }
  return counts
}

export function activeFilterCount(filters) {
  return FILTER_KEYS.reduce((n, k) => n + (filters[k]?.length ?? 0), 0)
}
