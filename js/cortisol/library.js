/* Part Four — the practice library, on the shared card component. */
import { CATEGORIES, PRACTICES, WINDOWS } from "./practices-data.js";
import { createLibrary } from "../shared/library.js";

function toItem(p) {
  const category = CATEGORIES.find((c) => c.slug === p.category);
  return {
    name: p.name,
    category: p.category,
    tags: p.windows,
    meta: `${category.name} · ${p.evidence}`,
    chips: [p.dose, p.equipment],
    summary: p.why,
    sections: [
      { label: "How to do it", ol: p.steps },
      { label: "Notes &amp; caveats", ul: p.cues },
    ],
  };
}

export function initPracticeLibrary() {
  createLibrary({
    mount: "#practice-library",
    countEl: "#practice-count",
    items: PRACTICES.map(toItem),
    categories: CATEGORIES,
    tagGroup: { allLabel: "Any time of day", options: WINDOWS },
    categoryEl: "#practice-categories",
    tagEl: "#practice-windows",
    expandAllEl: "#practice-expand",
    noun: "practices",
  });
}
