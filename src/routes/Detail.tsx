// เอา hooks กับ components ที่จะใช้มาจาก React และ React Router
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// เอา types มาใช้กำหนดโครงสร้างข้อมูล
import type { Game, MovieData, ScreenshotData } from "../types/game";
// เอา Redux มาใช้จัดการ state
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import type { RootState, AppDispatch } from "../store/store";
// เอา icons มาจาก lucide-react
import { ArrowLeft, Heart, Star, Gamepad2, Calendar, Users, X } from "lucide-react";

// ดึง API key มาจาก environment variables
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
// ตั้ง base URL ไว้เรียก API
const BASE_URL = 'https://api.rawg.io/api';

/**
 * Component หน้ารายละเอียดเกม
 * จะแสดงข้อมูลเกมแบบละเอียด มีรูป วิดีโอ กับข้อมูลต่างๆ
 */
export default function Detail() {
  // ดึง id ของเกมมาจาก URL
  const { id } = useParams();

  // เก็บข้อมูลเกม
  const [game, setGame] = useState<Game | null>(null);
  // เก็บวิดีโอตัวอย่าง
  const [trailers, setTrailers] = useState<MovieData[]>([]);
  // เก็บภาพหน้าจอ
  const [screenshots, setScreenshots] = useState<ScreenshotData[]>([]);
  // เก็บว่าตอนนี้เลือกดูอะไรอยู่ (วิดีโอหรือรูป)
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'video' | 'image', url: string, poster?: string } | null>(null);
  // เช็คว่า modal เปิดอยู่มั้ย
  const [isModalOpen, setIsModalOpen] = useState(false);
  // เช็คสถานะว่ากำลังโหลดอยู่หรือเปล่า
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  
  // เตรียม Redux ไว้ใช้งาน แล้วก็ดึงข้อมูลเกมโปรดมา
  const dispatch = useDispatch<AppDispatch>();
  const { ids: favIds } = useSelector((state: RootState) => state.favorites);
  // เช็คว่าเกมนี้อยู่ในรายการโปรดมั้ย
  const isFavorited = favIds.includes(String(id));

  /**
   * ดึงข้อมูลเกมจาก API
   * จะทำงานทุกครั้งที่ id เปลี่ยน
   */
  useEffect(() => {
    const fetchGameDetail = async () => {
      // ถ้าไม่มี id ก็ไม่ต้องทำอะไร
      if (!id) return;
      
      // บอกว่ากำลังโหลด
      setStatus("loading");
      
      try {
        // 1. ไปดึงข้อมูลเกมมา
        const gameUrl = `${BASE_URL}/games/${id}?key=${RAWG_API_KEY}`;
        const gameResponse = await fetch(gameUrl);
        
        // เช็คว่า API ตอบกลับมาปกติมั้ย
        if (!gameResponse.ok) {
          throw new Error(`HTTP error! status: ${gameResponse.status}`);
        }
        
        // แปลงข้อมูลเป็น JSON แล้วเก็บไว้
        const gameData: Game = await gameResponse.json();
        setGame(gameData);

        // 2. ไปดึงวิดีโอตัวอย่างมา
        const moviesUrl = `${BASE_URL}/games/${id}/movies?key=${RAWG_API_KEY}`;
        const moviesResponse = await fetch(moviesUrl);
        
        let trailersList: MovieData[] = [];
        if (moviesResponse.ok) {
          const moviesData = await moviesResponse.json();
          console.log('Movies data:', moviesData);
          trailersList = moviesData.results || [];
          setTrailers(trailersList);
          
          // ถ้ามีวิดีโอ ก็ตั้งให้วิดีโอแรกเป็นตัวที่แสดง
          if (trailersList.length > 0) {
            setSelectedMedia({
              type: 'video',
              url: trailersList[0].data.max || trailersList[0].data['480'] || '',
              poster: trailersList[0].preview
            });
          }
        } else {
          console.log('Failed to fetch movies:', moviesResponse.status);
        }

        // 3. ไปดึงภาพหน้าจอมา
        const screenshotsUrl = `${BASE_URL}/games/${id}/screenshots?key=${RAWG_API_KEY}`;
        const screenshotsResponse = await fetch(screenshotsUrl);
        
        if (screenshotsResponse.ok) {
          const screenshotsData = await screenshotsResponse.json();
          console.log('Screenshots data:', screenshotsData);
          const screenshotsList = screenshotsData.results || [];
          setScreenshots(screenshotsList);
          
          // ถ้าไม่มีวิดีโอแต่มีรูป ก็เอารูปแรกมาแสดง
          if (trailersList.length === 0 && screenshotsList.length > 0) {
            setSelectedMedia({
              type: 'image',
              url: screenshotsList[0].image
            });
          }
        } else {
          console.log('Failed to fetch screenshots:', screenshotsResponse.status);
        }
        
        // โหลดเสร็จแล้ว
        setStatus("idle");
      } catch (error) {
        // เกิด error ระหว่างโหลด
        console.error('Error fetching game:', error);
        setStatus("error");
      }
    };
    
    // เริ่มดึงข้อมูล
    fetchGameDetail();
  }, [id]);

  /**
   * ฟังก์ชันเปิด modal ให้แสดงแบบเต็มจอ
   */
  const openModal = (type: 'video' | 'image', url: string, poster?: string) => {
    setIsModalOpen(true);
    // อย่าให้ scroll ได้ตอน modal เปิด
    document.body.style.overflow = 'hidden';
  };
  
  /**
   * ฟังก์ชันปิด modal
   */
  const closeModal = () => {
    setIsModalOpen(false);
    // คืนค่าการ scroll กลับมา
    document.body.style.overflow = 'unset';
  };

  // ขณะกำลังโหลด ให้แสดง loading
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

  // ถ้าเกิด error หรือไม่เจอเกม ก็แสดงข้อความ error
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
  
  // แสดงหน้ารายละเอียดเกม
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* รูปพื้นหลังเต็มจอ มี gradient overlay ทับไว้ */}
          <div className="fixed top-0 left-0 w-full h-[100vh] z-0">
            <img 
              src={game.background_image || "https://placehold.co/1200x400?text=No+Image"} 
              alt={game.name}
              className="w-full h-full object-cover"
            />
            {/* ใส่ gradient ทับเพื่อให้อ่านข้อความง่ายขึ้น */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
          </div>

          {/* เนื้อหาหลัก */}
          <div className="relative z-10 pt-36 pb-6">
            {/* ปุ่มกลับหน้าแรก */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 border-2 border-white bg-yellow-300 text-black font-bold hover:bg-black hover:text-yellow-300 rounded-lg text-sm transition-colors"
              style={{ boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.3)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              กลับหน้าแรก
            </Link>
            
            {/* ชื่อเกม */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
              {game.name}
            </h1>
            
            {/* แสดงข้อมูลสำคัญ เช่น คะแนน Metacritic, Rating, วันที่ออก */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* คะแนน Metacritic ถ้ามี */}
              {game.metacritic && (
                <div className="px-4 py-2 bg-green-400 text-white font-bold border-2 border-white rounded-lg flex items-center gap-2"
                     style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}>
                  <Gamepad2 className="w-5 h-5" />
                  <span>Metacritic: {game.metacritic}</span>
                </div>
              )}
              
              {/* คะแนนรีวิว */}
              <div className="px-4 py-2 bg-orange-400 text-white font-bold border-2 border-white rounded-lg flex items-center gap-2"
                   style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}>
                <Star className="w-5 h-5 fill-white" />
                <span>Rating: {game.rating.toFixed(1)} / 5</span>
              </div>
              
              {/* วันที่ออกขาย */}
              {game.released && (
                <div className="px-4 py-2 bg-blue-400 text-white font-bold border-2 border-white rounded-lg flex items-center gap-2"
                     style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}>
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(game.released).toLocaleDateString('th-TH')}</span>
                </div>
              )}
            </div>
          </div>

          {/* แบ่ง Layout เป็น 2 คอลัมน์ ซ้ายกับขวา */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            {/* คอลัมน์ซ้าย - เนื้อหาหลัก (ใช้ 2 ช่อง) */}
            <div className="lg:col-span-2 space-y-6">
              {/* แกลเลอรี่วิดีโอและรูปภาพ */}
              {(trailers.length > 0 || screenshots.length > 0) && (
                <div 
                  className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-gray-700 rounded-lg"
                  style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                  {/* พื้นที่แสดงวิดีโอหรือรูปภาพหลัก */}
                  <div className="mb-4">
                    {/* ถ้าเลือกวิดีโอ ก็แสดงวิดีโอ */}
                    {selectedMedia?.type === 'video' ? (
                      <video 
                        key={selectedMedia.url}
                        controls
                        className="w-full rounded-lg border-2 border-white cursor-pointer"
                        poster={selectedMedia.poster}
                        onClick={() => openModal('video', selectedMedia.url, selectedMedia.poster)}
                      >
                        <source src={selectedMedia.url} type="video/mp4" />
                        เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                      </video>
                    ) : selectedMedia?.type === 'image' ? (
                      // ถ้าเลือกรูปภาพ ก็แสดงรูปภาพ
                      <img 
                        src={selectedMedia.url}
                        alt="Selected screenshot"
                        className="w-full rounded-lg border-2 border-white cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openModal('image', selectedMedia.url)}
                      />
                    ) : null}
                  </div>

                  {/* Grid thumbnails ของวิดีโอและรูป */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {/* Thumbnails วิดีโอทั้งหมด */}
                    {trailers.map((trailer) => (
                      <div
                        key={`video-${trailer.id}`}
                        className={`relative aspect-video rounded border-2 cursor-pointer hover:border-yellow-300 transition-all ${
                          selectedMedia?.type === 'video' && selectedMedia?.url === (trailer.data.max || trailer.data['480'])
                            ? 'border-yellow-300 ring-2 ring-yellow-300'
                            : 'border-white'
                        }`}
                        onClick={() => setSelectedMedia({
                          type: 'video',
                          url: trailer.data.max || trailer.data['480'] || '',
                          poster: trailer.preview
                        })}
                      >
                        <img 
                          src={trailer.preview}
                          alt={trailer.name}
                          className="w-full h-full object-cover rounded"
                        />
                        {/* ใส่ไอคอน play ตรงกลาง */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-black border-b-4 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Thumbnails รูปภาพ (เอาแค่ 12 รูปแรก) */}
                    {screenshots.slice(0, 12).map((screenshot) => (
                      <div
                        key={`image-${screenshot.id}`}
                        className={`relative aspect-video rounded border-2 cursor-pointer hover:border-yellow-300 transition-all ${
                          selectedMedia?.type === 'image' && selectedMedia?.url === screenshot.image
                            ? 'border-yellow-300 ring-2 ring-yellow-300'
                            : 'border-white'
                        }`}
                        onClick={() => setSelectedMedia({
                          type: 'image',
                          url: screenshot.image
                        })}
                      >
                        <img 
                          src={screenshot.image}
                          alt={`Screenshot ${screenshot.id}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ส่วนคำอธิบายเกม */}
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
            </div>

            {/* คอลัมน์ขวา - Sidebar */}
            <div className="space-y-6">
              {/* ปุ่มเพิ่ม/ลบเกมโปรด */}
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

              {/* กล่องหมวดหมู่ */}
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

              {/* กล่องผู้พัฒนา */}
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

              {/* กล่องแพลตฟอร์ม */}
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

              {/* กล่องสถิติ */}
              <div 
                className="p-6 bg-yellow-300 border-2 border-gray-700 rounded-lg"
                style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-2">
                  สถิติ
                </h3>
                <div className="space-y-3">
                  {/* จำนวนคนรีวิว */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      จำนวนรีวิว:
                    </span>
                    <span className="font-bold text-gray-900">{game.ratings_count.toLocaleString()}</span>
                  </div>
                  {/* เวลาเล่นโดยเฉลี่ย */}
                  {game.playtime > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">เวลาเล่นเฉลี่ย:</span>
                      <span className="font-bold text-gray-900">{game.playtime} ชั่วโมง</span>
                    </div>
                  )}
                </div>
              </div>

              {/* กล่องแท็ก (เอาแค่ 10 แท็กแรก) */}
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

      {/* Modal ดูรูปและวิดีโอแบบเต็มจอ */}
      {isModalOpen && selectedMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* ปุ่ม X ปิด Modal */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
            style={{ boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.3)' }}
          >
            <X className="w-6 h-6 text-black" />
          </button>
          
          {/* เนื้อหาใน Modal */}
          <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'video' ? (
              // แสดงวิดีโอเต็มจอ
              <video 
                controls
                autoPlay
                className="w-full rounded-lg border-4 border-white"
                poster={selectedMedia.poster}
              >
                <source src={selectedMedia.url} type="video/mp4" />
                เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
              </video>
            ) : (
              // แสดงรูปภาพเต็มจอ
              <img 
                src={selectedMedia.url}
                alt="Fullscreen view"
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg border-4 border-white"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}