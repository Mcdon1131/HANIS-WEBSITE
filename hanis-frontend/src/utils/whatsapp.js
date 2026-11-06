import { WHATSAPP_NUMBER } from "../config";
import { formatPrice } from "./format";

export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const buildOrderMessage = (order) =>
  [
    "New order received from HANI'S Importation.",
    "",
    `Customer: ${order.name}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone}`,
    `Country: ${order.country}`,
    `Address: ${order.address}`,
    `Shipping method: ${order.shippingMethod}`,
    `Payment type: ${order.paymentType}`,
    "",
    "Items:",
    order.items.length
      ? order.items
          .map(
            (i) => `- ${i.name} x ${i.quantity} = ${formatPrice(i.price * i.quantity)}`,
          )
          .join("\n")
      : "- No items listed",
    "",
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Shipping fee: ${formatPrice(order.shipping)}`,
    `Total: ${formatPrice(order.total)}`,
    "",
    `Order date: ${new Date(order.createdAt).toLocaleString()}`,
  ].join("\n");
