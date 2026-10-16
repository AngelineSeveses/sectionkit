import { createBrowserRouter } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import LibraryPage from '../pages/LibraryPage'
import NotFoundPage from '../pages/NotFoundPage'

// The library loads eagerly; the detail, coverage and full-view pages load on demand.
const lazyPage = (load) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <LibraryPage mode="all" /> },
      { path: '/category/:categoryId', element: <LibraryPage mode="category" /> },
      { path: '/favorites', element: <LibraryPage mode="favorites" /> },
      { path: '/c/:slug', lazy: lazyPage(() => import('../pages/ComponentDetailPage')) },
      { path: '/coverage', lazy: lazyPage(() => import('../pages/CoveragePage')) },
      // Bulk layout check, only available in development builds.
      ...(import.meta.env.DEV ? [{ path: '/qa', lazy: lazyPage(() => import('../pages/QaPage')) }] : []),
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/view/:slug', lazy: lazyPage(() => import('../pages/StandaloneViewPage')) },
])
