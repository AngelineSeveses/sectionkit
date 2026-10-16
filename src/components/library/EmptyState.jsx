import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'

export default function EmptyState({ kind = 'search', title, body, actionLabel, actionTo, onAction }) {
  const Icon = kind === 'favorites' ? BookmarkBorderRoundedIcon : SearchOffRoundedIcon
  return (
    <Box
      sx={{
        border: 1,
        borderStyle: 'dashed',
        borderColor: 'custom.borderStrong',
        borderRadius: 2.5,
        py: { xs: 6, md: 9 },
        px: 3,
        textAlign: 'center',
        display: 'grid',
        justifyItems: 'center',
        gap: 1,
      }}
    >
      <Icon sx={{ fontSize: 28, color: 'text.secondary', mb: 0.5 }} aria-hidden />
      <Typography variant="h3" component="p">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
        {body}
      </Typography>
      {actionLabel &&
        (actionTo ? (
          <Button component={RouterLink} to={actionTo} variant="outlined" size="small" sx={{ mt: 1.5 }}>
            {actionLabel}
          </Button>
        ) : (
          <Button onClick={onAction} variant="outlined" size="small" sx={{ mt: 1.5 }}>
            {actionLabel}
          </Button>
        ))}
    </Box>
  )
}
