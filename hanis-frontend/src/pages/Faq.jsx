import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { faqs } from "../content/faqs";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Faq() {
  useDocumentMeta(
    "FAQ | HANI'S",
    "Frequently asked questions for shipping, orders, and pre-order support.",
  );

  return (
    <>
      <PageHero eyebrow="Support hub" title="Frequently asked questions" />
      <section className="section">
        <div className="container faq-page-list">
          {faqs.map((item) => (
            <Reveal className="faq-item faq-accordion" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
