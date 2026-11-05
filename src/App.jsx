import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import Universe from './ui/Universe.jsx'

const allrouter = createBrowserRouter([
  {
    path: '/',
    element: <Universe />,
  },
  {
    path: '*',
    element: <Universe />,
  },
  
])

export default function App() {
  return <RouterProvider router={allrouter} />
}
