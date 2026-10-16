// Resolves registry entries to their React component and scoped CSS.
// Section CSS is imported as raw text and injected only into preview iframes,
// so it can never leak into (or be affected by) the library interface.

import baseCss from '../sections/_base.css?raw'

const componentModules = import.meta.glob('../sections/*/*.jsx')
const cssModules = import.meta.glob('../sections/*/*.css', { query: '?raw', import: 'default' })
const sourceModules = import.meta.glob('../sections/*/*.jsx', { query: '?raw', import: 'default' })

const pathFor = (file, ext) => `../sections/${file}.${ext}`

export const knownSectionFiles = new Set(
  Object.keys(componentModules).map((p) => p.replace('../sections/', '').replace(/\.jsx$/, '')),
)

const cache = new Map()

/** Loads { Component, css } for an entry. Results are cached per file. */
export function loadSection(entry) {
  if (!cache.has(entry.file)) {
    const loadComponent = componentModules[pathFor(entry.file, 'jsx')]
    const loadCss = cssModules[pathFor(entry.file, 'css')]
    if (!loadComponent) {
      return Promise.reject(new Error(`No component file for ${entry.file}`))
    }
    const promise = Promise.all([loadComponent(), loadCss ? loadCss() : Promise.resolve('')])
      .then(([mod, css]) => ({ Component: mod.default, css }))
      .catch((err) => {
        cache.delete(entry.file)
        throw err
      })
    cache.set(entry.file, promise)
  }
  return cache.get(entry.file)
}

/** Raw JSX source of the section, used for the React export. */
export function loadSectionSource(entry) {
  const loader = sourceModules[pathFor(entry.file, 'jsx')]
  return loader ? loader() : Promise.resolve('')
}

export { baseCss }

export function googleFontsHref(fonts = []) {
  if (!fonts.length) return null
  const families = fonts.map((f) => `family=${f.replace(/ /g, '+')}`).join('&')
  return `https://fonts.googleapis.com/css2?${families}&display=swap`
}
