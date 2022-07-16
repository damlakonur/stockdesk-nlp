import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Cyberdroid Routes

const UebaPage = React.lazy(() => import('./views/ueba/UebaPage'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/analysis/ueba', name: 'UEBA', element: UebaPage },


]

export default routes
