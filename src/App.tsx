// หน้านี้เป็นหน้าหลักของแอป ที่ไว้ routing
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home'; 
import About from './components/About'; 
import Detail from './components/detail';
import Favorite from './components/Favorite'; 
import Developer from './components/Developer'; 
import NotFound from './components/NotFound';

function App() {
  // เเก้ tailwind ของ navbar ได้เลย
  // router ด้านล่างเป็นการกำหนดเส้นทางของหน้าเว็บ
  // ลบ link ของ developer ออกได้เลยถ้าจะทำเป็น steam หรือฝั่งไว้ในหน้า detail 
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/detail">Detail</Link>
        <Link to="/favorite">Favorite</Link>
        <Link to="/developer">Developer</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;