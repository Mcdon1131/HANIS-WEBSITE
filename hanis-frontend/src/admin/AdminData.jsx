import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getCategories, getProducts } from "../api/catalog";

const AdminDataContext = createContext(null);

// Loads products + categories once and shares them with every admin page.
// After you add/edit/delete something, call reload() to refresh.
export function AdminDataProvider({ children }) {
  const [state, setState] = useState({ products: [], categories: [], loading: true, error: null });

  const reload = useCallback(async () => {
    try {
      const [products, categories] = await Promise.all([getProducts(), getCategories()]);
      setState({ products, categories, loading: false, error: null });
    } catch (error) {
      setState((s) => ({ ...s, loading: false, error }));
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const value = useMemo(() => {
    const countByCategory = {};
    state.products.forEach((p) => {
      countByCategory[p.categoryId] = (countByCategory[p.categoryId] || 0) + 1;
    });
    return {
      ...state,
      countByCategory,
      reload: () => {
        setState((s) => ({ ...s, error: null, loading: s.products.length === 0 && s.categories.length === 0 }));
        return reload();
      },
    };
  }, [state, reload]);

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export const useAdminData = () => useContext(AdminDataContext);
