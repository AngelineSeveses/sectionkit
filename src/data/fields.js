// Editable-property schema helpers. Each field carries its own default, so a
// section's default content and its editor are defined in one place.
//
// Supported types: text, textarea, url, image, color, select, range, toggle, list.
// `group` controls where the field appears in the editor ("content" | "style").

export const text = (key, label, value, opts = {}) => ({ type: 'text', key, label, default: value, group: 'content', maxLength: 160, ...opts })
export const textarea = (key, label, value, opts = {}) => ({ type: 'textarea', key, label, default: value, group: 'content', maxLength: 600, ...opts })
export const url = (key, label, value = '#', opts = {}) => ({ type: 'url', key, label, default: value, group: 'content', ...opts })
export const image = (key, label, value, opts = {}) => ({ type: 'image', key, label, default: value, group: 'content', ...opts })
export const color = (key, label, value, opts = {}) => ({ type: 'color', key, label, default: value, group: 'style', ...opts })
export const select = (key, label, value, options, opts = {}) => ({ type: 'select', key, label, default: value, options, group: 'style', ...opts })
export const range = (key, label, value, min, max, step = 1, opts = {}) => ({ type: 'range', key, label, default: value, min, max, step, group: 'style', ...opts })
export const toggle = (key, label, value, opts = {}) => ({ type: 'toggle', key, label, default: value, group: 'style', ...opts })
export const list = (key, label, value, itemFields, opts = {}) => ({
  type: 'list',
  key,
  label,
  default: value,
  itemFields,
  min: 1,
  max: 8,
  group: 'content',
  ...opts,
})

// Common option sets
export const alignOptions = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
]
export const sideOptions = [
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
]
export const currencyOptions = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'CAD', label: 'CAD (CA$)' },
]
export const spacingOptions = [
  { value: 'compact', label: 'Compact' },
  { value: 'regular', label: 'Regular' },
  { value: 'spacious', label: 'Spacious' },
]

// Shared field shortcuts
export const radius = (value = 8, max = 24) => range('radius', 'Corner radius', value, 0, max, 1, { unit: 'px' })
export const spacing = (value = 'regular') => select('spacing', 'Vertical spacing', value, spacingOptions)

export function defaultsFrom(fields) {
  return Object.fromEntries(fields.map((f) => [f.key, structuredClone(f.default)]))
}
