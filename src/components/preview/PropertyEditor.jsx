import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import { imageUrlError, isHexColor, urlError } from '../../utils/validation'

function Label({ children, htmlFor }) {
  return (
    <Typography component="label" htmlFor={htmlFor} variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>
      {children}
    </Typography>
  )
}

/** URL-like fields keep a local draft; only valid values reach the preview. */
function ValidatedField({ id, field, value, onChange, check, placeholder }) {
  const [draft, setDraft] = useState(value)
  const [lastValue, setLastValue] = useState(value)
  if (value !== lastValue) {
    // Value was reset from outside (reset button); adopt it.
    setLastValue(value)
    setDraft(value)
  }
  const error = draft === value ? null : check(draft)
  return (
    <TextField
      id={id}
      size="small"
      fullWidth
      value={draft}
      placeholder={placeholder}
      error={Boolean(error)}
      helperText={error ?? (field.help || ' ')}
      onChange={(e) => {
        const next = e.target.value
        setDraft(next)
        if (!check(next)) {
          setLastValue(next.trim())
          onChange(next.trim())
        }
      }}
      slotProps={{ htmlInput: { spellCheck: false, autoComplete: 'off', inputMode: 'url' }, formHelperText: { sx: { minHeight: 16 } } }}
    />
  )
}

function ColorField({ id, value, onChange }) {
  const [draft, setDraft] = useState(value)
  const [lastValue, setLastValue] = useState(value)
  if (value !== lastValue) {
    setLastValue(value)
    setDraft(value)
  }
  const invalid = draft !== value && !isHexColor(draft)
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
      <Box
        component="input"
        type="color"
        aria-label="Pick color"
        value={value.length === 4 ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}` : value}
        onChange={(e) => {
          setLastValue(e.target.value)
          setDraft(e.target.value)
          onChange(e.target.value)
        }}
        sx={{
          width: 38,
          height: 38,
          p: 0.5,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1.75,
          bgcolor: 'background.paper',
          cursor: 'pointer',
          flexShrink: 0,
          '&::-webkit-color-swatch-wrapper': { p: 0 },
          '&::-webkit-color-swatch': { border: 0, borderRadius: '5px' },
          '&::-moz-color-swatch': { border: 0, borderRadius: '5px' },
        }}
      />
      <TextField
        id={id}
        size="small"
        fullWidth
        value={draft}
        error={invalid}
        helperText={invalid ? 'Use a hex color like #1F6F5C' : undefined}
        onChange={(e) => {
          const v = e.target.value.trim()
          setDraft(v)
          if (isHexColor(v)) {
            setLastValue(v)
            onChange(v)
          }
        }}
        slotProps={{ htmlInput: { spellCheck: false, autoComplete: 'off', maxLength: 7, style: { fontVariantNumeric: 'tabular-nums' } } }}
      />
    </Box>
  )
}

function FieldControl({ field, value, onChange, idPrefix }) {
  const id = `${idPrefix}-${field.key}`
  switch (field.type) {
    case 'text':
      return (
        <TextField id={id} size="small" fullWidth value={value} onChange={(e) => onChange(e.target.value)} slotProps={{ htmlInput: { maxLength: field.maxLength } }} />
      )
    case 'textarea':
      return (
        <TextField
          id={id}
          size="small"
          fullWidth
          multiline
          minRows={2}
          maxRows={8}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          slotProps={{ htmlInput: { maxLength: field.maxLength } }}
        />
      )
    case 'url':
      return <ValidatedField id={id} field={field} value={value} onChange={onChange} check={urlError} placeholder="https://…" />
    case 'image':
      return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <Box
            component="img"
            src={value}
            alt=""
            sx={{ width: 38, height: 38, borderRadius: 1.75, objectFit: 'cover', border: 1, borderColor: 'divider', flexShrink: 0, bgcolor: 'custom.subtle' }}
          />
          <ValidatedField id={id} field={field} value={value} onChange={onChange} check={imageUrlError} placeholder="https://images…" />
        </Box>
      )
    case 'color':
      return <ColorField id={id} value={value} onChange={onChange} />
    case 'select':
      return field.options.length <= 3 ? (
        <ToggleButtonGroup
          exclusive
          fullWidth
          size="small"
          value={value}
          onChange={(_, v) => v !== null && onChange(v)}
          aria-labelledby={`${id}-label`}
        >
          {field.options.map((o) => (
            <ToggleButton key={o.value} value={o.value}>
              {o.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      ) : (
        <TextField id={id} select size="small" fullWidth value={value} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </TextField>
      )
    case 'range':
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 0.75 }}>
          <Slider
            value={value}
            min={field.min}
            max={field.max}
            step={field.step}
            onChange={(_, v) => onChange(v)}
            slotProps={{ input: { 'aria-labelledby': `${id}-label` } }}
            size="small"
          />
          <Typography variant="body2" sx={{ minWidth: 44, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
            {value}
            {field.unit ?? ''}
          </Typography>
        </Box>
      )
    case 'toggle':
      return null
    default:
      return null
  }
}

function ListField({ field, value, onChange, idPrefix }) {
  const [open, setOpen] = useState(0)
  const items = value
  const canAdd = items.length < (field.max ?? 8)
  const canRemove = items.length > (field.min ?? 1)

  const updateItem = (i, key, v) => onChange(items.map((it, idx) => (idx === i ? { ...it, [key]: v } : it)))
  const add = () => {
    const template = structuredClone(field.default[items.length] ?? items[items.length - 1] ?? field.default[0])
    // Sections key list items by their text, so keep copied text unique.
    for (const sub of field.itemFields) {
      if ((sub.type === 'text' || sub.type === 'textarea') && items.some((it) => it[sub.key] === template[sub.key]) && template[sub.key]) {
        template[sub.key] = `${template[sub.key]} (copy)`.slice(0, sub.maxLength ?? 600)
      }
    }
    onChange([...items, template])
    setOpen(items.length)
  }
  const remove = (i) => {
    onChange(items.filter((_, idx) => idx !== i))
    setOpen(-1)
  }
  const moveUp = (i) => {
    if (i === 0) return
    const next = [...items]
    ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
    onChange(next)
    setOpen(i - 1)
  }
  const titleKey = field.itemFields.find((f) => f.type === 'text')?.key

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {field.label} <Box component="span" sx={{ color: 'text.disabled' }}>({items.length})</Box>
        </Typography>
        <Button size="small" startIcon={<AddRoundedIcon sx={{ fontSize: 16 }} />} onClick={add} disabled={!canAdd} sx={{ minHeight: 26, px: 1, fontSize: 12 }}>
          Add
        </Button>
      </Box>
      <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
        {items.map((item, i) => {
          const expanded = open === i
          const panelId = `${idPrefix}-${field.key}-${i}`
          return (
            <Box key={i} sx={{ '& + &': { borderTop: 1, borderColor: 'divider' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', pr: 0.5 }}>
                <Button
                  onClick={() => setOpen(expanded ? -1 : i)}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  sx={{ flex: 1, justifyContent: 'flex-start', minWidth: 0, borderRadius: 0, py: 1, px: 1.25, fontWeight: 400, '&:active': { transform: 'none' } }}
                  endIcon={<ExpandMoreRoundedIcon sx={{ fontSize: 16, transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease', color: 'text.secondary' }} />}
                >
                  <Box component="span" sx={{ color: 'text.secondary', mr: 1, fontVariantNumeric: 'tabular-nums' }}>
                    {i + 1}
                  </Box>
                  <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, textAlign: 'left' }}>
                    {(titleKey && item[titleKey]) || `Item ${i + 1}`}
                  </Box>
                </Button>
                <Tooltip title="Move up">
                  <span>
                    <IconButton size="small" onClick={() => moveUp(i)} disabled={i === 0} aria-label={`Move item ${i + 1} up`}>
                      <ArrowUpwardRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Remove">
                  <span>
                    <IconButton size="small" onClick={() => remove(i)} disabled={!canRemove} aria-label={`Remove item ${i + 1}`}>
                      <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
              <Collapse in={expanded} timeout={180} unmountOnExit>
                <Box id={panelId} sx={{ px: 1.25, pb: 1.5, pt: 0.5, display: 'grid', gap: 1.25, bgcolor: 'custom.subtle' }}>
                  {field.itemFields.map((sub) => (
                    <FieldRow
                      key={sub.key}
                      field={sub}
                      value={item[sub.key]}
                      onChange={(v) => updateItem(i, sub.key, v)}
                      idPrefix={`${panelId}`}
                    />
                  ))}
                </Box>
              </Collapse>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

function FieldRow({ field, value, onChange, idPrefix }) {
  if (field.type === 'list') return <ListField field={field} value={value} onChange={onChange} idPrefix={idPrefix} />
  if (field.type === 'toggle') {
    return (
      <FormControlLabel
        control={<Switch size="small" checked={value} onChange={(e) => onChange(e.target.checked)} />}
        label={<Typography variant="body2">{field.label}</Typography>}
        sx={{ ml: 0, gap: 1 }}
      />
    )
  }
  const id = `${idPrefix}-${field.key}`
  return (
    <Box>
      <Label htmlFor={id}>
        <span id={`${id}-label`}>{field.label}</span>
      </Label>
      <FieldControl field={field} value={value} onChange={onChange} idPrefix={idPrefix} />
    </Box>
  )
}

export default function PropertyEditor({ entry, values, onChange }) {
  const groups = [
    { id: 'content', label: 'Content', fields: entry.fields.filter((f) => f.group !== 'style') },
    { id: 'style', label: 'Design', fields: entry.fields.filter((f) => f.group === 'style') },
  ].filter((g) => g.fields.length)

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      {groups.map((g) => (
        <Box key={g.id} component="section" aria-labelledby={`edit-${g.id}`}>
          <Typography id={`edit-${g.id}`} variant="h4" component="h3" sx={{ mb: 1.5 }}>
            {g.label}
          </Typography>
          <Box sx={{ display: 'grid', gap: 1.75 }}>
            {g.fields.map((f) => (
              <FieldRow key={f.key} field={f} value={values[f.key]} onChange={(v) => onChange(f.key, v)} idPrefix={`f-${entry.id}`} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
