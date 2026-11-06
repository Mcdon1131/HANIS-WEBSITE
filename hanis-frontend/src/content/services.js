// Services are enquiry-only (no cart), so they live in the frontend.
// If you'd rather manage them from your backend, replace this with an api call.
// Images are served from /public/order hanis/

export const services = [
  {
    id: "event-planning",
    name: "Event Planning",
    group: "events",
    image: "/order hanis/dn.jpeg",
    alt: "HANI'S event planning and celebration service",
    description:
      "Professional planning and coordination for weddings, birthdays, parties and other memorable occasions.",
    eyebrow: "HANI'S Events",
  },
  {
    id: "birthday-packages",
    name: "Birthday Surprise Packages",
    group: "birthday",
    image: "/order hanis/1000.jpeg",
    alt: "Birthday cake and treats package",
    description:
      "Thoughtful surprise packages including cakes, money bouquets, gifts and beautifully arranged birthday experiences.",
    eyebrow: "Make their day",
  },
  {
    id: "money-bouquets",
    name: "Money Bouquets",
    group: "bouquets",
    image: "/order hanis/bd.jpeg",
    alt: "A birthday celebration arranged by HANI'S",
    description:
      "Thoughtful surprise packages including cakes, money bouquets, gifts and beautifully arranged birthday experiences.",
    // The Events page uses slightly different wording for this one:
    pageDescription:
      "Money bouquets are available as part of HANI'S birthday surprises. Contact us to discuss an arrangement.",
    eyebrow: "A thoughtful gift",
  },
].map((s) => ({ ...s, source: "service", price: 0, category: s.group }));
