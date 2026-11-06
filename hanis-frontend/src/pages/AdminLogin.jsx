import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, login } from "../api/auth";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function AdminLogin() {
  useDocumentMeta("Admin Login | HANI'S Importation");
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // already signed in -> straight to the dashboard
  if (isLoggedIn()) return <Navigate to="/admin" replace />;

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    setError("");
    try {
      await login(data.get("email"), data.get("password"));
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell">
      <section className="admin-login-card">
        <p className="eyebrow">Admin access</p>
        <h1>Sign in</h1>
        {location.state?.expired && !error && (
          <p role="status">Your session expired. Please sign in again.</p>
        )}
        <form className="admin-form" onSubmit={onSubmit}>
          <label><span>Email</span><input type="email" name="email" required autoComplete="username" /></label>
          <label><span>Password</span><input type="password" name="password" required autoComplete="current-password" /></label>
          {error && <p role="alert">{error}</p>}
          <button type="submit" className="button primary-button full-width" disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>
      </section>
    </div>
  );
}
