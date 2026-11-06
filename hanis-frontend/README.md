# HANI'S – React (storefront + admin dashboard)

Vite + React + React Router. Talks to your Express/Mongo backend.

## Run it
```
npm install
cp .env.example .env     # (Windows: copy .env.example .env)
npm run dev
```
Start your backend too. In dev, `/api/*` is proxied to `http://localhost:5000` (change the port in
`vite.config.js`). Your routes are assumed to be mounted at `/api/auth`, `/api/products`, `/api/categories`.

## Admin dashboard
Sign in at `/admin-login`, then you land on `/admin`.
- **Overview**: counts, recent products, products per category
- **Products**: search, filter, add (with image upload), edit, delete
- **Categories**: add, delete (a category with products can't be deleted)
Sessions last 1 day (your JWT expiry); after that you're sent back to the login page.

### Two things to do on the backend
1. **Image editing needs a patch.** Your `updateProduct` ignores the uploaded file. Replace it with
   `backend-patches/updateProduct.js`. Until then, edits save but a new photo won't be applied
   (the dashboard warns you when that happens).
2. **Lock down `/api/auth/signup`.** It's public right now, so anyone can create an admin account.
   Create your admin, then remove that route (or add `authMiddleware` to it).

### Cakes
The site shows products in a category named **Cakes** under "Cakes" (WhatsApp ordering, no cart).
Every other product is an imported product with Add to cart. The list of cake category names is
`CAKE_CATEGORIES` in `src/config.js`.

To load your original 20 cakes in one go:
```
node scripts/seed-cakes.mjs --email=you@mail.com --password=yourpass --images="C:\path\to\order hanis"
```
(safe to run twice; it skips cakes that already exist)

## Where things live
| Folder | What's in it |
|---|---|
| `src/config.js` | WhatsApp number, phone/email, shipping fee, cake category names |
| `src/api/` | All backend calls (`catalog.js`, `admin.js`, `auth.js`, `client.js`) |
| `src/admin/` | The dashboard (pages, forms, `admin.css`) |
| `src/pages/` | Storefront pages |
| `src/components/` | Header, footer, cards, dialog, toast… |
| `src/context/CartContext.jsx` | Cart (`useCart()`), saved in localStorage |
| `src/content/` | Static copy: services and FAQs |
| `public/order hanis/` | Put the event/service images here |

## Notes
- Orders go to WhatsApp only (your backend has no orders route yet), and so does the contact form.
- Rating, stock and "featured" are optional fields the UI shows only if your products have them.
