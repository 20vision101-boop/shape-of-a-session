/* Part Four — the shape of an actual clinical workup, drawn as a flow.
   This is a simplified sketch of the standard sequence (confirm, localise,
   look for reversible causes) so you can recognise whether the care you're
   getting resembles it. It is not a protocol to run on yourself. */
const BOX_W = 300, BOX_H = 52;

function box(x, y, title, sub, color, w = BOX_W) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${BOX_H}" rx="10"
            fill="rgba(255,255,255,0.02)" stroke="${color}" stroke-width="1.5" />
      <text x="${x + w / 2}" y="${y + 21}" text-anchor="middle" class="loop-label">${title}</text>
      <text x="${x + w / 2}" y="${y + 38}" text-anchor="middle" class="loop-sub">${sub}</text>
    </g>
  `;
}

function arrow(x1, y1, x2, y2, color = "#7c9eff") {
  /* Nudge perfectly vertical arrows off-axis by a hair: a zero-width
     bounding box makes some renderers drop the marker. */
  const dx = x1 === x2 ? 0.01 : 0;
  return `<line x1="${x1}" y1="${y1}" x2="${x2 + dx}" y2="${y2}" stroke="${color}"
            stroke-width="1.8" opacity="0.65" marker-end="url(#flow-arrow)" />`;
}

function drawWorkupDiagram() {
  const svg = document.getElementById("workup-diagram");
  if (!svg) return;

  const W = 760, H = 560;
  const cx = W / 2;
  const left = cx - BOX_W / 2;

  svg.innerHTML = `
    <defs>
      <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c9eff" />
      </marker>
    </defs>

    ${box(left, 10, "Symptoms that actually matter", "low libido, morning erections gone, fatigue, mood, muscle loss", "#7c9eff")}
    ${arrow(cx, 62, cx, 86)}

    ${box(left, 90, "Total testosterone, before 10am", "fasting, and not during an acute illness", "#7c9eff")}
    ${arrow(cx, 142, cx, 166)}

    ${box(left, 170, "Repeat it on a second morning", "single low readings are common and often wrong", "#7c9eff")}
    ${arrow(cx, 222, cx, 250)}

    ${box(left, 254, "LH and FSH — where is the fault?", "this is the branch that decides everything after", "#ffd27c")}

    <line x1="${cx}" y1="306" x2="${cx}" y2="326" stroke="#ffd27c" stroke-width="1.8" opacity="0.65" />
    <line x1="180" y1="326" x2="580" y2="326" stroke="#ffd27c" stroke-width="1.8" opacity="0.65" />
    ${arrow(180, 326, 180, 352, "#ffd27c")}
    ${arrow(580, 326, 580, 352, "#ffd27c")}

    ${box(40, 356, "LH high → primary", "the testes aren't responding", "#ff9e7c", 280)}
    ${box(440, 356, "LH low or normal → secondary", "the signal from above is the problem", "#7cffb2", 280)}

    ${arrow(180, 408, 180, 436, "#ff9e7c")}
    ${arrow(580, 408, 580, 436, "#7cffb2")}

    ${box(40, 440, "Karyotype, testicular causes", "usually not reversible — treatment is replacement", "#ff9e7c", 280)}
    ${box(440, 440, "Prolactin, iron, meds, apnoea, weight", "opioids, steroids, alcohol, energy deficit — often fixable", "#7cffb2", 280)}

    <text x="${cx}" y="${H - 22}" text-anchor="middle" class="loop-sub">
      Free testosterone and SHBG get added whenever total sits near the border, or SHBG is likely to be off.
    </text>
  `;
}

export function initWorkupDiagram() {
  drawWorkupDiagram();
  window.addEventListener("resize", drawWorkupDiagram);
}
