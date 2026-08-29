/* Part Five — the day as a sequence of windows. Click one to see what
   belongs in it and why. Times are relative to a 7am wake; the log in
   Part Six recalculates the caffeine cutoff for your own schedule. */
const BLOCKS = [
  {
    key: "wake",
    time: "Wake",
    title: "The rise",
    kind: "morning",
    detail: "Cortisol climbs 40-60% in the next 30-45 minutes. You want that spike to be sharp — everything in this block is about not blunting it.",
    items: [
      "Get outside for 10-30 minutes of light, no sunglasses",
      "Hold the wake time within 30 minutes of yesterday's, weekends included",
      "Delay the first coffee 60-90 minutes",
      "Water before caffeine",
    ],
  },
  {
    key: "morning",
    time: "+1-4h",
    title: "The peak",
    kind: "morning",
    detail: "The highest-alertness window of the day for most people, and the natural home for the work that needs the most of you.",
    items: [
      "First coffee, once the natural rise has done its work",
      "Hardest cognitive work while the curve is high",
      "Training also fits here if mornings are when you train",
    ],
  },
  {
    key: "midday",
    time: "+5-8h",
    title: "The dip",
    kind: "midday",
    detail: "The post-lunch trough is a normal circadian feature, not a failure of willpower. The mistake is treating it with caffeine that then costs you the night.",
    items: [
      "Caffeine curfew starts — 8-10 hours before bed",
      "10-20 min NSDR, or a walk outside",
      "A post-meal walk covers the glucose side of the same hour",
    ],
  },
  {
    key: "afternoon",
    time: "+8-11h",
    title: "The second wind",
    kind: "midday",
    detail: "Body temperature peaks in the late afternoon, which is why most people's strongest training happens here. This is also the last window for genuinely hard training if you sleep badly after evening sessions.",
    items: [
      "Training, if you didn't train in the morning",
      "Zone 2 work fits anywhere, but this is the cheapest slot",
      "Last hard session of the day ends 3+ hours before bed",
    ],
  },
  {
    key: "evening",
    time: "-3h to bed",
    title: "The descent",
    kind: "evening",
    detail: "Cortisol should be falling steeply now. Almost everything that keeps it up in the evening is under your control, which is why this block has the most levers on it.",
    items: [
      "Worry window: 10-15 minutes, written, then closed",
      "Post-work decompression walk as the boundary",
      "Last alcohol 3+ hours before bed, if any",
      "Dim the lights an hour out",
    ],
  },
  {
    key: "night",
    time: "Bed",
    title: "The nadir",
    kind: "evening",
    detail: "Cortisol bottoms out around midnight. A regular bedtime, a dark cool room and an unfragmented night are what let it get there.",
    items: [
      "Same bedtime ±30 minutes",
      "Cool room, around 18°C, properly dark",
      "Resonance breathing, 5-10 minutes, if you're wired",
      "Awake more than 20 minutes? Get up, dim light, something dull",
    ],
  },
];

let selected = 0;

function drawDetail() {
  const wrap = document.getElementById("day-detail");
  const b = BLOCKS[selected];
  wrap.innerHTML = `
    <div class="day-detail-head">
      <h3>${b.title}</h3>
      <span class="tag subtle">${b.time}</span>
    </div>
    <p class="detail-text">${b.detail}</p>
    <p class="detail-label">What belongs here</p>
    <ul class="detail-items">${b.items.map((i) => `<li>${i}</li>`).join("")}</ul>
  `;
}

function drawTimeline() {
  const wrap = document.getElementById("day-timeline");
  wrap.innerHTML = BLOCKS.map(
    (b, i) => `
    <button class="day-card${i === selected ? " active" : ""}" type="button"
            data-index="${i}" data-kind="${b.kind}">
      <span class="day-name">${b.time}</span>
      <span class="day-title">${b.title}</span>
    </button>
  `
  ).join("");

  wrap.querySelectorAll(".day-card").forEach((card) => {
    card.addEventListener("click", () => {
      selected = Number(card.dataset.index);
      drawTimeline();
      drawDetail();
    });
  });
}

export function initDayTimeline() {
  if (!document.getElementById("day-timeline")) return;
  drawTimeline();
  drawDetail();
}
