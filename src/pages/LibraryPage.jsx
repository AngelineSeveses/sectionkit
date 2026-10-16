import { useEffect, useMemo, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import { useLibraryQuery } from '../hooks/useLibraryQuery'
import { useFavorites } from '../context/FavoritesContext'
import { useSettings } from '../context/SettingsContext'
import { useLayout } from '../components/layout/LayoutContext'
import LibrarySidebar from '../components/layout/LibrarySidebar'
import LibraryToolbar from '../components/library/LibraryToolbar'
import ActiveFilters from '../components/library/ActiveFilters'
import SectionCard from '../components/library/SectionCard'
import EmptyState from '../components/library/EmptyState'
import { sections } from '../data/sectionRegistry'
import { categoryById, categoryOrder } from '../data/categories'
import { filterGroups } from '../data/taxonomy'
import { activeFilterCount, facetCounts, filterSections, sortResults } from '../utils/filtering'

const PAGE_SIZE = 24
const SIDEBAR_WIDTH = 264

export default function LibraryPage({ mode = 'all' }) {
  const { categoryId } = useParams()
  const query = useLibraryQuery()
  const favorites = useFavorites()
  const settings = useSettings()
  const layout = useLayout()
  const topRef = useRef(null)
  const category = mode === 'category' ? categoryById[categoryId] : null

  const ids = mode === 'favorites' ? favorites.set : undefined
  const criteria = useMemo(
    () => ({ category: category?.id, query: query.query, filters: query.filters, ids }),
    [category, query.query, query.filters, ids],
  )

  const results = useMemo(
    () => sortResults(filterSections(sections, criteria), query.sort, categoryOrder),
    [criteria, query.sort],
  )

  const facets = useMemo(
    () => Object.fromEntries(filterGroups.map((g) => [g.key, facetCounts(sections, criteria, g.key)])),
    [criteria],
  )

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const page = Math.min(query.page, pageCount)
  const pageItems = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const activeCount = activeFilterCount(query.filters)

  // Close the mobile drawer on navigation.
  useEffect(() => {
    layout.setMobileNavOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, mode])

  if (mode === 'category' && !category) return <Navigate to="/" replace />

  const title = mode === 'favorites' ? 'Favorites' : category ? category.label : query.query ? 'Search results' : 'All sections'
  const description =
    mode === 'favorites'
      ? 'Sections you have saved. Stored in this browser only.'
      : category
        ? category.description
        : 'Conversion-focused landing page sections for businesses in the United States and Canada.'

  const sidebar = (
    <LibrarySidebar query={query} facets={facets} activeCount={activeCount} onNavigate={() => layout.setMobileNavOpen(false)} />
  )

  const empty =
    results.length === 0 ? (
      mode === 'favorites' && favorites.ids.length === 0 ? (
        <EmptyState
          kind="favorites"
          title="No favorites yet"
          body="Use the bookmark on any section to keep it here. Favorites are saved in this browser."
          actionLabel="Browse all sections"
          actionTo="/"
        />
      ) : (
        <EmptyState
          kind="search"
          title="No sections match"
          body={
            query.query
              ? `Nothing matches “${query.query}” with the current filters. Try fewer words or remove a filter.`
              : 'No sections match this combination of filters. Remove one to widen the results.'
          }
          actionLabel={activeCount || query.query ? 'Clear search and filters' : undefined}
          onAction={query.clearAll}
        />
      )
    ) : null

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      {layout.desktop && settings.sidebarOpen && (
        <Box
          component="aside"
          aria-label="Categories and filters"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            position: 'sticky',
            top: 56,
            height: 'calc(100dvh - 56px)',
            overflowY: 'auto',
            borderRight: 1,
            borderColor: 'divider',
            scrollbarWidth: 'thin',
          }}
        >
          {sidebar}
        </Box>
      )}
      {!layout.desktop && (
        <Drawer
          open={layout.mobileNavOpen}
          onClose={() => layout.setMobileNavOpen(false)}
          slotProps={{ paper: { sx: { width: 300, maxWidth: '86vw' }, 'aria-label': 'Categories and filters' } }}
        >
          {sidebar}
        </Drawer>
      )}

      <Box component="main" id="main" ref={topRef} sx={{ flex: 1, minWidth: 0, px: { xs: 2, sm: 3, lg: 4 }, pt: { xs: 2.5, md: 3.5 }, pb: 8, scrollMarginTop: 72 }}>
        <Box sx={{ maxWidth: 720, mb: 2.5 }}>
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.75 }}>
            {description}
          </Typography>
        </Box>

        <LibraryToolbar count={results.length} sort={query.sort} onSort={query.setSort} hasQuery={Boolean(query.query)} />
        <ActiveFilters query={query} />

        {empty ?? (
          <>
            <Box
              component="ul"
              aria-label={`${title}, ${results.length} sections`}
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0,
                display: 'grid',
                gap: settings.density === 'compact' ? 1.5 : 2,
                gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${settings.density === 'compact' ? 232 : 300}px), 1fr))`,
              }}
            >
              {pageItems.map(({ entry }) => (
                <li key={entry.id}>
                  <SectionCard entry={entry} />
                </li>
              ))}
            </Box>
            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(_, p) => {
                    query.setPage(p)
                    topRef.current?.scrollIntoView({ block: 'start' })
                  }}
                  shape="rounded"
                  siblingCount={1}
                  getItemAriaLabel={(type, p, selected) =>
                    type === 'page' ? `${selected ? 'Current page, ' : 'Go to '}page ${p}` : `Go to ${type} page`
                  }
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}
