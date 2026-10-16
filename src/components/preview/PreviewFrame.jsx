import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { baseCss, googleFontsHref } from '../../services/sectionLoader'

// The iframe document is fixed; only base CSS, the section's own CSS and its
// fonts are injected. The library's theme, CssBaseline and MUI styles live in
// the parent document and cannot reach the section.
const FRAME_RESET = 'html,body{margin:0;padding:0;background:#ffffff;}body{overflow:hidden;}#root{display:flow-root;}'

function buildSrcDoc(css, fonts) {
  const href = googleFontsHref(fonts)
  const fontTags = href
    ? `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${href}">`
    : ''
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${fontTags}<style>${FRAME_RESET}</style><style>${baseCss}</style><style>${css}</style></head><body><div id="root"></div></body></html>`
}

/**
 * Renders children inside an isolated, same-origin iframe at a fixed width.
 * The iframe grows to its content height and reports it via onHeight.
 */
export default function PreviewFrame({
  css,
  fonts,
  width,
  title,
  interactive = true,
  onHeight,
  onBlockedAction,
  children,
}) {
  const iframeRef = useRef(null)
  const [mount, setMount] = useState(null)
  const [height, setHeight] = useState(0)
  const srcDoc = useMemo(() => buildSrcDoc(css, fonts), [css, fonts])
  const onHeightRef = useRef(onHeight)
  const onBlockedRef = useRef(onBlockedAction)
  useEffect(() => {
    onHeightRef.current = onHeight
    onBlockedRef.current = onBlockedAction
  })

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    let ro
    let cleanupListeners = () => {}

    const attach = () => {
      const doc = iframe.contentDocument
      const root = doc?.getElementById('root')
      if (!root) return
      setMount(root)

      const win = iframe.contentWindow
      const RO = win.ResizeObserver ?? ResizeObserver
      // Height follows the section, plus any open <details> panel (menus,
      // dropdowns) that is absolutely positioned and would otherwise be clipped.
      const measure = () => {
        const rect = root.getBoundingClientRect()
        let bottom = rect.bottom
        for (const el of root.querySelectorAll('details[open] *')) {
          const r = el.getBoundingClientRect()
          if (r.height && r.bottom > bottom) bottom = r.bottom
        }
        const h = Math.ceil(bottom - rect.top)
        setHeight((prev) => (prev === h ? prev : h))
        onHeightRef.current?.(h)
      }
      ro = new RO(measure)
      ro.observe(root)
      const onToggle = () => win.requestAnimationFrame(measure)
      doc.addEventListener('toggle', onToggle, true)

      // Links and forms inside a preview must never navigate the frame.
      const onClick = (e) => {
        const a = e.target.closest?.('a[href]')
        if (!a) return
        const href = a.getAttribute('href')
        if (href?.startsWith('#') && href.length > 1) {
          e.preventDefault()
          doc.getElementById(href.slice(1))?.scrollIntoView({ block: 'start' })
          return
        }
        e.preventDefault()
        onBlockedRef.current?.('link', href)
      }
      const onSubmit = (e) => {
        e.preventDefault()
        onBlockedRef.current?.('form')
      }
      doc.addEventListener('click', onClick)
      doc.addEventListener('submit', onSubmit)
      cleanupListeners = () => {
        doc.removeEventListener('click', onClick)
        doc.removeEventListener('submit', onSubmit)
        doc.removeEventListener('toggle', onToggle, true)
      }
    }

    // srcdoc frames may already be complete when the effect runs.
    if (iframe.contentDocument?.readyState === 'complete' && iframe.contentDocument.getElementById('root')) {
      attach()
    }
    const onLoad = () => {
      cleanupListeners()
      ro?.disconnect()
      attach()
    }
    iframe.addEventListener('load', onLoad)
    return () => {
      iframe.removeEventListener('load', onLoad)
      cleanupListeners()
      ro?.disconnect()
      setMount(null)
    }
  }, [srcDoc])

  return (
    <>
      <iframe
        ref={iframeRef}
        title={title}
        srcDoc={srcDoc}
        inert={!interactive}
        tabIndex={interactive ? 0 : -1}
        aria-hidden={interactive ? undefined : true}
        style={{
          display: 'block',
          width,
          height: Math.max(height, 1),
          border: 0,
          background: '#ffffff',
          pointerEvents: interactive ? 'auto' : 'none',
          colorScheme: 'light',
        }}
      />
      {mount && createPortal(children, mount)}
    </>
  )
}
