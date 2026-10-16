// Fills metadata defaults shared by every section entry.
export function section(entry) {
  return {
    version: '1.0.0',
    status: 'implemented',
    addedAt: '2026-10-16',
    exports: ['react', 'html', 'elementor'],
    tags: [],
    traits: [],
    ...entry,
  }
}
