import { describe, expect, it } from 'vitest'
import { imageUrlError, isHexColor, isSafeImageUrl, isSafeUrl, sanitizeProps, urlError, validateEntry } from './validation'
import { color, image, list, range, select, text, toggle, url } from '../data/fields'

describe('isSafeUrl', () => {
  it.each(['https://example.com', 'http://example.com/a?b=c', '/pricing', '#faq', 'mailto:hi@example.com', 'tel:+14165550100'])('accepts %s', (u) => {
    expect(isSafeUrl(u)).toBe(true)
  })

  it.each(['javascript:alert(1)', ' JavaScript:alert(1)', 'data:text/html,<script>', 'vbscript:x', '//evil.com', 'ftp://x.com', '', 'not a url', 'https://exa mple.com', 'java\nscript:alert(1)'])('rejects %j', (u) => {
    expect(isSafeUrl(u)).toBe(false)
  })

  it('explains script URLs specifically', () => {
    expect(urlError('javascript:alert(1)')).toMatch(/not allowed/)
    expect(urlError('https://ok.com')).toBeNull()
  })
})

describe('isSafeImageUrl', () => {
  it('accepts http(s) and root paths only', () => {
    expect(isSafeImageUrl('https://images.unsplash.com/photo-1')).toBe(true)
    expect(isSafeImageUrl('/img/a.jpg')).toBe(true)
    expect(isSafeImageUrl('data:image/svg+xml,<svg onload=alert(1)>')).toBe(false)
    expect(isSafeImageUrl('javascript:alert(1)')).toBe(false)
    expect(imageUrlError('mailto:x@y.z')).not.toBeNull()
  })
})

describe('isHexColor', () => {
  it('accepts 3 and 6 digit hex', () => {
    expect(isHexColor('#fff')).toBe(true)
    expect(isHexColor('#1F6F5C')).toBe(true)
    expect(isHexColor('red')).toBe(false)
    expect(isHexColor('#12345')).toBe(false)
    expect(isHexColor('#fff;background:url(x)')).toBe(false)
  })
})

describe('sanitizeProps', () => {
  const fields = [
    text('headline', 'Headline', 'Default', { maxLength: 10 }),
    url('cta', 'CTA', '/start'),
    image('img', 'Image', 'https://example.com/a.jpg'),
    color('accent', 'Accent', '#112233'),
    select('side', 'Side', 'left', [{ value: 'left', label: 'L' }, { value: 'right', label: 'R' }]),
    range('radius', 'Radius', 8, 0, 24),
    toggle('sticky', 'Sticky', true),
    list('items', 'Items', [{ title: 'A', link: '/a' }], [text('title', 'Title', ''), url('link', 'Link', '#')], { min: 1, max: 2 }),
  ]

  it('falls back to defaults for unsafe or invalid values', () => {
    const out = sanitizeProps(fields, {
      headline: 'A very long headline here',
      cta: 'javascript:alert(1)',
      img: 'data:image/png;base64,AAAA',
      accent: 'expression(alert(1))',
      side: 'diagonal',
      radius: 999,
      sticky: 'yes',
      items: [{ title: 'Ok', link: 'javascript:x' }, { title: 'B', link: '/b' }, { title: 'C', link: '/c' }],
    })
    expect(out.headline).toBe('A very lon')
    expect(out.cta).toBe('/start')
    expect(out.img).toBe('https://example.com/a.jpg')
    expect(out.accent).toBe('#112233')
    expect(out.side).toBe('left')
    expect(out.radius).toBe(24)
    expect(out.sticky).toBe(true)
    expect(out.items).toHaveLength(2)
    expect(out.items[0]).toEqual({ title: 'Ok', link: '/a' })
  })

  it('keeps valid values', () => {
    const out = sanitizeProps(fields, { cta: 'https://x.com', accent: '#abc', side: 'right', radius: 4, sticky: false })
    expect(out).toMatchObject({ cta: 'https://x.com', accent: '#abc', side: 'right', radius: 4, sticky: false })
  })

  it('does not treat HTML in text as markup (left to React escaping)', () => {
    const out = sanitizeProps([text('t', 'T', '')], { t: '<img src=x onerror=alert(1)>' })
    expect(out.t).toBe('<img src=x onerror=alert(1)>'.slice(0, 160))
  })
})

describe('validateEntry', () => {
  const base = {
    id: 'x-1', slug: 'x-one', name: 'X', description: 'd', category: 'hero', file: 'hero/X', layout: 'split', version: '1.0.0', status: 'implemented',
    fields: [url('cta', 'CTA', '/ok')], industries: [], goals: [], styles: [], markets: [], structure: [], responsive: [], rationale: [],
  }
  const ctx = () => ({ knownFiles: new Set(['hero/X']), categoryIds: new Set(['hero']), seenIds: new Set(), seenSlugs: new Set() })

  it('passes a complete entry', () => {
    expect(validateEntry(base, ctx())).toEqual([])
  })

  it('reports missing files, bad slugs, unknown categories and unsafe defaults', () => {
    const problems = validateEntry({ ...base, slug: 'Bad Slug', category: 'nope', file: 'hero/Missing', fields: [url('cta', 'CTA', 'javascript:x')] }, ctx())
    expect(problems.join(' ')).toMatch(/kebab-case/)
    expect(problems.join(' ')).toMatch(/unknown category/)
    expect(problems.join(' ')).toMatch(/no component file/)
    expect(problems.join(' ')).toMatch(/unsafe default URL/)
  })

  it('reports duplicate ids', () => {
    const c = ctx()
    c.seenIds.add('x-1')
    expect(validateEntry(base, c).join(' ')).toMatch(/duplicate id/)
  })
})
