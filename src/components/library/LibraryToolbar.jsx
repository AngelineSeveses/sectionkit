import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'recent', label: 'Recently added' },
  { value: 'category', label: 'Category' },
]

export default function LibraryToolbar({ count, sort, onSort, hasQuery }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1.5, minHeight: 36 }}>
      <Typography variant="body2" color="text.secondary" role="status" aria-live="polite" sx={{ fontVariantNumeric: 'tabular-nums' }}>
        {count} {count === 1 ? 'section' : 'sections'}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography component="label" htmlFor="sort-select" variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Sort by
        </Typography>
        <FormControl size="small">
          <Select
            id="sort-select"
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            slotProps={{ input: { 'aria-label': 'Sort sections' } }}
            sx={{ minWidth: 150, '& .MuiSelect-select': { py: '6px' } }}
          >
            {sortOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
                {o.value === 'relevance' && !hasQuery ? ' (curated)' : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}
