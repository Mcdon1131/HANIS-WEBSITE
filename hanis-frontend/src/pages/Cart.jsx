import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useCart } from "../context/CartContext";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { formatPrice } from "../utils/format";

export default function Cart() {
  useDocumentMeta("Cart | HANI'S Importation", "Review your selected items and proceed to checkout.");
  const { lines, subtotal, shipping, total, increase, decrease, remove } = useCart();

  return (
    <>
      <PageHero eyebrow="Your basket" title="Shopping cart" />
      <section className="section">
        <div className="container cart-layout">
          <div className="cart-items">
            {lines.length === 0 ? (
              <div className="empty-state">
                <h3>Your cart is empty</h3>
                <Link to="/products" className="button primary-button">Continue shopping</Link>
              </div>
            ) : (
              lines.map((line) => (
                <div className="cart-item" key={line.id}>
                  <img src={line.image} alt={line.name} />
                  <div className="cart-item-info">
                    <h3>{line.name}</h3>
                    <p>{formatPrice(line.price)} each</p>
                    <div className="qty-controls">
                      <button onClick={() => decrease(line.id)}>-</button>
                      <span>{line.quantity}</span>
                      <button onClick={() => increase(line.id)}>+</button>
                      <button className="remove-btn" onClick={() => remove(line.id)}>Remove</button>
                    </div>
                  </div>
                  <strong>{formatPrice(line.price * line.quantity)}</strong>
                </div>
              ))
            )}
          </div>
          <aside className="cart-summary">
            <h3>Order summary</h3>
            <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="summary-row"><span>Shipping</span><strong>{formatPrice(shipping)}</strong></div>
            <div className="summary-row total-row"><span>Total</span><strong>{formatPrice(total)}</strong></div>
            <Link to="/checkout" className="button primary-button full-width">Proceed to checkout</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
