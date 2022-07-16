import React from 'react'

const InfluencerPage = React.lazy(() => import('./views/Influencer/InfluencerPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/analysis/Influencer', name: 'Influencer', element: InfluencerPage },
]

export default routes
