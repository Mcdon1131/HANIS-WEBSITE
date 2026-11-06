import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { ErrorState, Loading } from "../components/Status";
import { getProduct, getProducts } from "../api/catalog";
import { useCart } from "../context/CartContext";
import { useApi } from "../hooks/useApi";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { formatPrice } from "../utils/format";

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { data: product, loading, error, reload } = useApi(() => getProduct(id), [id]);

  // "You may also like": same category, up to 3
  const { data: related } = useApi(
    () =>
      product
        ? getProducts().then((list) =>
            list
              .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
              .slice(0, 3),
          )
        : Promise.resolve([]),
    [product?.id],
  );

  useDocumentMeta(
    product ? `${product.name} | HANI'S Importation` : "Product Details | HANI'S Importation",
    "View product details, pricing, shipping terms and add products to cart.",
  );

  return (
    <>
      <section className="section product-detail-section">
        <div className="container detail-layout">
          {loading && <Loading />}
          {error && (
            <div className="empty-state">
              <h3>Product unavailable</h3>
              <Link to="/products" className="button primary-button">View products</Link>
            </div>
          )}
          {product && (
            <>
              <div className="detail-image-wrap">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="detail-info">
                <p className="eyebrow">{product.category}</p>
                <h1>{product.name}</h1>
                <div className="rating-row">
                  <Rating value={product.rating} />
                  {product.rating ? <span aria-hidden="true"> • </span> : null}
                  {product.stock != null && `${product.stock} in stock`}
                </div>
                <p className="price-tag">
                  {formatPrice(product.price)}{" "}
                  <span style={{ display: "inline-block", fontSize: "0.82rem", color: "#666", fontWeight: 500 }}>
                    Excluding shipping fee
                  </span>
                </p>
                <p>{product.description}</p>
                <div className="detail-actions">
                  <button className="button primary-button" onClick={() => addItem(product)}>
                    Add to cart
                  </button>
                  <Link to="/products" className="button secondary-button">Continue shopping</Link>
                </div>
                <ul className="detail-benefits">
                  <li>Air shipping: 7–10 days</li>
                  <li>Sea shipping: 45–60 days</li>
                  <li>Orders backed by transparent pre-order terms</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </section>

      {related?.length > 0 && (
        <section className="section alt-bg">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Related items</p>
                <h2>You may also like</h2>
              </div>
            </div>
            <div className="product-grid">
              {related.map((item) => (
                <article className="product-card" key={item.id}>
                  <Link to={`/products/${item.id}`}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div className="product-body">
                    <h3>{item.name}</h3>
                    <div className="product-footer">
                      <div>
                        <strong>{formatPrice(item.price)}</strong>
                        <small style={{ display: "block", fontSize: 12, color: "#666", marginTop: 4 }}>
                          Excluding shipping fee
                        </small>
                      </div>
                      <Link to={`/products/${item.id}`} className="button primary-button">View</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
