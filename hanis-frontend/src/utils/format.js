export const formatPrice = (value) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    value,
  );
