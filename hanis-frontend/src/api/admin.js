import { request } from "./client";

// Admin-only calls. The token is attached automatically by client.js.
// Product bodies are FormData because the image goes up as a file (field name: "image").

export const createProduct = (formData) => request("/products", { method: "POST", body: formData });
export const updateProduct = (id, formData) =>
  request(`/products/${id}`, { method: "PUT", body: formData });
export const deleteProduct = (id) => request(`/products/${id}`, { method: "DELETE" });

export const createCategory = (name) => request("/categories", { method: "POST", body: { name } });
export const deleteCategory = (id) => request(`/categories/${id}`, { method: "DELETE" });
