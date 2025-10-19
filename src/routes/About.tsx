// นำของที่จำเป็นมาใช้
import { Gamepad2, Settings, Sparkles, FolderTree } from 'lucide-react';

/**
 * หน้า About
 * แสดงข้อมูลเกี่ยวกับโปรเจกต์ เทคโนโลยีที่ใช้ ฟีเจอร์ และโครงสร้างไฟล์
 */
export default function About() {
    return (
        <div className="container mx-auto p-4">
            <div className="max-w-4xl mx-auto">
                {/* การ์ดหัวข้อหลัก */}
                <div 
                    className="mb-8 p-6 bg-yellow-300 border-2 border-gray-700 rounded-lg"
                    style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                    <h1 className="text-5xl font-bold text-gray-900 mb-3 drop-shadow-lg flex items-center gap-3">
                        <Gamepad2 size={48} className="text-gray-900" />
                        เกี่ยวกับโปรเจกต์
                    </h1>
                    <p className="text-lg text-gray-800 leading-relaxed">
                        เว็บแอปนี้เป็นตัวอย่างร้านเกมออนไลน์ที่แสดงข้อมูลเกมจาก RAWG
                        API โดยมุ่งเน้นการสาธิตการใช้งานเทคโนโลยีและแนวทางการออกแบบ
                        ที่ใช้ในโปรเจกต์จริง ๆ
                    </p>
                </div>

                {/* การ์ดแสดง Tech Stack */}
                <div 
                    className="mb-8 p-6 bg-white border-2 border-gray-700 rounded-lg"
                    style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-4 border-gray-900 pb-2 inline-flex items-center gap-2">
                        <Settings size={32} className="text-gray-900" />
                        เทคโนโลยีที่ใช้
                    </h2>
                    <div className="space-y-3">
                        {/* แสดงรายการเทคโนโลยีที่ใช้ในโปรเจกต์ */}
                        <div className="flex items-start">
                            <span className="font-mono text-white bg-black bg-opacity-20 px-2 py-1 rounded mr-3">Build Tool:</span>
                            <span className="text-gray-700">Vite</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-mono text-white bg-black bg-opacity-20 px-2 py-1 rounded mr-3">Framework:</span>
                            <span className="text-gray-700">React + TypeScript</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-mono text-white bg-black bg-opacity-20 px-2 py-1 rounded mr-3">Routing:</span>
                            <span className="text-gray-700">React Router DOM — จัดการหน้า Home, Detail, Favorite, About</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-mono text-white bg-black bg-opacity-20 px-2 py-1 rounded mr-3">State Management:</span>
                            <span className="text-gray-700">Redux Toolkit — จัดการการดึงข้อมูล, สถานะการโหลด, การค้นหา และการแบ่งหน้า</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-mono text-white bg-black bg-opacity-20 px-2 py-1 rounded mr-3">Styling:</span>
                            <span className="text-gray-700">TailwindCSS + daisyUI — ใช้ utility classes และ components</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-mono text-white bg-black bg-opacity-20 px-2 py-1 rounded mr-3">Data Fetching:</span>
                            <span className="text-gray-700">Fetch API (built-in) — โปรเจกต์นี้เรียก RAWG API โดยตรง</span>
                        </div>
                    </div>
                </div>

                {/* การ์ดแสดงฟีเจอร์หลัก */}
                <div 
                    className="mb-8 p-6 bg-green-400 border-2 border-gray-700 rounded-lg"
                    style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                    <h2 className="text-3xl font-bold text-black mb-4 border-b-4 border-black pb-2 inline-flex items-center gap-2">
                        <Sparkles size={32} className="text-black" />
                        ฟีเจอร์หลัก
                    </h2>
                    <ul className="space-y-2 text-black">
                        <li className="flex items-start">
                            <span className="mr-2">+</span>
                            <span>ค้นหาเกมโดยชื่อ</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">+</span>
                            <span>กรองตามหมวด (Genre) และเรียงลำดับ (Ordering)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">+</span>
                            <span>บันทึกเกมโปรด (Favorites) ลงใน localStorage</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">+</span>
                            <span>การแบ่งหน้า (Pagination) และการจัดการสถานะโหลด/ข้อผิดพลาด</span>
                        </li>
                    </ul>
                </div>

                {/* การ์ดแสดงโครงสร้างไฟล์ */}
                <div 
                    className="mb-8 p-6 bg-blue-400 border-2 border-gray-700 rounded-lg"
                    style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                    <h2 className="text-3xl font-bold text-white mb-4 border-b-4 border-white pb-2 inline-flex items-center gap-2">
                        <FolderTree size={32} className="text-white" />
                        โครงสร้างไฟล์สำคัญ
                    </h2>
                    <div className="space-y-2 text-white">
                        <div className="flex items-start">
                            <span className="font-mono bg-black bg-opacity-20 px-2 py-1 rounded mr-3">src/routes</span>
                            <span>หน้าเพจต่าง ๆ (Home, Detail, Favorite, About)</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-mono bg-black bg-opacity-20 px-2 py-1 rounded mr-3">src/store</span>
                            <span>Redux slices และ store</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-mono bg-black bg-opacity-20 px-2 py-1 rounded mr-3">src/components</span>
                            <span>UI components (GameCard, GameGrid, Navbar, Pagination)</span>
                        </div>
                        <div className="flex items-start">
                            <span className="font-mono bg-black bg-opacity-20 px-2 py-1 rounded mr-3">src/types</span>
                            <span>TypeScript types สำหรับ API responses</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}