import { Link as RouterLink, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { categories } from '../../data/categories'
import { countsByCategory, sections } from '../../data/sectionRegistry'
import { filterGroups } from '../../data/taxonomy'
import { useFavorites } from '../../context/FavoritesContext'
import FilterGroup from '../filters/FilterGroup'

function NavItem({ to, label, count, selected, onNavigate }) {
  return (
    <ListItemButton
      component={RouterLink}
      to={to}
      selected={selected}
      aria-current={selected ? 'page' : undefined}
      onClick={onNavigate}
      dense
    >
      <ListItemText
        primary={label}
        slotProps={{ primary: { variant: 'body2', noWrap: true, sx: { fontWeight: selected ? 500 : 400 } } }}
      />
      {count !== undefined && (
        <Typography variant="caption" sx={{ color: 'text.secondary', fontVariantNumeric: 'tabular-nums', ml: 1 }}>
          {count}
        </Typography>
      )}
    </ListItemButton>
  )
}

function SidebarHeading({ children, id }) {
  return (
    <Typography id={id} variant="caption" component="h2" sx={{ px: 1.25, pt: 2, pb: 0.75, color: 'text.secondary', fontWeight: 500 }}>
      {children}
    </Typography>
  )
}

export default function LibrarySidebar({ query, facets, activeCount, onNavigate }) {
  const location = useLocation()
  const favorites = useFavorites()
  // Carry search and filters across category changes.
  const params = new URLSearchParams(location.search)
  params.delete('page')
  const search = params.toString() ? `?${params}` : ''

  return (
    <Box sx={{ px: 1.25, pb: 4 }}>
      <Box component="nav" aria-labelledby="nav-library">
        <SidebarHeading id="nav-library">Library</SidebarHeading>
        <List disablePadding sx={{ display: 'grid', gap: '1px' }}>
          <NavItem to={`/${search}`} label="All sections" count={sections.length} selected={location.pathname === '/'} onNavigate={onNavigate} />
          <NavItem to={`/favorites${search}`} label="Favorites" count={favorites.ids.length} selected={location.pathname === '/favorites'} onNavigate={onNavigate} />
        </List>
        <SidebarHeading id="nav-categories">Categories</SidebarHeading>
        <List disablePadding aria-labelledby="nav-categories" sx={{ display: 'grid', gap: '1px' }}>
          {categories.map((c) => (
            <NavItem
              key={c.id}
              to={`/category/${c.id}${search}`}
              label={c.label}
              count={countsByCategory[c.id] ?? 0}
              selected={location.pathname === `/category/${c.id}`}
              onNavigate={onNavigate}
            />
          ))}
        </List>
      </Box>

      <Box component="section" aria-labelledby="filters-heading">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 0.5 }}>
          <SidebarHeading id="filters-heading">Filters</SidebarHeading>
          {activeCount > 0 && (
            <Button size="small" variant="text" onClick={query.clearFilters} sx={{ mt: 1.25, minHeight: 26, px: 1, fontSize: 12, color: 'text.secondary' }}>
              Clear all
            </Button>
          )}
        </Box>
        <Box sx={{ display: 'grid', gap: '2px' }}>
          {filterGroups.map((g, i) => (
            <FilterGroup
              key={g.key}
              group={g}
              selected={query.filters[g.key]}
              counts={facets[g.key]}
              onToggle={query.toggleFilter}
              defaultOpen={i === 0}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
