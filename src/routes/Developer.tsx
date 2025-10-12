import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Game, GamesResponse } from "../types/game";
import GameGrid from "../components/GameGrid";
import Pagination from "../components/Pagination";
import { ArrowLeft, Code, Building2 } from "lucide-react";

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

type DeveloperInfo = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  description?: string;
};

function Developer() {
  const { slug } = useParams();
  const [developer, setDeveloper] = useState<DeveloperInfo | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 16;

  // ดึงข้อมูล Developer
  useEffect(() => {
    const fetchDeveloper = async () => {
      if (!slug) return;
      setStatus("loading");
      try {
        const url = `${BASE_URL}/developers/${slug}?key=${RAWG_API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: DeveloperInfo = await response.json();
        setDeveloper(data);
        setStatus("idle");
      } catch (error) {
        console.error('Error fetching developer:', error);
        setStatus("error");
      }
    };
    
    fetchDeveloper();
  }, [slug]);

  // ดึงเกมของ Developer
  useEffect(() => {
    const fetchDeveloperGames = async () => {
      if (!slug) return;
      setStatus("loading");
      try {
        const page = Math.floor(offset / limit) + 1;
        const params = new URLSearchParams({
          key: RAWG_API_KEY,
          developers: slug,
          page: page.toString(),
          page_size: limit.toString(),
          ordering: '-added',
        });

        const url = `${BASE_URL}/games?${params.toString()}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
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

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className="btn mb-6 border-2 border-gray-700 bg-yellow-300 text-black font-bold hover:bg-black hover:text-yellow-300"
          style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
        >
          <ArrowLeft className="w-5 h-5" />
          กลับหน้าแรก
        </Link>

        {/* Developer Header */}
        <div 
          className="relative h-[300px] rounded-lg overflow-hidden border-2 border-gray-700 mb-8"
          style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
        >
          {developer.image_background ? (
            <>
              <img 
                src={developer.image_background} 
                alt={developer.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600" />
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-8 h-8 text-white" />
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                {developer.name}
              </h1>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="px-4 py-2 bg-indigo-400 text-white font-bold border-2 border-white rounded flex items-center gap-2">
                <Code className="w-5 h-5" />
                <span>จำนวนเกม: {developer.games_count.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {developer.description && (
          <div 
            className="p-6 bg-white border-2 border-gray-700 rounded-lg mb-8"
            style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">
              เกี่ยวกับ {developer.name}
            </h2>
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: developer.description }}
            />
          </div>
        )}

        {/* Games Section Title */}
        <div 
          className="p-4 bg-gradient-to-r from-indigo-400 to-purple-400 border-2 border-gray-700 rounded-lg mb-6"
          style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
        >
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Code className="w-7 h-7" />
            เกมทั้งหมดจาก {developer.name}
          </h2>
        </div>

        {/* Loading State for Games */}
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

        {/* Games Grid */}
        {status !== "loading" && <GameGrid items={games} />}

        {/* Pagination */}
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

export default Developer;