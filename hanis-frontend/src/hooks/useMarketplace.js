import { useApi } from "./useApi";
import { getProducts } from "../api/catalog";
import { services } from "../content/services";

// Everything the home page shows: products + cakes (one backend call, split by category)
// plus the static services.
export function useMarketplace() {
  const { data, loading, error, reload } = useApi(() => getProducts(), []);
  return { items: [...(data || []), ...services], loading, error, reload };
}
