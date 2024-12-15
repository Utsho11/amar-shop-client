import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage";
import ShopPage from "../pages/ShopPage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import Auth from "../Auth";
import RegistrationPage from "../pages/RegistrationPage";
import AdminDashboardLayout from "../layouts/Dashboard/AdminDashboardLayout";
import CustomerDashboardLayout from "../layouts/Dashboard/CustomerDashboardLayout";
import VendorDashboardLayout from "../layouts/Dashboard/VendorDashboardLayout";
import { routeGenerator } from "../utils/routeGenerator";
import { vendorPaths } from "./vendor.routes";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";
import ProtectedRoute from "./ProtectedRoute";
import ProductPage from "../pages/ProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ForgotPass from "../pages/ForgotPass";
import ResetPass from "../pages/ResetPass";
import CheckoutPage from "../pages/customerPages/CheckoutPage";
import ChangePassword from "../pages/ChangePassword";
import FlashSalePage from "../pages/FlashSalePage";
import RecentProductPage from "../pages/RecentProductPage";

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
        path: "shop/:id",
        element: <ShopPage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/recent",
        element: <RecentProductPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPass />,
      },
      {
        path: "reset-password",
        element: <ResetPass />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "flash-sale",
        element: <FlashSalePage />,
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
    element: (
      <ProtectedRoute role="ADMIN">
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/customerDashboard",
    element: (
      <ProtectedRoute role="CUSTOMER">
        <CustomerDashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(customerPaths),
  },
  {
    path: "/vendorDashboard",
    element: (
      <ProtectedRoute role="VENDOR">
        <VendorDashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(vendorPaths),
  },
]);

export default router;
