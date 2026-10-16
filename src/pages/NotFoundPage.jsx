import Box from '@mui/material/Box'
import EmptyState from '../components/library/EmptyState'

export default function NotFoundPage({ message = 'This page doesn’t exist.' }) {
  return (
    <Box component="main" id="main" sx={{ maxWidth: 640, mx: 'auto', px: 2, py: 8 }}>
      <EmptyState title="Not found" body={message} actionLabel="Back to the library" actionTo="/" />
    </Box>
  )
}
