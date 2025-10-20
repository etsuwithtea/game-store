// โหลดของที่ต้องใช้มาก่อน
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, setOffset } from "../store/gameSlice";
import type { RootState, AppDispatch } from "../store/store";
import GameGrid from "../components/GameGrid";
import Pagination from "../components/Pagination.tsx";

// หน้าหลักของเรา เอาไว้แสดงเกมทั้งหมด
export default function Home() {
  // เอา dispatch มาเรียกใช้ action ต่างๆ
  const dispatch = useDispatch<AppDispatch>();
  
  // ดึงข้อมูลจาก Redux มาใช้ (สถานะต่างๆ ของเกม)
  const { items, status, error, count, limit, offset, query, ordering, genre, platform } = useSelector(
    (s: RootState) => s.games
  );

  // ทุกครั้งที่มีการเปลี่ยน offset, query, ordering, genre, platform จะไปดึงข้อมูลเกมใหม่
  useEffect(() => {
    dispatch(fetchGames({ offset, limit, search: query, ordering, genre, platform }));
  }, [dispatch, offset, limit, query, ordering, genre, platform]);

  return (
    // เพิ่ม margin-left เพื่อหลบ sidebar (16px สำหรับ sidebar หุบ, 256px สำหรับ sidebar ขยาย)
    <div className="lg:ml-16 transition-all duration-300">
      <div className="container mx-auto p-4">
        {/* ถ้ากำลังโหลดข้อมูลอยู่ แสดง loading */}
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

        {/* ถ้าเกิด error ขึ้น แสดงข้อความ error */}
        {status === "failed" && (
          <div 
            className="p-4 mb-6 bg-red-400 text-white font-bold border-2 border-gray-700 rounded-lg"
            style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
          >
            {error}
          </div>
        )}

        {/* แสดงตารางเกมทั้งหมด */}
        <GameGrid items={items} />

        {/* ส่วนเปลี่ยนหน้า */}
        <Pagination
          total={count}
          limit={limit}
          offset={offset}
          onChange={(newOffset: number) => dispatch(setOffset(newOffset))}
        />
      </div>
    </div>
  );
}