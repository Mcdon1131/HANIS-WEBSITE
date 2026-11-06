import { useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useCart } from "../context/CartContext";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { formatPrice } from "../utils/format";
import { buildOrderMessage, whatsappLink } from "../utils/whatsapp";

export default function Checkout() {
  useDocumentMeta(
    "Checkout | HANI'S Importation",
    "Secure checkout with shipping and payment options for imported orders.",
  );
  const { lines, subtotal, shipping, total, clear } = useCart();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    if (!lines.length) {
      alert("Your cart is empty. Add a product before placing an order.");
      return;
    }
    const form = Object.fromEntries(new FormData(event.currentTarget).entries());
    const order = {
      ...form,
      items: lines.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
    };

    // Orders are sent through WhatsApp (your backend has no orders route yet).
    window.open(whatsappLink(buildOrderMessage(order)), "_blank");

    clear();
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <>
      <PageHero eyebrow="Secure payment" title="Checkout" />
      <section className="section">
        <div className="container checkout-layout">
          <form className="checkout-form" onSubmit={onSubmit}>
            <div className="form-card">
              <h3>Customer information</h3>
              <div className="form-grid">
                <label><span>Full name</span><input type="text" name="name" required /></label>
                <label><span>Email</span><input type="email" name="email" required /></label>
                <label><span>Phone</span><input type="tel" name="phone" required /></label>
                <label><span>Shipping country</span><input type="text" name="country" required /></label>
                <label className="full-width"><span>Address</span><textarea name="address" required /></label>
              </div>
            </div>

            <div className="form-card">
              <h3>Shipping & payment</h3>
              <div className="form-grid">
                <label>
                  <span>Shipping method</span>
                  <select name="shippingMethod">
                    <option value="air">Air shipping — 7 to 10 days</option>
                    <option value="sea">Sea shipping — 45 to 60 days</option>
                  </select>
                </label>
                <label>
                  <span>Payment type</span>
                  <select name="paymentType">
                    <option value="full">100% payment for products</option>
                    <option value="shipping">70% upfront for estimated shipping</option>
                  </select>
                </label>
              </div>
            </div>

            <button type="submit" className="button primary-button">
              Place order on WhatsApp
            </button>
          </form>

          <aside className="cart-summary">
            <h3>Order summary</h3>
            <div className="checkout-items">
              {lines.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                lines.map((line) => (
                  <div className="checkout-item" key={line.id}>
                    <span>{line.name} x {line.quantity}</span>
                    <strong>{formatPrice(line.price * line.quantity)}</strong>
                  </div>
                ))
              )}
            </div>
            <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="summary-row"><span>Shipping estimate</span><strong>{formatPrice(shipping)}</strong></div>
            <div className="summary-row total-row"><span>Total</span><strong>{formatPrice(total)}</strong></div>
          </aside>
        </div>
      </section>
    </>
  );
}
