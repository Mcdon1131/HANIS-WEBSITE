import PageHero from "../components/PageHero";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function About() {
  useDocumentMeta(
    "About | HANI'S",
    "Learn more about HANI'S cakes, events and carefully selected imported goods.",
  );

  return (
    <>
      <PageHero eyebrow="Our story" title="Made for special moments and everyday finds." />

      <section className="section">
        <div className="container content-grid">
          <div style={{padding: "15px"}}>
            <p>
              HANI'S brings cakes, event planning and carefully selected imported products
              together under one brand. We focus on thoughtful details, clear communication and
              making every order feel easy.
            </p>
            <p>
              From custom cakes and birthday surprises to weddings, parties and imported
              lifestyle finds, we help customers celebrate beautifully and shop with confidence.
            </p>
          </div>
          <div className="quote-card">
            <p>
              “We believe every celebration deserves care, and every order should feel simple and
              dependable.”
            </p>
          </div>
        </div>
      </section>

      <section className="section alt-bg">
        <div className="container stats-grid three-col">
          <div className="stat-card">
            <strong>Thoughtful</strong>
            <span>Cakes and events designed with care</span>
          </div>
          <div className="stat-card">
            <strong>Curated</strong>
            <span>Carefully selected imported finds</span>
          </div>
          <div className="stat-card">
            <strong>Customer-first</strong>
            <span>Supportive service and fast communication</span>
          </div>
        </div>
      </section>
    </>
  );
}
