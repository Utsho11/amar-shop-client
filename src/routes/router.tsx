import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage";
import ShopPage from "../pages/ShopPage";
import ContactPage from "../pages/ContactPage";
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
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

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
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailsPage />,
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
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
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
