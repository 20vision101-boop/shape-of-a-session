/* Part Three — what moves the curve, and which way. */
import { INPUTS } from "./practices-data.js";

const ARROWS = {
  up: { glyph: "↑", cls: "up", label: "raises cortisol" },
  down: { glyph: "↓", cls: "down", label: "lowers cortisol" },
  flat: { glyph: "→", cls: "flat", label: "flattens the slope" },
};

export function initInputsGrid() {
  const wrap = document.getElementById("inputs-grid");
  if (!wrap) return;

  wrap.innerHTML = INPUTS.map((i) => {
    const arrow = ARROWS[i.direction];
    return `
      <article class="input-card ${i.wanted ? "wanted" : "unwanted"}">
        <header class="input-head">
          <span class="input-arrow ${arrow.cls}" aria-hidden="true">${arrow.glyph}</span>
          <h3>${i.name}</h3>
        </header>
        <p class="input-effect">${arrow.label} · ${i.wanted ? "this is the point" : "worth reducing"}</p>
        <p class="input-detail">${i.detail}</p>
      </article>
    `;
  }).join("");
}
