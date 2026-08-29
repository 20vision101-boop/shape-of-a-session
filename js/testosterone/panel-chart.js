/* Part Two — the panel as reference bands rather than numbers.
   Bands are typical adult male reference intervals; assays and labs differ,
   so the band your own lab prints is the one that applies. The marker for
   "your value" appears once you enter numbers in Part Six. */
import { MARKERS } from "./levers-data.js";

let userValues = {};

function drawPanelChart() {
  const svg = document.getElementById("panel-chart");
  if (!svg) return;

  const W = 800, H = 400, M = { top: 40, right: 40, bottom: 40, left: 190 };
  const innerW = W - M.left - M.right;
  const rowH = (H - M.top - M.bottom) / MARKERS.length;

  const rows = MARKERS.map((m, i) => {
    const y = M.top + i * rowH;
    const barY = y + rowH * 0.22;
    const barH = rowH * 0.34;
    const xFor = (v) => M.left + (v / m.scaleMax) * innerW;

    const lowX = xFor(m.low);
    const highX = xFor(m.high);
    const value = userValues[m.name];
    const marker =
      value != null && Number.isFinite(value)
        ? `
        <line x1="${xFor(Math.min(value, m.scaleMax))}" y1="${barY - 8}"
              x2="${xFor(Math.min(value, m.scaleMax))}" y2="${barY + barH + 8}"
              stroke="#ffffff" stroke-width="2" />
        <text x="${xFor(Math.min(value, m.scaleMax))}" y="${barY - 13}" text-anchor="middle" class="zone-sub">you</text>
      `
        : "";

    return `
      <line x1="${M.left}" y1="${barY + barH / 2}" x2="${M.left + innerW}" y2="${barY + barH / 2}"
            stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      <rect x="${lowX}" y="${barY}" width="${highX - lowX}" height="${barH}" rx="5"
            fill="rgba(124,158,255,0.28)" stroke="#7c9eff" stroke-width="1" />
      <text x="${M.left - 14}" y="${barY + barH * 0.75}" text-anchor="end" class="zone-name">${m.name}</text>
      <text x="${lowX}" y="${barY + barH + 15}" class="zone-sub">${m.low}</text>
      <text x="${highX}" y="${barY + barH + 15}" text-anchor="end" class="zone-sub">${m.high} ${m.unit}</text>
      ${marker}
    `;
  }).join("");

  svg.innerHTML = `
    <text x="${M.left}" y="${M.top - 16}" class="axis-label">typical adult male reference band — your lab's range is the one that counts</text>
    ${rows}
  `;
}

/* Part Six calls this so entered values show up on the bands. */
export function setPanelValues(values) {
  userValues = values;
  drawPanelChart();
}

export function initPanelChart() {
  drawPanelChart();
  window.addEventListener("resize", drawPanelChart);
}
