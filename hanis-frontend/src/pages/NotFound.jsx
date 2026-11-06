import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function NotFound() {
  useDocumentMeta("Page not found | HANI'S");
  return (
    <>
      <PageHero eyebrow="404" title="Page not found" />
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <h3>We couldn't find that page</h3>
            <Link to="/" className="button primary-button">Back to home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
