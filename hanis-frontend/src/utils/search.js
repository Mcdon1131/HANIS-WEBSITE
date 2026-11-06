// Home page search. Matches the start of any word in the item's name.
// "cl", "cloth", "clothes" etc. also match clothing-related words.

const CLOTHING = [
  "cloth", "clothes", "clothing", "gown", "gowns", "wear", "wears",
  "jersey", "jerseys", "hoodie", "hoodies",
];

const SYNONYMS = {
  cl: CLOTHING,
  cloth: CLOTHING,
  clothes: CLOTHING,
  clothing: CLOTHING,
  jersey: ["jersey", "jerseys"],
  jerseys: ["jersey", "jerseys"],
};

export const isClothingQuery = (query) =>
  /^(cl|cloth|clothes|clothing)$/.test(query.trim().toLocaleLowerCase());

export function filterItems(items, category, query) {
  const groups = query
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => SYNONYMS[term] || [term]);

  return items.filter((item) => {
    if (category !== "all" && item.group !== category) return false;
    const words = item.name.toLocaleLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    return groups.every((group) =>
      group.some((term) => words.some((word) => word.startsWith(term))),
    );
  });
}
