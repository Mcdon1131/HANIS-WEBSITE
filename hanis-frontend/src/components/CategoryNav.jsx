import { Link, useLocation, useSearchParams } from "react-router-dom";
import { CATEGORY_NAMES } from "../config";
import { isClothingQuery } from "../utils/search";

const TABS = [
  ["all", "All Products", "/"],
  ["cakes", "Cakes", "/?category=cakes"],
  ["imports", "Importation", "/products"],
  ["events", "Event Planning", "/events"],
];

// Sticky tab bar under the header.
// Home: buttons that change ?category=. Other pages: plain links.
export default function CategoryNav() {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const isHome = pathname === "/";

  let active = "";
  if (isHome) {
    const category = params.get("category");
    const query = params.get("search") ?? "";
    const showingResults = CATEGORY_NAMES[category] || query.trim();
    active = !showingResults ? "all" : CATEGORY_NAMES[category] ? category : "all";
    if (active === "all" && isClothingQuery(query)) active = "imports";
  } else if (pathname.startsWith("/products")) active = "imports";
  else if (pathname === "/events") active = "events";

  return (
    <nav className="market-category-nav" aria-label="Shop by category">
      <div className="container market-category-list">
        {TABS.map(([id, label, href]) =>
          isHome ? (
            <button
              key={id}
              type="button"
              className={id === active ? "active" : ""}
              aria-pressed={id === active}
              onClick={() => setParams({ category: id })}
            >
              {label}
            </button>
          ) : (
            <Link key={id} to={href} className={id === active ? "active" : ""}>
              {label}
            </Link>
          ),
        )}
      </div>
    </nav>
  );
}
