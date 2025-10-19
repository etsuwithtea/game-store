// import หลักๆ ที่จำเป็นต้องใช้
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// import store และ Provider จาก react-redux ใช้สำหรับเชื่อมต่อ Redux กับ React สำรหับการจัดการสถานะของเว็ปแอปพลิเคชัน
import { store } from './store/store'
import { Provider } from 'react-redux'

// import components สำหรับ routing

// สำหรับ Github Pages ควรใช้ createHashRouter แทน  createBrowserRouter
//import { createHashRouter, RouterProvider } from 'react-router-dom'  
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 

import Home from './routes/Home'
import About from './routes/About'
import Detail from './routes/Detail'
import Favorite from './routes/Favorite'
import Developer from './routes/Developer'
import NotFound from './routes/NotFound'

// กำหนด routes สำหรับเว็บแอปพลิเคชัน
const router = createBrowserRouter([
//const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> }, // หน้าแรก
      { path: 'about', element: <About /> }, // เกี่ยวกับ
      { path: 'game/:id', element: <Detail /> }, // รายละเอียดเกม
      { path: 'favorite', element: <Favorite /> }, // เกมที่ชื่นชอบ
      { path: 'developer/:slug', element: <Developer /> }, // นักพัฒนาตาม id ของ deatail ที่เปิดมาจาก game detail
      { path: '*', element: <NotFound /> },
    ],
  },
])
// สร้างคอนเทนเนอร์รูทของ React ที่เชื่อมต่อกับองค์ประกอบ HTML ที่มี ID 'root' ว่าง่ายๆ คือ ต่อ กับ html ปกติ  html > main > div id="root"
const root = createRoot(document.getElementById('root')!)

// เรนเดอร์แอปพลิเคชัน React ภายใน Provider ของ Redux และ RouterProvider ของ React Router
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)