import { useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import PreviewFrame from './PreviewFrame'
import { useElementSize } from '../../hooks/useElementSize'

export const MIN_WIDTH = 320
export const MAX_WIDTH = 1920

/**
 * The large preview. Renders the section at an exact viewport width and,
 * when "fit" is on, scales it down to the available space. The handle on
 * the right edge resizes the viewport by dragging or with arrow keys.
 */
export default function PreviewCanvas({ entry, section, props, width, onWidthChange, fit, onBlockedAction }) {
  const areaRef = useRef(null)
  const { width: areaWidth } = useElementSize(areaRef)
  const [contentHeight, setContentHeight] = useState(0)
  const [dragging, setDragging] = useState(false)
  const drag = useRef(null)

  const available = Math.max(0, areaWidth - 32)
  const scale = fit && available && width > available ? available / width : 1
  const scaledW = width * scale
  const scaledH = contentHeight * scale

  const clamp = (w) => Math.round(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, w)))

  const onPointerDown = useCallback(
    (e) => {
      if (e.button !== 0) return
      e.currentTarget.setPointerCapture(e.pointerId)
      // Respect where the handle was grabbed: track deltas, not absolute position.
      drag.current = { startX: e.clientX, startWidth: width, scale }
      setDragging(true)
    },
    [width, scale],
  )

  const onPointerMove = (e) => {
    if (!drag.current) return
    const { startX, startWidth, scale: s } = drag.current
    // The frame is centered, so each side moves half the delta.
    const delta = ((e.clientX - startX) * 2) / s
    onWidthChange(clamp(startWidth + delta))
  }

  const endDrag = () => {
    drag.current = null
    setDragging(false)
  }

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 50 : 10
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') onWidthChange(clamp(width + step))
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') onWidthChange(clamp(width - step))
    else if (e.key === 'Home') onWidthChange(MIN_WIDTH)
    else if (e.key === 'End') onWidthChange(MAX_WIDTH)
    else return
    e.preventDefault()
  }

  return (
    <Box
      ref={areaRef}
      sx={{
        position: 'relative',
        bgcolor: 'custom.canvas',
        borderRadius: { xs: 0, md: 2.5 },
        border: { xs: 0, md: 1 },
        borderColor: { md: 'divider' },
        py: 2,
        overflowX: fit ? 'hidden' : 'auto',
        minHeight: 360,
        backgroundImage: (t) =>
          `radial-gradient(${t.palette.mode === 'light' ? 'rgba(34,35,32,0.07)' : 'rgba(242,242,237,0.06)'} 1px, transparent 1px)`,
        backgroundSize: '16px 16px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: scaledW,
          height: section.status === 'ready' ? scaledH || 320 : 420,
          mx: fit || scaledW <= available ? 'auto' : 2,
          transition: dragging ? 'none' : 'height 200ms cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        {section.status !== 'ready' && (
          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'background.paper', borderRadius: 1 }}>
            {section.status === 'error' ? (
              <Typography color="error" variant="body2" sx={{ p: 3 }}>
                This section failed to load: {String(section.error?.message ?? 'unknown error')}
              </Typography>
            ) : (
              <Skeleton variant="rectangular" animation="wave" sx={{ height: '100%', borderRadius: 1 }} />
            )}
          </Box>
        )}
        {section.status === 'ready' && (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              width,
              transform: scale !== 1 ? `scale(${scale})` : 'none',
              transformOrigin: '0 0',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.10)',
              borderRadius: '4px',
              overflow: 'hidden',
              // Keep pointer events away from the iframe while resizing.
              pointerEvents: dragging ? 'none' : 'auto',
            }}
          >
            <PreviewFrame
              css={section.css}
              fonts={entry.fonts}
              width={width}
              title={`${entry.name} preview at ${width}px`}
              onHeight={setContentHeight}
              onBlockedAction={onBlockedAction}
            >
              <section.Component {...props} />
            </PreviewFrame>
          </Box>
        )}

        <Box
          role="slider"
          tabIndex={0}
          aria-label="Preview width"
          aria-valuemin={MIN_WIDTH}
          aria-valuemax={MAX_WIDTH}
          aria-valuenow={width}
          aria-valuetext={`${width} pixels`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          sx={{
            position: 'absolute',
            top: 0,
            right: -14,
            width: 12,
            height: '100%',
            maxHeight: '100%',
            cursor: 'ew-resize',
            display: 'grid',
            placeItems: 'start center',
            touchAction: 'none',
            outline: 'none',
            '&::after': {
              content: '""',
              position: 'sticky',
              top: 'calc(50vh - 20px)',
              mt: '40px',
              width: 4,
              height: 40,
              borderRadius: 4,
              bgcolor: dragging ? 'text.primary' : 'custom.borderStrong',
              transition: 'background-color 140ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
              transform: dragging ? 'scaleY(1.15)' : 'none',
            },
            '&:hover::after': { bgcolor: 'text.secondary' },
            '&:focus-visible::after': (t) => ({ bgcolor: t.palette.custom.focus, boxShadow: `0 0 0 3px ${t.palette.custom.accentSoft}` }),
          }}
        />
      </Box>
      {dragging && <Box sx={{ position: 'fixed', inset: 0, zIndex: 1, cursor: 'ew-resize' }} />}
    </Box>
  )
}
