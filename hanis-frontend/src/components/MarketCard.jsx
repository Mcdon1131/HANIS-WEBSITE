import { CATEGORY_NAMES } from "../config";
import { formatPrice } from "../utils/format";

// Card used on the home page. Opens the details dialog.
export default function MarketCard({ item, className = "", onView }) {
  const hasPrice = item.price > 0;
  return (
    <article className={`market-product-card ${className}`.trim()}>
      <button
        className="market-product-image"
        type="button"
        onClick={() => onView(item)}
        aria-label={`View ${item.name} details`}
      >
        <img src={item.image} alt={item.name} loading="lazy" />
      </button>
      <div className="market-product-info">
        <span className="market-product-tag">{CATEGORY_NAMES[item.group] || item.group}</span>
        <h3 className="market-product-name">{item.name}</h3>
        <p className="market-product-description">{item.description}</p>
        <strong className={`market-product-price ${hasPrice ? "" : "is-enquiry"}`}>
          {hasPrice ? formatPrice(item.price) : "Enquire for pricing"}
        </strong>
        <button className="market-view-details" type="button" onClick={() => onView(item)}>
          View Details
        </button>
      </div>
    </article>
  );
}
