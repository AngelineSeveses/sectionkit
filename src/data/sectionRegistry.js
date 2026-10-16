// Builds the section registry from the metadata files in ./sections.
// Metadata is plain data; each entry resolves to a React component by its
// `file` path (src/sections/<file>.jsx). Nothing here evaluates stored code.

import { categories } from './categories'
import { defaultsFrom } from './fields'
import { labelFor } from './taxonomy'
import { categoryById } from './categories'
import { validateEntry } from '../utils/validation'
import { knownSectionFiles } from '../services/sectionLoader'

const metadataModules = import.meta.glob('./sections/*.js', { eager: true, import: 'default' })

function buildSearchText(e) {
  return [
    e.name,
    e.description,
    e.category,
    categoryById[e.category]?.label,
    e.layout,
    labelFor('layouts', e.layout),
    ...e.industries.flatMap((i) => [i, labelFor('industries', i)]),
    ...e.goals.flatMap((g) => [g, labelFor('goals', g)]),
    ...e.styles,
    ...e.markets.flatMap((m) => [m, labelFor('markets', m)]),
    ...(e.tags ?? []),
    e.audience,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function build() {
  const categoryIds = new Set(categories.map((c) => c.id))
  const seenIds = new Set()
  const seenSlugs = new Set()
  const entries = []
  const rejected = []

  const files = Object.keys(metadataModules).sort()
  for (const file of files) {
    metadataModules[file].forEach((raw, index) => {
      const problems = validateEntry(raw, { knownFiles: knownSectionFiles, categoryIds, seenIds, seenSlugs })
      if (problems.length) {
        rejected.push({ id: raw.id ?? '(no id)', file, problems })
        return
      }
      seenIds.add(raw.id)
      seenSlugs.add(raw.slug)
      const entry = {
        tags: [],
        traits: [],
        exports: ['react', 'html', 'elementor'],
        fonts: [],
        sampleContent: false,
        order: index,
        ...raw,
        defaults: defaultsFrom(raw.fields),
      }
      entry.searchText = buildSearchText(entry)
      entries.push(entry)
    })
  }

  if (rejected.length && import.meta.env.DEV) {
    console.warn('[sectionkit] Rejected registry entries:', rejected)
  }

  return { entries, rejected }
}

const { entries, rejected } = build()

export const sections = entries
export const rejectedSections = rejected
export const sectionById = new Map(entries.map((e) => [e.id, e]))
export const sectionBySlug = new Map(entries.map((e) => [e.slug, e]))

export const countsByCategory = entries.reduce((acc, e) => {
  acc[e.category] = (acc[e.category] ?? 0) + 1
  return acc
}, {})

export function relatedSections(entry, limit = 6) {
  const score = (other) => {
    let s = 0
    if (other.category === entry.category) s += 4
    s += other.industries.filter((i) => entry.industries.includes(i)).length * 1.5
    s += other.goals.filter((g) => entry.goals.includes(g)).length
    s += other.styles.filter((g) => entry.styles.includes(g)).length * 0.5
    return s
  }
  return entries
    .filter((e) => e.id !== entry.id)
    .map((e) => [score(e), e])
    .sort((a, b) => b[0] - a[0] || a[1].name.localeCompare(b[1].name))
    .slice(0, limit)
    .map(([, e]) => e)
}
