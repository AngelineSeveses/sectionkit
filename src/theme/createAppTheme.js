import { createTheme, alpha } from '@mui/material/styles'
import { palettes, ease, fontStack, monoStack } from './tokens'

export function createAppTheme(mode) {
  const p = palettes[mode]

  return createTheme({
    palette: {
      mode,
      primary: { main: p.accent, contrastText: p.accentContrast },
      secondary: { main: p.text },
      error: { main: p.danger },
      background: { default: p.bg, paper: p.surface },
      text: { primary: p.text, secondary: p.textSecondary, disabled: p.textTertiary },
      divider: p.border,
      custom: p,
      action: {
        hover: alpha(p.text, mode === 'light' ? 0.045 : 0.06),
        selected: alpha(p.text, mode === 'light' ? 0.07 : 0.1),
        focus: alpha(p.accent, 0.16),
      },
    },
    custom: p,
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: fontStack,
      fontSize: 14,
      htmlFontSize: 16,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      h1: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.022em', lineHeight: 1.2 },
      h2: { fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.018em', lineHeight: 1.25 },
      h3: { fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.011em', lineHeight: 1.35 },
      h4: { fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '-0.006em', lineHeight: 1.4 },
      subtitle1: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.45 },
      subtitle2: { fontSize: '0.8125rem', fontWeight: 500, lineHeight: 1.4 },
      body1: { fontSize: '0.875rem', lineHeight: 1.6 },
      body2: { fontSize: '0.8125rem', lineHeight: 1.55 },
      caption: { fontSize: '0.75rem', lineHeight: 1.45, letterSpacing: '0.002em' },
      overline: {
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0',
        textTransform: 'none',
        lineHeight: 1.4,
      },
      button: { textTransform: 'none', fontWeight: 500, letterSpacing: '-0.003em' },
    },
    transitions: {
      easing: {
        easeOut: ease.out,
        easeInOut: ease.inOut,
        sharp: ease.out,
        easeIn: ease.out,
      },
      duration: { shortest: 120, shorter: 160, short: 200, standard: 220, complex: 280, enteringScreen: 240, leavingScreen: 180 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': { colorScheme: mode },
          html: { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' },
          body: {
            backgroundColor: p.bg,
            transition: `background-color 200ms ${ease.out}, color 200ms ${ease.out}`,
            fontFeatureSettings: '"cv11", "ss01"',
          },
          '::selection': { background: alpha(p.accent, 0.25) },
          ':focus-visible': { outline: `2px solid ${p.focus}`, outlineOffset: 2 },
          'code, pre, kbd': { fontFamily: monoStack },
          '@media (prefers-reduced-motion: reduce)': {
            '*, *::before, *::after': {
              transitionDuration: '0.01ms !important',
              animationDuration: '0.01ms !important',
            },
          },
        },
      },
      MuiButtonBase: {
        defaultProps: { disableRipple: true },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 7,
            minHeight: 34,
            paddingInline: 14,
            transition: `background-color 160ms ease, border-color 160ms ease, transform 160ms ${ease.out}`,
            '&:active': { transform: 'scale(0.97)' },
            '&.Mui-focusVisible': { outline: `2px solid ${p.focus}`, outlineOffset: 2 },
          },
          sizeSmall: { minHeight: 30, paddingInline: 10, fontSize: '0.8125rem' },
          contained: {
            backgroundColor: p.text,
            color: p.bg,
            '&:hover': { backgroundColor: alpha(p.text, 0.86) },
          },
          outlined: {
            borderColor: p.border,
            color: p.text,
            backgroundColor: p.surface,
            '&:hover': { borderColor: p.borderStrong, backgroundColor: p.subtle },
          },
          text: { color: p.text, '&:hover': { backgroundColor: alpha(p.text, 0.05) } },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 7,
            color: p.textSecondary,
            transition: `background-color 160ms ease, color 160ms ease, transform 160ms ${ease.out}`,
            '&:hover': { color: p.text, backgroundColor: alpha(p.text, 0.06) },
            '&:active': { transform: 'scale(0.94)' },
            '&.Mui-focusVisible': { outline: `2px solid ${p.focus}`, outlineOffset: 1 },
          },
          sizeSmall: { padding: 6 },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 10, border: `1px solid ${p.border}`, backgroundColor: p.surface },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'inherit' },
        styleOverrides: {
          root: {
            backgroundColor: alpha(p.bg, 0.82),
            backdropFilter: 'saturate(180%) blur(14px)',
            borderBottom: `1px solid ${p.border}`,
            '@media (prefers-reduced-transparency: reduce)': {
              backgroundColor: p.bg,
              backdropFilter: 'none',
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: { root: { minHeight: '56px !important', gap: 12 } },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { backgroundColor: p.bg, borderColor: p.border },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 7,
            backgroundColor: p.surface,
            fontSize: '0.875rem',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: p.border },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: p.borderStrong },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: p.accent, borderWidth: 1.5 },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: p.danger },
          },
          input: { paddingBlock: 8.5 },
          inputSizeSmall: { paddingBlock: 7 },
        },
      },
      MuiInputLabel: {
        styleOverrides: { root: { fontSize: '0.8125rem' } },
      },
      MuiFormHelperText: {
        styleOverrides: { root: { marginInline: 2, fontSize: '0.75rem' } },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            height: 26,
            fontSize: '0.75rem',
            fontWeight: 500,
            backgroundColor: p.subtle,
            color: p.text,
            border: `1px solid ${p.border}`,
          },
          sizeSmall: { height: 22, fontSize: '0.71875rem' },
          label: { paddingInline: 8 },
          deleteIcon: {
            fontSize: 15,
            color: p.textSecondary,
            '&:hover': { color: p.text },
          },
        },
      },
      MuiCheckbox: {
        defaultProps: { size: 'small', disableRipple: true },
        styleOverrides: {
          root: {
            padding: 4,
            color: p.borderStrong,
            '&.Mui-checked': { color: p.accent },
            '&.Mui-focusVisible': { outline: `2px solid ${p.focus}`, outlineOffset: -2, borderRadius: 6 },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 7,
            minHeight: 32,
            paddingBlock: 4,
            paddingInline: 10,
            transition: 'background-color 120ms ease',
            '&.Mui-selected': {
              backgroundColor: alpha(p.text, mode === 'light' ? 0.07 : 0.1),
              '&:hover': { backgroundColor: alpha(p.text, mode === 'light' ? 0.09 : 0.12) },
            },
            '&.Mui-focusVisible': { outline: `2px solid ${p.focus}`, outlineOffset: -2 },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: { root: { margin: 0 } },
      },
      MuiTooltip: {
        defaultProps: { enterDelay: 400, enterNextDelay: 0, arrow: false },
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === 'light' ? '#222320' : '#F2F2ED',
            color: mode === 'light' ? '#F2F2ED' : '#222320',
            fontSize: '0.75rem',
            fontWeight: 500,
            borderRadius: 6,
            paddingBlock: 5,
            paddingInline: 8,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            border: `1px solid ${p.border}`,
            boxShadow: mode === 'light' ? '0 8px 28px rgba(34,35,32,0.10)' : '0 8px 28px rgba(0,0,0,0.45)',
            borderRadius: 9,
            marginTop: 4,
          },
          list: { padding: 4 },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: { borderRadius: 6, fontSize: '0.8125rem', minHeight: 32 },
        },
      },
      MuiSelect: {
        styleOverrides: { select: { fontSize: '0.8125rem' } },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            border: `1px solid ${p.border}`,
            boxShadow: mode === 'light' ? '0 24px 64px rgba(34,35,32,0.18)' : '0 24px 64px rgba(0,0,0,0.6)',
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: { backgroundColor: alpha('#171816', mode === 'light' ? 0.32 : 0.6) },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: { backgroundColor: p.subtle, borderRadius: 8, padding: 2, gap: 2 },
          grouped: {
            border: 0,
            borderRadius: '6px !important',
            margin: 0,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            border: 0,
            color: p.textSecondary,
            textTransform: 'none',
            fontSize: '0.8125rem',
            paddingBlock: 4,
            paddingInline: 10,
            gap: 6,
            transition: 'background-color 140ms ease, color 140ms ease',
            '&.Mui-selected': {
              backgroundColor: p.surface,
              color: p.text,
              boxShadow: mode === 'light' ? '0 1px 2px rgba(34,35,32,0.12)' : '0 1px 2px rgba(0,0,0,0.5)',
              '&:hover': { backgroundColor: p.surface },
            },
            '&.Mui-focusVisible': { outline: `2px solid ${p.focus}`, outlineOffset: 1 },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: { minHeight: 40 },
          indicator: { height: 2, backgroundColor: p.text, borderRadius: 2 },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: 40,
            minWidth: 0,
            paddingInline: 12,
            textTransform: 'none',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: p.textSecondary,
            '&.Mui-selected': { color: p.text },
            '&.Mui-focusVisible': { outline: `2px solid ${p.focus}`, outlineOffset: -2, borderRadius: 6 },
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            borderRadius: 7,
            fontSize: '0.8125rem',
            '&.Mui-selected': {
              backgroundColor: p.text,
              color: p.bg,
              '&:hover': { backgroundColor: alpha(p.text, 0.86) },
            },
          },
        },
      },
      MuiSnackbar: {
        defaultProps: { anchorOrigin: { vertical: 'bottom', horizontal: 'center' } },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 9, fontSize: '0.8125rem', alignItems: 'center' },
          filled: { backgroundColor: p.text, color: p.bg },
        },
      },
      MuiSkeleton: {
        styleOverrides: { root: { backgroundColor: p.subtle } },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: p.border } },
      },
      MuiSlider: {
        styleOverrides: {
          root: { color: p.text, height: 3 },
          thumb: { width: 14, height: 14, boxShadow: 'none', '&:hover, &.Mui-focusVisible': { boxShadow: `0 0 0 6px ${alpha(p.text, 0.12)}` } },
          rail: { backgroundColor: p.borderStrong, opacity: 1 },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: { '&.Mui-checked': { color: p.surface }, '&.Mui-checked + .MuiSwitch-track': { backgroundColor: p.accent, opacity: 1 } },
        },
      },
    },
  })
}
