import { createBrowserRouter, Navigate } from "react-router";

import { HomePage } from "@/heroes/pages/home/HomePage";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/pages/layouts/HeroesLayout";
import { AdminLayout } from "@/admin/pages/layouts/AdminLayout";
import { lazy } from "react";
// import { SeacrhPage } from "../heroes/pages/seacrh/SeacrhPage";


const SearchPage = lazy(()=> import('@/heroes/pages/search/SeacrhPage'))

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "hero/:idSlug", element: <HeroPage /> },
      { path: "search", element: <SearchPage /> },
      { path: '*', 
        // element: <h2>404 Not-found </h2>,
        element: <Navigate to='/' />
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ index: true, element: <AdminPage /> }],
  },
]);
