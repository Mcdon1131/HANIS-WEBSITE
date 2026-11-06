import { request, setToken, getToken } from "./client";

/* POST /api/auth/login { email, password } -> { token } */
export async function login(email, password) {
  const res = await request("/auth/login", { method: "POST", body: { email, password } });
  setToken(res.token);
  return res;
}

export const logout = () => setToken(null);

// True if there's a token that hasn't expired yet (tokens last 1 day).
export function isLoggedIn() {
  const token = getToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return !payload.exp || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
