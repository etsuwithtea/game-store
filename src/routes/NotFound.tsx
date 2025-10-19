// โหลด Link มาเพื่อเด้งไปหน้าอื่น + ไอคอนสวยๆ
import { Link } from "react-router-dom";
import { Home, Search, Gamepad2, AlertCircle } from "lucide-react";

// หน้านี้จะโผล่มาตอนที่เข้า URL แปลกๆ ที่ไม่มีในระบบ
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* การ์ดหลักของหน้า 404 */}
        <div
          className="bg-white border-4 border-gray-900 rounded-lg overflow-hidden"
          style={{ boxShadow: "12px 12px 0px 0px rgba(100,100,100,0.8)" }}
        >
          {/* ส่วนหัวสีแดง เขียนเบอร์ 404 ใหญ่ๆ */}
          <div className="bg-red-400 border-b-4 border-gray-900 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div
                className="bg-white border-4 border-gray-900 rounded-full p-6"
                style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
              >
                <AlertCircle className="w-16 h-16 text-red-400" strokeWidth={3} />
              </div>
            </div>
            <h1 className="text-6xl font-black text-white mb-2" style={{ textShadow: "4px 4px 0px rgba(0,0,0,1)" }}>
              404
            </h1>
            <p className="text-xl font-bold text-gray-900">PAGE NOT FOUND</p>
          </div>

          {/* บอกว่าทำไมถึงเจอหน้านี้ */}
          <div className="p-8">
            <div
              className="bg-yellow-200 border-3 border-gray-900 rounded-lg p-6 mb-6"
              style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.3)" }}
            >
              <p className="text-gray-900 font-semibold text-center text-lg">
                Oops! The page you're looking for doesn't exist.
                <br />
                <span className="text-base">
                  It might have been moved or deleted.
                </span>
              </p>
            </div>

            {/* บอกวิธีแก้ปัญหา ทำยังไงดี */}
            <div className="mb-6">
              <h3 className="font-black text-gray-900 text-lg mb-3 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5" />
                WHAT YOU CAN DO:
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-semibold text-gray-700">
                    Check the URL for typos
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-semibold text-gray-700">
                    Go back to the homepage
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="font-semibold text-gray-700">
                    Search for your favorite games
                  </p>
                </div>
              </div>
            </div>

            {/* ปุ่มกดไปหน้าหลัก หรือไปค้นหาเกม */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="flex-1 bg-purple-400 border-3 border-gray-900 rounded-lg py-3 px-6 font-black text-white text-center hover:bg-gray-900 hover:text-purple-400 transition-all flex items-center justify-center gap-2"
                style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
              >
                <Home className="w-5 h-5" />
                GO HOME
              </Link>
              <Link
                to="/"
                className="flex-1 bg-gray-800 border-3 border-gray-900 rounded-lg py-3 px-6 font-black text-white text-center hover:bg-gray-900 hover:text-yellow-300 transition-all flex items-center justify-center gap-2"
                style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
              >
                <Search className="w-5 h-5" />
                SEARCH GAMES
              </Link>
            </div>
          </div>

          {/* แถบล่างสุด เขียน error code */}
          <div className="bg-gray-900 p-4 text-center border-t-4 border-gray-900">
            <p className="text-gray-100 font-bold text-sm">
              Error Code: 404 | Page Not Found
            </p>
          </div>
        </div>

        {/* วงกลมสีสวยๆ ไว้ตกแต่งข้างล่าง */}
        <div className="flex justify-center gap-4 mt-6">
          <div
            className="w-4 h-4 bg-red-400 border-2 border-gray-900 rounded-full"
            style={{ boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
          ></div>
          <div
            className="w-4 h-4 bg-yellow-300 border-2 border-gray-900 rounded-full"
            style={{ boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
          ></div>
          <div
            className="w-4 h-4 bg-purple-400 border-2 border-gray-900 rounded-full"
            style={{ boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
          ></div>
        </div>
      </div>
    </div>
  );
}