import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ลอง Fetch API เเค่ตัวเกมเป็นหลัก
export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
    const res = await fetch('https://api.rawg.io/api/games?key=21988c3e302342468530b04ca6d3b96d');
    return await res.json();
});

// ใน initialState จะเก็บ data, loading, error

// pending จะเริ่ม fetch data
// fulfilled จะเป็นหลัง fetch เสร็จเเละพวกข้อมูลจะลง data
// rejected จะเป็นตอนที่ fetch เอ๋อ หรือ error
const gameSlice = createSlice({
    name: 'games',
    initialState: { data: [], loading: false, error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    },
});

export default gameSlice.reducer;