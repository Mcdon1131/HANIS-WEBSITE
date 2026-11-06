import { useEffect } from "react";
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../api/auth";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { AdminDataProvider } from "./AdminData";
import Icon from "./Icon";
import { ToastProvider } from "./Toasts";
import "./admin.css";

const NAV = [
  { to: "/admin", label: "Overview", icon: "grid", end: true },
  { to: "/admin/products", label: "Products", icon: "box" },
  { to: "/admin/categories", label: "Categories", icon: "tag" },
];

// Wraps every /admin page: login guard, sidebar, shared data and toasts.
export default function AdminLayout() {
  useDocumentMeta("Admin | HANI'S");
  const navigate = useNavigate();
  const location = useLocation();

  // the API client fires this when the server rejects the token (e.g. it expired)
  useEffect(() => {
    const onUnauthorized = () => navigate("/admin-login", { replace: true, state: { expired: true } });
    window.addEventListener("hanis:unauthorized", onUnauthorized);
    return () => window.removeEventListener("hanis:unauthorized", onUnauthorized);
  }, [navigate]);

  if (!isLoggedIn()) {
    return <Navigate to="/admin-login" replace state={{ from: location.pathname }} />;
  }

  const signOut = () => {
    logout();
    navigate("/admin-login", { replace: true });
  };

  return (
    <ToastProvider>
      <AdminDataProvider>
        <div className="adm">
          <aside className="adm-side">
            <div className="adm-brand">
              <span className="adm-brand-mark">H</span>
              <div>
                <strong>HANI'S</strong>
                <small>Admin</small>
              </div>
            </div>

            <nav className="adm-nav" aria-label="Admin">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? "active" : "")}>
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="adm-side-foot">
              <a href="/" target="_blank" rel="noreferrer">
                <Icon name="external" />
                <span>View site</span>
              </a>
              <button type="button" onClick={signOut}>
                <Icon name="logout" />
                <span>Log out</span>
              </button>
            </div>
          </aside>

          <main className="adm-main">
            <Outlet />
          </main>
        </div>
      </AdminDataProvider>
    </ToastProvider>
  );
}
