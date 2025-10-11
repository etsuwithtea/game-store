import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home'
import About from './routes/About'
import Detail from './routes/Detail'
import Favorite from './routes/Favorite'
import Developer from './routes/Developer'
import NotFound from './routes/NotFound'

// ทำ router แบบต.ย. อาจารย์
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'detail', element: <Detail /> },
      { path: 'favorite', element: <Favorite /> },
      { path: 'developer', element: <Developer /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

const root = createRoot(document.getElementById('root')!)
// store คือ store ที่ config ไว้ใน store.ts
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)