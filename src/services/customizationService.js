// Per-section customizations persist locally so edits survive a reload.
// Values are always re-sanitized against the field schema on read.

import { sanitizeProps } from '../utils/validation'

const prefix = 'sectionkit:custom:'

export function readCustomization(entry) {
  try {
    const raw = localStorage.getItem(prefix + entry.id)
    if (!raw) return null
    return sanitizeProps(entry.fields, JSON.parse(raw))
  } catch {
    return null
  }
}

export function writeCustomization(entry, values) {
  try {
    localStorage.setItem(prefix + entry.id, JSON.stringify(values))
  } catch {
    // Storage full or blocked: edits still apply for this session.
  }
}

export function clearCustomization(entry) {
  try {
    localStorage.removeItem(prefix + entry.id)
  } catch {
    // ignore
  }
}

export function clearAllCustomizations() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(prefix))
      .forEach((k) => localStorage.removeItem(k))
  } catch {
    // ignore
  }
}
