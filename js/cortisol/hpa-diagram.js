/* The HPA axis as a loop: hypothalamus → pituitary → adrenal → cortisol,
   with cortisol feeding back to shut the top of the chain off again.
   Same drawing idiom as the diagrams on the other pages — note that any
   filter on a straight vertical line needs a non-zero bounding box, so the
   glow stays on the nodes. */
function drawHpaDiagram() {
  const svg = document.getElementById("hpa-diagram");
  if (!svg) return;

  const W = 520, H = 420;
  const x = 210;
  const nodes = [
    { label: "Hypothalamus", sub: "releases CRH", y: 60, color: "#7c9eff" },
    { label: "Pituitary", sub: "releases ACTH", y: 150, color: "#7c9eff" },
    { label: "Adrenal cortex", sub: "releases cortisol", y: 240, color: "#ffd27c" },
    { label: "The body", sub: "glucose up, immunity down, alertness up", y: 330, color: "#ff9e7c" },
  ];

  const chain = nodes
    .map((n, i) => {
      const next = nodes[i + 1];
      const line = next
        ? `<line x1="${x}" y1="${n.y + 10}" x2="${x}" y2="${next.y - 26}"
             stroke="${n.color}" stroke-width="2" opacity="0.6" marker-end="url(#hpa-arrow)" />`
        : "";
      return `
        <circle cx="${x}" cy="${n.y}" r="8" fill="#0a0a0f" stroke="${n.color}" stroke-width="2" filter="url(#hpa-glow)" />
        <text x="${x + 22}" y="${n.y - 2}" class="loop-label">${n.label}</text>
        <text x="${x + 22}" y="${n.y + 15}" class="loop-sub">${n.sub}</text>
        ${line}
      `;
    })
    .join("");

  svg.innerHTML = `
    <defs>
      <marker id="hpa-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c9eff" />
      </marker>
      <marker id="hpa-arrow-back" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7cffb2" />
      </marker>
      <filter id="hpa-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    ${chain}

    <path d="M ${x - 18} 246 C 90 240, 70 120, ${x - 20} 62"
          fill="none" stroke="#7cffb2" stroke-width="2" stroke-dasharray="5 5"
          opacity="0.8" marker-end="url(#hpa-arrow-back)" />
    <text x="66" y="160" class="loop-sub">negative</text>
    <text x="66" y="174" class="loop-sub">feedback</text>

    <text x="${W / 2}" y="${H - 20}" text-anchor="middle" class="loop-sub">
      Cortisol switches its own signal off. Chronic stress is that brake losing its grip.
    </text>
  `;
}

export function initHpaDiagram() {
  drawHpaDiagram();
  window.addEventListener("resize", drawHpaDiagram);
}
