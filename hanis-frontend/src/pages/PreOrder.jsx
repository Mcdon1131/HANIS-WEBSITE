import PageHero from "../components/PageHero";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const RULES = [
  {
    title: "Shipping rules",
    points: [
      "Air shipping takes 7 to 10 days",
      "Sea shipping takes 45 to 60 days",
      "Extended delays may go up to 90 days depending on logistics",
    ],
  },
  {
    title: "Payment rules",
    points: [
      "100% payment is required for product purchase",
      "For estimated shipping, 70% upfront is required",
      "Refund is issued if shipping cost is lower than estimate",
      "Customer pays the remaining balance if shipping cost is higher",
    ],
  },
  {
    title: "Stock & refunds",
    points: [
      "Stock is kept for 2 weeks after arrival",
      "Refunds are only available if the product cannot be found or admin approves",
      "All cases are reviewed individually before final approval",
    ],
  },
];

export default function PreOrder() {
  useDocumentMeta(
    "Pre-order | HANI'S Importation",
    "Review HANI'S Importation pre-order rules, shipping timelines, and payment policies.",
  );

  return (
    <>
      <PageHero eyebrow="Order ahead" title="Pre-order information" />
      <section className="section">
        <div className="container rules-layout">
          {RULES.map((rule) => (
            <div className="rule-card" key={rule.title}>
              <h3>{rule.title}</h3>
              <ul>
                {rule.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
