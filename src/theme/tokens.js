// Library-interface tokens. These never reach the rendered landing page
// sections, which live in isolated iframes with their own CSS.

export const palettes = {
  light: {
    bg: '#F7F7F5',
    surface: '#FFFFFF',
    subtle: '#F0F0EC',
    text: '#222320',
    // The brief's #777870 measures ~4.3:1 on the page background. Small meta
    // text uses a slightly deeper value so it clears WCAG AA (4.5:1).
    textSecondary: '#6B6C64',
    textTertiary: '#777870',
    border: '#E5E5E0',
    borderStrong: '#D3D3CC',
    accent: '#2F5D50',
    accentContrast: '#FFFFFF',
    accentSoft: '#E4ECE8',
    canvas: '#ECECE7',
    focus: '#2F5D50',
    danger: '#A3372B',
  },
  dark: {
    bg: '#171816',
    surface: '#222320',
    subtle: '#2B2C28',
    text: '#F2F2ED',
    textSecondary: '#AAA99F',
    textTertiary: '#8F8E85',
    border: '#383934',
    borderStrong: '#4A4B45',
    accent: '#8DBFAE',
    accentContrast: '#14201C',
    accentSoft: '#26332E',
    canvas: '#121311',
    focus: '#8DBFAE',
    danger: '#E58A7E',
  },
}

export const ease = {
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  inOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
  drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
}

export const fontStack =
  '"Inter Variable", Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
export const monoStack =
  'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace'
