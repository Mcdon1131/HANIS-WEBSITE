import { useEffect, useRef } from "react";

// <ConfirmDialog title="Delete X?" message="..." confirmLabel="Delete" busy={saving}
//                onConfirm={...} onCancel={...} />   (render it only while it should be open)
export default function ConfirmDialog({ title, message, confirmLabel = "Confirm", busy, onConfirm, onCancel }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      className="adm-dialog adm-confirm"
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) onCancel();
      }}
      onClick={(e) => e.target === e.currentTarget && !busy && onCancel()}
    >
      <div className="adm-confirm-body">
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
      <div className="adm-dialog-actions">
        <button type="button" className="adm-btn ghost" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button type="button" className="adm-btn danger" onClick={onConfirm} disabled={busy}>
          {busy ? "Deleting…" : confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
