import PageHero from "../components/PageHero";
import { whatsappLink } from "../utils/whatsapp";
import { CONTACT } from "../config";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Contact() {
  useDocumentMeta("Contact | HANI'S", "Reach HANI'S for cake, event and imported product inquiries.");

  // Your backend has no contact route, so the message is sent through WhatsApp.
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { name, email, message } = Object.fromEntries(new FormData(form).entries());
    window.open(
      whatsappLink(`Hello HANI'S, my name is ${name} (${email}).\n\n${message}`),
      "_blank",
    );
    form.reset();
  };

  return (
    <>
      <PageHero eyebrow="Get in touch" title="Contact us" />
      <section className="section">
        <div className="container contact-grid">
          <form className="contact-form" onSubmit={onSubmit}>
            <label><span>Name</span><input type="text" name="name" required /></label>
            <label><span>Email</span><input type="email" name="email" required /></label>
            <label><span>Message</span><textarea name="message" rows={5} required /></label>
            <button type="submit" className="button primary-button">
              Send via WhatsApp
            </button>
          </form>
          <div className="contact-details">
            <div className="detail-box"><strong>Phone</strong><p>{CONTACT.phone}</p></div>
            <div className="detail-box"><strong>Email</strong><p>{CONTACT.email}</p></div>
            <div className="detail-box"><strong>WhatsApp</strong><p>Fast order support</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
