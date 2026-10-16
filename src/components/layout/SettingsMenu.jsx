import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import { useSettings } from '../../context/SettingsContext'
import { useToast } from '../../context/ToastContext'
import { clearAllCustomizations } from '../../services/customizationService'

const densities = [
  { value: 'comfortable', label: 'Comfortable grid' },
  { value: 'compact', label: 'Compact grid' },
]

export default function SettingsMenu() {
  const [anchor, setAnchor] = useState(null)
  const settings = useSettings()
  const notify = useToast()
  const navigate = useNavigate()
  const close = () => setAnchor(null)

  return (
    <>
      <Tooltip title="Settings">
        <IconButton
          size="small"
          aria-label="Settings"
          aria-haspopup="menu"
          aria-expanded={Boolean(anchor)}
          onClick={(e) => setAnchor(e.currentTarget)}
        >
          <TuneRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { width: 240 } } }}
      >
        <ListSubheader sx={{ lineHeight: '28px', fontSize: 12, bgcolor: 'transparent', color: 'text.secondary' }}>Gallery density</ListSubheader>
        {densities.map((d) => (
          <MenuItem
            key={d.value}
            selected={settings.density === d.value}
            onClick={() => {
              settings.update({ density: d.value })
              close()
            }}
          >
            <ListItemIcon>{settings.density === d.value && <CheckRoundedIcon fontSize="small" />}</ListItemIcon>
            <ListItemText>{d.label}</ListItemText>
          </MenuItem>
        ))}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            close()
            navigate('/coverage')
          }}
        >
          <ListItemIcon>
            <InsightsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Library coverage</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            clearAllCustomizations()
            close()
            notify('Cleared saved edits for every section')
          }}
        >
          <ListItemIcon>
            <RestartAltRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reset all section edits</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
