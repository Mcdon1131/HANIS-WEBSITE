import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SHIPPING_FEE } from "../config";

const STORAGE_KEY = "hanisCart";
const CartContext = createContext(null);

// Cart lines store a snapshot of the product so the cart works without refetching:
// { id, name, price, image, quantity }
const load = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed)
      ? parsed.filter((l) => l && l.id != null && typeof l.price === "number")
      : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load);
  const [toastId, setToastId] = useState(0); // 0 = hidden; bumps each add so the toast replays

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  // keep multiple tabs in sync
  useEffect(() => {
    const onStorage = (e) => e.key === STORAGE_KEY && setLines(load());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback((product) => {
    setLines((current) => {
      const existing = current.find((l) => l.id === product.id);
      if (existing) {
        return current.map((l) =>
          l.id === product.id ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    setToastId((n) => n + 1);
  }, []);

  const increase = useCallback(
    (id) =>
      setLines((c) => c.map((l) => (l.id === id ? { ...l, quantity: l.quantity + 1 } : l))),
    [],
  );

  const decrease = useCallback(
    (id) =>
      setLines((c) =>
        c.flatMap((l) =>
          l.id !== id ? [l] : l.quantity > 1 ? [{ ...l, quantity: l.quantity - 1 }] : [],
        ),
      ),
    [],
  );

  const remove = useCallback((id) => setLines((c) => c.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);
  const dismissToast = useCallback(() => setToastId(0), []);

  const value = useMemo(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    const shipping = subtotal > 0 ? SHIPPING_FEE : 0;
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem,
      increase,
      decrease,
      remove,
      clear,
      toastId,
      dismissToast,
    };
  }, [lines, toastId, addItem, increase, decrease, remove, clear, dismissToast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};
