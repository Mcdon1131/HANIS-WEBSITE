// Uploads your original 20 cakes (seed/cakes.json) through your API, so you don't have to
// add them one by one in the dashboard. Safe to run twice: it skips cakes already there.
//
//   node scripts/seed-cakes.mjs --email=you@mail.com --password=secret --images="C:\path\to\order hanis"
//
// Optional: --api=http://localhost:5000/api   (default)
// Needs Node 18+. The images folder is your old "order hanis" folder.

import { readFile } from "node:fs/promises";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=");
    return [k, v.join("=")];
  }),
);
const api = (args.api || "http://localhost:5000/api").replace(/\/$/, "");
const { email, password, images } = args;
if (!email || !password || !images) {
  console.error('Usage: node scripts/seed-cakes.mjs --email=... --password=... --images="path/to/order hanis"');
  process.exit(1);
}

const call = async (route, options = {}, token) => {
  const res = await fetch(`${api}${route}`, {
    ...options,
    headers: { ...(options.headers || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || `${route} failed (${res.status})`);
  return data;
};

const cakes = JSON.parse(await readFile(new URL("../seed/cakes.json", import.meta.url), "utf8"));
const mime = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

const { token } = await call("/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
console.log("Logged in.");

// find or create the "Cakes" category
const { categories } = await call("/categories");
let cakesCategory = categories.find((c) => c.name.trim().toLowerCase() === "cakes");
if (!cakesCategory) {
  ({ category: cakesCategory } = await call(
    "/categories",
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Cakes" }) },
    token,
  ));
  console.log('Created category "Cakes".');
}

const { products } = await call("/products");
const exists = (c) => products.some((p) => p.name === c.name && Number(p.price) === Number(c.price));

let added = 0, skipped = 0, failed = 0;
for (const cake of cakes) {
  if (exists(cake)) { skipped++; continue; }
  try {
    const file = path.join(images, path.basename(cake.image));
    const bytes = await readFile(file);
    const form = new FormData();
    form.append("name", cake.name);
    form.append("description", cake.description || "");
    form.append("price", String(cake.price));
    form.append("category", cakesCategory._id);
    form.append("image", new Blob([bytes], { type: mime[path.extname(file).toLowerCase()] || "image/jpeg" }), path.basename(file));
    await call("/products", { method: "POST", body: form }, token);
    added++;
    console.log(`+ ${cake.name}`);
  } catch (err) {
    failed++;
    console.error(`x ${cake.name}: ${err.message}`);
  }
}
console.log(`\nDone. Added ${added}, skipped ${skipped} (already there), failed ${failed}.`);
