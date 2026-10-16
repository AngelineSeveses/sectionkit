import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const ToastContext = createContext(() => {})

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const notify = useCallback((message, severity = 'success') => {
    setToast({ message, severity, key: Date.now() })
  }, [])

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return
    setToast(null)
  }

  const value = useMemo(() => notify, [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar key={toast?.key} open={Boolean(toast)} autoHideDuration={2800} onClose={handleClose}>
        {toast ? (
          <Alert
            onClose={handleClose}
            severity={toast.severity}
            variant={toast.severity === 'success' ? 'filled' : 'standard'}
            icon={false}
            sx={{ minWidth: 240, boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}
          >
            {toast.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
