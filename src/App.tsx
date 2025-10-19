// import หลักๆ ที่จำเป็นต้องใช้
import { Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidebar from './components/Sidebar';

// ฟังก์ชันหลักของเว็ปแอปพลิเคชัน ไว้แสดงหน้า
export default function App() {
  return (
    <div>
      {/* แสดง Navbar ที่ส่วนบนของหน้า */}
      <Navbar/> 
      {/* แสดง Sidebar ที่ด้านข้างของหน้า */}
      <Sidebar/>
      {/* แสดงเนื้อหาของหน้า ตามที่กำหนดใน routing ใน main.tsx  html > main > App*/}
      <Outlet/>
    </div>
  );
}