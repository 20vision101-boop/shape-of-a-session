/* "Two doors into the muscle cell" — the insulin-dependent and
   contraction-mediated routes for GLUT4 translocation, drawn as one glowing
   SVG in the same idiom as the diagrams on the companion page. */
/* Note: the connector lines are vertical, so their bounding box has zero
   width — an objectBoundingBox filter on them renders nothing at all. The
   glow stays on the circles, which have a real box. */
function drawUptakeDiagram() {
  const svg = document.getElementById("uptake-diagram");
  if (!svg) return;

  const W = 520, H = 400;
  const cellY = 268;
  const nodeTop = 78, nodeGap = 58;

  const paths = [
    {
      color: "#7c9eff",
      x: 130,
      label: "Insulin path",
      steps: ["Meal → insulin", "Receptor signals", "GLUT4 moves out"],
      note: "blunted when insulin\nsensitivity is low",
    },
    {
      color: "#7cffb2",
      x: 390,
      label: "Contraction path",
      steps: ["Muscle contracts", "AMPK / calcium", "GLUT4 moves out"],
      note: "works without\ninsulin at all",
    },
  ];

  const columns = paths
    .map((p) => {
      const nodes = p.steps
        .map((s, i) => {
          const y = nodeTop + i * nodeGap;
          const next = nodeTop + (i + 1) * nodeGap;
          const connector =
            i < p.steps.length - 1
              ? `<line x1="${p.x}" y1="${y + 12}" x2="${p.x}" y2="${next - 38}"
                   stroke="${p.color}" stroke-width="2" opacity="0.55"
                   marker-end="url(#uptake-arrow-${p.color.slice(1)})" />`
              : "";
          return `
            <circle cx="${p.x}" cy="${y}" r="7" fill="#0a0a0f" stroke="${p.color}" stroke-width="2" filter="url(#uptake-glow)" />
            <text x="${p.x}" y="${y - 22}" text-anchor="middle" class="loop-label">${s}</text>
            ${connector}
          `;
        })
        .join("");

      const noteLines = p.note
        .split("\n")
        .map((line, i) => `<tspan x="${p.x}" dy="${i === 0 ? 0 : 13}">${line}</tspan>`)
        .join("");

      return `
        <text x="${p.x}" y="30" text-anchor="middle" class="uptake-heading" fill="${p.color}">${p.label}</text>
        ${nodes}
        <line x1="${p.x}" y1="${nodeTop + 2 * nodeGap + 12}" x2="${p.x}" y2="${cellY - 34}"
              stroke="${p.color}" stroke-width="2.5" opacity="0.7"
              marker-end="url(#uptake-arrow-${p.color.slice(1)})" />
        <text x="${p.x}" y="${cellY + 62}" text-anchor="middle" class="loop-sub">${noteLines}</text>
      `;
    })
    .join("");

  const markers = paths
    .map(
      (p) => `
      <marker id="uptake-arrow-${p.color.slice(1)}" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${p.color}" />
      </marker>
    `
    )
    .join("");

  svg.innerHTML = `
    <defs>
      ${markers}
      <filter id="uptake-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <linearGradient id="cell-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#7c9eff" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#7cffb2" stop-opacity="0.18" />
      </linearGradient>
    </defs>

    ${columns}

    <rect x="40" y="${cellY - 30}" width="440" height="60" rx="14"
          fill="url(#cell-grad)" stroke="rgba(255,255,255,0.16)" stroke-width="1.5" />
    <text x="260" y="${cellY - 2}" text-anchor="middle" class="converge-center">MUSCLE CELL</text>
    <text x="260" y="${cellY + 18}" text-anchor="middle" class="loop-sub">glucose enters, refills glycogen</text>

    <text x="260" y="${H - 22}" text-anchor="middle" class="loop-sub">Both doors open the same transporter. Training keeps the second one working.</text>
  `;
}

export function initUptakeDiagram() {
  drawUptakeDiagram();
  window.addEventListener("resize", drawUptakeDiagram);
}
