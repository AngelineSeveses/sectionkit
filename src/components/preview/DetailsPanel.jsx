import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { categoryById } from '../../data/categories'
import { labelFor } from '../../data/taxonomy'

function Block({ title, children }) {
  return (
    <Box component="section">
      <Typography variant="h4" component="h3" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

function Bullets({ items }) {
  return (
    <Box component="ul" sx={{ m: 0, pl: 2.25, display: 'grid', gap: 0.75 }}>
      {items.map((t) => (
        <Typography component="li" variant="body2" key={t} sx={{ color: 'text.primary', '&::marker': { color: 'text.disabled' } }}>
          {t}
        </Typography>
      ))}
    </Box>
  )
}

function TagRow({ label, items, list, param }) {
  if (!items.length) return null
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '112px 1fr' }, gap: { xs: 0.5, sm: 1.5 }, alignItems: 'start' }}>
      <Typography variant="caption" color="text.secondary" sx={{ pt: 0.4 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {items.map((id) => (
          <Chip
            key={id}
            size="small"
            label={labelFor(list, id)}
            component={RouterLink}
            to={`/?${param}=${encodeURIComponent(id)}`}
            clickable
            sx={{ '&:hover': { bgcolor: 'action.selected' } }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default function DetailsPanel({ entry }) {
  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Block title="Where it fits">
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {entry.audience}
        </Typography>
        <Box sx={{ display: 'grid', gap: 1 }}>
          <TagRow label="Industries" items={entry.industries} list="industries" param="ind" />
          <TagRow label="Conversion goals" items={entry.goals} list="goals" param="goal" />
          <TagRow label="Layout" items={[entry.layout]} list="layouts" param="layout" />
          <TagRow label="Style" items={entry.styles} list="styles" param="style" />
          <TagRow label="Markets" items={entry.markets} list="markets" param="market" />
        </Box>
      </Block>

      <Block title="Why it works">
        <Bullets items={entry.rationale} />
      </Block>

      <Block title="Structure">
        <Box component="ol" sx={{ m: 0, pl: 2.5, display: 'grid', gap: 0.5 }}>
          {entry.structure.map((s) => (
            <Typography component="li" variant="body2" key={s} sx={{ '&::marker': { color: 'text.secondary', fontVariantNumeric: 'tabular-nums' } }}>
              {s}
            </Typography>
          ))}
        </Box>
      </Block>

      <Block title="Responsive behavior">
        <Bullets items={entry.responsive} />
      </Block>

      {entry.sampleContent && (
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'custom.accentSoft', color: 'text.primary' }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Contains sample content
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            Names, quotes, ratings and figures in this section are placeholders. Replace them with real, verifiable
            customer content before publishing.
          </Typography>
        </Box>
      )}

      <Block title="Specification">
        <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: '112px 1fr', rowGap: 0.75, columnGap: 1.5, '& dt': { color: 'text.secondary', typography: 'caption', pt: '2px' }, '& dd': { m: 0, typography: 'body2' } }}>
          <dt>ID</dt>
          <dd><code>{entry.id}</code></dd>
          <dt>Category</dt>
          <dd>{categoryById[entry.category]?.label}</dd>
          <dt>Component</dt>
          <dd><code>src/sections/{entry.file}.jsx</code></dd>
          <dt>Fonts</dt>
          <dd>{entry.fonts.map((f) => f.split(':')[0]).join(', ') || 'System'}</dd>
          <dt>Exports</dt>
          <dd>React, HTML/CSS, Elementor guide</dd>
          <dt>Status</dt>
          <dd>{entry.status === 'implemented' ? 'Implemented' : entry.status}</dd>
          <dt>Version</dt>
          <dd>{entry.version}</dd>
          <dt>Added</dt>
          <dd>{entry.addedAt}</dd>
        </Box>
      </Block>
    </Box>
  )
}
