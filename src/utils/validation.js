// Input validation for editable section properties and registry entries.
// Text is never rendered as HTML (React escapes it), so text sanitizing only
// enforces type and length. URLs and colors are allow-listed.

const SAFE_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:']

/** True for http(s), mailto, tel, root-relative paths and in-page anchors. */
export function isSafeUrl(value) {
  if (typeof value !== 'string') return false
  const v = value.trim()
  if (v === '') return false
  // Reject control characters and whitespace, which browsers strip to smuggle schemes.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F\s]/.test(v)) return false
  if (v.startsWith('#')) return true
  if (v.startsWith('/') && !v.startsWith('//')) return true
  try {
    const parsed = new URL(v)
    return SAFE_PROTOCOLS.includes(parsed.protocol)
  } catch {
    return false
  }
}

/** Images must be absolute http(s) URLs or root-relative paths. */
export function isSafeImageUrl(value) {
  if (typeof value !== 'string') return false
  const v = value.trim()
  if (v.startsWith('/') && !v.startsWith('//')) return true
  try {
    const parsed = new URL(v)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

export function isHexColor(value) {
  return typeof value === 'string' && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim())
}

export function urlError(value) {
  if (isSafeUrl(value)) return null
  if (typeof value === 'string' && /^\s*(javascript|data|vbscript):/i.test(value)) {
    return 'Script and data URLs are not allowed.'
  }
  return 'Use a full URL (https://…), a path starting with /, #anchor, mailto: or tel:.'
}

export function imageUrlError(value) {
  return isSafeImageUrl(value) ? null : 'Use an https:// image URL or a path starting with /.'
}

/**
 * Returns a copy of `values` where every field is valid for its type.
 * Invalid entries fall back to the field default, so a section always
 * renders with safe props even if stored customization is corrupt.
 */
export function sanitizeProps(fields, values = {}) {
  const out = {}
  for (const field of fields) {
    out[field.key] = sanitizeValue(field, values[field.key])
  }
  return out
}

export function sanitizeValue(field, value) {
  const fallback = structuredClone(field.default)
  switch (field.type) {
    case 'text':
    case 'textarea':
      return typeof value === 'string' ? value.slice(0, field.maxLength ?? 600) : fallback
    case 'url':
      return isSafeUrl(value) ? value.trim() : fallback
    case 'image':
      return isSafeImageUrl(value) ? value.trim() : fallback
    case 'color':
      return isHexColor(value) ? value.trim() : fallback
    case 'select':
      return field.options.some((o) => o.value === value) ? value : fallback
    case 'range': {
      const n = Number(value)
      if (!Number.isFinite(n)) return fallback
      return Math.min(field.max, Math.max(field.min, n))
    }
    case 'toggle':
      return typeof value === 'boolean' ? value : fallback
    case 'list': {
      if (!Array.isArray(value)) return fallback
      const items = value.slice(0, field.max ?? 12).map((item, i) => {
        const base = field.default[i] ?? field.default[0] ?? {}
        const clean = {}
        for (const sub of field.itemFields) {
          clean[sub.key] = sanitizeValue({ ...sub, default: base[sub.key] ?? sub.default }, item?.[sub.key])
        }
        return clean
      })
      return items.length >= (field.min ?? 0) ? items : fallback
    }
    default:
      return fallback
  }
}

const REQUIRED = ['id', 'slug', 'name', 'description', 'category', 'file', 'layout', 'fields', 'version', 'status']
const ARRAYS = ['industries', 'goals', 'styles', 'markets', 'structure', 'responsive', 'rationale']

/** Validates a registry entry. Returns a list of human-readable problems. */
export function validateEntry(entry, { knownFiles, categoryIds, seenIds, seenSlugs }) {
  const problems = []
  for (const key of REQUIRED) {
    if (entry[key] === undefined || entry[key] === '') problems.push(`missing "${key}"`)
  }
  for (const key of ARRAYS) {
    if (!Array.isArray(entry[key])) problems.push(`"${key}" must be an array`)
  }
  if (entry.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) problems.push('slug must be kebab-case')
  if (entry.category && !categoryIds.has(entry.category)) problems.push(`unknown category "${entry.category}"`)
  if (entry.file && knownFiles && !knownFiles.has(entry.file)) problems.push(`no component file at sections/${entry.file}.jsx`)
  if (seenIds.has(entry.id)) problems.push(`duplicate id "${entry.id}"`)
  if (seenSlugs.has(entry.slug)) problems.push(`duplicate slug "${entry.slug}"`)
  if (Array.isArray(entry.fields)) {
    const keys = new Set()
    for (const f of entry.fields) {
      if (keys.has(f.key)) problems.push(`duplicate field "${f.key}"`)
      keys.add(f.key)
      if (f.type === 'url' && !isSafeUrl(f.default)) problems.push(`field "${f.key}" has an unsafe default URL`)
      if (f.type === 'image' && !isSafeImageUrl(f.default)) problems.push(`field "${f.key}" has an invalid default image`)
      if (f.type === 'color' && !isHexColor(f.default)) problems.push(`field "${f.key}" has an invalid default color`)
    }
  }
  return problems
}
