import { API_URL } from "../config";

const TOKEN_KEY = "hanisAdminToken";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) =>
  token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY);

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

/**
 * Tiny fetch wrapper used by every api/* file.
 *   request("/products")
 *   request("/categories", { method: "POST", body: { name: "Cakes" } })
 *   request("/products", { method: "POST", body: formData })   // file uploads
 * If the server says 401 while an admin token is stored, the token is cleared and a
 * "hanis:unauthorized" event fires (the admin area listens and sends you to the login page).
 */
export async function request(path, { method = "GET", body, params, signal } = {}) {
  const url = new URL(`${API_URL}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
    });
  }

  const headers = {};
  const isForm = body instanceof FormData;
  if (body !== undefined && !isForm) headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(url, {
    method,
    headers,
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    signal,
  });

  const data = await response.json().catch(() => null);

  if (response.status === 401 && token) {
    setToken(null);
    window.dispatchEvent(new Event("hanis:unauthorized"));
  }

  if (!response.ok) {
    throw new ApiError(
      data?.message || data?.error || `Request failed (${response.status})`,
      response.status,
      data,
    );
  }
  return data;
}
