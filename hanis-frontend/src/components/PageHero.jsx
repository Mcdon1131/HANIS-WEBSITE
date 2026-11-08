export default function PageHero({ eyebrow, title }) {
  return (
    <section className="page-hero slim-hero">
      <div style={{padding: "0 10px 0 10px"}} className="container narrow-container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
    </section>
  );
}
