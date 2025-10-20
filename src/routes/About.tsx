// นำของที่จำเป็นมาใช้
import { Gamepad2, Settings, Sparkles, Users, Zap } from 'lucide-react';
import dev1 from '../assets/dev_1.jpg';
import dev2 from '../assets/dev_2.jpg';
import dev3 from '../assets/dev_3.jpeg';

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

                {/* การ์ดแสดงผู้พัฒนา */}
                <div 
                    className="mb-8 p-6 bg-white border-2 border-gray-700 rounded-lg"
                    style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                    <h2 className="text-3xl font-bold text-black mb-6 border-b-4 border-black pb-2 inline-flex items-center gap-2">
                        <Users size={32} className="text-black" />
                        ผู้พัฒนา โปรเจกต์
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Developer 1 */}
                        <div className="flex flex-col items-center text-center">
                            <img 
                                src={dev1} 
                                alt="Navapan Suthon" 
                                className="w-32 h-32 rounded-lg object-cover mb-3 border-2 border-gray-700"
                                style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
                            />
                            <p className="font-bold text-lg text-black mb-1">Navapan Suthon</p>
                            <p className="text-sm text-gray-700 mb-2">Home Page, About Page,<br />Navbar, Sidebar, Notfound</p>
                        </div>

                        {/* Developer 2 */}
                        <div className="flex flex-col items-center text-center">
                            <img 
                                src={dev2} 
                                alt="Supacheep Poonsawat" 
                                className="w-32 h-32 rounded-lg object-cover mb-3 border-2 border-gray-700"
                                style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
                            />
                            <p className="font-bold text-lg text-black mb-1">Supacheep Poonsawat</p>
                            <p className="text-sm text-gray-700 mb-2">Detail Page, Developer Page,<br />Backend (API Connect)</p>
                        </div>

                        {/* Developer 3 */}
                        <div className="flex flex-col items-center text-center">
                            <img 
                                src={dev3} 
                                alt="Rapeepong Chaimongkol" 
                                className="w-32 h-32 rounded-lg object-cover mb-3 border-2 border-gray-700"
                                style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
                            />
                            <p className="font-bold text-lg text-black mb-1">Rapeepong Chaimongkol</p>
                            <p className="text-sm text-gray-700 mb-2">Favorite Page, Tester</p>
                        </div>
                    </div>
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
                            <span className="mr-2">•</span>
                            <span>ค้นหาเกมตามชื่อ ผ่าน Search Bar</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>กรองเกมตามหมวด (Genre) และแพลตฟอร์ม (Platform)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>เรียงลำดับเกมตามเกณฑ์ต่างๆ (Ordering)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>บันทึกเกมโปรด (Favorites) ลงใน localStorage</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>ดูรายละเอียดเกมแบบละเอียด (Detail Page)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>ดูนักพัฒนาเกม (Developer Page)</span>
                        </li>
                    </ul>
                </div>

                {/* การ์ดแสดงโครงสร้างไฟล์ */}
                <div 
                    className="mb-8 p-6 bg-blue-400 border-2 border-gray-700 rounded-lg"
                    style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
                >
                    <h2 className="text-3xl font-bold text-white mb-4 border-b-4 border-white pb-2 inline-flex items-center gap-2">
                        <Zap size={32} className="text-white" />
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