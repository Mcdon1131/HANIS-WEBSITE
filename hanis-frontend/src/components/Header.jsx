import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
      <div className="container nav-wrap">
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
          <a
            className="contact-icon"
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="Contact HANI'S on WhatsApp"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20l1-4.7a8.5 8.5 0 1 1 16.5-3.6Z" />
              <path d="M8.5 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .5l-.5.7c-.2.2-.2.4 0 .6.4.7 1.1 1.3 1.8 1.7.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.3.4.5 0 .3-.2 1.1-.7 1.5-.5.4-1.1.6-1.8.4-1-.2-2.2-.8-3.4-1.8-1-.9-1.8-2-2-2.9-.3-.8-.1-1.6.3-2.2Z" />
            </svg>
          </a>
          <Link to="/cart" className="cart-link" aria-label="Shopping cart">
            <span>Cart</span>
            <span className="cart-count">{count}</span>
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
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <Link to="/?category=cakes">Cakes</Link>
          <NavLink to="/events" className={navClass}>Events</NavLink>
          <NavLink to="/products" end className={navClass}>Importation</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
