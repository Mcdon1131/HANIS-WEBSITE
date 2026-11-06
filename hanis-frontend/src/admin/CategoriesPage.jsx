import { useState } from "react";
import { createCategory, deleteCategory } from "../api/admin";
import { useAdminData } from "./AdminData";
import ConfirmDialog from "./ConfirmDialog";
import Icon from "./Icon";
import { AdminError, AdminLoading, PageHead } from "./parts";
import { useToast } from "./Toasts";

export default function CategoriesPage() {
  const { categories, countByCategory, loading, error, reload } = useAdminData();
  const toast = useToast();
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const add = async (event) => {
    event.preventDefault();
    const value = name.trim();
    if (!value) return;
    setAdding(true);
    try {
      await createCategory(value);
      setName("");
      toast.success(`Added “${value}”`);
      await reload();
    } catch (err) {
      // e.g. duplicate name (your model has unique: true)
      toast.error(/duplicate|E11000/i.test(err.message) ? "That category already exists" : err.message);
    } finally {
      setAdding(false);
    }
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await deleteCategory(deleting.id);
      toast.success(`Deleted “${deleting.name}”`);
      setDeleting(null);
      await reload();
    } catch (err) {
      toast.error(err.message || "Couldn't delete that category");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <AdminLoading />;
  if (error && !categories.length) return <AdminError error={error} onRetry={reload} />;

  return (
    <>
      <PageHead title="Categories" subtitle="Group your products" />

      <form className="adm-card adm-cat-add" onSubmit={add}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name, e.g. Cakes" required />
        <button type="submit" className="adm-btn primary" disabled={adding}>
          <Icon name="plus" /> {adding ? "Adding…" : "Add category"}
        </button>
      </form>

      {categories.length === 0 ? (
        <div className="adm-empty">
          <Icon name="tag" size={28} />
          <h3>No categories yet</h3>
          <p>Add one above, then you can start adding products.</p>
        </div>
      ) : (
        <ul className="adm-list cats">
          {categories.map((c) => {
            const count = countByCategory[c.id] || 0;
            return (
              <li key={c.id} className="adm-row cat">
                <div className="adm-row-main">
                  <strong>{c.name}</strong>
                  <small>
                    {count} {count === 1 ? "product" : "products"}
                  </small>
                </div>
                <button
                  type="button"
                  className="adm-icon-btn danger"
                  onClick={() => setDeleting(c)}
                  disabled={count > 0}
                  title={count > 0 ? "Move or delete its products first" : "Delete category"}
                  aria-label={`Delete ${c.name}`}
                >
                  <Icon name="trash" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete this category?"
          message={`“${deleting.name}” will be removed.`}
          confirmLabel="Delete category"
          busy={busy}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  );
}
