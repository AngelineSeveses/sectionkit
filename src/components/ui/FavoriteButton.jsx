import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded'
import { useFavorites } from '../../context/FavoritesContext'
import { useToast } from '../../context/ToastContext'

export default function FavoriteButton({ entry, overlay = false, size = 'small' }) {
  const favorites = useFavorites()
  const notify = useToast()
  const active = favorites.has(entry.id)
  const label = active ? 'Remove from favorites' : 'Save to favorites'

  const onClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const added = favorites.toggle(entry.id)
    notify(added ? `Saved “${entry.name}” to favorites` : `Removed “${entry.name}” from favorites`)
  }

  return (
    <Tooltip title={label}>
      <IconButton
        size={size}
        onClick={onClick}
        aria-label={label}
        aria-pressed={active}
        data-active={active}
        sx={
          overlay
            ? {
                bgcolor: 'rgba(255,255,255,0.92)',
                color: active ? '#222320' : '#5c5d56',
                boxShadow: '0 1px 2px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
                backdropFilter: 'blur(6px)',
                '&:hover': { bgcolor: '#ffffff', color: '#222320' },
              }
            : { color: active ? 'text.primary' : 'text.secondary' }
        }
      >
        {active ? <BookmarkRoundedIcon fontSize="small" /> : <BookmarkBorderRoundedIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  )
}
