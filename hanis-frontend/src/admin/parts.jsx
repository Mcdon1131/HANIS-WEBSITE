import Icon from "./Icon";

export function PageHead({ title, subtitle, children }) {
  return (
    <header className="adm-head">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="adm-head-actions">{children}</div>
    </header>
  );
}

export const AdminLoading = () => <p className="adm-loading">Loading…</p>;

export function AdminError({ error, onRetry }) {
  return (
    <div className="adm-empty">
      <Icon name="alert" size={28} />
      <h3>Couldn't load your data</h3>
      <p>{error?.message || "Check that your backend is running."}</p>
      <button type="button" className="adm-btn primary" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
