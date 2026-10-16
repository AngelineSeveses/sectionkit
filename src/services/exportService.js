// Generates copyable code from a section's real implementation:
//  - HTML: server-renders the actual React component with the current props
//  - CSS: the shared base layer plus the section's own scoped stylesheet
//  - React: the component's source file plus a usage example
//  - Elementor: a manual layout recipe derived from the section's metadata

import { createElement } from 'react'
import { googleFontsHref } from './sectionLoader'

const INLINE = new Set([
  'a', 'span', 'strong', 'em', 'b', 'i', 'small', 'abbr', 'br', 'sup', 'sub', 'mark', 's', 'del', 'ins',
  'code', 'time', 'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'g', 'button', 'kbd', 'q', 'cite',
])
const VOID = new Set(['input', 'img', 'hr', 'br', 'source', 'meta', 'link', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon'])

/** Indents server-rendered markup without changing inline whitespace. */
export function formatHtml(markup) {
  const tokens = markup.match(/<[^>]+>|[^<]+/g) ?? []
  const lines = []
  const stack = []
  let line = ''
  let depth = 0
  let inlineDepth = 0
  const pad = () => '  '.repeat(depth)
  const flush = () => {
    if (line.trim()) lines.push(line.replace(/\s+$/, ''))
    line = ''
  }

  for (const tok of tokens) {
    if (!tok.startsWith('<')) {
      line += line ? tok : pad() + tok.replace(/^\s+/, '')
      continue
    }
    const close = tok.startsWith('</')
    const name = (tok.match(/^<\/?([a-zA-Z0-9-]+)/)?.[1] ?? '').toLowerCase()
    const selfClosing = tok.endsWith('/>') || VOID.has(name)
    const inline = INLINE.has(name) || inlineDepth > 0

    if (inline) {
      if (!line) line = pad()
      line += tok
      if (!selfClosing) inlineDepth += close ? -1 : 1
      if (inlineDepth < 0) inlineDepth = 0
      continue
    }

    if (close) {
      depth = Math.max(0, depth - 1)
      const open = stack.pop()
      if (open && !open.hadBlockChild && line) {
        line += tok
        flush()
      } else {
        flush()
        lines.push(pad() + tok)
      }
      continue
    }

    if (stack.length) stack[stack.length - 1].hadBlockChild = true
    flush()
    line = pad() + tok
    if (selfClosing) {
      flush()
    } else {
      stack.push({ name, hadBlockChild: false })
      depth += 1
    }
  }
  flush()
  return lines.join('\n')
}

// React 19 hoists <link rel="preload"> hints for images ahead of server-rendered
// markup. They belong in <head>, not in a copyable section, so drop them.
export function stripResourceHints(markup) {
  return markup.replace(/^(?:<link [^>]*rel="preload"[^>]*\/?>)+/, '')
}

export async function renderMarkup(Component, props) {
  const { renderToStaticMarkup } = await import('react-dom/server')
  return formatHtml(stripResourceHints(renderToStaticMarkup(createElement(Component, props))))
}

export function buildCss(baseCss, sectionCss) {
  return `/* Shared base layer (include once per page) */\n${baseCss.trim()}\n\n/* Section styles */\n${sectionCss.trim()}\n`
}

export function buildHtmlSnippet(entry, markup) {
  const href = googleFontsHref(entry.fonts)
  const fontLine = href ? `<!-- Fonts: add once in <head> -->\n<link rel="stylesheet" href="${href}">\n\n` : ''
  return `${fontLine}${markup}\n`
}

export function buildHtmlDocument(entry, markup, css) {
  const href = googleFontsHref(entry.fonts)
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(entry.name)}</title>
${href ? `  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link rel="stylesheet" href="${href}">\n` : ''}  <style>
body { margin: 0; }
${css}
  </style>
</head>
<body>
${markup}
</body>
</html>
`
}

export function componentName(entry) {
  return entry.file.split('/').pop()
}

export function buildReact(entry, source, props) {
  const name = componentName(entry)
  const cssFile = `${name}.css`
  const usage = `import ${name} from './${name}'
import './sectionkit-base.css' // shared base layer, once per app
import './${cssFile}'

const props = ${JSON.stringify(props, null, 2)}

export default function Page() {
  return <${name} {...props} />
}
`
  return {
    component: source.trim() + '\n',
    usage,
    files: [`${name}.jsx`, cssFile, 'sectionkit-base.css'],
  }
}

function resolveToken(value, props) {
  if (typeof value === 'string' && value.startsWith('$')) {
    const v = props[value.slice(1)]
    return v ?? value
  }
  return value
}

export function buildElementor(entry, props) {
  const t = Object.fromEntries(Object.entries(entry.tokens ?? {}).map(([k, v]) => [k, resolveToken(v, props)]))
  const el = entry.elementor ?? {}
  const lines = []
  const h = (s) => lines.push('', s, '-'.repeat(s.length))
  const li = (s) => lines.push(`• ${s}`)

  lines.push(`Elementor recipe: ${entry.name}`)
  lines.push('Built with Flexbox Containers (Elementor 3.6 or later). This is a manual build guide.')
  lines.push('Nothing here imports into Elementor automatically.')

  h('1. Outer container')
  li(`Content width: Boxed, ${t.maxWidth ?? 1200}px`)
  li(`Padding: ${t.paddingY ?? 96}px top and bottom on desktop, ${Math.round((t.paddingY ?? 96) * 0.75)}px tablet, ${Math.round((t.paddingY ?? 96) * 0.6)}px mobile; 24px left and right`)
  if (t.bg) li(`Background: classic, ${t.bg}${el.background ? ` (${el.background})` : ''}`)
  if (el.minHeight) li(`Minimum height: ${el.minHeight}`)

  h('2. Structure')
  for (const step of el.structure ?? entry.structure) li(step)

  h('3. Typography')
  li(`Font family: ${t.font ?? 'Inter'} (Google Font). Set it under Site Settings → Global Fonts.`)
  if (t.headingSize) li(`Main heading: ${t.headingSize}px desktop, ${Math.round(t.headingSize * 0.78)}px tablet, ${Math.round(t.headingSize * 0.62)}px mobile; weight ${t.headingWeight ?? 600}; line height ${t.headingLine ?? 1.1}; letter spacing ${t.headingTracking ?? '-0.02em'}`)
  li(`Body text: ${t.bodySize ?? 17}px, line height 1.6${t.text ? `, color ${t.text}` : ''}`)
  if (t.muted) li(`Secondary text color: ${t.muted}`)

  h('4. Buttons')
  li(`Primary: background ${t.accent ?? '#111'}, text ${t.accentText ?? '#fff'}, border radius ${t.radius ?? 8}px, padding 14px 22px, min height 44px, weight 600`)
  if (el.secondaryButton) li(`Secondary: ${el.secondaryButton}`)
  li('Hover: darken background about 8%. Keep a visible focus outline (Elementor removes it if you set outline: none).')

  h('5. Responsive adjustments')
  for (const r of entry.responsive) li(r)

  if (el.notes?.length) {
    h('6. Notes')
    for (const n of el.notes) li(n)
  }

  lines.push('')
  lines.push('Need an exact visual match? Paste the HTML export into an HTML widget and the CSS into')
  lines.push('Site Settings → Custom CSS. That keeps the design but loses visual editing in Elementor.')
  return lines.join('\n')
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for browsers without async clipboard permission.
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}

export function downloadText(filename, text, type = 'text/html') {
  const blob = new Blob([text], { type: `${type};charset=utf-8` })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}
