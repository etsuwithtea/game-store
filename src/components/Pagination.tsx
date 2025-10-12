import { ChevronLeft, ChevronRight } from "lucide-react";

// กำหนด Type ของ Props ที่ Component นี้จะได้รับ
type Props = {
  total: number; // จำนวน item ทั้งหมด
  limit: number; // จำนวน item ต่อหน้า
  offset: number; // ตำแหน่งเริ่มต้นของข้อมูลในหน้าปัจจุบัน
  onChange: (newOffset: number) => void; // Callback function ที่จะถูกเรียกเมื่อมีการเปลี่ยนหน้า
};

// Component สำหรับจัดการและแสดงผล Pagination (Neobrutalism Theme)
export default function Pagination({ total, limit, offset, onChange }: Props) {
  // คำนวณหน้าปัจจุบัน จาก offset และ limit
  // เช่น offset=40, limit=40 -> page = 2
  const page = Math.floor(offset / limit) + 1;

  // คำนวณจำนวนหน้าทั้งหมด
  // เช่น total=101, limit=40 -> pages = 3
  // Math.max(1, ...) เพื่อให้แน่ใจว่ามีอย่างน้อย 1 หน้าเสมอ
  const pages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="flex justify-center items-center gap-3 mt-8 ">
      {/* ปุ่มย้อนกลับ (Previous) */}
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

      {/* ปุ่มสำหรับแสดงข้อมูลหน้าปัจจุบัน */}
      <div className="px-6 py-3 bg-neutral-100 text-black font-bold border-2 border-gray-700 rounded-lg">
        Page {page} / {pages}
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