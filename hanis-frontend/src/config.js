// Site-wide settings. Change things here, not inside components.

export const API_URL = import.meta.env.VITE_API_URL || "/api";
export const ASSET_BASE = import.meta.env.VITE_ASSET_BASE || "";

export const WHATSAPP_NUMBER = "2348147024101";
export const CONTACT = {
  phone: "+234 814 702 4101",
  email: "hello@hanisimport.com",
};

// Products whose category name is in this list show up under "Cakes" on the home
// page (WhatsApp-only, no cart). Everything else is treated as an imported product.
// Names are compared lower-case, so "Cakes" and "cakes" both match.
export const CAKE_CATEGORIES = ["cakes"];

// Flat shipping fee added whenever the cart isn't empty.
export const SHIPPING_FEE = 7000;

// Tabs shown on the home page. "all" shows the default sections.
export const CATEGORY_NAMES = {
  all: "All Products",
  cakes: "Cakes",
  imports: "Importation",
  events: "Event Planning",
  birthday: "Birthday Packages",
  bouquets: "Money Bouquets",
};
