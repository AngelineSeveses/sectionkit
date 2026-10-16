import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

export default function FilterGroup({ group, selected, counts, onToggle, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen || selected.length > 0)
  const id = `filter-${group.key}`

  return (
    <Box role="group" aria-labelledby={`${id}-label`} sx={{ minWidth: 0 }}>
      <ButtonBase
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          px: 1.25,
          py: 0.75,
          borderRadius: 1.75,
          typography: 'subtitle2',
          color: 'text.primary',
          '&:hover': { bgcolor: 'action.hover' },
          '&.Mui-focusVisible': (t) => ({ outline: `2px solid ${t.palette.custom.focus}`, outlineOffset: -2 }),
        }}
      >
        <Box component="span" sx={{ display: 'flex', gap: 0.75, alignItems: 'baseline' }}>
          <span id={`${id}-label`}>{group.label}</span>
          {selected.length > 0 && (
            <Typography component="span" variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
              {selected.length}
            </Typography>
          )}
        </Box>
        <ExpandMoreRoundedIcon
          sx={{
            fontSize: 18,
            color: 'text.secondary',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />
      </ButtonBase>
      <Collapse in={open} timeout={180} id={id}>
        <Box sx={{ pb: 1, pt: 0.25 }}>
          {group.options.map((opt) => {
            const count = counts[opt.id] ?? 0
            const checked = selected.includes(opt.id)
            const empty = count === 0 && !checked
            return (
              <Box
                component="label"
                key={opt.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  pl: 0.5,
                  pr: 1.25,
                  minHeight: 30,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  color: empty ? 'text.disabled' : 'text.primary',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Checkbox checked={checked} onChange={() => onToggle(group.key, opt.id)} slotProps={{ input: { 'aria-describedby': `${id}-${opt.id}-count` } }} />
                <Typography variant="body2" sx={{ flex: 1, minWidth: 0, color: 'inherit' }} noWrap>
                  {opt.label}
                </Typography>
                <Typography
                  id={`${id}-${opt.id}-count`}
                  variant="caption"
                  sx={{ color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}
                  aria-label={`${count} sections`}
                >
                  {count}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Collapse>
    </Box>
  )
}
