/* The HPG axis, drawn as the same self-limiting loop as the cortisol page's
   HPA diagram — deliberately, because the parallel is the point: both axes
   are pituitary-driven and both shut themselves off. Exogenous testosterone
   suppresses the loop at the top, which is why TRT costs fertility. */
function drawHpgDiagram() {
  const svg = document.getElementById("hpg-diagram");
  if (!svg) return;

  const W = 520, H = 420;
  const x = 200;
  const nodes = [
    { label: "Hypothalamus", sub: "pulses GnRH", y: 60, color: "#79dce8" },
    { label: "Pituitary", sub: "releases LH and FSH", y: 150, color: "#79dce8" },
    { label: "Testes", sub: "LH → testosterone · FSH → sperm", y: 240, color: "#ffd27c" },
    { label: "Blood", sub: "98% bound to SHBG and albumin", y: 330, color: "#ff9e7c" },
  ];

  const chain = nodes
    .map((n, i) => {
      const next = nodes[i + 1];
      const line = next
        ? `<line x1="${x}" y1="${n.y + 10}" x2="${x}" y2="${next.y - 26}"
             stroke="${n.color}" stroke-width="2" opacity="0.6" marker-end="url(#hpg-arrow)" />`
        : "";
      return `
        <circle cx="${x}" cy="${n.y}" r="8" fill="#04101f" stroke="${n.color}" stroke-width="2" filter="url(#hpg-glow)" />
        <text x="${x + 22}" y="${n.y - 2}" class="loop-label">${n.label}</text>
        <text x="${x + 22}" y="${n.y + 15}" class="loop-sub">${n.sub}</text>
        ${line}
      `;
    })
    .join("");

  svg.innerHTML = `
    <defs>
      <marker id="hpg-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#79dce8" />
      </marker>
      <marker id="hpg-arrow-back" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7cffb2" />
      </marker>
      <filter id="hpg-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    ${chain}

    <path d="M ${x - 18} 246 C 80 240, 60 120, ${x - 20} 62"
          fill="none" stroke="#7cffb2" stroke-width="2" stroke-dasharray="5 5"
          opacity="0.8" marker-end="url(#hpg-arrow-back)" />
    <text x="56" y="160" class="loop-sub">negative</text>
    <text x="56" y="174" class="loop-sub">feedback</text>

    <text x="${W / 2}" y="${H - 34}" text-anchor="middle" class="loop-sub">
      LH high with low testosterone points at the testes (primary).
    </text>
    <text x="${W / 2}" y="${H - 18}" text-anchor="middle" class="loop-sub">
      LH low or normal points upstream (secondary) — and that's the treatable kind.
    </text>
  `;
}

export function initHpgDiagram() {
  drawHpgDiagram();
  window.addEventListener("resize", drawHpgDiagram);
}
