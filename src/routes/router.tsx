import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage";
import ShopPage from "../pages/ShopPage";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import Auth from "../Auth";
import RegistrationPage from "../pages/RegistrationPage";
import CreateShopPage from "../pages/vendorPages/CreateShopPage";
import AdminDashboardLayout from "../layouts/Dashboard/AdminDashboardLayout";
import CustomerDashboardLayout from "../layouts/Dashboard/CustomerDashboardLayout";
import VendorDashboardLayout from "../layouts/Dashboard/VendorDashboardLayout";
import { routeGenerator } from "../utils/routeGenerator";
import { vendorPaths } from "./vendor.routes";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "createShop",
        element: <CreateShopPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegistrationPage />,
      },
    ],
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboardLayout />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/customerDashboard",
    element: <CustomerDashboardLayout />,
    children: routeGenerator(customerPaths),
  },
  {
    path: "/vendorDashboard",
    element: <VendorDashboardLayout />,
    children: routeGenerator(vendorPaths),
  },
]);

export default router;
