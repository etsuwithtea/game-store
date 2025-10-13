import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Game } from "../types/game";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import type { RootState, AppDispatch } from "../store/store";
import { ArrowLeft, Heart, Star, Gamepad2, Calendar, Users } from "lucide-react";

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

function Detail() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  
  const dispatch = useDispatch<AppDispatch>();
  const { ids: favIds } = useSelector((state: RootState) => state.favorites);
  
  const isFavorited = favIds.includes(String(id));

  useEffect(() => {
    const fetchGameDetail = async () => {
      if (!id) return;
      setStatus("loading");
      try {
        const url = `${BASE_URL}/games/${id}?key=${RAWG_API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: Game = await response.json();
        setGame(data);
        setStatus("idle");
      } catch (error) {
        console.error('Error fetching game:', error);
        setStatus("error");
      }
    };
    
    fetchGameDetail();
  }, [id]);

  if (status === "loading") {
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

  if (status === "error" || !game) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center min-h-[60vh] flex flex-col items-center justify-center">
          <div 
            className="p-8 bg-red-400 border-2 border-gray-700 rounded-lg max-w-md"
            style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">ไม่พบข้อมูลเกม</h2>
            <p className="text-white mb-6">ขอภัย ไม่สามารถโหลดข้อมูลเกมได้</p>
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
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Full-width Background Image - เพิ่มความสูง */}
          <div className="fixed top-0 left-0 w-full h-[100vh] z-0">
            <img 
              src={game.background_image || "https://placehold.co/1200x400?text=No+Image"} 
              alt={game.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
          </div>

          {/* Hero Content - เพิ่ม padding-top */}
          <div className="relative z-10 pt-36 pb-6">
            {/* Back Button - วางเหนือชื่อเกม */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 border-2 border-white bg-yellow-300 text-black font-bold hover:bg-black hover:text-yellow-300 rounded-lg text-sm transition-colors"
              style={{ boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.3)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              กลับหน้าแรก
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
              {game.name}
            </h1>
            <div className="flex flex-wrap gap-3 items-center">
              {game.metacritic && (
                <div className="px-4 py-2 bg-green-400 text-white font-bold border-2 border-white rounded-lg flex items-center gap-2"
                     style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}>
                  <Gamepad2 className="w-5 h-5" />
                  <span>Metacritic: {game.metacritic}</span>
                </div>
              )}
              <div className="px-4 py-2 bg-orange-400 text-white font-bold border-2 border-white rounded-lg flex items-center gap-2"
                   style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}>
                <Star className="w-5 h-5 fill-white" />
                <span>Rating: {game.rating.toFixed(1)} / 5</span>
              </div>
              {game.released && (
                <div className="px-4 py-2 bg-blue-400 text-white font-bold border-2 border-white rounded-lg flex items-center gap-2"
                     style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}>
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(game.released).toLocaleDateString('th-TH')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Grid Content - ลบ margin-top */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              {game.description_raw && (
                <div 
                  className="p-6 bg-white border-2 border-gray-700 rounded-lg"
                  style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">
                    เกี่ยวกับเกม
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {game.description_raw}
                  </p>
                </div>
              )}

              {/* Screenshots */}
              {game.short_screenshots && game.short_screenshots.length > 0 && (
                <div 
                  className="p-6 bg-purple-400 border-2 border-gray-700 rounded-lg"
                  style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-white pb-2">
                    ภาพหน้าจอ
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {game.short_screenshots.slice(1, 5).map((screenshot) => (
                      <img 
                        key={screenshot.id}
                        src={screenshot.image}
                        alt={`Screenshot ${screenshot.id}`}
                        className="w-full aspect-video object-cover rounded border-2 border-white"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Favorite Button */}
              <button
                onClick={() => dispatch(toggleFavorite(game.id))}
                className={`w-full btn border-2 border-gray-700 font-bold text-lg ${
                  isFavorited 
                    ? "bg-red-400 text-white hover:bg-black hover:text-red-400" 
                    : "bg-neutral-100 text-black hover:bg-black hover:text-white"
                }`}
                style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <Heart className={`w-6 h-6 ${isFavorited ? "fill-white" : ""}`} />
                {isFavorited ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
              </button>

              {/* Genres */}
              {game.genres && game.genres.length > 0 && (
                <div 
                  className="p-6 bg-green-400 border-2 border-gray-700 rounded-lg"
                  style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                  <h3 className="text-xl font-bold text-white mb-3 border-b-2 border-white pb-2">
                    หมวดหมู่
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre) => (
                      <div 
                        key={genre.id}
                        className="px-3 py-1 bg-white text-black font-bold border-2 border-black rounded"
                      >
                        {genre.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Developers */}
              {game.developers && game.developers.length > 0 && (
                <div 
                  className="p-6 bg-indigo-400 border-2 border-gray-700 rounded-lg"
                  style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                  <h3 className="text-xl font-bold text-white mb-3 border-b-2 border-white pb-2">
                    ผู้พัฒนา
                  </h3>
                  <div className="space-y-2">
                    {game.developers.map((dev) => (
                      <Link
                        key={dev.id}
                        to={`/developer/${dev.slug}`}
                        className="block px-3 py-2 bg-white text-black font-semibold border-2 border-black rounded hover:bg-black hover:text-white transition-colors"
                      >
                        {dev.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Platforms */}
              {game.platforms && game.platforms.length > 0 && (
                <div 
                  className="p-6 bg-blue-400 border-2 border-gray-700 rounded-lg"
                  style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                  <h3 className="text-xl font-bold text-white mb-3 border-b-2 border-white pb-2">
                    แพลตฟอร์ม
                  </h3>
                  <div className="space-y-2">
                    {game.platforms.map((p) => (
                      <div 
                        key={p.platform.id}
                        className="px-3 py-2 bg-white text-black font-semibold border-2 border-black rounded"
                      >
                        {p.platform.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div 
                className="p-6 bg-yellow-300 border-2 border-gray-700 rounded-lg"
                style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-2">
                  สถิติ
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      จำนวนรีวิว:
                    </span>
                    <span className="font-bold text-gray-900">{game.ratings_count.toLocaleString()}</span>
                  </div>
                  {game.playtime > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">เวลาเล่นเฉลี่ย:</span>
                      <span className="font-bold text-gray-900">{game.playtime} ชั่วโมง</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {game.tags && game.tags.length > 0 && (
                <div 
                  className="p-6 bg-pink-400 border-2 border-gray-700 rounded-lg"
                  style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                  <h3 className="text-xl font-bold text-white mb-3 border-b-2 border-white pb-2">
                    แท็ก
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.slice(0, 10).map((tag) => (
                      <div 
                        key={tag.id}
                        className="px-2 py-1 bg-white text-black text-sm font-semibold border border-black rounded"
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;