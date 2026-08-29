/* The movement library — an adapter that maps EXERCISES onto the shared
   card-library component in js/shared/library.js. */
import { CATEGORIES, EXERCISES, SCHOOLS } from "./exercise-data.js";
import { createLibrary } from "../shared/library.js";

let library = null;

function toItem(ex) {
  const category = CATEGORIES.find((c) => c.slug === ex.category);
  return {
    name: ex.name,
    category: ex.category,
    tags: ex.schools,
    meta: [category.name, ex.level, ex.evidence, ex.bodyweight ? "no equipment needed" : null]
      .filter(Boolean)
      .join(" · "),
    chips: [ex.prescription, ex.equipment],
    summary: ex.why,
    sections: [
      { label: "Works", text: ex.focus },
      { label: "How to do it", ol: ex.steps },
      { label: "Cues &amp; common mistakes", ul: ex.cues },
    ],
    bodyweight: ex.bodyweight,
  };
}

export function initLibrary() {
  library = createLibrary({
    mount: "#exercise-library",
    countEl: "#library-count",
    items: EXERCISES.map(toItem),
    categories: CATEGORIES,
    tagGroup: { allLabel: "Every school", options: SCHOOLS },
    categoryEl: "#category-filters",
    tagEl: "#school-filters",
    expandAllEl: "#expand-all",
    toggles: [{ el: "#bodyweight-toggle", predicate: (i) => i.bodyweight }],
    noun: "movements",
  });
}

/* Called by the school cards in Part Three. */
export function setSchool(slug) {
  library?.setTag(slug);
}
