import { RouterProvider } from 'react-router-dom'
import { AppThemeProvider } from '../theme/ThemeContext'
import { FavoritesProvider } from '../context/FavoritesContext'
import { SettingsProvider } from '../context/SettingsContext'
import { ToastProvider } from '../context/ToastContext'
import { router } from './routes'

export default function App() {
  return (
    <AppThemeProvider>
      <SettingsProvider>
        <FavoritesProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </FavoritesProvider>
      </SettingsProvider>
    </AppThemeProvider>
  )
}
