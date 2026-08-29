/* Part Three — the four traditions this page borrows from.
   Clicking a school scrolls to the library and filters it to that school's
   movements; `onSelect` is supplied by main.js so this module doesn't need to
   know how the library stores its state. */
import { SCHOOLS, EXERCISES } from "./exercise-data.js";

function countFor(slug) {
  return EXERCISES.filter((e) => e.schools.includes(slug)).length;
}

export function initSchools(onSelect) {
  const wrap = document.getElementById("schools");
  if (!wrap) return;

  wrap.innerHTML = SCHOOLS.map(
    (s) => `
    <article class="school-card" data-school="${s.slug}" style="--school: ${s.color}">
      <header class="school-head">
        <h3>${s.name}</h3>
        <p class="school-lineage">${s.lineage}</p>
      </header>
      <p class="school-thesis">${s.thesis}</p>

      <p class="detail-label">How it trains</p>
      <ul class="cue-list">${s.signature.map((i) => `<li>${i}</li>`).join("")}</ul>

      <dl class="school-verdict">
        <dt>Best at</dt><dd>${s.bestAt}</dd>
        <dt>Blind spot</dt><dd>${s.blindSpot}</dd>
      </dl>

      <button class="toggle-btn school-jump" type="button" data-school="${s.slug}">
        See its ${countFor(s.slug)} movements →
      </button>
    </article>
  `
  ).join("");

  wrap.querySelectorAll(".school-jump").forEach((btn) => {
    btn.addEventListener("click", () => {
      onSelect(btn.dataset.school);
      document.getElementById("part-4")?.scrollIntoView({ behavior: "smooth" });
    });
  });
}
