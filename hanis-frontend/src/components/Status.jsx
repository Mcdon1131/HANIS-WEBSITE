// Loading / error / empty messages used by pages that fetch data.
export function Loading({ children = "Loading…" }) {
  return <p className="market-empty">{children}</p>;
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="empty-state">
      <h3>Something went wrong</h3>
      <p>{error?.message || "We couldn't load this right now."}</p>
      {onRetry && (
        <button type="button" className="button primary-button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
