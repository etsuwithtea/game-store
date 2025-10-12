import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, setOffset, setQuery, setGenre, setOrdering } from "../store/gameSlice";
import type { RootState, AppDispatch } from "../store/store";
import GameGrid from "../components/GameGrid";
import Pagination from "../components/Pagination.tsx";
import { Search, RefreshCw } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error, count, limit, offset, query, ordering, genre } = useSelector(
    (s: RootState) => s.games
  );

  useEffect(() => {
    dispatch(fetchGames({ offset, limit, search: query, ordering, genre }));
  }, [dispatch, offset, limit, query, ordering, genre]);

  // ค้นหาหมวดหมู่ที่ไม่ซ้ำกันจาก items (genres)
  const genreOptions = Array.from(
    new Map(
      items
        .flatMap((g) => g.genres || [])
        .map((gr) => [gr.slug, gr.name])
    ).entries()
  ).map(([slug, name]) => ({ slug, name }));

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar Section */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="input w-full pl-10 border-2 border-gray-700 bg-white text-black font-medium focus:outline-none focus:border-gray-900"
            placeholder="ค้นหาเกม...."
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
          />
        </div>
        {/* Genre filter select */}
        <div className="w-full sm:w-56">
          <select
            className="select w-full border-2 border-gray-700 bg-white text-black font-bold focus:outline-none focus:border-gray-900"
            value={genre ?? ''}
            onChange={(event) => {
              const val = event.target.value;
              dispatch(setGenre(val));
              dispatch(setOffset(0));
            }}
            style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <option value="">ทุกหมวด</option>
            {genreOptions.map((opt) => (
              <option key={opt.slug} value={opt.slug}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
        {/* Ordering select */}
        <div className="w-full sm:w-48">
          <select
            className="select w-full border-2 border-gray-700 bg-white text-black font-bold focus:outline-none focus:border-gray-900"
            value={ordering}
            onChange={(e) => {
              const val = e.target.value;
              dispatch(setOrdering(val));
              dispatch(setOffset(0));
            }}
            style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <option value="-added">ยอดนิยม (added)</option>
            <option value="-rating">คะแนนสูงสุด (rating)</option>
            <option value="-released">ใหม่ล่าสุด (released)</option>
            <option value="-metacritic">Metacritic</option>
            <option value="name">ชื่อ (A→Z)</option>
          </select>
        </div>
        {/* Refresh button */}
        <button 
          className="btn border-2 border-gray-700 bg-green-400 text-white font-bold normal-case hover:bg-black hover:text-green-400 sm:w-auto px-4"
          onClick={() => dispatch(fetchGames({ offset, limit, search: query }))}
          style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Loading State */}
      {status === "loading" && (
        <div className="flex justify-center items-center py-12">
          <div 
            className="p-8 bg-gradient-to-br from-yellow-300 to-yellow-400 border-2 border-gray-700 rounded-lg"
            style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <span className="loading loading-spinner loading-lg text-gray-900"></span>
                <div className="absolute inset-0 loading loading-spinner loading-lg text-white opacity-50"></div>
              </div>
              <div className="text-center">
                <p className="text-gray-900 font-bold text-lg">กำลังโหลด...</p>
                <p className="text-gray-700 text-sm mt-1">กรุณารอสักครู่</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {status === "failed" && (
        <div 
          className="p-4 mb-6 bg-red-400 text-white font-bold border-2 border-gray-700 rounded-lg"
          style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
        >
          {error}
        </div>
      )}

      {/* Game Grid */}
      <GameGrid items={items} />

      {/* Pagination */}
      <Pagination
        total={count}
        limit={limit}
        offset={offset}
        onChange={(newOffset: number) => dispatch(setOffset(newOffset))}
      />
    </div>
  );
}