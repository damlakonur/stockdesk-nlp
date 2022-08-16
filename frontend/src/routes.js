import React from 'react'

const AdminPage = React.lazy(() => import('./views/Admin/AdminPage'))
const InfluencerPage = React.lazy(() => import('./views/Influencer/InfluencerPage'))
const StockPage = React.lazy(() => import('./views/Stock/StockPage'))
const metricPage = React.lazy(() => import('./views/Metrics/metricPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin', name: 'Admin', element: AdminPage },
  { path: '/stock', name: 'Stock', element: StockPage },
  { path: '/influencer', name: 'Influencer', element: InfluencerPage },
  { path: '/influencer/metrics', name: 'Metrics', element: metricPage },
]

export default routes
