import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { deleteProduct } from "../api/admin";
import { formatPrice } from "../utils/format";
import { useAdminData } from "./AdminData";
import ConfirmDialog from "./ConfirmDialog";
import Icon from "./Icon";
import { AdminError, AdminLoading, PageHead } from "./parts";
import ProductForm from "./ProductForm";
import { useToast } from "./Toasts";

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "";

export default function ProductsPage() {
  const { products, categories, loading, error, reload } = useAdminData();
  const toast = useToast();
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editing, setEditing] = useState(null); // product being edited
  const [adding, setAdding] = useState(params.get("new") === "1");
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (categoryFilter === "all" || p.categoryId === categoryFilter) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    );
  }, [products, search, categoryFilter]);

  const closeForm = () => {
    setAdding(false);
    setEditing(null);
    if (params.get("new")) setParams({}, { replace: true });
  };

  const onSaved = async ({ imageUnchanged }) => {
    const wasEditing = Boolean(editing);
    closeForm();
    await reload();
    if (imageUnchanged) {
      toast.error("Saved, but the new image wasn't applied. Your backend's updateProduct needs the patch from the README.");
    } else {
      toast.success(wasEditing ? "Product updated" : "Product added");
    }
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await deleteProduct(deleting.id);
      toast.success(`Deleted “${deleting.name}”`);
      setDeleting(null);
      await reload();
    } catch (err) {
      toast.error(err.message || "Couldn't delete that product");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <AdminLoading />;
  if (error && !products.length) return <AdminError error={error} onRetry={reload} />;

  return (
    <>
      <PageHead title="Products" subtitle={`${products.length} in your store`}>
        <button type="button" className="adm-btn primary" onClick={() => setAdding(true)} disabled={!categories.length}>
          <Icon name="plus" /> Add product
        </button>
      </PageHead>

      {!categories.length && (
        <div className="adm-note">
          <Icon name="alert" size={18} />
          <p>Products need a category. Create one first.</p>
          <Link to="/admin/categories" className="adm-btn ghost small">
            Create a category
          </Link>
        </div>
      )}

      <div className="adm-toolbar">
        <label className="adm-search">
          <Icon name="search" />
          <input type="search" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="adm-empty">
          <Icon name="box" size={28} />
          <h3>{products.length ? "No matching products" : "No products yet"}</h3>
          <p>{products.length ? "Try a different search or category." : "Add your first product to see it here."}</p>
        </div>
      ) : (
        <ul className="adm-list">
          {visible.map((p) => (
            <li key={p.id} className="adm-row">
              <img src={p.image} alt="" loading="lazy" />
              <div className="adm-row-main">
                <strong>{p.name}</strong>
                <small>{p.description || "No description"}</small>
              </div>
              <span className={`adm-pill ${p.category ? "" : "muted"}`}>{p.category || "Uncategorised"}</span>
              <span className="adm-row-price">{formatPrice(p.price)}</span>
              <span className="adm-row-date">{formatDate(p.createdAt)}</span>
              <div className="adm-row-actions">
                <button type="button" className="adm-icon-btn" onClick={() => setEditing(p)} aria-label={`Edit ${p.name}`}>
                  <Icon name="edit" />
                </button>
                <button type="button" className="adm-icon-btn danger" onClick={() => setDeleting(p)} aria-label={`Delete ${p.name}`}>
                  <Icon name="trash" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {(adding || editing) && <ProductForm key={editing?.id ?? "new"} product={editing} onClose={closeForm} onSaved={onSaved} />}

      {deleting && (
        <ConfirmDialog
          title="Delete this product?"
          message={`“${deleting.name}” will be removed from your store. This can't be undone.`}
          confirmLabel="Delete product"
          busy={busy}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  );
}
