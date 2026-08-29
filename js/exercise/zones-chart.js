/* Training intensity zones (SVG, no library).
   ILLUSTRATIVE — the five-zone %HRmax model is one of several in common use
   (Coggan power zones and lactate-threshold models draw the lines elsewhere).
   Percentages are of estimated maximum heart rate. */
const zones = [
  {
    n: 1, name: "Recovery", range: [50, 60], color: "#7cffb2",
    fuel: "Almost entirely fat", feel: "Easy walking · could do this all day",
  },
  {
    n: 2, name: "Aerobic base", range: [60, 70], color: "#7c9eff",
    fuel: "Mostly fat", feel: "Full sentences, no desire to chat",
  },
  {
    n: 3, name: "Tempo", range: [70, 80], color: "#ffd27c",
    fuel: "Mixed fat and glycogen", feel: "Short sentences · the grey zone",
  },
  {
    n: 4, name: "Threshold", range: [80, 90], color: "#ff9e7c",
    fuel: "Mostly glycogen", feel: "A few words · sustainable ~30-60 min",
  },
  {
    n: 5, name: "VO₂ max", range: [90, 100], color: "#ff7c92",
    fuel: "Glycogen, fast", feel: "No talking · minutes at most",
  },
];

/* Roughly where the weekly volume should land, as a share of total time. */
const weeklyShare = { 1: 5, 2: 65, 3: 5, 4: 15, 5: 10 };

function drawZonesChart() {
  const svg = document.getElementById("zones-chart");
  if (!svg) return;

  const W = 800, H = 440, M = { top: 40, right: 132, bottom: 46, left: 186 };
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;

  const pctMin = 50, pctMax = 100;
  const xFor = (pct) => M.left + ((pct - pctMin) / (pctMax - pctMin)) * innerW;
  const rowH = innerH / zones.length;

  const xTicks = [50, 60, 70, 80, 90, 100];

  const grid = xTicks
    .map(
      (v) => `
      <line x1="${xFor(v)}" y1="${M.top - 8}" x2="${xFor(v)}" y2="${M.top + innerH}"
            stroke="rgba(255,255,255,0.06)" stroke-width="1" />
      <text x="${xFor(v)}" y="${M.top + innerH + 22}" text-anchor="middle" class="axis-label">${v}%</text>
    `
    )
    .join("");

  const rows = zones
    .map((z, i) => {
      // Zone 1 is drawn at the top of the chart, so rows run high-to-low.
      const y = M.top + (zones.length - 1 - i) * rowH;
      const barY = y + rowH * 0.18;
      const barH = rowH * 0.5;
      const x = xFor(z.range[0]);
      const w = xFor(z.range[1]) - x;
      const share = weeklyShare[z.n];

      return `
        <rect x="${x}" y="${barY}" width="${w}" height="${barH}" rx="6"
              fill="${z.color}" opacity="0.72" />
        <text x="${M.left - 14}" y="${barY + barH * 0.45}" text-anchor="end" class="zone-name">Zone ${z.n} · ${z.name}</text>
        <text x="${M.left - 14}" y="${barY + barH * 0.45 + 15}" text-anchor="end" class="zone-sub">${z.fuel}</text>
        <text x="${x + w + 12}" y="${barY + barH * 0.45}" class="zone-sub">${share}% of the week</text>
        <text x="${x + 10}" y="${barY + barH + 15}" class="zone-feel">${z.feel}</text>
      `;
    })
    .join("");

  svg.innerHTML = `
    <rect x="${xFor(60)}" y="${M.top - 8}" width="${xFor(70) - xFor(60)}" height="${innerH + 8}"
          fill="rgba(124,158,255,0.06)" />
    ${grid}
    <text x="${M.left}" y="${M.top - 18}" class="axis-label">% of estimated max heart rate</text>
    ${rows}
  `;
}

export function initZonesChart() {
  drawZonesChart();
  window.addEventListener("resize", drawZonesChart);
}
