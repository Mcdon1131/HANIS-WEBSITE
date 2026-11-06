import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Events from "./pages/Events";
import PreOrder from "./pages/PreOrder";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import AdminLayout from "./admin/AdminLayout";
import Overview from "./admin/Overview";
import ProductsPage from "./admin/ProductsPage";
import CategoriesPage from "./admin/CategoriesPage";

export default function App() {
  return (
    <Routes>
      {/* Admin dashboard: own layout, requires login */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Overview />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
      </Route>

      {/* Public storefront */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="events" element={<Events />} />
        <Route path="pre-order" element={<PreOrder />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
