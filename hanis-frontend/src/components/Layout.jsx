import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import CategoryNav from "./CategoryNav";
import Footer from "./Footer";
import Loader from "./Loader";
import CartToast from "./CartToast";
import WhatsAppFloat from "./WhatsAppFloat";

// Wraps every page: header, category bar, footer, loader, toast, WhatsApp button.
export default function Layout() {
  const { pathname } = useLocation();

  // the CSS is scoped to these two body classes
  useEffect(() => {
    document.body.classList.add("marketplace-page", "unified-page");
    return () => document.body.classList.remove("marketplace-page", "unified-page");
  }, []);

  // new page -> start at the top (query-string changes, e.g. search, don't scroll)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Loader />
      <Header />
      <CategoryNav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartToast />
    </>
  );
}
