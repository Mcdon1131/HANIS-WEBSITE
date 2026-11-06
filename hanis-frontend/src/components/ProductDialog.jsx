import { useEffect, useRef } from "react";
import { CATEGORY_NAMES } from "../config";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import { whatsappLink } from "../utils/whatsapp";

// Details popup on the home page. Pass `item={null}` to close it.
export default function ProductDialog({ item, onClose }) {
  const ref = useRef(null);
  const { addItem } = useCart();

  useEffect(() => {
    const dialog = ref.current;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  return (
    <dialog
      ref={ref}
      className="market-product-dialog"
      aria-labelledby="dialogProductName"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {item && (
        <>
          <button className="market-dialog-close" type="button" aria-label="Close product details" onClick={onClose}>
            ×
          </button>
          <div className="market-dialog-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="market-dialog-content">
            <span className="market-dialog-label">{CATEGORY_NAMES[item.group] || item.group}</span>
            <h2 id="dialogProductName">{item.name}</h2>
            <p className="market-dialog-price">
              {item.price > 0 ? formatPrice(item.price) : "Contact us for pricing"}
            </p>
            <p>{item.description}</p>
            <div className="market-dialog-actions">
              <a
                className="button primary-button"
                href={whatsappLink(
                  `Hello HANI'S, I am interested in "${item.name}". Please share availability and ordering details.`,
                )}
                target="_blank"
                rel="noreferrer"
              >
                Order on WhatsApp
              </a>
              {item.source === "import" && (
                <button
                  className="button secondary-button"
                  type="button"
                  onClick={() => {
                    addItem(item);
                    onClose();
                  }}
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
