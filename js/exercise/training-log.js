/* "Your numbers" — a 1RM estimate and a weekly session tally, both stored
   only in localStorage on this device. The Epley formula is an ESTIMATE that
   drifts above ~10 reps; the percentage table below it is the usual
   %1RM-to-rep-range mapping, not a guarantee. */
import { currentProgram } from "./week-plan.js";

const LOG_KEY = "shape-of-a-session:log";

const percentTargets = [
  { pct: 0.6, reps: "12-15", use: "Technique work, warm-up sets" },
  { pct: 0.7, reps: "10-12", use: "Accessory volume" },
  { pct: 0.75, reps: "8-10", use: "The default working range here" },
  { pct: 0.8, reps: "6-8", use: "Heavier main sets" },
  { pct: 0.85, reps: "4-6", use: "Strength work, once technique is solid" },
];

/* Only the trainable days get a checkbox, and they follow whichever program
   is selected in Part Five — so switching template switches the slots. */
function sessionSlots() {
  return currentProgram()
    .days.filter((d) => d.kind !== "off")
    .map((d) => ({ slug: d.day.toLowerCase(), label: `${d.day} · ${d.title}`, kind: d.kind }));
}

function loadLog() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLog(data) {
  localStorage.setItem(LOG_KEY, JSON.stringify(data));
}

function estimate1RM(weight, reps) {
  return weight * (1 + reps / 30);
}

function roundHalf(value) {
  return Math.round(value * 2) / 2;
}

export function initTrainingLog() {
  const form = document.getElementById("oneRM-form");
  if (!form) return () => {};

  const inputs = {
    lift: document.getElementById("input-lift"),
    weight: document.getElementById("input-weight"),
    reps: document.getElementById("input-reps"),
  };
  const resultEl = document.getElementById("oneRM-result");
  const tableEl = document.getElementById("percent-table");

  function render1RM() {
    const weight = parseFloat(inputs.weight.value);
    const reps = parseInt(inputs.reps.value, 10);

    if (!weight || !reps || reps < 1) {
      resultEl.innerHTML = "";
      tableEl.innerHTML = "";
      return;
    }

    const oneRM = estimate1RM(weight, reps);
    const lift = inputs.lift.value.trim() || "this lift";
    const shaky = reps > 10;

    resultEl.innerHTML = `
      Estimated 1RM for ${lift}:
      <span class="field-tag ${shaky ? "warn" : "ok"}">${roundHalf(oneRM)} — ${
        shaky ? "rough, over 10 reps" : "usable estimate"
      }</span>
    `;

    tableEl.innerHTML = `
      <table class="pct-table">
        <thead>
          <tr><th>% of 1RM</th><th>Weight</th><th>Reps</th><th>What it's for</th></tr>
        </thead>
        <tbody>
          ${percentTargets
            .map(
              (t) => `
            <tr>
              <td>${Math.round(t.pct * 100)}%</td>
              <td class="pct-weight">${roundHalf(oneRM * t.pct)}</td>
              <td>${t.reps}</td>
              <td class="pct-use">${t.use}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  function renderSummary(done) {
    const summary = document.getElementById("session-summary");
    const total = sessionSlots().length;
    const count = done.length;
    const cls = count >= total - 1 ? "ok" : count >= total / 2 ? "warn" : "high";
    summary.innerHTML = `
      <span class="field-tag ${cls}">${count} of ${total} sessions logged this week</span>
    `;
  }

  function drawSessionChecks(done) {
    const wrap = document.getElementById("session-checks");
    wrap.innerHTML = sessionSlots().map(
      (s) => `
      <label class="supp-check">
        <input type="checkbox" data-slug="${s.slug}" ${done.includes(s.slug) ? "checked" : ""} />
        ${s.label}
      </label>
    `
    ).join("");

    wrap.querySelectorAll("input[type=checkbox]").forEach((box) => {
      box.addEventListener("change", () => {
        const data = loadLog();
        const key = currentProgram().slug;
        const byProgram = data.sessions || {};
        const current = new Set(byProgram[key] || []);
        if (box.checked) current.add(box.dataset.slug);
        else current.delete(box.dataset.slug);
        byProgram[key] = Array.from(current);
        data.sessions = byProgram;
        saveLog(data);
        renderSummary(byProgram[key]);
      });
    });

    renderSummary(done);
  }

  function renderFromStorage() {
    const data = loadLog();
    if (data.lift) inputs.lift.value = data.lift;
    if (data.weight) inputs.weight.value = data.weight;
    if (data.reps) inputs.reps.value = data.reps;
    render1RM();
    drawSessionChecks((data.sessions || {})[currentProgram().slug] || []);
  }

  Object.entries(inputs).forEach(([key, input]) => {
    input.addEventListener("input", () => {
      const data = loadLog();
      data[key] = input.value;
      saveLog(data);
      render1RM();
    });
  });

  form.addEventListener("submit", (e) => e.preventDefault());

  document.getElementById("clear-training-data").addEventListener("click", () => {
    localStorage.removeItem(LOG_KEY);
    Object.values(inputs).forEach((input) => (input.value = ""));
    renderFromStorage();
  });

  renderFromStorage();

  /* Handed to the week plan so switching program redraws the session slots. */
  return renderFromStorage;
}
