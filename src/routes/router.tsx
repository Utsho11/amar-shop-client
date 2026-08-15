import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { vendorPaths } from "./vendor.routes";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";
import ProtectedRoute from "./ProtectedRoute";

// Lazy-loaded pages
const Homepage = lazy(() => import("../pages/Homepage"));
const ShopPage = lazy(() => import("../pages/ShopPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const Auth = lazy(() => import("../Auth"));
const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage"));
const ForgotPass = lazy(() => import("../pages/ForgotPass"));
const ResetPass = lazy(() => import("../pages/ResetPass"));
const CheckoutPage = lazy(() => import("../pages/customerPages/CheckoutPage"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const FlashSalePage = lazy(() => import("../pages/FlashSalePage"));
const RecentProductPage = lazy(() => import("../pages/RecentProductPage"));
const ComparisonPage = lazy(() => import("../pages/ComparisonPage"));
const Contact = lazy(() => import("../pages/Contact"));
const FAQ = lazy(() => import("../pages/FAQ"));
const Returns = lazy(() => import("../pages/rules/Returns"));
const Shipping = lazy(() => import("../pages/rules/Shipping"));
const Privacy = lazy(() => import("../pages/rules/Privacy"));
const Terms = lazy(() => import("../pages/rules/Terms"));

// Lazy-loaded dashboard layouts
const AdminDashboardLayout = lazy(
  () => import("../layouts/Dashboard/AdminDashboardLayout")
);
const CustomerDashboardLayout = lazy(
  () => import("../layouts/Dashboard/CustomerDashboardLayout")
);
const VendorDashboardLayout = lazy(
  () => import("../layouts/Dashboard/VendorDashboardLayout")
);

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <span className="loading loading-spinner loading-lg text-primary"></span>
  </div>
);

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: withSuspense(Homepage),
      },
      {
        path: "/shop/:id",
        element: withSuspense(ShopPage),
      },
      {
        path: "/products",
        element: withSuspense(ProductPage),
      },
      {
        path: "products/:id",
        element: withSuspense(ProductDetailsPage),
      },
      {
        path: "/compare",
        element: withSuspense(ComparisonPage),
      },
      {
        path: "/recent",
        element: withSuspense(RecentProductPage),
      },
      {
        path: "about",
        element: withSuspense(AboutPage),
      },
      {
        path: "/contact",
        element: withSuspense(Contact),
      },
      {
        path: "/faq",
        element: withSuspense(FAQ),
      },
      {
        path: "checkout",
        element: withSuspense(CheckoutPage),
      },
      {
        path: "forgot-password",
        element: withSuspense(ForgotPass),
      },
      {
        path: "reset-password",
        element: withSuspense(ResetPass),
      },
      {
        path: "change-password",
        element: withSuspense(ChangePassword),
      },
      {
        path: "flash-sale",
        element: withSuspense(FlashSalePage),
      },
      {
        path: "returns",
        element: withSuspense(Returns),
      },
      {
        path: "shipping",
        element: withSuspense(Shipping),
      },
      {
        path: "privacy",
        element: withSuspense(Privacy),
      },
      {
        path: "terms",
        element: withSuspense(Terms),
      },
    ],
  },
  {
    path: "/auth",
    element: withSuspense(Auth),
    children: [
      {
        path: "login",
        element: withSuspense(LoginPage),
      },
      {
        path: "register",
        element: withSuspense(RegistrationPage),
      },
    ],
  },
  {
    path: "/adminDashboard",
    element: (
      <ProtectedRoute role="ADMIN">
        <Suspense fallback={<PageLoader />}>
          <AdminDashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/customerDashboard",
    element: (
      <ProtectedRoute role="CUSTOMER">
        <Suspense fallback={<PageLoader />}>
          <CustomerDashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: routeGenerator(customerPaths),
  },
  {
    path: "/vendorDashboard",
    element: (
      <ProtectedRoute role="VENDOR">
        <Suspense fallback={<PageLoader />}>
          <VendorDashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: routeGenerator(vendorPaths),
  },
]);

export default router;
