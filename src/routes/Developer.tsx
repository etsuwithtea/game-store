// เอาของที่ต้องใช้มา
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Game, GamesResponse, Developer } from "../types/game";
import GameGrid from "../components/GameGrid";
import Pagination from "../components/Pagination";
import { ArrowLeft, Code, Building2 } from "lucide-react";

// ดึง API key และ base URL
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

/**
 * หน้า Developer
 * แสดงข้อมูลของผู้พัฒนาเกม พร้อมรายการเกมที่พัฒนาโดยผู้พัฒนานั้น
 */
export default function Developer() {
  // ดึง slug ของ developer มาจาก URL
  const { slug } = useParams();
  
  // เก็บข้อมูล developer
  const [developer, setDeveloper] = useState<Developer | null>(null);
  // เก็บรายการเกมของ developer
  const [games, setGames] = useState<Game[]>([]);
  // เก็บสถานะการโหลด
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  // เก็บจำนวนเกมทั้งหมด
  const [count, setCount] = useState(0);
  // เก็บตำแหน่งของหน้า
  const [offset, setOffset] = useState(0);
  // จำนวนเกมต่อหน้า
  const limit = 16;

  // ดึงข้อมูล Developer เมื่อ slug เปลี่ยน
  useEffect(() => {
    const fetchDeveloper = async () => {
      if (!slug) return;
      setStatus("loading");
      try {
        // เรียก API ดึงข้อมูล developer
        const url = `${BASE_URL}/developers/${slug}?key=${RAWG_API_KEY}`;
        const response = await fetch(url);
        
        // เช็คว่า API ตอบกลับปกติมั้ย
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // แปลงเป็น JSON แล้วเก็บไว้
        const data: Developer = await response.json();
        setDeveloper(data);
        setStatus("idle");
      } catch (error) {
        console.error('Error fetching developer:', error);
        setStatus("error");
      }
    };
    
    fetchDeveloper();
  }, [slug]);

  // ดึงรายการเกมของ Developer เมื่อ slug หรือ offset เปลี่ยน
  useEffect(() => {
    const fetchDeveloperGames = async () => {
      if (!slug) return;
      setStatus("loading");
      try {
        // คำนวณหน้าปัจจุบัน
        const page = Math.floor(offset / limit) + 1;
        // เตรียม parameters สำหรับ API
        const params = new URLSearchParams({
          key: RAWG_API_KEY,
          developers: slug,
          page: page.toString(),
          page_size: limit.toString(),
          ordering: '-added', // เรียงตามเกมที่ถูกเพิ่มล่าสุด
        });

        // เรียก API ดึงรายการเกม
        const url = `${BASE_URL}/games?${params.toString()}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // แปลงเป็น JSON แล้วเก็บไว้
        const data: GamesResponse = await response.json();
        setGames(data.results);
        setCount(data.count);
        setStatus("idle");
      } catch (error) {
        console.error('Error fetching games:', error);
        setStatus("error");
      }
    };
    
    fetchDeveloperGames();
  }, [slug, offset, limit]);

  // แสดง loading ตอนกำลังโหลดข้อมูล developer
  if (status === "loading" && !developer) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div 
            className="p-8 bg-gradient-to-br from-yellow-300 to-yellow-400 border-2 border-gray-700 rounded-lg"
            style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <div className="flex flex-col items-center gap-4">
              <span className="loading loading-spinner loading-lg text-gray-900"></span>
              <p className="text-gray-900 font-bold">กำลังโหลดข้อมูล...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // แสดง error ถ้าไม่เจอข้อมูล developer
  if (status === "error" || !developer) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center min-h-[60vh] flex flex-col items-center justify-center">
          <div 
            className="p-8 bg-red-400 border-2 border-gray-700 rounded-lg max-w-md"
            style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">ไม่พบข้อมูล Developer</h2>
            <p className="text-white mb-6">ขออภัย ไม่สามารถโหลดข้อมูล Developer ได้</p>
            <Link 
              to="/" 
              className="btn border-2 border-gray-700 bg-white text-black font-bold hover:bg-black hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              กลับหน้าแรก
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // แสดงหน้า Developer หลัก
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-7xl mx-auto">
        {/* ปุ่มกลับหน้าแรก */}
        <Link 
          to="/" 
          className="btn mb-6 border-2 border-gray-700 bg-yellow-300 text-black font-bold hover:bg-black hover:text-yellow-300"
          style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
        >
          <ArrowLeft className="w-5 h-5" />
          กลับหน้าแรก
        </Link>

        {/* Banner แสดงข้อมูล Developer */}
        <div 
          className="relative h-[300px] rounded-lg overflow-hidden border-2 border-gray-700 mb-8"
          style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
        >
          {/* รูปพื้นหลัง ถ้ามี */}
          {developer.image_background ? (
            <>
              <img 
                src={developer.image_background} 
                alt={developer.name}
                className="w-full h-full object-cover"
              />
              {/* ใส่ gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            </>
          ) : (
            // ถ้าไม่มีรูป ใช้ gradient แทน
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600" />
          )}
          
          {/* ข้อมูล Developer ด้านล่าง banner */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-8 h-8 text-white" />
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                {developer.name}
              </h1>
            </div>
            {/* แสดงจำนวนเกมทั้งหมด */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="px-4 py-2 bg-indigo-400 text-white font-bold border-2 border-white rounded flex items-center gap-2">
                <Code className="w-5 h-5" />
                <span>จำนวนเกม: {developer.games_count.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* กล่องคำอธิบาย Developer (ถ้ามี) */}
        {developer.description && (
          <div 
            className="p-6 bg-white border-2 border-gray-700 rounded-lg mb-8"
            style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">
              เกี่ยวกับ {developer.name}
            </h2>
            {/* แสดง HTML description */}
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: developer.description }}
            />
          </div>
        )}

        {/* หัวข้อรายการเกม */}
        <div 
          className="p-4 bg-gradient-to-r from-indigo-400 to-purple-400 border-2 border-gray-700 rounded-lg mb-6"
          style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
        >
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Code className="w-7 h-7" />
            เกมทั้งหมดจาก {developer.name}
          </h2>
        </div>

        {/* แสดง loading ตอนกำลังโหลดเกม */}
        {status === "loading" && (
          <div className="flex justify-center items-center py-12">
            <div 
              className="p-8 bg-gradient-to-br from-yellow-300 to-yellow-400 border-2 border-gray-700 rounded-lg"
              style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
            >
              <div className="flex flex-col items-center gap-4">
                <span className="loading loading-spinner loading-lg text-gray-900"></span>
                <p className="text-gray-900 font-bold text-lg">กำลังโหลดเกม...</p>
              </div>
            </div>
          </div>
        )}

        {/* แสดงกริดของเกม */}
        {status !== "loading" && <GameGrid items={games} />}

        {/* แสดง Pagination ถ้ามีเกมเยอะ */}
        {count > limit && (
          <Pagination
            total={count}
            limit={limit}
            offset={offset}
            onChange={(newOffset: number) => setOffset(newOffset)}
          />
        )}
      </div>
    </div>
  );
}