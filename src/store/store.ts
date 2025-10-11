import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

//ดึง gameReducer มาจาก gameSlice
export const store = configureStore({
    reducer: {
        games: gameReducer,
    },
});

// RootState เป็น state ทั้งหมดใน store
// AppDispatch ไว้ใช้ส่ง action
// export rootState เเละ AppDispatch ออกไปใช้ใน component อย่างตอนนี้เป็นหน้า Home
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;