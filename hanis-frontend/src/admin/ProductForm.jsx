import { useEffect, useRef, useState } from "react";
import { createProduct, updateProduct } from "../api/admin";
import Icon from "./Icon";
import { useAdminData } from "./AdminData";

const MAX_SIZE = 5 * 1024 * 1024; // same limit as your upload middleware

// Add / edit popup. Pass `product` to edit, nothing to add.
// onSaved({ imageUnchanged }) runs after a successful save.
export default function ProductForm({ product, onClose, onSaved }) {
  const { categories } = useAdminData();
  const isEdit = Boolean(product);
  const dialogRef = useRef(null);
  const fileRef = useRef(null);

  const [values, setValues] = useState({
    name: product?.name ?? "",
    price: product?.price ?? "",
    category: product?.categoryId ?? "",
    description: product?.description ?? "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(product?.image ?? "");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // free the temporary preview URL when it changes / the form closes
  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const pickFile = (picked) => {
    if (!picked) return;
    if (!picked.type.startsWith("image/")) return setError("Please choose an image file.");
    if (picked.size > MAX_SIZE) return setError("That image is over 5 MB. Please choose a smaller one.");
    setError("");
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!isEdit && !file) return setError("Please add a product image.");
    if (!values.category) return setError("Please choose a category.");

    const body = new FormData();
    body.append("name", values.name.trim());
    body.append("price", values.price);
    body.append("category", values.category);
    body.append("description", values.description.trim());
    if (file) body.append("image", file);

    setSaving(true);
    setError("");
    try {
      if (isEdit) {
        const res = await updateProduct(product.id, body);
        // If a new image was sent but the URL came back unchanged, the backend ignored it
        // (see backend-patches/ in the README).
        onSaved({ imageUnchanged: Boolean(file) && res?.product?.imageUrl === product.image });
      } else {
        await createProduct(body);
        onSaved({});
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setSaving(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="adm-dialog adm-form-dialog"
      onCancel={(e) => {
        e.preventDefault();
        if (!saving) onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && !saving && onClose()}
    >
      <form onSubmit={onSubmit}>
        <div className="adm-dialog-head">
          <h2>{isEdit ? "Edit product" : "Add product"}</h2>
          <button type="button" className="adm-icon-btn" onClick={onClose} disabled={saving} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>

        <div className="adm-dialog-body">
          <div
            className={`adm-drop ${dragging ? "dragging" : ""} ${preview ? "has-image" : ""}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              pickFile(e.dataTransfer.files[0]);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileRef.current?.click()}
          >
            {preview ? (
              <>
                <img src={preview} alt="Product preview" />
                <span className="adm-drop-change">Change image</span>
              </>
            ) : (
              <div className="adm-drop-empty">
                <Icon name="upload" size={26} />
                <strong>Click or drop an image</strong>
                <small>PNG, JPG or WebP, up to 5 MB</small>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => pickFile(e.target.files[0])} />
          </div>

          <div className="adm-fields">
            <label className="adm-field span-2">
              <span>Name</span>
              <input value={values.name} onChange={set("name")} required placeholder="e.g. Ladies Bag" />
            </label>

            <label className="adm-field">
              <span>Price (₦)</span>
              <input type="number" min="0" step="any" value={values.price} onChange={set("price")} required placeholder="7000" />
            </label>

            <label className="adm-field">
              <span>Category</span>
              <select value={values.category} onChange={set("category")} required>
                <option value="" disabled>
                  {categories.length ? "Choose…" : "No categories yet"}
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="adm-field span-2">
              <span>Description</span>
              <textarea rows={3} value={values.description} onChange={set("description")} placeholder="A short description customers will see" />
            </label>
          </div>
        </div>

        {error && (
          <p className="adm-form-error" role="alert">
            <Icon name="alert" size={16} /> {error}
          </p>
        )}

        <div className="adm-dialog-actions">
          <button type="button" className="adm-btn ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="adm-btn primary" disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Add product"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
