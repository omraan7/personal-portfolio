import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './compnants/Layout/Layout.jsx'

const allrouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
])

export default function App() {
  return <RouterProvider router={allrouter} />
}
