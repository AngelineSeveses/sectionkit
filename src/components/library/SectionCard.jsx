import { memo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FavoriteButton from '../ui/FavoriteButton'
import SectionThumbnail from './SectionThumbnail'
import { categoryById } from '../../data/categories'
import { labelFor } from '../../data/taxonomy'

function SectionCard({ entry }) {
  const category = categoryById[entry.category]
  return (
    <Card
      component="article"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 160ms ease',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': { borderColor: 'custom.borderStrong' },
          '& .fav-slot': { opacity: 0 },
          '&:hover .fav-slot, &:focus-within .fav-slot, &:has([data-active="true"]) .fav-slot': { opacity: 1 },
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/c/${entry.slug}`}
        aria-label={`Open ${entry.name}`}
        sx={{
          '&:active': { transform: 'none' },
          '& .MuiCardActionArea-focusHighlight': { display: 'none' },
          '&.Mui-focusVisible': (t) => ({ outline: `2px solid ${t.palette.custom.focus}`, outlineOffset: -2, borderRadius: '10px' }),
        }}
      >
        <SectionThumbnail entry={entry} />
        <CardContent sx={{ px: 1.75, py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography variant="subtitle1" component="h3" noWrap sx={{ letterSpacing: '-0.006em' }}>
            {entry.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, mt: 0.25, minWidth: 0, color: 'text.secondary' }}>
            <Typography variant="caption" noWrap sx={{ flexShrink: 0 }}>
              {category?.label}
            </Typography>
            <Typography variant="caption" aria-hidden sx={{ color: 'custom.borderStrong' }}>
              /
            </Typography>
            <Typography variant="caption" noWrap>
              {labelFor('layouts', entry.layout)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box className="fav-slot" sx={{ position: 'absolute', top: 8, right: 8, transition: 'opacity 140ms ease' }}>
        <FavoriteButton entry={entry} overlay />
      </Box>
    </Card>
  )
}

export default memo(SectionCard)
