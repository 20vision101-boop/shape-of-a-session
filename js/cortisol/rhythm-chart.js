/* Diurnal cortisol curves (SVG, no library).
   ILLUSTRATIVE shapes, not measurements. They reflect well-documented
   qualitative patterns: a sharp rise in the 30-45 min after waking (the
   cortisol awakening response), a long decline through the day, and a nadir
   around midnight — against two patterns commonly seen alongside chronic
   stress and short sleep. Salivary cortisol in nmol/L on a 24h clock. */
const series = [
  {
    name: "A healthy rhythm",
    color: "#7cffb2",
    points: [
      [0, 2], [3, 2], [6, 8], [6.5, 16], [7, 19], [8, 16], [10, 12],
      [12, 9], [15, 6], [18, 4], [21, 3], [24, 2],
    ],
  },
  {
    name: "Flattened slope",
    color: "#ffd27c",
    points: [
      [0, 5], [3, 5], [6, 7], [6.5, 9], [7, 10], [8, 10], [10, 9],
      [12, 8], [15, 7], [18, 7], [21, 6], [24, 5],
    ],
  },
  {
    name: "Evening elevation",
    color: "#ff7c92",
    points: [
      [0, 4], [3, 4], [6, 8], [6.5, 14], [7, 16], [8, 14], [10, 11],
      [12, 9], [15, 8], [18, 9], [21, 10], [24, 8],
    ],
  },
];

function drawRhythmChart() {
  const svg = document.getElementById("rhythm-chart");
  if (!svg) return;

  const W = 800, H = 420, M = { top: 46, right: 30, bottom: 58, left: 58 };
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;

  const yMax = 21;
  const xFor = (h) => M.left + (h / 24) * innerW;
  const yFor = (v) => M.top + innerH - (v / yMax) * innerH;

  const xTicks = [0, 4, 8, 12, 16, 20, 24];
  const yTicks = [0, 5, 10, 15, 20];
  const label = (h) => (h === 24 ? "midnight" : h === 0 ? "midnight" : h === 12 ? "noon" : `${h}:00`);

  const grid = yTicks
    .map(
      (v) => `
      <line x1="${M.left}" y1="${yFor(v)}" x2="${W - M.right}" y2="${yFor(v)}"
            stroke="rgba(255,255,255,0.06)" stroke-width="1" />
      <text x="${M.left - 10}" y="${yFor(v) + 4}" text-anchor="end" class="axis-label">${v}</text>
    `
    )
    .join("");

  const xLabels = xTicks
    .map(
      (h) => `<text x="${xFor(h)}" y="${H - M.bottom + 24}" text-anchor="middle" class="axis-label">${label(h)}</text>`
    )
    .join("");

  const paths = series
    .map((s) => {
      const d = s.points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p[0])} ${yFor(p[1])}`)
        .join(" ");
      const peak = s.points.reduce((a, b) => (b[1] > a[1] ? b : a));
      return `
        <path d="${d}" fill="none" stroke="${s.color}" stroke-width="2.5" />
        <circle cx="${xFor(peak[0])}" cy="${yFor(peak[1])}" r="4" fill="${s.color}" />
      `;
    })
    .join("");

  const legend = series
    .map(
      (s, i) => `
      <g transform="translate(${M.left + i * 230}, ${M.top - 26})">
        <rect width="12" height="12" rx="3" fill="${s.color}" />
        <text x="18" y="10" class="legend-label">${s.name}</text>
      </g>
    `
    )
    .join("");

  svg.innerHTML = `
    <rect x="${xFor(6)}" y="${M.top}" width="${xFor(8) - xFor(6)}" height="${innerH}"
          fill="rgba(255,210,124,0.07)" />
    <text x="${xFor(7)}" y="${M.top + 14}" text-anchor="middle" class="zone-sub">waking window</text>
    ${grid}
    ${xLabels}
    <text x="${M.left - 46}" y="${M.top + 4}" class="axis-label">nmol/L</text>
    ${paths}
    ${legend}
  `;
}

export function initRhythmChart() {
  drawRhythmChart();
  window.addEventListener("resize", drawRhythmChart);
}
