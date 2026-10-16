import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { filterGroups } from '../../data/taxonomy'

export default function ActiveFilters({ query }) {
  const chips = filterGroups.flatMap((g) =>
    query.filters[g.key].map((value) => ({
      group: g,
      value,
      label: g.options.find((o) => o.id === value)?.label ?? value,
    })),
  )
  if (!chips.length) return null

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center', mb: 2 }} aria-label="Active filters" role="list">
      {chips.map((c) => (
        <Chip
          role="listitem"
          key={`${c.group.key}:${c.value}`}
          size="small"
          label={
            <>
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                {c.group.label}:
              </Box>
              {c.label}
            </>
          }
          onDelete={() => query.toggleFilter(c.group.key, c.value)}
          slotProps={{ deleteIcon: { 'aria-label': `Remove filter ${c.group.label}: ${c.label}` } }}
        />
      ))}
      <Button size="small" variant="text" onClick={query.clearFilters} sx={{ minHeight: 24, fontSize: 12, color: 'text.secondary' }}>
        Clear all
      </Button>
    </Box>
  )
}
