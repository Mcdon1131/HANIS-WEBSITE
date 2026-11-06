import PageHero from "../components/PageHero";
import ProductCard from "../components/ProductCard";
import { ErrorState, Loading } from "../components/Status";
import { getProducts } from "../api/catalog";
import { useApi } from "../hooks/useApi";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Products() {
  useDocumentMeta(
    "Products | HANI'S Importation",
    "Browse imported essentials and best sellers from HANI'S Importation.",
  );
  const { data: products, loading, error, reload } = useApi(() => getProducts(), []);

  return (
    <>
      <PageHero eyebrow="Shop imported goods" title="Browse the collection" />
      <section className="section">
        <div className="container">
          {loading && <Loading />}
          {error && <ErrorState error={error} onRetry={reload} />}
          {products && (
            <div className="product-grid">
              {products.filter((p) => p.group === "imports").map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
