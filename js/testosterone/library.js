/* Part Three — the levers, on the shared card component. */
import { CATEGORIES, LEVERS, TIERS } from "./levers-data.js";
import { createLibrary } from "../shared/library.js";

function toItem(l) {
  const category = CATEGORIES.find((c) => c.slug === l.category);
  const tier = TIERS.find((t) => t.slug === l.tier);
  return {
    name: l.name,
    category: l.category,
    tags: [l.tier],
    meta: `${category.name} · ${tier.name}`,
    chips: [l.effect, l.cost],
    summary: l.why,
    sections: [
      { label: "What to do", ol: l.steps },
      { label: "Caveats", ul: l.cues },
    ],
  };
}

export function initLeverLibrary() {
  createLibrary({
    mount: "#lever-library",
    countEl: "#lever-count",
    items: LEVERS.map(toItem),
    categories: CATEGORIES,
    tagGroup: { allLabel: "Any evidence level", options: TIERS },
    categoryEl: "#lever-categories",
    tagEl: "#lever-tiers",
    expandAllEl: "#lever-expand",
    noun: "levers",
  });
}
