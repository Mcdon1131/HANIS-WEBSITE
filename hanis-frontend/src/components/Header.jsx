import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCart } from "../context/CartContext";
import { whatsappLink } from "../utils/whatsapp";

const navClass = ({ isActive }) => (isActive ? "active" : undefined);

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { count } = useCart();
  const isHome = pathname === "/";

  // On the home page the search box IS the ?search= URL param (live filtering).
  // On other pages it's a normal box that sends you to /?search=...
  const [localSearch, setLocalSearch] = useState("");
  const searchValue = isHome ? (params.get("search") ?? "") : localSearch;

  const onSearchChange = (value) => {
    if (!isHome) return setLocalSearch(value);
    const next = new URLSearchParams(params);
    if (value) next.set("search", value);
    else next.delete("search");
    setParams(next, { replace: true });
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    const term = searchValue.trim();
    if (isHome) {
      setParams(term ? { search: term } : { category: "all" }, {
        state: { scrollToResults: true },
      });
    } else if (term) {
      navigate(`/?search=${encodeURIComponent(term)}`);
    }
  };

  // mobile menu
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => {
    setNavOpen(false);
  }, [pathname, params]);
  useEffect(() => {
    if (!navOpen) return;
    const close = (e) => !e.target.closest(".site-header") && setNavOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [navOpen]);

  return (
    <header className={`site-header ${navOpen ? "nav-open" : ""}`}>
      <div style={{paddingLeft: "13x", paddingRight: "13px"}} className="container nav-wrap">
        <Link className="brand" to="/" aria-label="HANI'S home">
          <span className="brand-mark">H</span>
          <span className="brand-text">HANI'S</span>
        </Link>

        <form className="market-search" role="search" onSubmit={onSearchSubmit}>
          <label className="visually-hidden" htmlFor="marketSearch">
            Search cakes, products and services
          </label>
          <input
            id="marketSearch"
            type="search"
            placeholder="Search cakes, products and more"
            autoComplete="off"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 5 5" />
            </svg>
          </button>
        </form>

        <div className="nav-actions">
          <Link style={{position: "relative"}} to="/cart" className="cart-link" aria-label="Shopping cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span style={{position: "absolute", right: "0", top: "2px"}} className="cart-count header-responsive">{count}</span>
          </Link>
        </div>

        <button
          className="mobile-nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
         
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
