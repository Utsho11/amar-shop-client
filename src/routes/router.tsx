import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { vendorPaths } from "./vendor.routes";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";
import ProtectedRoute from "./ProtectedRoute";
import { lazyWithRetry } from "../utils/lazyWithRetry";
import ErrorPage from "../components/shared/ErrorPage";

// Lazy-loaded pages with auto-recovery on deploy
const Homepage = lazyWithRetry(() => import("../pages/Homepage"));
const ShopPage = lazyWithRetry(() => import("../pages/ShopPage"));
const AboutPage = lazyWithRetry(() => import("../pages/AboutPage"));
const LoginPage = lazyWithRetry(() => import("../pages/LoginPage"));
const Auth = lazyWithRetry(() => import("../Auth"));
const RegistrationPage = lazyWithRetry(() => import("../pages/RegistrationPage"));
const ProductPage = lazyWithRetry(() => import("../pages/ProductPage"));
const ProductDetailsPage = lazyWithRetry(() => import("../pages/ProductDetailsPage"));
const ForgotPass = lazyWithRetry(() => import("../pages/ForgotPass"));
const ResetPass = lazyWithRetry(() => import("../pages/ResetPass"));
const CheckoutPage = lazyWithRetry(() => import("../pages/customerPages/CheckoutPage"));
const ChangePassword = lazyWithRetry(() => import("../pages/ChangePassword"));
const FlashSalePage = lazyWithRetry(() => import("../pages/FlashSalePage"));
const RecentProductPage = lazyWithRetry(() => import("../pages/RecentProductPage"));
const ComparisonPage = lazyWithRetry(() => import("../pages/ComparisonPage"));
const Contact = lazyWithRetry(() => import("../pages/Contact"));
const FAQ = lazyWithRetry(() => import("../pages/FAQ"));
const Returns = lazyWithRetry(() => import("../pages/rules/Returns"));
const Shipping = lazyWithRetry(() => import("../pages/rules/Shipping"));
const Privacy = lazyWithRetry(() => import("../pages/rules/Privacy"));
const Terms = lazyWithRetry(() => import("../pages/rules/Terms"));

// Lazy-loaded dashboard layouts
const AdminDashboardLayout = lazyWithRetry(
  () => import("../layouts/Dashboard/AdminDashboardLayout")
);
const CustomerDashboardLayout = lazyWithRetry(
  () => import("../layouts/Dashboard/CustomerDashboardLayout")
);
const VendorDashboardLayout = lazyWithRetry(
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
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
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
