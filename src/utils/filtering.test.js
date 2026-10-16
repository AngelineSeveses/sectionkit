import { describe, expect, it } from 'vitest'
import { activeFilterCount, facetCounts, filterSections, matchesFilters, scoreEntry, sortResults, tokenize } from './filtering'

const make = (id, extra) => ({
  id,
  name: id,
  description: '',
  category: 'hero',
  industries: [],
  goals: [],
  layout: 'split',
  styles: [],
  markets: ['US', 'CA'],
  traits: [],
  tags: [],
  ...extra,
  searchText: [extra.name ?? id, extra.description ?? '', extra.category ?? 'hero', ...(extra.tags ?? []), ...(extra.industries ?? [])].join(' ').toLowerCase(),
})

const entries = [
  make('saas-hero', { name: 'Split hero with product dashboard', industries: ['saas'], goals: ['free-trial'], styles: ['minimal'], addedAt: '2026-10-01' }),
  make('local-hero', { name: 'Local service hero with quote form', industries: ['home-services'], goals: ['request-quote'], markets: ['US'], traits: ['form'], addedAt: '2026-10-03' }),
  make('pricing-ca', { name: 'Three-tier pricing', category: 'pricing', layout: 'grid', industries: ['saas'], goals: ['free-trial'], markets: ['CA'], tags: ['annual', 'cad'], addedAt: '2026-10-02' }),
  make('testimonial', { name: 'Testimonial grid', category: 'testimonials', layout: 'grid', industries: ['professional-services'], styles: ['minimal'] }),
]
const order = { hero: 0, pricing: 1, testimonials: 2 }

describe('tokenize', () => {
  it('splits on whitespace and commas, lowercases, drops empties', () => {
    expect(tokenize('  Hero, SaaS   trial ')).toEqual(['hero', 'saas', 'trial'])
    expect(tokenize('')).toEqual([])
  })
})

describe('search', () => {
  it('matches by name', () => {
    const r = filterSections(entries, { query: 'dashboard' })
    expect(r.map((x) => x.entry.id)).toEqual(['saas-hero'])
  })

  it('matches by tag', () => {
    const r = filterSections(entries, { query: 'cad' })
    expect(r.map((x) => x.entry.id)).toEqual(['pricing-ca'])
  })

  it('requires every token to match', () => {
    expect(filterSections(entries, { query: 'hero saas' }).map((x) => x.entry.id)).toEqual(['saas-hero'])
    expect(filterSections(entries, { query: 'hero nonexistent' })).toHaveLength(0)
  })

  it('scores name matches above description matches', () => {
    const named = scoreEntry(entries[0], ['split'])
    const other = scoreEntry({ ...entries[0], name: 'X', searchText: 'x split' }, ['split'])
    expect(named).toBeGreaterThan(other)
  })
})

describe('filters', () => {
  it('ORs within a group and ANDs across groups', () => {
    const f = { industries: ['saas', 'home-services'], goals: ['free-trial'] }
    expect(filterSections(entries, { filters: f }).map((x) => x.entry.id).sort()).toEqual(['pricing-ca', 'saas-hero'])
  })

  it('combines category, filters and market', () => {
    const r = filterSections(entries, { category: 'pricing', filters: { markets: ['CA'] } })
    expect(r.map((x) => x.entry.id)).toEqual(['pricing-ca'])
  })

  it('matches layout (a single value) and traits', () => {
    expect(filterSections(entries, { filters: { layout: ['grid'], styles: ['minimal'] } }).map((x) => x.entry.id)).toEqual(['testimonial'])
    expect(filterSections(entries, { filters: { traits: ['form'] } }).map((x) => x.entry.id)).toEqual(['local-hero'])
  })

  it('returns nothing for impossible combinations', () => {
    expect(filterSections(entries, { filters: { industries: ['saas'], markets: ['US'], traits: ['form'] } })).toHaveLength(0)
  })

  it('restricts to an id set (favorites)', () => {
    expect(filterSections(entries, { ids: new Set(['testimonial']) }).map((x) => x.entry.id)).toEqual(['testimonial'])
  })

  it('counts active filters', () => {
    expect(activeFilterCount({ industries: ['a', 'b'], goals: [], layout: ['split'] })).toBe(3)
  })

  it('ignores the facet’s own group when counting', () => {
    const counts = facetCounts(entries, { filters: { industries: ['saas'] } }, 'industries')
    expect(counts).toMatchObject({ saas: 2, 'home-services': 1, 'professional-services': 1 })
    expect(matchesFilters(entries[1], { industries: ['saas'] }, 'industries')).toBe(true)
  })
})

describe('sorting', () => {
  const all = filterSections(entries, {})
  it('sorts by name', () => {
    expect(sortResults(all, 'name').map((x) => x.entry.id)).toEqual(['local-hero', 'saas-hero', 'testimonial', 'pricing-ca'])
  })
  it('sorts by recently added', () => {
    expect(sortResults(all, 'recent').map((x) => x.entry.id).slice(0, 3)).toEqual(['local-hero', 'pricing-ca', 'saas-hero'])
  })
  it('sorts by category order', () => {
    expect(sortResults(all, 'category', order).map((x) => x.entry.category)).toEqual(['hero', 'hero', 'pricing', 'testimonials'])
  })
  it('does not mutate the input', () => {
    const copy = [...all]
    sortResults(all, 'name')
    expect(all).toEqual(copy)
  })
})
