import { request } from "./client";
import { resolveImage } from "../utils/image";
import { CAKE_CATEGORIES } from "../config";

/*
 * Matches your backend:
 *   GET /api/products       -> { products: [...] }   (category is populated: { _id, name })
 *   GET /api/products/:id   -> { product }
 *   GET /api/categories     -> { categories: [...] }
 * Products with a category listed in CAKE_CATEGORIES (config.js) are shown as cakes.
 */

export const normalize = (raw) => {
  const cat = raw.category && typeof raw.category === "object" ? raw.category : null;
  const categoryName = cat?.name ?? "";
  const isCake = CAKE_CATEGORIES.includes(categoryName.trim().toLowerCase());

  return {
    id: String(raw._id ?? raw.id),
    name: raw.name ?? "",
    description: raw.description ?? "",
    price: Number(raw.price) || 0,
    image: resolveImage(raw.imageUrl),
    category: categoryName, // display name
    categoryId: cat ? String(cat._id) : "",
    createdAt: raw.createdAt,
    // optional fields your backend doesn't have yet; the UI hides them when missing
    stock: raw.stock,
    rating: raw.rating,
    featured: Boolean(raw.featured),
    // used by the storefront
    source: isCake ? "cake" : "import", // "import" products can be added to the cart
    group: isCake ? "cakes" : "imports", // which home-page tab it belongs to
  };
};

export const getProducts = () =>
  request("/products").then((res) => (res?.products ?? []).map(normalize));

export const getProduct = (id) =>
  request(`/products/${encodeURIComponent(id)}`).then((res) => normalize(res.product));

export const getCategories = () =>
  request("/categories").then((res) =>
    (res?.categories ?? []).map((c) => ({ id: String(c._id), name: c.name })),
  );
