import { whatsappLink } from "../utils/whatsapp";

export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}
