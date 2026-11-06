import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand" to="/">
            <span className="brand-mark">H</span>
            <span className="brand-text">HANI'S</span>
          </Link>
          <p>
            Cakes, event planning and carefully selected imports, all brought together by HANI'S.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/?category=cakes">Cakes</Link></li>
            <li><Link to="/events">Event Planning</Link></li>
            <li><Link to="/products">Importation</Link></li>
          </ul>
        </div>
        <div>
          <h3>Support</h3>
          <ul>
            <li><Link to="/about">About HANI'S</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/pre-order">Pre-order</Link></li>
          </ul>
        </div>
      </div>
      <div className="container copyright">
        © {new Date().getFullYear()} HANI'S Cakes, Events & Imports. All rights reserved.
      </div>
    </footer>
  );
}
