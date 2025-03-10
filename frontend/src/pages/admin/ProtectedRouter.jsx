import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAuth } from "../../api/accountApi";
import { logout, setUser } from "../../slices/loginSlice";
import FetchingModal from "../../components/common/FetchingModal";

const ProtectedRouter = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.loginSlice);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await getAuth();
                console.log(res.data);
                dispatch(setUser(res.data));
            } catch (err) {
                console.error("Authentication failed:", err);
                dispatch(logout());
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [dispatch]);

    if (isLoading) {
        return <FetchingModal />
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRouter;