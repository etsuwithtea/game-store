import { useEffect } from "react";

// rootState กับ AppDispatch มาจาก store.ts ถ้าไม่ใช้ก็ปิดตาม import ได้เลย
import type { RootState } from "../store/store";
import type { AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "../store/gameSlice";

function Home() {
    // เรียกใช้ dispatch ใน store
    const dispatch = useDispatch<AppDispatch>();

    // เรียกใช้ rootState จาก store มาทำเป็น data, loading, error
    const { data, loading, error } = useSelector((state: RootState) => state.games);

    useEffect(() => {
        // ไป fetch API จาก gameSlice
        dispatch(fetchGames());
    }, [dispatch]);
    // ตรง loding กับ error เป็นเงื่อนไขเอาไว้เเสดงสถานะการโหลดข้อมูล
    // หรือถ้าจะทำ หน้า home หรือ frontend อย่างเดียว ไม่ต้อง fetch API ก็ลบให้หมดได้เลย
    return (
        <>
            <h1>This is Home Page</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
}
export default Home;