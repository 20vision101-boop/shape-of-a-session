/* Exercise library — filterable cards, each expanding into full instructions.
   Cards are rendered from EXERCISES; the filter state lives here and nothing
   else reads it. */
import { CATEGORIES, EXERCISES, SCHOOLS } from "./exercise-data.js";

const state = {
  category: "all",
  school: "all",
  bodyweightOnly: false,
  expanded: new Set(),
};

function matches(ex) {
  if (state.category !== "all" && ex.category !== state.category) return false;
  if (state.school !== "all" && !ex.schools.includes(state.school)) return false;
  if (state.bodyweightOnly && !ex.bodyweight) return false;
  return true;
}

function slugFor(ex) {
  return ex.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function cardHtml(ex) {
  const slug = slugFor(ex);
  const open = state.expanded.has(slug);
  const category = CATEGORIES.find((c) => c.slug === ex.category);

  const steps = ex.steps.map((s) => `<li>${s}</li>`).join("");
  const cues = ex.cues.map((c) => `<li>${c}</li>`).join("");
  const badges = ex.schools
    .map((slug) => SCHOOLS.find((s) => s.slug === slug))
    .filter(Boolean)
    .map((s) => `<span class="tag school-tag" style="--school: ${s.color}">${s.name}</span>`)
    .join("");

  return `
    <article class="exercise-card${open ? " open" : ""}" data-slug="${slug}" data-category="${ex.category}">
      <button class="exercise-head" type="button" aria-expanded="${open}" aria-controls="detail-${slug}">
        <span class="exercise-title">
          <span class="exercise-name">${ex.name}</span>
          <span class="exercise-meta">${category.name} · ${ex.level}${ex.bodyweight ? " · no equipment needed" : ""}</span>
        </span>
        <span class="exercise-chevron" aria-hidden="true">▾</span>
      </button>

      <div class="exercise-summary">
        <span class="tag">${ex.prescription}</span>
        <span class="tag subtle">${ex.equipment}</span>
        ${badges}
      </div>

      <div class="exercise-detail" id="detail-${slug}" ${open ? "" : "hidden"}>
        <p class="exercise-why">${ex.why}</p>

        <p class="detail-label">Works</p>
        <p class="detail-text">${ex.focus}</p>

        <p class="detail-label">How to do it</p>
        <ol class="step-list">${steps}</ol>

        <p class="detail-label">Cues &amp; common mistakes</p>
        <ul class="cue-list">${cues}</ul>
      </div>
    </article>
  `;
}

function render() {
  const wrap = document.getElementById("exercise-library");
  const shown = EXERCISES.filter(matches);

  wrap.innerHTML = shown.length
    ? shown.map(cardHtml).join("")
    : `<p class="caption">Nothing matches that combination — try clearing the bodyweight filter.</p>`;

  document.getElementById("library-count").textContent =
    `Showing ${shown.length} of ${EXERCISES.length} movements. Click any card for the full instructions.`;

  wrap.querySelectorAll(".exercise-head").forEach((head) => {
    head.addEventListener("click", () => {
      const slug = head.closest(".exercise-card").dataset.slug;
      if (state.expanded.has(slug)) state.expanded.delete(slug);
      else state.expanded.add(slug);
      render();
    });
  });

  const expandBtn = document.getElementById("expand-all");
  const allOpen = shown.length > 0 && shown.every((ex) => state.expanded.has(slugFor(ex)));
  expandBtn.textContent = allOpen ? "Collapse all" : "Expand all";
  expandBtn.classList.toggle("active", allOpen);
}

function drawSchoolFilters() {
  const wrap = document.getElementById("school-filters");
  const options = [{ slug: "all", name: "Every school" }, ...SCHOOLS];

  wrap.innerHTML = options
    .map(
      (s) => `
      <button class="toggle-btn filter-chip school-chip${s.slug === state.school ? " active" : ""}"
              type="button" data-school="${s.slug}"
              ${s.color ? `style="--school: ${s.color}"` : ""}>${s.name}</button>
    `
    )
    .join("");

  wrap.querySelectorAll(".school-chip").forEach((chip) => {
    chip.addEventListener("click", () => setSchool(chip.dataset.school));
  });
}

/* Called by the school cards in Part Three as well as by the chips here. */
export function setSchool(slug) {
  state.school = slug;
  document
    .querySelectorAll("#school-filters .school-chip")
    .forEach((c) => c.classList.toggle("active", c.dataset.school === slug));
  render();
}

function drawCategoryFilters() {
  const wrap = document.getElementById("category-filters");
  const options = [{ slug: "all", name: "All" }, ...CATEGORIES];

  wrap.innerHTML = options
    .map(
      (c) => `
      <button class="toggle-btn filter-chip${c.slug === state.category ? " active" : ""}"
              type="button" data-category="${c.slug}">${c.name}</button>
    `
    )
    .join("");

  wrap.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.category = chip.dataset.category;
      wrap.querySelectorAll(".filter-chip").forEach((c) =>
        c.classList.toggle("active", c.dataset.category === state.category)
      );
      render();
    });
  });
}

export function initLibrary() {
  if (!document.getElementById("exercise-library")) return;

  drawCategoryFilters();
  drawSchoolFilters();

  const bwBtn = document.getElementById("bodyweight-toggle");
  bwBtn.addEventListener("click", () => {
    state.bodyweightOnly = !state.bodyweightOnly;
    bwBtn.classList.toggle("active", state.bodyweightOnly);
    render();
  });

  document.getElementById("expand-all").addEventListener("click", () => {
    const shown = EXERCISES.filter(matches);
    const allOpen = shown.every((ex) => state.expanded.has(slugFor(ex)));
    shown.forEach((ex) => {
      if (allOpen) state.expanded.delete(slugFor(ex));
      else state.expanded.add(slugFor(ex));
    });
    render();
  });

  render();
}
