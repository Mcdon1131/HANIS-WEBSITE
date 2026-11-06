import PageHero from "../components/PageHero";
import { services } from "../content/services";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { whatsappLink } from "../utils/whatsapp";

export default function Events() {
  useDocumentMeta(
    "Events | HANI'S",
    "Explore HANI'S event planning and birthday surprise services.",
  );

  return (
    <>
      <PageHero eyebrow="Celebrate beautifully" title="Event Planning & Surprises" />
      <section className="section">
        <div className="container">
          <div className="market-event-grid">
            {services.map((s) => (
              <article className="market-event-card" id={s.id} key={s.id}>
                <img src={s.image} alt={s.alt} />
                <div>
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h2>{s.name}</h2>
                  <p>{s.pageDescription || s.description}</p>
                  <a
                    className="button primary-button"
                    href={whatsappLink(`Hello HANI'S, I would like to enquire about ${s.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
