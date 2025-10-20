// เอาของที่ต้องใช้มา
import { Link } from "react-router-dom";
import type { Game } from "../types/game";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import type { RootState, AppDispatch } from "../store/store";
import { Gamepad2, Star, BookOpen, Heart, Monitor } from "lucide-react";

// กำหนด Type ของ Props ที่จะรับเข้ามา
type Props = { game: Game };

/**
 * Component การ์ดแสดงเกม 1 ใบ
 * แสดงรูป ชื่อ คะแนน หมวดหมู่ แพลตฟอร์ม และปุ่มต่างๆ
 * ใช้ Neobrutalism Theme (เส้นดำหนา + เงาเด่น)
 */
export default function GameCard({ game }: Props) {
  // เตรียม dispatch ไว้ส่ง action
  const dispatch = useDispatch<AppDispatch>();
  // ดึงรายการ ids ของเกมโปรดมา
  const { ids: favIds } = useSelector((state: RootState) => state.favorites);

  // เช็คว่าเกมนี้อยู่ในรายการโปรดมั้ย
  const isFavorited = favIds.includes(String(game.id));

  // ฟังก์ชันจัดการการกดปุ่มโปรด
  const handleFavoriteClick = () => {
    // dispatch action เพื่อเพิ่ม/ลบออกจากรายการโปรด
    dispatch(toggleFavorite(game.id));
  };

  // ฟังก์ชันแปลงชื่อ platform ให้สั้นลง
  const getPlatformShortName = (name: string): string => {
    const shortNames: { [key: string]: string } = {
      'PlayStation 5': 'PS5',
      'PlayStation 4': 'PS4',
      'PlayStation 3': 'PS3',
      'PlayStation 2': 'PS2',
      'PlayStation': 'PS1',
      'Xbox Series S/X': 'XSX',
      'Xbox One': 'XB1',
      'Xbox 360': 'X360',
      'Xbox': 'XB',
      'Nintendo Switch': 'Switch',
      'PC': 'PC',
      'macOS': 'Mac',
      'Linux': 'Linux',
      'iOS': 'iOS',
      'Android': 'Android',
    };
    
    return shortNames[name] || name;
  };

  return (
    // การ์ดเกม - ใช้ relative เพื่อให้ป้ายชื่อลอยได้
    <div className="relative pt-8">
      {/* ป้ายชื่อเกมที่ยื่นออกมาด้านบน */}
      <div className="absolute -top-0 left-4 right-4 z-10">
        <h2 
          className="font-extrabold text-base line-clamp-2 bg-gray-200 border-2 border-gray-700 px-4 py-3 text-gray-900 rounded"
          style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
        >
          {game.name}
        </h2>
      </div>

      {/* การ์ดหลัก */}
      <div 
        className="bg-base-100 border-2 border-gray-700 rounded-lg overflow-hidden hover:translate-x-1 hover:translate-y-1 transition-transform" 
        style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
      >
        {/* รูปภาพเกม */}
        <figure className="aspect-[16/9] overflow-hidden border-b-2 border-gray-700">
          <img
            src={game.background_image || "https://placehold.co/400x225?text=No+Image"}
            alt={game.name}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </figure>
        
        {/* เนื้อหาในการ์ด */}
        <div className="p-4 pt-4">
          {/* แสดงคะแนน Rating และ Metacritic */}
          <div className="flex gap-2 items-center text-xs mb-3">
            {/* คะแนน Metacritic ถ้ามี */}
            {game.metacritic && (
              <div className="px-1.5 py-0.5 bg-green-400 text-white font-bold border-2 border-gray-700 rounded flex items-center gap-1">
                <Gamepad2 className="w-3 h-3" />
                {game.metacritic}
              </div>
            )}
            {/* คะแนน Rating */}
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-orange-400 text-white font-bold border-2 border-gray-700 rounded">
              <Star className="w-3 h-3 fill-white" />
              <span>{game.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* แสดง Platforms (สูงสุด 4 แพลตฟอร์ม) */}
          {game.platforms && game.platforms.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {game.platforms.slice(0, 4).map((p) => (
                <div 
                  key={p.platform.id} 
                  className="px-2 py-0.5 text-xs bg-blue-400 text-white font-bold border-2 border-gray-700 rounded flex items-center gap-1"
                >
                  <Monitor className="w-3 h-3" />
                  {getPlatformShortName(p.platform.name)}
                </div>
              ))}
              {game.platforms.length > 4 && (
                <div className="px-2 py-0.5 text-xs bg-blue-300 text-white font-bold border-2 border-gray-700 rounded">
                  +{game.platforms.length - 4}
                </div>
              )}
            </div>
          )}

          {/* แสดงหมวดหมู่เกม (สูงสุด 3 หมวด) */}
          {game.genres && game.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {game.genres.slice(0, 3).map((genre) => (
                <div 
                  key={genre.id} 
                  className="px-2 py-0.5 text-xs bg-gray-800 text-white font-semibold border border-gray-700 rounded"
                >
                  {genre.name}
                </div>
              ))}
            </div>
          )}

          {/* ปุ่มต่างๆ ด้านล่าง */}
          <div className="flex justify-between items-center gap-2 mt-4">
            {/* ปุ่มดูรายละเอียด */}
            <Link 
              to={`/game/${game.id}`} 
              className="btn btn-sm border-2 border-gray-700 bg-purple-400 text-white font-bold normal-case hover:border-gray-700 hover:bg-black hover:text-purple-400 flex-1"
            >
              <BookOpen className="w-4 h-4" />
              Details
            </Link>

            {/* ปุ่มเพิ่ม/ลบโปรด */}
            <button
              className={`btn btn-sm border-2 border-gray-700 font-bold normal-case hover:border-gray-700 flex-1 ${
                isFavorited 
                  ? "bg-red-400 text-white hover:bg-black hover:text-red-400" 
                  : "bg-neutral-100 text-black hover:bg-black hover:text-amber-50"
              }`}
              onClick={handleFavoriteClick}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
              {isFavorited ? "Favorited" : "Favorite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}