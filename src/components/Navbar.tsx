// นำของที่จำเป็นมาใช้
import { NavLink } from "react-router-dom";
import { Home, Info, Heart, Gamepad2, Menu } from "lucide-react";
import { useState } from "react";

/**
 * Component Navbar แบบ sticky พร้อมสีสันสดใส
 * มีเมนู Home, About, Favorite และปุ่ม Refresh
 * รองรับ responsive - แสดงแบบเต็มบน desktop, แบบ dropdown บน mobile
 */
export default function Navbar() {
    // เก็บสถานะว่าเมนู mobile เปิดอยู่มั้ย
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        // navbar ติดด้านบน (sticky) พร้อม gradient สวยงาม
        <div className="sticky top-0 z-50 p-4">
            <div 
                className="relative border-gray-700 border-2 rounded-lg backdrop-blur-sm bg-gradient-to-r from-yellow-300 via-white to-white" 
                style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
            >
                <div className="navbar">
                    {/* Logo ด้านซ้าย */}
                    <div className="navbar-start flex-1 p-2 md:p-3">
                        <NavLink 
                            to="/" 
                            className="btn border-2 border-gray-700 bg-white text-black font-extrabold normal-case hover:border-gray-700 hover:text-white hover:bg-black text-sm md:text-base"
                            style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
                        >
                            <Gamepad2 className="w-4 h-4 md:w-5 md:h-5" />
                            {/* แสดงชื่อแค่บนหน้าจอใหญ่ */}
                            <span className="hidden sm:inline">GameStore.</span>
                        </NavLink>
                    </div>

                    {/* เมนูแบบ Desktop (แสดงแค่บนหน้าจอใหญ่) */}
                    <div className="navbar-end hidden lg:flex gap-2 p-2">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `btn border-2 border-gray-700 font-bold normal-case hover:border-gray-700 hover:scale-105 transition-transform ${
                                    isActive 
                                        ? 'bg-green-400 text-white hover:bg-green-500' 
                                        : 'bg-white text-black hover:bg-green-400 hover:text-white'
                                }`
                            }
                            style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
                        >                    
                            <Home className="w-5 h-5" />
                            Home
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => 
                                `btn border-2 border-gray-700 font-bold normal-case hover:border-gray-700 hover:scale-105 transition-transform ${
                                    isActive 
                                        ? 'bg-blue-400 text-white hover:bg-blue-500' 
                                        : 'bg-white text-black hover:bg-blue-400 hover:text-white'
                                }`
                            }
                            style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
                        >
                            <Info className="w-5 h-5" />
                            About
                        </NavLink>
                        <NavLink 
                            to="/favorite" 
                            className={({ isActive }) => 
                                `btn border-2 border-gray-700 font-bold normal-case hover:border-gray-700 hover:scale-105 transition-transform ${
                                    isActive 
                                        ? 'bg-red-400 text-white hover:bg-red-500' 
                                        : 'bg-white text-black hover:bg-red-400 hover:text-white'
                                }`
                            }
                            style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
                        >
                            <Heart className="w-5 h-5" />
                            Favorite
                        </NavLink>
                    </div>

                    {/* ปุ่มเปิดเมนู Mobile (แสดงแค่บนหน้าจอเล็ก) */}
                    <div className="navbar-end lg:hidden p-2">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="btn border-2 border-gray-700 bg-white text-black hover:border-gray-700 hover:bg-black hover:text-white"
                            style={{ boxShadow: '4px 4px 0px 0px rgba(43,43,43,0.3)' }}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* เมนู Dropdown สำหรับ Mobile */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t-2 border-gray-700 bg-white/95 backdrop-blur-sm">
                        <div className="flex flex-col gap-2 p-4">
                            <NavLink 
                                to="/" 
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => 
                                    `btn border-2 border-gray-700 font-bold normal-case hover:border-gray-700 w-full justify-start ${
                                        isActive 
                                            ? 'bg-green-400 text-white hover:bg-green-500' 
                                            : 'bg-white text-black hover:bg-green-400 hover:text-white'
                                    }`
                                }
                                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
                            >                    
                                <Home className="w-5 h-5" />
                                Home
                            </NavLink>
                            <NavLink 
                                to="/about" 
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => 
                                    `btn border-2 border-gray-700 font-bold normal-case hover:border-gray-700 w-full justify-start ${
                                        isActive 
                                            ? 'bg-blue-400 text-white hover:bg-blue-500' 
                                            : 'bg-white text-black hover:bg-blue-400 hover:text-white'
                                    }`
                                }
                                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
                            >
                                <Info className="w-5 h-5" />
                                About
                            </NavLink>
                            <NavLink 
                                to="/favorite" 
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => 
                                    `btn border-2 border-gray-700 font-bold normal-case hover:border-gray-700 w-full justify-start ${
                                        isActive 
                                            ? 'bg-red-400 text-white hover:bg-red-500' 
                                            : 'bg-white text-black hover:bg-red-400 hover:text-white'
                                    }`
                                }
                                style={{ boxShadow: '3px 3px 0px 0px rgba(43,43,43,0.3)' }}
                            >
                                <Heart className="w-5 h-5" />
                                Favorite
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}