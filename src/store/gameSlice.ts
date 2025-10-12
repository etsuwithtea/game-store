import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Game, GamesResponse } from '../types/game';

// ดึง API Key จาก environment variable
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

// กำหนดโครงสร้าง State สำหรับ Slice นี้
type GamesState = {
  items: Game[]; // รายการเกมที่ดึงมาจาก API
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // สถานะการดึงข้อมูล
  error?: string; // สำหรับเก็บข้อความ error หากการดึงข้อมูลล้มเหลว
  count: number; // จำนวนเกมทั้งหมดจาก API
  limit: number; // จำนวนเกมที่ดึงมาต่อหนึ่งครั้ง
  offset: number; // ตำแหน่งเริ่มต้นของการดึงข้อมูล (สำหรับ Pagination)
  query: string; // คำค้นหา
  ordering: string; // การจัดเรียงข้อมูล
  genre?: string; // กรองตามหมวด (genre slug)
};

// กำหนดค่าเริ่มต้นสำหรับ State ของ games
const initialState: GamesState = {
  items: [],
  status: 'idle',
  count: 0,
  limit: 16,
  offset: 0,
  query: '',
  ordering: '-rating', // เรียงตาม rating สูงสุดก่อน
  genre: '',
};

// สร้าง Async Thunk สำหรับการดึงข้อมูลเกม
export const fetchGames = createAsyncThunk<
  GamesResponse,
  { offset?: number; limit?: number; ordering?: string; search?: string; genre?: string }
>(
  'games/fetchGames',
  async ({ offset = 0, limit = 20, ordering = '-added', search = '', genre = '' }) => {
    // คำนวณหมายเลขหน้าจาก offset
    const page = Math.floor(offset / limit) + 1;
    
    // สร้าง URL พารามิเตอร์
    const params = new URLSearchParams({
      key: RAWG_API_KEY,
      page: page.toString(),
      page_size: limit.toString(),
      ordering: ordering,
    });
    
    // เพิ่มคำค้นหา
    if (search) {
      params.append('search', search);
    }

    // เพิ่มการกรองหมวด (genres) 
    if (genre) {
      // RAWG API ใช้พารามิเตอร์ชื่อ `genres` ที่รับค่าเป็น slug หรือ id
      params.append('genres', genre);
    }

    const url = `${BASE_URL}/games?${params.toString()}`;
    
    // เรียก API
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: GamesResponse = await response.json();
    return data;
  }
);

// สร้าง Slice ของ State ที่ชื่อว่า 'games'
const gamesSlice = createSlice({
  name: 'games',
  initialState,
  // Reducers: ฟังก์ชันสำหรับอัปเดต State แบบ Synchronous
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.offset = 0; // รีเซ็ต offset เมื่อค้นหาใหม่
    },
    setOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
      state.offset = 0; // รีเซ็ต offset เมื่อเปลี่ยนการเรียง
    },
    setGenre(state, action: PayloadAction<string>) {
      state.genre = action.payload;
      state.offset = 0; // รีเซ็ต offset เมื่อเปลี่ยนการกรอง
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  // extraReducers: สำหรับจัดการ Action ที่สร้างจาก createAsyncThunk
  extraReducers: (builder) => {
    builder
      // กรณี Action 'fetchGames' อยู่ในสถานะ 'pending' (กำลังโหลด)
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      // กรณี Action 'fetchGames' อยู่ในสถานะ 'fulfilled' (โหลดสำเร็จ)
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.results ?? [];
        state.count = action.payload.count ?? state.items.length;
      })
      // กรณี Action 'fetchGames' อยู่ในสถานะ 'rejected' (โหลดล้มเหลว)
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Fetch failed';
      });
  },
});

// Export actions จาก reducers
export const { setOffset, setQuery, setOrdering, setGenre, reset } = gamesSlice.actions;

// Export reducer
export default gamesSlice.reducer;