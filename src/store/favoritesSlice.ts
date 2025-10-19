// import ฟังก์ชันและประเภทที่จำเป็นจาก Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// เปลี่ยน key จาก movie เป็น game
const FAV_KEY = "fav_game_ids";

// ฟังก์ชันสำหรับโหลด ID จาก localStorage
const loadFavoritesFromStorage = (): string[] => {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// ฟังก์ชันสำหรับบันทึก ID ลง localStorage
const saveFavoritesToStorage = (ids: string[]) => {
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
};

interface FavoritesState {
  ids: string[];
}

// โหลด state เริ่มต้นจาก localStorage
const initialState: FavoritesState = {
  ids: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Reducer สำหรับการเพิ่ม/ลบ เกมโปรด
    toggleFavorite: (state, action: PayloadAction<string | number>) => {
      const id = String(action.payload);
      if (state.ids.includes(id)) {
        // ถ้ามีอยู่แล้ว ให้ลบออก
        state.ids = state.ids.filter((favId) => favId !== id);
      } else {
        // ถ้ายังไม่มี ให้เพิ่มเข้าไป
        state.ids.push(id);
      }
      // บันทึก state ล่าสุดลง localStorage ทุกครั้งที่มีการเปลี่ยนแปลง
      saveFavoritesToStorage(state.ids);
    },
    // Reducer สำหรับลบทั้งหมด (ถ้าต้องการ)
    clearAllFavorites: (state) => {
      state.ids = [];
      saveFavoritesToStorage(state.ids);
    },
  },
});

// Export action และ reducer
export const { toggleFavorite, clearAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;