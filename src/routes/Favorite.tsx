// Import hook และ component ที่จำเป็น
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import GameGrid from "../components/GameGrid";
import type { Game } from "../types/game";

// RAWG API key from Vite env 
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

// Component สำหรับหน้าแสดงรายการหนังโปรด (เวอร์ชันใช้ Redux)
export default function Favorites() {
  // 1. ดึง ID ของหนังโปรดทั้งหมดจาก Redux store
  const { ids } = useSelector((state: RootState) => state.favorites);

  // 2. สร้าง state ของตัวเองเพื่อเก็บข้อมูลหนังและสถานะการโหลด
  const [favItems, setFavItems] = useState<Game []>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // 3. useEffect จะทำงานเมื่อรายการ id ของหนังโปรด (จาก Redux) เปลี่ยนไป
  useEffect(() => {
    if (!ids || ids.length === 0) {
      setFavItems([]);
      return;
    }

    const fetchFavoriteMovies = async () => {
      setStatus("loading");
      setError(null);
      try {
        const promises = ids.map((id) =>
          axios.get<Game>(`https://api.rawg.io/api/games/${id}`, {
            params: { key: RAWG_API_KEY },
          })
        );

        const results = await Promise.allSettled(promises);

        const games: Game[] = results
          .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
          .map((r) => r.value.data as Game);

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
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>

      {status === "loading" && (
        <div className="text-center">
          <span className="loading loading-lg loading-spinner"></span>
        </div>
      )}
      {status === "error" && (
        <div className="alert alert-error mb-4">{error}</div>
      )}

      {status === "idle" && <GameGrid items={favItems} />}

      {status === "idle" && !favItems.length && (
        <div className="text-center opacity-70 p-10">
          ยังไม่มีรายการโปรด — ไปที่หน้า Home แล้วกด “Favorite” ที่การ์ดหนัง
        </div>
      )}
    </div>
  );
}
