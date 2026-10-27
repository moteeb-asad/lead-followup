import { createBrowserRouter, Navigate } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import LeadDetailPage from "./pages/admin/LeadDetailPage";
import LeadsPage from "./pages/admin/LeadsPage";
import LoginPage from "./pages/admin/LoginPage";
import LeadFormPage from "./pages/LeadFormPage";
import NotFoundPage from "./pages/NotFoundPage";

// /form is public. Everything under /admin is for the business owner and will
// require a session once login exists (week 2).
export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/form" replace /> },
  { path: "/form", element: <LeadFormPage /> },
  { path: "/admin/login", element: <LoginPage /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "leads", element: <LeadsPage /> },
      { path: "leads/:leadId", element: <LeadDetailPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
