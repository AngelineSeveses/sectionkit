import { describe, expect, it } from 'vitest'
import { buildCss, buildElementor, buildHtmlDocument, buildHtmlSnippet, buildReact, formatHtml, stripResourceHints } from './exportService'

describe('stripResourceHints', () => {
  it('removes React 19 image preload links from the start of the markup', () => {
    const raw = '<link rel="preload" as="image" href="a.jpg"/><link rel="preload" as="image" href="b.jpg"/><section class="x"></section>'
    expect(stripResourceHints(raw)).toBe('<section class="x"></section>')
  })
})

describe('formatHtml', () => {
  it('indents block elements', () => {
    const out = formatHtml('<section><div><h2>Title</h2><p>Body</p></div></section>')
    expect(out).toBe('<section>\n  <div>\n    <h2>Title</h2>\n    <p>Body</p>\n  </div>\n</section>')
  })

  it('keeps inline elements on the same line so whitespace does not change', () => {
    const out = formatHtml('<p><strong>4.9</strong>/5 from <a href="#">612 reviews</a></p>')
    expect(out).toBe('<p><strong>4.9</strong>/5 from <a href="#">612 reviews</a></p>')
  })

  it('handles void elements', () => {
    const out = formatHtml('<div><img src="a.jpg" alt=""/><input type="email"/></div>')
    expect(out.split('\n')).toEqual(['<div>', '  <img src="a.jpg" alt=""/>', '  <input type="email"/>', '</div>'])
  })
})

const entry = {
  id: 't-1',
  slug: 'test-section',
  name: 'Test <section>',
  file: 'hero/TestSection',
  fonts: ['Inter:wght@400;600'],
  structure: ['One', 'Two'],
  responsive: ['Stacks on mobile'],
  tokens: { font: 'Inter', headingSize: 50, accent: '$accent', bg: '#ffffff', radius: '$radius', maxWidth: 1200, paddingY: 96 },
  elementor: { structure: ['Row container 50/50'] },
}

describe('code builders', () => {
  it('prepends the fonts link to the HTML snippet', () => {
    const out = buildHtmlSnippet(entry, '<section></section>')
    expect(out).toContain('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap')
    expect(out.trim().endsWith('<section></section>')).toBe(true)
  })

  it('builds a standalone document and escapes the title', () => {
    const doc = buildHtmlDocument(entry, '<section>x</section>', '.a{}')
    expect(doc.startsWith('<!doctype html>')).toBe(true)
    expect(doc).toContain('<title>Test &lt;section&gt;</title>')
    expect(doc).toContain('.a{}')
  })

  it('combines base and section CSS', () => {
    expect(buildCss('.lp-section{}', '.hero{}')).toMatch(/lp-section[\s\S]*\.hero/)
  })

  it('includes the real source and a usage example with props', () => {
    const r = buildReact(entry, 'export default function TestSection() {}', { headline: 'Hi' })
    expect(r.component).toContain('export default function TestSection')
    expect(r.usage).toContain("import TestSection from './TestSection'")
    expect(r.usage).toContain('"headline": "Hi"')
  })

  it('resolves $prop tokens in the Elementor recipe from current props', () => {
    const text = buildElementor({ ...entry, responsive: ['Stacks on mobile'] }, { accent: '#AA3300', radius: 12 })
    expect(text).toContain('background #AA3300')
    expect(text).toContain('border radius 12px')
    expect(text).toContain('Row container 50/50')
    expect(text).toContain('Stacks on mobile')
    expect(text).toMatch(/Nothing here imports into Elementor automatically/)
  })
})
