import React from 'react'

const InfluencerPage = React.lazy(() => import('./views/Influencer/InfluencerPage'))
const StockPage = React.lazy(() => import('./views/Stock/StockPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/influencer', name: 'Influencer', element: InfluencerPage },
  { path: '/stock', name: 'Stock', element: StockPage },
]

export default routes
