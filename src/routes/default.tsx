import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import('../features/home'))
const Slownik = lazy(() => import('../features/slownik'))
const Dubbing = lazy(() => import('../features/dubbing'))
const Imprint = lazy(() => import('../features/imprint'))
const DataProtection = lazy(() => import('../features/data-protection'))

export const defaultRoutes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/slownik',
    element: <Slownik />
  },
  {
    path: '/dubbing',
    element: <Dubbing />
  },
  {
    path: 'impresum',
    element: <Imprint />
  },
  {
    path: 'datowy-ski',
    element: <DataProtection />
  },
  { path: '*', element: <Navigate to='/' /> }
]

export enum ROUTES {
  'home' = '/',
  'imprint' = '/impresum',
  'datowy-skit' = '/datowy-ski'
}
