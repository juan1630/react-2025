import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layout/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
// import { AuthLayout } from "./auth/layouts/AuthLayout";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
// import { AdminLayout } from "./admin/layout/AdminLayout";
import { DashboardPage } from "./admin/layout/pages/dashboard/DashboardPage";
import { AdminProductsPage } from "./admin/layout/pages/product/AdminProductsPage";
import { AdminProductPage } from "./admin/layout/pages/product/AdminProductPage";
import {
  AdminRoute,
  NotAuthenticatedRoute,
} from "./components/ui/routes/ProtectedRoutes";

const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));

export const appRouter = createBrowserRouter([
  //public routes
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/:idSlug", element: <ProductPage /> },
      { path: "gender/:gender", element: <GenderPage /> },
    ],
    //auth Routes
  },
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/auth/login" /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  //admin routes
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "products", element: <AdminProductsPage /> }, 
      { path: "products/:id", element: <AdminProductPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
