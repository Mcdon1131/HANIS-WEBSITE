import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";
import { useAdminData } from "./AdminData";
import Icon from "./Icon";
import { AdminError, AdminLoading, PageHead } from "./parts";

export default function Overview() {
  const { products, categories, countByCategory, loading, error, reload } = useAdminData();

  if (loading) return <AdminLoading />;
  if (error && !products.length) return <AdminError error={error} onRetry={reload} />;

  const average = products.length
    ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length)
    : 0;
  const recent = products.slice(0, 5); // API returns newest first
  const rows = categories
    .map((c) => ({ ...c, count: countByCategory[c.id] || 0 }))
    .sort((a, b) => b.count - a.count);
  const max = Math.max(1, ...rows.map((r) => r.count));
  const hasCakes = categories.some((c) => c.name.trim().toLowerCase() === "cakes");

  return (
    <>
      <PageHead title="Overview" subtitle="A quick look at your store">
        <Link to="/admin/products?new=1" className="adm-btn primary">
          <Icon name="plus" /> Add product
        </Link>
      </PageHead>

      <div className="adm-stats">
        <div className="adm-stat">
          <span>Products</span>
          <strong>{products.length}</strong>
        </div>
        <div className="adm-stat">
          <span>Categories</span>
          <strong>{categories.length}</strong>
        </div>
        <div className="adm-stat">
          <span>Average price</span>
          <strong>{formatPrice(average)}</strong>
        </div>
      </div>

      {!hasCakes && (
        <div className="adm-note">
          <Icon name="alert" size={18} />
          <p>
            Create a category named <b>Cakes</b> and put your cakes in it. Products in that category show up under
            “Cakes” on the site.
          </p>
          <Link to="/admin/categories" className="adm-btn ghost small">
            Go to categories
          </Link>
        </div>
      )}

      <div className="adm-two">
        <section className="adm-card">
          <div className="adm-card-head">
            <h2>Recently added</h2>
            <Link to="/admin/products">View all</Link>
          </div>
          {recent.length === 0 ? (
            <p className="adm-empty-sm">No products yet. Add your first one to get started.</p>
          ) : (
            <ul className="adm-recent">
              {recent.map((p) => (
                <li key={p.id}>
                  <img src={p.image} alt="" />
                  <div>
                    <strong>{p.name}</strong>
                    <small>{p.category || "Uncategorised"}</small>
                  </div>
                  <span>{formatPrice(p.price)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="adm-card">
          <div className="adm-card-head">
            <h2>Products by category</h2>
            <Link to="/admin/categories">Manage</Link>
          </div>
          {rows.length === 0 ? (
            <p className="adm-empty-sm">No categories yet.</p>
          ) : (
            <ul className="adm-bars">
              {rows.map((r) => (
                <li key={r.id}>
                  <div>
                    <span>{r.name}</span>
                    <b>{r.count}</b>
                  </div>
                  <i style={{ width: `${(r.count / max) * 100}%` }} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
