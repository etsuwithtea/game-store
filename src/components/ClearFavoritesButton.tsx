import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllFavorites } from "../store/favoritesSlice";
import type { RootState } from "../store/store";

export default function ClearFavoritesButton() {
  const dispatch = useDispatch();
  const { ids } = useSelector((state: RootState) => state.favorites);
  const [showModal, setShowModal] = useState(false);

  const handleClearAll = () => {
    dispatch(clearAllFavorites());
    setShowModal(false);
  };

  // ไม่แสดงปุ่มถ้า ไม่มีเรื่องที่ชอบ
  if (ids.length === 0) {
    return null;
  }

  return (
    <>
      {/* ปุ่มลบรายการโปรด */}
      <button
        onClick={() => setShowModal(true)}
        className="px-3 py-1.5 text-sm bg-gray-900 text-white font-semibold border-2 border-gray-800 rounded hover:bg-gray-800 hover:border-gray-700 transition-colors"
      >
        Clear All Favorites
      </button>

      {/* Modal ยืนยัน */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            {/* หัวข้อ Modal */}
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              ยืนยันการลบ
            </h2>
            
            {/* ข้อความยืนยัน */}
            <p className="text-gray-700 mb-6">
              คุณต้องการลบรายการโปรดทั้งหมด ({ids.length} รายการ) ใช่หรือไม่? 
            </p>

            {/* ปุ่มต่างๆ */}
            <div className="flex gap-3 justify-end">
              {/* ปุ่มยกเลิก */}
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                ยกเลิก
              </button>
              
              {/* ปุ่มยืนยันลบ */}
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors"
              >
                ลบทั้งหมด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}