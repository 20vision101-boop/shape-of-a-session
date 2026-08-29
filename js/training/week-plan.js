/* Part Five — four weekly templates, one per school, plus the hybrid week
   that mixes them. Each program is a list of days; clicking a day opens the
   session. Movement names match the library in Part Four, so the
   instructions are always one section away. */
const POST_MEAL = { label: "After", items: ["10-15 min post-meal walk after your largest meal"] };

const PROGRAMS = [
  {
    slug: "hybrid",
    name: "Hybrid week",
    blurb:
      "Three lifting days, two easy aerobic days, one interval day, elastic work before the lifts and a tendon protocol after them, and a post-meal walk every day. The default if you want a bit of all four schools.",
    days: [
      {
        day: "Mon", title: "Lift A — lower emphasis", kind: "lift", duration: "50 min",
        blocks: [
          { label: "Warm-up", items: ["5 min easy bike", "360° lunge matrix × 2 rounds", "Pogo hops — 3 × 15"] },
          { label: "Main", items: ["Goblet or low-bar back squat — 3 × 5-10", "Romanian deadlift — 3 × 6-10", "Dumbbell bench press — 3 × 8-12"] },
          { label: "Finisher", items: ["Farmer's carry — 3 × 30-40m", "Plank — 3 × 20-45s"] },
          { label: "Tendon", items: ["Long-duration heavy isometric — 4 × 3s ramp + 3s hold"] },
          POST_MEAL,
        ],
      },
      {
        day: "Tue", title: "Zone 2", kind: "easy", duration: "40 min",
        blocks: [
          { label: "Main", items: ["Zone 2 walk, ride or row — 40 min at 60-70% max HR"] },
          { label: "Optional", items: ["Self-myofascial release — 10 min", "Face pull — 2 × 15"] },
          POST_MEAL,
        ],
      },
      {
        day: "Wed", title: "Lift B — upper emphasis", kind: "lift", duration: "50 min",
        blocks: [
          { label: "Warm-up", items: ["5 min easy cardio", "Band face pull × 15", "Rotational med-ball throw — 2 × 6/side"] },
          { label: "Main", items: ["Overhead press — 3 × 5-10", "Pull-up or lat pulldown — 3 × 4-10", "Dumbbell row — 3 × 8-12/side"] },
          { label: "Finisher", items: ["Pallof press — 3 × 8-12/side", "Face pull — 2 × 12-20"] },
          { label: "Tendon", items: ["Loaded long-length work — 2 × 8-12 for a lagging area"] },
          POST_MEAL,
        ],
      },
      {
        day: "Thu", title: "Intervals", kind: "hard", duration: "30 min",
        blocks: [
          { label: "Warm-up", items: ["8-10 min easy pedalling with 2-3 pickups"] },
          { label: "Main", items: ["Bike intervals — 6-8 × 30s hard / 2 min easy"] },
          { label: "Cool-down", items: ["5-10 min easy spinning"] },
          POST_MEAL,
        ],
      },
      {
        day: "Fri", title: "Lift C — full body", kind: "lift", duration: "50 min",
        blocks: [
          { label: "Warm-up", items: ["5 min easy cardio", "Kettlebell swing — 3 × 10 light"] },
          { label: "Main", items: ["Split squat — 3 × 8-12/side", "Hip thrust — 3 × 10-15", "Inverted row — 3 × 8-15", "Push-up — 3 × 6-15"] },
          { label: "Finisher", items: ["Dead bug — 3 × 6-10/side"] },
          { label: "Tendon", items: ["Long-duration heavy isometric — 4 × 3s ramp + 3s hold"] },
          POST_MEAL,
        ],
      },
      {
        day: "Sat", title: "Long Zone 2", kind: "easy", duration: "60 min",
        blocks: [
          { label: "Main", items: ["Zone 2 walk, hike or ride — 60 min, conversational throughout"] },
          POST_MEAL,
        ],
      },
      {
        day: "Sun", title: "Off — walk only", kind: "off", duration: "—",
        blocks: [
          { label: "Main", items: ["No structured session. Rest is when the adaptation happens."] },
          POST_MEAL,
        ],
      },
    ],
  },
  {
    slug: "strength",
    name: "Novice barbell LP",
    blurb:
      "The Starting Strength shape: two alternating full-body sessions, three days a week, adding the smallest available plate every single session for as long as that keeps working. Conditioning stays light so recovery goes to the bar.",
    days: [
      {
        day: "Mon", title: "Workout A", kind: "lift", duration: "60 min",
        blocks: [
          { label: "Warm-up", items: ["Empty bar × 2 sets of 5, then ramping singles up to the work weight"] },
          { label: "Main", items: ["Low-bar back squat — 3 × 5", "Overhead press — 3 × 5", "Barbell deadlift — 1 × 5"] },
          { label: "Rest", items: ["3-5 minutes between work sets. The rest is part of the program."] },
          POST_MEAL,
        ],
      },
      { day: "Tue", title: "Easy aerobic", kind: "easy", duration: "30 min", blocks: [
        { label: "Main", items: ["Zone 2 walk or ride — 30 min, easy enough not to touch tomorrow's session"] }, POST_MEAL] },
      {
        day: "Wed", title: "Workout B", kind: "lift", duration: "60 min",
        blocks: [
          { label: "Warm-up", items: ["Empty bar × 2 sets of 5, then ramping singles"] },
          { label: "Main", items: ["Low-bar back squat — 3 × 5", "Barbell bench press — 3 × 5", "Power clean — 5 × 3"] },
          { label: "Note", items: ["Squats are every session. That's the engine of the progression."] },
          POST_MEAL,
        ],
      },
      { day: "Thu", title: "Easy aerobic", kind: "easy", duration: "30 min", blocks: [
        { label: "Main", items: ["Zone 2 walk or ride — 30 min"] },
        { label: "Optional", items: ["Self-myofascial release — 10 min"] }, POST_MEAL] },
      {
        day: "Fri", title: "Workout A (heavier)", kind: "lift", duration: "60 min",
        blocks: [
          { label: "Main", items: ["Low-bar back squat — 3 × 5", "Overhead press — 3 × 5", "Barbell deadlift — 1 × 5"] },
          { label: "Progression", items: ["Add 2.5kg to the squat, 1-2.5kg to the presses, 5kg to the deadlift — every session, until you miss reps twice."] },
          POST_MEAL,
        ],
      },
      { day: "Sat", title: "Long walk", kind: "easy", duration: "60 min", blocks: [
        { label: "Main", items: ["Zone 2 walk or hike — 60 min"] }, POST_MEAL] },
      { day: "Sun", title: "Off", kind: "off", duration: "—", blocks: [
        { label: "Main", items: ["Rest, eat, sleep. Novice progression is recovery-limited, not effort-limited."] }, POST_MEAL] },
    ],
  },
  {
    slug: "kettlebell",
    name: "Simple & Sinister",
    blurb:
      "Pavel's minimalist template: swings and get-ups, almost every day, treated as practice rather than a workout. Two movements, one bell, and you stop well before you're wrecked.",
    days: [
      {
        day: "Mon", title: "Practice", kind: "lift", duration: "30 min",
        blocks: [
          { label: "Warm-up", items: ["Hip hinge drill × 10", "Halo × 5/side", "Prying goblet squat × 5"] },
          { label: "Main", items: ["Kettlebell swing — 10 × 10, on the minute", "Turkish get-up — 5 × 1 per side, slow"] },
          { label: "Rule", items: ["Stop when speed or crispness drops. This is practice, not a test."] },
          POST_MEAL,
        ],
      },
      { day: "Tue", title: "Practice", kind: "lift", duration: "30 min", blocks: [
        { label: "Main", items: ["Kettlebell swing — 10 × 10", "Turkish get-up — 5 × 1 per side"] },
        { label: "Optional", items: ["Kettlebell clean & press — ladders of 1-2-3, 3 rounds/side"] }, POST_MEAL] },
      { day: "Wed", title: "Easy aerobic", kind: "easy", duration: "45 min", blocks: [
        { label: "Main", items: ["Zone 2 walk or ride — 45 min"] },
        { label: "Optional", items: ["360° lunge matrix × 2 rounds"] }, POST_MEAL] },
      { day: "Thu", title: "Practice", kind: "lift", duration: "30 min", blocks: [
        { label: "Main", items: ["Kettlebell swing — 10 × 10", "Turkish get-up — 5 × 1 per side"] },
        { label: "Finisher", items: ["Farmer's carry — 3 × 40m"] }, POST_MEAL] },
      { day: "Fri", title: "Practice", kind: "lift", duration: "30 min", blocks: [
        { label: "Main", items: ["Kettlebell swing — 10 × 10", "Turkish get-up — 5 × 1 per side"] },
        { label: "Progression", items: ["When the whole session feels easy and the reps stay crisp, move up one bell size — not before."] }, POST_MEAL] },
      { day: "Sat", title: "Long Zone 2", kind: "easy", duration: "60 min", blocks: [
        { label: "Main", items: ["Zone 2 walk or hike — 60 min"] }, POST_MEAL] },
      { day: "Sun", title: "Off", kind: "off", duration: "—", blocks: [
        { label: "Main", items: ["Rest, or a very light session if you feel like one. Frequency beats intensity here."] }, POST_MEAL] },
    ],
  },
  {
    slug: "metcon",
    name: "Box conditioning",
    blurb:
      "The class structure: a strength piece, then a short scored conditioning piece, five days a week. The metcons stay short and the technical lifts stay light enough to keep form under fatigue.",
    days: [
      {
        day: "Mon", title: "Strength + AMRAP", kind: "hard", duration: "60 min",
        blocks: [
          { label: "Warm-up", items: ["5 min row", "360° lunge matrix", "Double-unders — 3 × 20"] },
          { label: "Strength", items: ["Low-bar back squat — 5 × 3 @ ~80%"] },
          { label: "Metcon", items: ["12-min AMRAP: 10 wall balls, 10 kettlebell swings, 10 burpees"] },
          POST_MEAL,
        ],
      },
      {
        day: "Tue", title: "EMOM", kind: "hard", duration: "45 min",
        blocks: [
          { label: "Strength", items: ["Overhead press — 5 × 5"] },
          { label: "Metcon", items: ["16-min EMOM, alternating: 12 wall balls / 40 double-unders"] },
          POST_MEAL,
        ],
      },
      { day: "Wed", title: "Zone 2", kind: "easy", duration: "45 min", blocks: [
        { label: "Main", items: ["Zone 2 row, ride or walk — 45 min. The easy day is what makes the hard days work."] },
        { label: "Optional", items: ["Self-myofascial release — 10 min"] }, POST_MEAL] },
      {
        day: "Thu", title: "Power + for time", kind: "hard", duration: "60 min",
        blocks: [
          { label: "Warm-up", items: ["Pogo hops — 3 × 15", "Rotational med-ball throw — 2 × 6/side"] },
          { label: "Strength", items: ["Power clean — 6 × 2, technique-first"] },
          { label: "Metcon", items: ["For time: 21-15-9 kettlebell swings and burpees"] },
          POST_MEAL,
        ],
      },
      {
        day: "Fri", title: "Strength + couplet", kind: "hard", duration: "60 min",
        blocks: [
          { label: "Strength", items: ["Barbell deadlift — 3 × 5", "Pull-up — 4 × max clean reps"] },
          { label: "Metcon", items: ["10-min AMRAP: 200m run, 15 wall balls"] },
          POST_MEAL,
        ],
      },
      { day: "Sat", title: "Long easy", kind: "easy", duration: "60 min", blocks: [
        { label: "Main", items: ["Zone 2 hike, ride or swim — 60 min"] }, POST_MEAL] },
      { day: "Sun", title: "Off", kind: "off", duration: "—", blocks: [
        { label: "Main", items: ["Full rest. Five scored days a week only works if the sixth and seventh aren't."] }, POST_MEAL] },
    ],
  },
];

/* The chosen template persists so a reload doesn't drop you back on the
   hybrid week — the log in Part Six keys its ticks off the same choice. */
const PROGRAM_KEY = "shape-of-a-session:program";

function storedProgram() {
  try {
    const idx = PROGRAMS.findIndex((p) => p.slug === localStorage.getItem(PROGRAM_KEY));
    return idx === -1 ? 0 : idx;
  } catch {
    return 0;
  }
}

const state = { program: storedProgram(), day: 0 };

/* Exposed for the training log so its checkboxes track the selected week. */
export function currentProgram() {
  return PROGRAMS[state.program];
}

function drawDetail() {
  const wrap = document.getElementById("day-detail");
  const day = currentProgram().days[state.day];

  const blocks = day.blocks
    .map(
      (b) => `
      <div class="detail-block">
        <p class="detail-label">${b.label}</p>
        <ul class="detail-items">${b.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>
    `
    )
    .join("");

  wrap.innerHTML = `
    <div class="day-detail-head">
      <h3>${day.day} — ${day.title}</h3>
      <span class="tag subtle">${day.duration}</span>
    </div>
    <div class="detail-blocks">${blocks}</div>
    <p class="caption">The day names the movements; Part Four explains how to do each one.</p>
  `;
}

function drawWeek() {
  const wrap = document.getElementById("week-plan");

  wrap.innerHTML = currentProgram()
    .days.map(
      (d, i) => `
      <button class="day-card${i === state.day ? " active" : ""}" type="button"
              data-index="${i}" data-kind="${d.kind}">
        <span class="day-name">${d.day}</span>
        <span class="day-title">${d.title}</span>
        <span class="day-duration">${d.duration}</span>
      </button>
    `
    )
    .join("");

  wrap.querySelectorAll(".day-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.day = Number(card.dataset.index);
      drawWeek();
      drawDetail();
    });
  });

  document.getElementById("program-blurb").textContent = currentProgram().blurb;
}

function drawProgramPicker(onProgramChange) {
  const wrap = document.getElementById("program-picker");

  wrap.innerHTML = PROGRAMS.map(
    (p, i) => `
    <button class="toggle-btn filter-chip${i === state.program ? " active" : ""}"
            type="button" data-index="${i}">${p.name}</button>
  `
  ).join("");

  wrap.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.program = Number(chip.dataset.index);
      state.day = 0;
      try {
        localStorage.setItem(PROGRAM_KEY, currentProgram().slug);
      } catch {
        /* private mode — the selection just won't persist */
      }
      wrap.querySelectorAll(".filter-chip").forEach((c, i) =>
        c.classList.toggle("active", i === state.program)
      );
      drawWeek();
      drawDetail();
      onProgramChange?.();
    });
  });
}

export function initWeekPlan(onProgramChange) {
  if (!document.getElementById("week-plan")) return;
  drawProgramPicker(onProgramChange);
  drawWeek();
  drawDetail();
}
