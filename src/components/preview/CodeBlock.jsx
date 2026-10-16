import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import { copyText } from '../../services/exportService'
import { useToast } from '../../context/ToastContext'

export default function CodeBlock({ label, code, copyLabel = 'Copy', successMessage, actions, maxHeight = 420, wrap = false }) {
  const notify = useToast()
  const onCopy = async () => {
    const ok = await copyText(code)
    notify(ok ? successMessage ?? `Copied ${label}` : 'Copy failed. Select the code and copy it manually.', ok ? 'success' : 'error')
  }

  return (
    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, pl: 1.5, pr: 0.75, py: 0.5, borderBottom: 1, borderColor: 'divider', bgcolor: 'custom.subtle' }}>
        <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }} noWrap>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {actions}
          <Button size="small" onClick={onCopy} disabled={!code} startIcon={<ContentCopyRoundedIcon sx={{ fontSize: '15px !important' }} />} sx={{ minHeight: 28, fontSize: 12 }}>
            {copyLabel}
          </Button>
        </Box>
      </Box>
      <Box
        component="pre"
        tabIndex={0}
        aria-label={`${label} code`}
        sx={{
          m: 0,
          p: 1.5,
          maxHeight,
          overflow: 'auto',
          fontSize: 11.5,
          lineHeight: 1.6,
          color: 'text.primary',
          whiteSpace: wrap ? 'pre-wrap' : 'pre',
          wordBreak: wrap ? 'break-word' : 'normal',
          tabSize: 2,
          scrollbarWidth: 'thin',
          '&:focus-visible': (t) => ({ outline: `2px solid ${t.palette.custom.focus}`, outlineOffset: -2 }),
        }}
      >
        <code>{code || 'Generating…'}</code>
      </Box>
    </Box>
  )
}
