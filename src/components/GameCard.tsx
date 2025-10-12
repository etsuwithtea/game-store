// Import ที่จำเป็น
import { Link } from "react-router-dom";
import type { Game } from "../types/game";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import type { RootState, AppDispatch } from "../store/store";
import { Gamepad2, Star, BookOpen, Heart } from "lucide-react";

// กำหนด Type ของ Props ที่ Component นี้จะได้รับ
type Props = { game: Game };

// Component สำหรับแสดงผลการ์ดเกม 1 ใบ (เวอร์ชันใช้ Redux + Neobrutalism Theme)
export default function GameCard({ game }: Props) {
  // useDispatch สำหรับส่ง action ไปยัง store
  const dispatch = useDispatch<AppDispatch>();
  // useSelector สำหรับดึง state จาก store
  const { ids: favIds } = useSelector((state: RootState) => state.favorites);

  // เช็คว่าเกมใบนี้อยู่ในรายการโปรดหรือไม่ จาก state ใน Redux
  const isFavorited = favIds.includes(String(game.id));

  const handleFavoriteClick = () => {
    // เมื่อคลิก, dispatch action `toggleFavorite` พร้อมกับส่ง ID ของเกมไป
    dispatch(toggleFavorite(game.id));
  };

  return (
    // การ์ดเกม 1 ใบ - ห่อด้วย relative เพื่อให้ป้ายชื่อลอยได้
    <div className="relative pt-8">
      {/* ป้ายชื่อเกมที่ยื่นออกมา */}
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
        <figure className="aspect-[16/9] overflow-hidden border-b-2 border-gray-700">
          <img
            src={game.background_image || "https://placehold.co/400x225?text=No+Image"}
            alt={game.name}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </figure>
        <div className="p-4 pt-4">
          {/* แสดง Rating และ Metacritic Score */}
          <div className="flex gap-2 items-center text-xs mb-3">
            {game.metacritic && (
              <div className="px-1.5 py-0.5 bg-green-400 text-white font-bold border-2 border-gray-700 rounded flex items-center gap-1">
                <Gamepad2 className="w-3 h-3" />
                {game.metacritic}
              </div>
            )}
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-orange-400 text-white font-bold border-2 border-gray-700 rounded">
              <Star className="w-3 h-3 fill-white" />
              <span>{game.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* แสดง Genres */}
          {game.genres && game.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {/* 0-3 หมายถึง แสดง genres สูงสุด 3 หมวด */}
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

          {/* ปุ่ม Details และ Favorite */}
          <div className="flex justify-between items-center gap-2 mt-4">
            {/* ปุ่ม Details */}
            <Link 
              to={`/game/${game.id}`} 
              className="btn btn-sm border-2 border-gray-700 bg-purple-400 text-white font-bold normal-case hover:border-gray-700 hover:bg-black hover:text-purple-400 flex-1"
            >
              <BookOpen className="w-4 h-4" />
              Details
            </Link>

            {/* ปุ่ม Favorite */}
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