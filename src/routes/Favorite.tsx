// นำของที่จำเป็นมาใช้
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import GameGrid from "../components/GameGrid";
import ClearFavoritesButton from "../components/ClearFavoritesButton";
import type { Game } from "../types/game";

// ดึง API key มา
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

/**
 * หน้า Favorites
 * แสดงรายการเกมโปรดที่เก็บไว้ใน Redux store
 * ดึงข้อมูลเกมจาก API ตาม IDs ที่บันทึกไว้
 */
export default function Favorites() {
  // ดึง IDs ของเกมโปรดจาก Redux
  const { ids } = useSelector((state: RootState) => state.favorites);

  // เก็บข้อมูลเกมโปรดที่ดึงมาจาก API
  const [favItems, setFavItems] = useState<Game[]>([]);
  // เก็บสถานะการโหลด
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  // เก็บข้อความ error ถ้ามี
  const [error, setError] = useState<string | null>(null);

  // ดึงข้อมูลเกมโปรดเมื่อรายการ IDs เปลี่ยน
  useEffect(() => {
    // ถ้าไม่มี IDs หรือเป็น array ว่าง ก็ไม่ต้องทำอะไร
    if (!ids || ids.length === 0) {
      setFavItems([]);
      return;
    }

    // ฟังก์ชันดึงข้อมูลเกมจาก API
    const fetchFavoriteMovies = async () => {
      setStatus("loading");
      setError(null);
      try {
        // สร้าง array ของ promises เพื่อดึงข้อมูลแต่ละเกม
        const promises = ids.map((id) =>
          axios.get<Game>(`https://api.rawg.io/api/games/${id}`, {
            params: { key: RAWG_API_KEY },
          })
        );

        // รอให้ดึงข้อมูลทั้งหมดเสร็จ
        const responses = await Promise.all(promises); 
        // เอาแค่ data จาก response
        const games = responses.map(res => res.data);

        setFavItems(games);
        setStatus("idle");
      } catch (err) {
        console.error(err);
        setError("ไม่สามารถโหลดข้อมูลหนังโปรดได้");
        setStatus("error");
      }
    };

    fetchFavoriteMovies();
  }, [ids]);

  return (
    <div className="container mx-auto p-4">
      {/* หัวข้อ และปุ่มลบทั้งหมด */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Favorites</h1>
        <ClearFavoritesButton />
      </div>

      {/* แสดง loading */}
      {status === "loading" && (
        <div className="text-center">
          <span className="loading loading-lg loading-spinner"></span>
        </div>
      )}
      
      {/* แสดง error ถ้ามี */}
      {status === "error" && (
        <div className="alert alert-error mb-4">{error}</div>
      )}

      {/* แสดงกริดของเกมโปรด */}
      {status === "idle" && <GameGrid items={favItems} />}

      {/* ถ้าไม่มีเกมโปรดเลย แสดงข้อความบอก */}
      {status === "idle" && !favItems.length && (
        <div className="text-center opacity-70 p-10">
          ยังไม่มีรายการโปรด — ไปที่หน้า Home แล้วกด "Favorite" ที่การ์ดหนัง
        </div>
      )}
    </div>
  );
}
