// Star rating. Renders nothing if the product has no rating.
export default function Rating({ value }) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));
  if (!rating) return null;

  return (
    <span className="rating" aria-label={`Rated ${rating.toFixed(1)} out of 5 stars`}>
      <span className="rating-stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => {
          const state = rating >= i + 1 ? "filled" : rating > i ? "half" : "empty";
          return <span key={i} className={`rating-star ${state}`}>★</span>;
        })}
      </span>
      <span className="rating-value">{rating.toFixed(1)}</span>
    </span>
  );
}
