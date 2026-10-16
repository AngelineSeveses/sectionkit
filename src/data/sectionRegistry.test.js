import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { sections, rejectedSections, sectionById, sectionBySlug, countsByCategory, relatedSections } from './sectionRegistry'
import { categories } from './categories'
import { filterGroups } from './taxonomy'
import { loadSection, knownSectionFiles } from '../services/sectionLoader'
import { sanitizeProps } from '../utils/validation'
import { stripResourceHints } from '../services/exportService'

describe('section registry', () => {
  it('accepts every metadata entry', () => {
    expect(rejectedSections).toEqual([])
  })

  it('has one registry entry per component file', () => {
    expect(sections.length).toBe(knownSectionFiles.size)
    expect(new Set(sections.map((s) => s.file)).size).toBe(sections.length)
  })

  it('has unique ids and slugs', () => {
    expect(sectionById.size).toBe(sections.length)
    expect(sectionBySlug.size).toBe(sections.length)
  })

  it('covers every category with at least three sections', () => {
    for (const c of categories) {
      expect(countsByCategory[c.id] ?? 0, c.id).toBeGreaterThanOrEqual(3)
    }
  })

  it('only uses known taxonomy values', () => {
    for (const s of sections) {
      for (const g of filterGroups) {
        const valid = new Set(g.options.map((o) => o.id))
        const values = Array.isArray(s[g.key]) ? s[g.key] : [s[g.key]]
        for (const v of values) expect(valid.has(v), `${s.id} ${g.key}=${v}`).toBe(true)
      }
    }
  })

  it('marks sections with sample reviews or figures', () => {
    for (const s of sections) {
      if (s.traits.includes('sample-data')) expect(s.sampleContent, s.id).toBe(true)
    }
  })

  it('defaults survive sanitization unchanged', () => {
    for (const s of sections) {
      expect(sanitizeProps(s.fields, s.defaults), s.id).toEqual(s.defaults)
    }
  })

  it('suggests related sections', () => {
    const r = relatedSections(sections[0], 6)
    expect(r).toHaveLength(6)
    expect(r.some((x) => x.id === sections[0].id)).toBe(false)
  })
})

// Returns selectors of style rules, descending into @media/@supports and skipping @keyframes.
function styleSelectors(css) {
  const src = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const out = []
  let prelude = ''
  const stack = []
  for (const ch of src) {
    if (ch === '{') {
      const p = prelude.trim()
      const parentSkips = stack.includes('skip')
      if (parentSkips || p.startsWith('@keyframes')) stack.push('skip')
      else if (p.startsWith('@')) stack.push('at')
      else {
        stack.push('rule')
        out.push(p)
      }
      prelude = ''
    } else if (ch === '}') {
      stack.pop()
      prelude = ''
    } else if (ch === ';' && stack.at(-1) !== 'at' && stack.length) {
      prelude = ''
    } else {
      prelude += ch
    }
  }
  return out
}

// Splits a selector list on commas that are not inside parentheses.
function splitTopLevel(sel) {
  const parts = []
  let depth = 0
  let cur = ''
  for (const ch of sel) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (ch === ',' && depth === 0) {
      parts.push(cur)
      cur = ''
    } else cur += ch
  }
  parts.push(cur)
  return parts
}

describe('every section renders', () => {
  it.each(sections.map((s) => [s.id, s]))('%s renders with defaults and matches its CSS scope', async (_, entry) => {
    const { Component, css } = await loadSection(entry)
    const html = stripResourceHints(renderToStaticMarkup(createElement(Component, entry.defaults)))
    const rootClass = css.match(/^\.([a-z][a-z0-9-]*)/m)?.[1]
    expect(rootClass, 'CSS must start with a scoped root class').toBeTruthy()
    expect(html).toMatch(new RegExp(`^<(section|header|footer)[^>]*class="lp-section ${rootClass}"`))
    // Every style rule in the section CSS (including inside @media) is scoped under its root class.
    for (const sel of styleSelectors(css)) {
      for (const part of splitTopLevel(sel)) {
        expect(part.trim().startsWith(`.${rootClass}`), `${entry.id}: "${part.trim()}"`).toBe(true)
      }
    }
  })

  it('escapes user text instead of rendering it as HTML', async () => {
    const entry = sections.find((s) => s.fields.some((f) => f.key === 'headline' && f.type === 'text'))
    const { Component } = await loadSection(entry)
    const html = renderToStaticMarkup(createElement(Component, { ...entry.defaults, headline: '<img src=x onerror=alert(1)>' }))
    expect(html).not.toContain('<img src=x')
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
  })
})
