// เอา icons มา
import { ChevronLeft, ChevronRight } from "lucide-react";

// กำหนด type ของ props
type Props = {
  total: number; // จำนวน item ทั้งหมด
  limit: number; // จำนวน item ต่อหน้า
  offset: number; // ตำแหน่งเริ่มต้นของข้อมูลในหน้านี้
  onChange: (newOffset: number) => void; // ฟังก์ชันที่จะถูกเรียกเมื่อเปลี่ยนหน้า
};

/**
 * Component สำหรับแบ่งหน้า
 * แสดงปุ่มย้อนกลับ ถัดไป และช่องกรอกหมายเลขหน้า
 * รองรับการกด Enter และการ blur ที่ช่อง input
 */
export default function Pagination({ total, limit, offset, onChange }: Props) {
  // คำนวณหน้าปัจจุบันจาก offset และ limit
  const page = Math.floor(offset / limit) + 1;

  // คำนวณจำนวนหน้าทั้งหมด
  const pages = Math.max(1, Math.ceil(total / limit));

  // ฟังก์ชันไปหน้าที่ต้องการ
  const goToPage = (pageNumber: number) => {
    // จำกัดไม่ให้เกินขอบเขต (1 - pages)
    const targetPage = Math.max(1, Math.min(pageNumber, pages));
    // คำนวณ offset ใหม่
    const newOffset = (targetPage - 1) * limit;
    // เรียก callback
    onChange(newOffset);
  };

  // จัดการการกด Enter ในช่อง input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputPage = parseInt((e.target as HTMLInputElement).value);
      if (!isNaN(inputPage)) {
        goToPage(inputPage);
      }
    }
  };

  return (
    <div className="flex justify-center items-center gap-3 mt-8 ">
      {/* ปุ่มย้อนกลับ (Prev) */}
      <button
        className={`btn border-2 border-gray-700 font-bold normal-case ${
          page <= 1 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : "bg-yellow-300 text-black hover:bg-black hover:text-yellow-300"
        }`}
        disabled={page <= 1}
        onClick={() => onChange(Math.max(0, offset - limit))}
        style={page > 1 ? { boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' } : {}}
      >
        <ChevronLeft className="w-5 h-5" />
        Prev
      </button>

      {/* กล่องแสดงหน้าปัจจุบัน และช่องกรอกหมายเลขหน้า */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-100 border-2 border-gray-700 rounded-lg">
        <span className="text-black font-bold">
          Page
        </span>
        {/* ช่อง input หมายเลขหน้า */}
        <input
          type="number"
          min="1"
          max={pages}
          defaultValue={page}
          key={page} // force re-render เมื่อหน้าเปลี่ยน
          onKeyPress={handleKeyPress}
          onBlur={(e) => {
            // เมื่อ blur ก็เช็คว่าพิมพ์หมายเลขหน้ามาหรือเปล่า
            const inputPage = parseInt(e.target.value);
            if (!isNaN(inputPage) && inputPage !== page) {
              goToPage(inputPage);
            }
          }}
          className="w-16 px-2 py-1 text-center bg-white text-black font-bold border-2 border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <span className="text-black font-bold">
          / {pages}
        </span>
      </div>

      {/* ปุ่มถัดไป (Next) */}
      <button
        className={`btn border-2 border-gray-700 font-bold normal-case ${
          page >= pages 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : "bg-yellow-300 text-black hover:bg-black hover:text-yellow-300"
        }`}
        disabled={page >= pages}
        onClick={() => onChange(offset + limit)}
        style={page < pages ? { boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' } : {}}
      >
        Next
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}