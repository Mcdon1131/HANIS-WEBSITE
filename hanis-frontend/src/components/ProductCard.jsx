import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import Rating from "./Rating";
import Reveal from "./Reveal";

// Card used on the Importation page.
export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <Reveal as="article" className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <span className="imported-tag">Imported</span>
          <Rating value={product.rating} />
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-footer">
          <strong>{formatPrice(product.price)}</strong>
          <button className="button primary-button" onClick={() => addItem(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </Reveal>
  );
}
