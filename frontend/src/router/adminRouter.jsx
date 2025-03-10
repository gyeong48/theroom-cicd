import { Navigate } from "react-router-dom";
import PortfolioPage from "../pages/admin/PortfolioPage";
import PortfolioDetailPage from "../pages/admin/PortfolioDetailPage";
import PortfolioAddPage from "../pages/admin/PortfolioAddPage";
import AccountPage from "../pages/admin/AccountPage";
import AccountAddPage from "../pages/admin/AccountAddPage";
import ContactPage from "../pages/admin/ContactPage";
import ContactDetailPage from "../pages/admin/ContactDetailPage";
import PortfolioModifyPage from "../pages/admin/PortfolioModifyPage";
import ContactAddPage from "../pages/admin/ContactAddPage";
import AccountDetailPage from "../pages/admin/AccountDetailPage";
import CompanyContentPage from "../pages/admin/CompanyContentPage";
import AbountContentPage from "../pages/admin/AbountContentPage";
import MainContentPage from "../pages/admin/MainContentPage";
import ServiceContentPage from "../pages/admin/ServiceContentPage";

const adminRouter = () => {
    return [
        {
            path: "portfolio",
            element: <PortfolioPage />
        },
        {
            path: "",
            element: <Navigate replace={true} to={"portfolio"} />
        },
        {
            path: "portfolio/add",
            element: <PortfolioAddPage />
        },
        {
            path: "portfolio/:id",
            element: <PortfolioDetailPage />
        },
        {
            path: "portfolio/:id/modify",
            element: <PortfolioModifyPage />
        },
        {
            path: "account",
            element: <AccountPage />
        },
        {
            path: "account/add",
            element: <AccountAddPage />
        },
        {
            path: "account/:id",
            element: <AccountDetailPage />
        },
        {
            path: "contact",
            element: <ContactPage />
        },
        {
            path: "contact/add",
            element: <ContactAddPage />
        },
        {
            path: "contact/:id",
            element: <ContactDetailPage />
        },
        {
            path: "content/company",
            element: <CompanyContentPage />
        },
        {
            path: "content/about",
            element: <AbountContentPage />
        },
        {
            path: "content/main",
            element: <MainContentPage />
        },
        {
            path: "content/serivces",
            element: <ServiceContentPage />
        },
    ]
}

export default adminRouter;