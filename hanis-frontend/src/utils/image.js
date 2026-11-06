import { ASSET_BASE } from "../config";

// Backend may return full URLs (used as-is) or relative paths (prefixed with VITE_ASSET_BASE).
export const resolveImage = (path) => {
  if (!path) return "";
  if (/^(https?:|data:|blob:|\/)/i.test(path)) return path;
  return `${ASSET_BASE}/${path}`.replace(/([^:])\/{2,}/g, "$1/");
};
