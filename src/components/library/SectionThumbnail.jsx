import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import PreviewFrame from '../preview/PreviewFrame'
import { useSection } from '../preview/useSection'
import { useElementSize, useInViewOnce } from '../../hooks/useElementSize'

const DEFAULT_RENDER_WIDTH = 1280
const ASPECT = 10 / 16

/**
 * A live, scaled-down render of the section. Mounts only when the card nears
 * the viewport, and the iframe is inert so it never steals focus or clicks.
 */
export default function SectionThumbnail({ entry }) {
  const boxRef = useRef(null)
  const visible = useInViewOnce(boxRef)
  const { width } = useElementSize(boxRef)
  const section = useSection(entry, visible)
  // Short sections (navbars, strips) can opt into a narrower render so they read at card size.
  const RENDER_WIDTH = entry.thumbWidth ?? DEFAULT_RENDER_WIDTH
  const [contentHeight, setContentHeight] = useState(0)

  const scale = width ? width / RENDER_WIDTH : 0
  const boxHeight = width * ASPECT
  const scaledHeight = contentHeight * scale
  const offsetY = scaledHeight && scaledHeight < boxHeight ? (boxHeight - scaledHeight) / 2 : 0
  const ready = section.status === 'ready' && contentHeight > 0

  return (
    <Box
      ref={boxRef}
      sx={{
        position: 'relative',
        aspectRatio: '16 / 10',
        overflow: 'hidden',
        bgcolor: 'custom.subtle',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      {!ready && section.status !== 'error' && (
        <Skeleton variant="rectangular" animation="wave" sx={{ position: 'absolute', inset: 0, height: '100%' }} />
      )}
      {section.status === 'error' && (
        <Typography variant="caption" color="text.secondary" sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', p: 2 }}>
          Preview failed to load
        </Typography>
      )}
      {section.status === 'ready' && scale > 0 && (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: 0,
            top: offsetY,
            width: RENDER_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            opacity: ready ? 1 : 0,
            transition: 'opacity 220ms cubic-bezier(0.23, 1, 0.32, 1)',
            boxShadow: offsetY ? '0 1px 0 rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)' : 'none',
          }}
        >
          <PreviewFrame
            css={section.css}
            fonts={entry.fonts}
            width={RENDER_WIDTH}
            title={`${entry.name} thumbnail`}
            interactive={false}
            onHeight={setContentHeight}
          >
            <section.Component {...entry.defaults} />
          </PreviewFrame>
        </Box>
      )}
    </Box>
  )
}
