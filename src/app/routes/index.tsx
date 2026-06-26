import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import App from "../App";
import BlogListPage from "../pages/blog";
import BlogDetailPage from "../pages/blog/[id]";
import AdminLoginPage from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import RequireAuth from "../../components/admin/RequireAuth";

const router = createBrowserRouter([
  {
    // Public site: shares the portfolio Header + Footer via <Outlet />.
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog", element: <BlogListPage /> },
      { path: "blog/:id", element: <BlogDetailPage /> },
    ],
  },
  {
    // Admin: standalone (no portfolio chrome).
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <RequireAuth>
        <AdminDashboard />
      </RequireAuth>
    ),
  },
]);

export default router;
