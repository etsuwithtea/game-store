// หน้านี้เป็นหน้าหลักของแอป ที่ไว้ routing

import { Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";

function App() {
  // เเก้ tailwind ของ navbar ได้เลย
  // router ด้านล่างเป็นการกำหนดเส้นทางของหน้าเว็บ
  // ลบ link ของ developer ออกได้เลยถ้าจะทำเป็น steam หรือฝั่งไว้ในหน้า detail 
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;