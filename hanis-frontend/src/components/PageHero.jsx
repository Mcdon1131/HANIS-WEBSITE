export default function PageHero({ eyebrow, title }) {
  return (
    <section className="page-hero slim-hero">
      <div className="container narrow-container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
    </section>
  );
}
