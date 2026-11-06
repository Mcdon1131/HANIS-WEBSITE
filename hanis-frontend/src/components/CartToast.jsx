import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// "Successfully added to cart" popup. Auto-dismisses after 4s.
export default function CartToast() {
  const { toastId, dismissToast } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toastId) return;
    setVisible(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(dismissToast, 4000);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [toastId, dismissToast]);

  if (!toastId) return null;

  return (
    <div
      className={`cart-toast ${visible ? "is-visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="cart-toast-icon" aria-hidden="true">OK</span>
      <span className="cart-toast-message">Successfully added to cart</span>
      <Link to="/cart" className="cart-toast-link" onClick={dismissToast}>View cart</Link>
      <button
        type="button"
        className="cart-toast-close"
        aria-label="Dismiss notification"
        onClick={dismissToast}
      >
        &times;
      </button>
    </div>
  );
}
