import { NavLink } from "react-router-dom";
import { Home, Info, Heart, Gamepad2, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        // navbar ทั้งหมด
        <div className="sticky top-0 z-50 p-4">
            <div className="relative border-gray-600 border-2 rounded-lg bg-white/90 backdrop-blur-sm" style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}>
                <div className="navbar">
                    {/* Logo อยู่ตรงนี้ */}
                    <div className="navbar-start flex-1 p-2 md:p-3">
                        <NavLink 
                            to="/" 
                            className="btn border-2 border-gray-700 bg-neutral-100 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black text-sm md:text-base"
                        >
                            <Gamepad2 className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="hidden sm:inline">GameStore.</span>
                        </NavLink>
                    </div>

                    {/* Desktop Menu */}
                    <div className="navbar-end hidden lg:flex gap-2 p-2">
                        <NavLink 
                            to="/" 
                            className="btn border-2 border-gray-700 bg-yellow-300 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black"
                        >                    
                            <Home className="w-5 h-5" />
                            Home
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            className="btn border-2 border-gray-700 bg-yellow-300 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black"
                        >
                            <Info className="w-5 h-5" />
                            About
                        </NavLink>
                        <NavLink 
                            to="/favorite" 
                            className="btn border-2 border-gray-700 bg-yellow-300 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black"
                        >
                            <Heart className="w-5 h-5" />
                            Favorite
                        </NavLink>

                    </div>

                    {/* Mobile Menu Button กินแฮมเบอร์เกอร์ */}
                    <div className="navbar-end lg:hidden p-2">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="btn border-2 border-gray-700 bg-yellow-300 text-black hover:border-gray-700 hover:text-amber-50 hover:bg-black"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t-2 border-base-300 bg-white/90 backdrop-blur-sm">
                        <div className="flex flex-col gap-2 p-4">
                            <NavLink 
                                to="/" 
                                onClick={() => setIsMenuOpen(false)}
                                className="btn border-2 border-gray-700 bg-yellow-300 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black w-full justify-start"
                            >                    
                                <Home className="w-5 h-5" />
                                Home
                            </NavLink>
                            <NavLink 
                                to="/about" 
                                onClick={() => setIsMenuOpen(false)}
                                className="btn border-2 border-gray-700 bg-yellow-300 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black w-full justify-start"
                            >
                                <Info className="w-5 h-5" />
                                About
                            </NavLink>
                            <NavLink 
                                to="/favorite" 
                                onClick={() => setIsMenuOpen(false)}
                                className="btn border-2 border-gray-700 bg-yellow-300 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black w-full justify-start"
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