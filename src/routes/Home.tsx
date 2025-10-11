import { useEffect } from "react";

// rootState AppDispatch from store
import type { RootState } from "../store/store";
import type { AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "../store/gameSlice";

function Home() {
    // dispatch to store
    const dispatch = useDispatch<AppDispatch>();

    // select data, loading, error from store
    const { data, loading, error } = useSelector((state: RootState) => state.games);

    useEffect(() => {
        // fetch API via gameSlice
        dispatch(fetchGames());
    }, [dispatch]);

    return (
        // ใช้ Tailwind เพื่อทำพื้นหลังขาวและความสูงเต็มจอ
        <div className="bg-white min-h-screen text-black p-6">
            {/* ถ้ามี DaisyUI และต้องการการ์ด */}
            {/* <div className="card bg-base-100 shadow-md p-4 rounded-lg"> */}
                <h1 className="text-2xl font-semibold mb-4">This is Home Page</h1>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <pre>{JSON.stringify(data, null, 2)}</pre>
            {/* </div> */}
        </div>
    );
}
export default Home;
