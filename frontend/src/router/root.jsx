import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/user/MainPage";
import AboutPage from "../pages/user/AboutPage";
import ServicesPage from "../pages/user/ServicesPage";
import PortfolioPage from "../pages/user/PortfolioPage";
import PortfolioDetailPage from "../pages/user/PortfolioDetailPage";
import ContactPage from "../pages/user/ContactPage";
import IndexPage from "../pages/admin/IndexPage";
import adminRouter from "./adminRouter";
import AdminLoginPage from "../pages/admin/LoginPage";
import ProtectedRouter from "../pages/admin/ProtectedRouter";
import Error404Page from "../pages/common/Error404Page";
import Error500Page from "../pages/common/Error500Page";
import Error500AdminPage from "../pages/admin/Error500AdminPage";

const root = createBrowserRouter([
    {
        path: "",
        element: <MainPage />
    },
    {
        path: "/about",
        element: <AboutPage />
    },
    {
        path: "/brand",
        element: <ServicesPage />
    },
    {
        path: "/portfolio",
        element: <PortfolioPage />
    },
    {
        path: "/portfolio/:id",
        element: <PortfolioDetailPage />
    },
    {
        path: "/contact",
        element: <ContactPage />
    },
    {
        path: "/admin",
        element: (
            <ProtectedRouter >
                <IndexPage />
            </ProtectedRouter>
        ),
        children: adminRouter()
    },
    {
        path: "/admin/login",
        element: <AdminLoginPage />,
    },
    {
        path: "/error/500",
        element: <Error500Page />,
    },
    {
        path: "/admin/error/500",
        element: <Error500AdminPage />,
    },
    {
        path: "*",
        element: <Error404Page />,
    },
]);

export default root;