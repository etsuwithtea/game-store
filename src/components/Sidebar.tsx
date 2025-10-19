import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOrdering, setOffset, setGenre, setQuery } from '../store/gameSlice';
import type { AppDispatch, RootState } from '../store/store';
import { 
  Star, 
  Flame, 
  ChevronRight, 
  Calendar,
  TrendingUp,
  Trophy,
  Crown,
  Gamepad2,
  ShoppingBag,
  Folder,
  ChevronDown,
  Monitor,
  X,
  ChevronLeft
} from 'lucide-react';

/**
 * Component Sidebar สำหรับนำทางหมวดหมู่ต่างๆ
 * รองรับ responsive - แสดงแบบ fixed บน desktop, drawer บน mobile
 * เชื่อมต่อกับ Redux และ RAWG API
 */
export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showAllBrowse, setShowAllBrowse] = useState(false);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // ดึงข้อมูลจาก Redux
  const { query, ordering } = useSelector((s: RootState) => s.games);

  // ฟังก์ชันสำหรับปิด sidebar บน mobile
  const closeSidebar = () => setIsOpen(false);

  // ฟังก์ชันเปลี่ยนการเรียงลำดับ
  const handleOrderingChange = (ordering: string) => {
    dispatch(setOrdering(ordering));
    dispatch(setOffset(0));
    dispatch(setGenre(''));
    // บังคับให้โหลดใหม่โดยการนำทางไปหน้า home
    navigate('/');
    closeSidebar();
  };

  // ฟังก์ชันเปลี่ยน Genre
  const handleGenreChange = (genre: string) => {
    dispatch(setGenre(genre));
    dispatch(setOffset(0));
    // บังคับให้โหลดใหม่โดยการนำทางไปหน้า home
    navigate('/');
    closeSidebar();
  };

  // ฟังก์ชันรีเซ็ตทุกอย่าง
  const handleResetAll = () => {
    dispatch(setGenre(''));
    dispatch(setOrdering('-added'));
    dispatch(setOffset(0));
    // บังคับให้โหลดใหม่
    navigate('/');
    closeSidebar();
  };

  // เนื้อหา Sidebar
  const SidebarContent = () => (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {/* ช่องค้นหาเกม */}
      <div>
        <h3 className="text-gray-900 font-extrabold text-lg mb-3 px-2">Search</h3>
        <div className="relative">
          <input
            type="text"
            className="input w-full px-3 border-2 border-gray-700 bg-white text-black font-medium focus:outline-none focus:border-gray-900"
            placeholder="ค้นหาเกม...."
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
          />
        </div>
      </div>

      {/* เรียงลำดับเกม */}
      <div>
        <h3 className="text-gray-900 font-extrabold text-lg mb-3 px-2">Sort By</h3>
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

      {/* New Releases Section */}
      <div>
        <h3 className="text-gray-900 font-extrabold text-lg mb-3 px-2">New Releases</h3>
        <div className="space-y-1">
          <button
            onClick={() => handleOrderingChange('-added')}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <Star className="w-4 h-4" />
            <span>Last 30 days</span>
          </button>
          <button
            onClick={() => handleOrderingChange('-added')}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <Flame className="w-4 h-4" />
            <span>This week</span>
          </button>
          <button
            onClick={() => handleOrderingChange('-released')}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <ChevronRight className="w-4 h-4" />
            <span>Next week</span>
          </button>
          <button
            onClick={() => handleOrderingChange('-released')}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <Calendar className="w-4 h-4" />
            <span>Release calendar</span>
          </button>
        </div>
      </div>

      {/* Top Section */}
      <div>
        <h3 className="text-gray-900 font-extrabold text-lg mb-3 px-2">Top</h3>
        <div className="space-y-1">
          <button
            onClick={() => handleOrderingChange('-metacritic')}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <Trophy className="w-4 h-4" />
            <span>Best of the year</span>
          </button>
          <button
            onClick={() => handleOrderingChange('-added')}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Popular in 2024</span>
          </button>
          <button
            onClick={() => handleOrderingChange('-rating')}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <Crown className="w-4 h-4" />
            <span>All time top 250</span>
          </button>
        </div>
      </div>

      {/* All Games Link */}
      <div>
        <button
          onClick={handleResetAll}
          className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-black hover:to-black hover:text-purple-400 text-white font-bold text-lg rounded-lg transition-colors border-2 border-gray-700 w-full"
          style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
        >
          <span>All Games</span>
        </button>
      </div>

      {/* Browse Section (Genres) */}
      <div>
        <h3 className="text-gray-900 font-extrabold text-lg mb-3 px-2">Browse</h3>
        <div className="space-y-1">
          <button
            onClick={() => handleGenreChange('action')}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Action</span>
          </button>
          <button
            onClick={() => handleGenreChange('adventure')}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Adventure</span>
          </button>
          <button
            onClick={() => handleGenreChange('role-playing-games-rpg')}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <Folder className="w-4 h-4" />
            <span>RPG</span>
          </button>
          
          {/* Show all button */}
          <button
            onClick={() => setShowAllBrowse(!showAllBrowse)}
            className="flex items-center gap-3 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors w-full text-left border-2 border-gray-700"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showAllBrowse ? 'rotate-180' : ''}`} />
            <span>Show all</span>
          </button>

          {/* Extended items */}
          {showAllBrowse && (
            <div className="space-y-1 pl-2">
              <button
                onClick={() => handleGenreChange('shooter')}
                className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <span>Shooter</span>
              </button>
              <button
                onClick={() => handleGenreChange('strategy')}
                className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <span>Strategy</span>
              </button>
              <button
                onClick={() => handleGenreChange('indie')}
                className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <span>Indie</span>
              </button>
              <button
                onClick={() => handleGenreChange('sports')}
                className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <span>Sports</span>
              </button>
              <button
                onClick={() => handleGenreChange('puzzle')}
                className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <span>Puzzle</span>
              </button>
              <button
                onClick={() => handleGenreChange('racing')}
                className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <span>Racing</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Platforms Section */}
      <div>
        <h3 className="text-gray-900 font-extrabold text-lg mb-3 px-2">Platforms</h3>
        <div className="space-y-1">
          <button
            onClick={handleResetAll}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <Monitor className="w-4 h-4" />
            <span>PC</span>
          </button>
          <button
            onClick={handleResetAll}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>PlayStation 4</span>
          </button>
          <button
            onClick={handleResetAll}
            className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Xbox One</span>
          </button>

          {/* Show all button */}
          <button
            onClick={() => setShowAllPlatforms(!showAllPlatforms)}
            className="flex items-center gap-3 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors w-full text-left border-2 border-gray-700"
            style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showAllPlatforms ? 'rotate-180' : ''}`} />
            <span>Show all</span>
          </button>

          {/* Extended platforms */}
          {showAllPlatforms && (
            <div className="space-y-1 pl-2">
              <button
                onClick={handleResetAll}
                className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <span>PlayStation 5</span>
              </button>
              <button
                onClick={handleResetAll}
                className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <span>Xbox Series X</span>
              </button>
              <button
                onClick={handleResetAll}
                className="flex items-center gap-3 px-4 py-2 bg-white hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors border-2 border-gray-700 w-full text-left"
                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
              >
                <span>Nintendo Switch</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ปุ่มเปิด Sidebar บน Mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-1/2 -translate-y-1/2 left-0 z-40 p-3 bg-gray-800 text-yellow-300 border-2 border-gray-900 rounded-r-lg hover:bg-black hover:text-yellow-400 transition-colors"
        style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)' }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Overlay สำหรับ Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Desktop - แสดงตลอดเวลา */}
      <aside 
        className={`hidden lg:block fixed left-0 top-0 h-screen bg-white/90 backdrop-blur-sm border-r-2 border-gray-700 z-30 pt-28 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* ปุ่มหุบ/ขยาย */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-32 p-2 bg-yellow-300 text-black border-2 border-gray-700 rounded-full hover:bg-black hover:text-yellow-300 transition-colors z-40"
          style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        {!isCollapsed && <SidebarContent />}
      </aside>

      {/* Sidebar Mobile - แสดงเฉพาะตอนเปิด */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-screen w-64 bg-white/90 backdrop-blur-sm border-r-2 border-gray-700 z-50 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ปุ่มปิด */}
        <button
          onClick={closeSidebar}
          className="sticky top-4 left-full -ml-12 p-2 bg-red-400 text-white rounded-lg hover:bg-black hover:text-red-400 transition-colors border-2 border-gray-700 z-10"
          style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="pt-4">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}