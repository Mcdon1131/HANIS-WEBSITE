import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import MarketCard from "../components/MarketCard";
import ProductDialog from "../components/ProductDialog";
import { ErrorState, Loading } from "../components/Status";
import { CATEGORY_NAMES } from "../config";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useMarketplace } from "../hooks/useMarketplace";
import { filterItems, isClothingQuery } from "../utils/search";

// The default (unfiltered) home page is made of these sections, top to bottom.
const SECTIONS = [
  { group: "featured", eyebrow: "Picked for you", title: "Featured Products", seeAll: "Browse all", target: "all" },
  { group: "cakes", eyebrow: "Made for your sweetest moments", title: "Explore Our Cakes" },
  { group: "imports", eyebrow: "Carefully selected finds", title: "Imported Products" },
  { group: "events", eyebrow: "Celebrate beautifully", title: "Event Planning Services" },
  { group: "birthday", eyebrow: "Thoughtful surprises", title: "Birthday Surprise Packages" },
  { group: "bouquets", eyebrow: "Make their day memorable", title: "Money Bouquets" },
];

export default function Home() {
  useDocumentMeta(
    "HANI'S | Cakes, Events & Imports",
    "Discover HANI'S cakes, event planning and carefully selected imported products, all in one place.",
  );

  const { items, loading, error, reload } = useMarketplace();
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const resultsRef = useRef(null);

  // ---- what to show is decided entirely by the URL: /?category=cakes&search=cup ----
  const categoryParam = params.get("category");
  const query = (params.get("search") ?? "").trim();
  const validCategory = CATEGORY_NAMES[categoryParam] ? categoryParam : null;
  const showResults = Boolean(validCategory || query);

  let category = validCategory || "all";
  if (category === "all" && isClothingQuery(query)) category = "imports";

  const results = useMemo(
    () => (showResults ? filterItems(items, category, query) : []),
    [items, showResults, category, query],
  );

  // scroll to the results when asked (search submit, "See all")
  useEffect(() => {
    if (location.state?.scrollToResults && showResults) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.key, showResults]); // eslint-disable-line react-hooks/exhaustive-deps

  const seeAll = (target) => setParams({ category: target }, { state: { scrollToResults: true } });

  // ---- default sections ----
  const imports = items.filter((i) => i.group === "imports");
  const cakes = items.filter((i) => i.group === "cakes");
  const sectionItems = {
    // uses a `featured` flag if your products ever get one, otherwise the newest imports
    featured: [
      ...(imports.some((i) => i.featured) ? imports.filter((i) => i.featured) : imports).slice(0, 6),
      ...cakes.slice(0, 4),
    ],
    cakes,
    imports,
    events: items.filter((i) => i.group === "events"),
    birthday: items.filter((i) => i.group === "birthday"),
    bouquets: items.filter((i) => i.group === "bouquets"),
  };

  return (
    <>
      <section className="container marketplace-promo" aria-label="HANI'S promotion">
        <div>
          <span className="promo-kicker">A little something for every occasion</span>
          <strong>Shop HANI'S cakes, celebrations & imported finds</strong>
        </div>
        <Link to="/events">
          Discover our services <span aria-hidden="true">→</span>
        </Link>
      </section>

      <div className="container marketplace-content">
        {error && <ErrorState error={error} onRetry={reload} />}
        {loading && <Loading />}

        {!showResults &&
          SECTIONS.map((s, index) => {
            const list = sectionItems[s.group];
            if (!list.length) return null;
            const Heading = index === 0 ? "h1" : "h2";
            return (
              <section className="market-section" key={s.group}>
                <div className="market-section-heading">
                  <div>
                    <span className="market-eyebrow">{s.eyebrow}</span>
                    <Heading>{s.title}</Heading>
                  </div>
                  <button type="button" className="market-see-all" onClick={() => seeAll(s.target || s.group)}>
                    {s.seeAll || "See All"} <span aria-hidden="true">→</span>
                  </button>
                </div>
                <div className="market-product-grid">
                  {list.map((item, i) => (
                    <MarketCard
                      key={`${item.source}:${item.id}`}
                      item={item}
                      onView={setActiveItem}
                      // only the first 8 imports show in the default section (see .is-overflow in the CSS)
                      className={s.group === "imports" && i >= 8 ? "is-overflow" : ""}
                    />
                  ))}
                </div>
              </section>
            );
          })}

        {showResults && !loading && (
          <section className="market-section market-results" ref={resultsRef}>
            <div className="market-section-heading">
              <div>
                <span className="market-eyebrow">
                  {query ? `Showing matches for “${query}”` : "Browse HANI'S collection"}
                </span>
                <h2>{query ? "Search Results" : CATEGORY_NAMES[category]}</h2>
              </div>
              <button type="button" className="market-see-all" onClick={() => setParams({})}>
                Clear filters
              </button>
            </div>
            <div className="market-product-grid">
              {results.map((item) => (
                <MarketCard key={`${item.source}:${item.id}`} item={item} onView={setActiveItem} />
              ))}
            </div>
            {results.length === 0 && (
              <p className="market-empty">No matches found. Try a different search or category.</p>
            )}
          </section>
        )}
      </div>

      <ProductDialog item={activeItem} onClose={() => setActiveItem(null)} />
    </>
  );
}
