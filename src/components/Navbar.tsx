import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar bg-white shadow-none">
            <div className="navbar-start flex-1 p-5">
                <div className="flex items-center gap-2 text-xl font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-5 h-5 text-gray-600">
                        <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zm64 256c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm-64-96c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32zm192 32c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm96 64c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/>
                    </svg>
                    <span className="text-lg text-gray-700">
                        GameStore.
                    </span>
                </div>
            </div>

            <div className="navbar-center flex gap-2 p-3">
                <NavLink to="/" className="btn border-2 border-gray-700 bg-yellow-300 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black">                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Home
                </NavLink>
                <NavLink to="/about" className="btn border-2 border-gray-700 bg-yellow-300 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9.75h.008v.008H11.25V9.75zm.75 3v3m0-6.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                    About
                </NavLink>
                <NavLink to="/favorite" className="btn border-2 border-gray-700 bg-yellow-300 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.657 0-3.156.832-4 2.09C10.156 4.582 8.657 3.75 7 3.75c-2.761 0-5 2.015-5 4.5 0 7.25 10 12 10 12s10-4.75 10-12z" />
                    </svg>
                    Favorite
                </NavLink>
                <NavLink to="/developer" className="btn border-2 border-gray-700 bg-yellow-300 text-black font-bold normal-case hover:border-gray-700 hover:text-amber-50 hover:bg-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                    </svg>
                    Developer
                </NavLink>
            </div>
        </div>
    );
}