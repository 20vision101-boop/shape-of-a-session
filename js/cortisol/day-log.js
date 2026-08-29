/* Part Six — your own schedule, derived from two times, plus a seven-day
   check-in. Everything stays in localStorage on this device.

   The caffeine maths uses a 5.5-hour half-life, which is a population
   average: real clearance varies several-fold between people (genetics,
   liver enzyme induction, oral contraceptives, pregnancy, smoking). Treat
   the residual figure as a rough order of magnitude. */
const LOG_KEY = "shape-of-a-day:log";
const HALF_LIFE_HOURS = 5.5;

function loadLog() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLog(data) {
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(data));
  } catch {
    /* private mode — nothing persists, the page still works */
  }
}

function toMinutes(hhmm) {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : null;
}

function toClock(minutes) {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/* Bedtime can be past midnight, so measure it forward from the wake time. */
function hoursAwake(wake, bed) {
  const span = bed - wake;
  return (span <= 0 ? span + 1440 : span) / 60;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function lastSevenDays() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ key: d.toISOString().slice(0, 10), label: "SMTWTFS"[d.getDay()] });
  }
  return days;
}

export function initDayLog() {
  const form = document.getElementById("day-form");
  if (!form) return;

  const inputs = {
    wake: document.getElementById("input-wake"),
    bed: document.getElementById("input-bed"),
    caffeine: document.getElementById("input-caffeine"),
    dose: document.getElementById("input-dose"),
  };

  function renderSchedule() {
    const wake = toMinutes(inputs.wake.value);
    const bed = toMinutes(inputs.bed.value);
    const out = document.getElementById("schedule-result");
    const residualEl = document.getElementById("caffeine-result");

    if (wake == null || bed == null) {
      out.innerHTML = "";
      residualEl.innerHTML = "";
      return;
    }

    const awake = hoursAwake(wake, bed);
    const rows = [
      ["Light window", `${toClock(wake)} – ${toClock(wake + 60)}`, "10-30 min outside, no sunglasses"],
      ["First coffee", `${toClock(wake + 60)} – ${toClock(wake + 90)}`, "after the natural rise has peaked"],
      ["Caffeine cutoff", `${toClock(bed - 600)} – ${toClock(bed - 480)}`, "8-10 hours before bed"],
      ["Last hard session ends", toClock(bed - 180), "3 hours before bed"],
      ["Wind-down starts", toClock(bed - 60), "lights down, screens away"],
      ["Bed", toClock(bed), `${awake.toFixed(1)}h awake`],
    ];

    out.innerHTML = `
      <table class="pct-table">
        <thead><tr><th>Block</th><th>When</th><th>Why</th></tr></thead>
        <tbody>
          ${rows
            .map(
              ([what, when, why]) =>
                `<tr><td>${what}</td><td class="pct-weight">${when}</td><td class="pct-use">${why}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
      ${
        awake < 15
          ? `<p class="caption">${awake.toFixed(1)} hours awake — that's a long sleep window. Nice if you can hold it.</p>`
          : awake > 17.5
          ? `<p class="caption">${awake.toFixed(1)} hours awake leaves under 6.5 hours in bed. Short sleep is the most reliable way to flatten tomorrow's curve.</p>`
          : ""
      }
    `;

    const last = toMinutes(inputs.caffeine.value);
    const dose = parseFloat(inputs.dose.value);
    if (last == null || !dose) {
      residualEl.innerHTML = "";
      return;
    }

    const gap = hoursAwake(last, bed);
    const remaining = dose * Math.pow(0.5, gap / HALF_LIFE_HOURS);
    const band = remaining < 25 ? "ok" : remaining < 60 ? "warn" : "high";
    const verdict =
      band === "ok"
        ? "negligible by bedtime"
        : band === "warn"
        ? "about a third of a coffee still on board"
        : "roughly a coffee's worth still circulating at bedtime";

    residualEl.innerHTML = `
      ${Math.round(dose)}mg at ${toClock(last)}, ${gap.toFixed(1)}h before bed:
      <span class="field-tag ${band}">≈${Math.round(remaining)}mg left — ${verdict}</span>
    `;
  }

  function renderCheckIn() {
    const data = loadLog();
    const entries = data.days || {};
    const wrap = document.getElementById("checkin-grid");
    const today = todayKey();

    wrap.innerHTML = lastSevenDays()
      .map(({ key, label }) => {
        const entry = entries[key];
        const sleep = entry?.sleep;
        const stress = entry?.stress;
        const height = sleep ? Math.min((sleep / 10) * 100, 100) : 0;
        const cls = !sleep ? "empty" : sleep >= 7 ? "ok" : sleep >= 6 ? "warn" : "high";
        return `
          <div class="checkin-col${key === today ? " today" : ""}">
            <div class="checkin-bar-track">
              <div class="checkin-bar ${cls}" style="height:${height}%"></div>
            </div>
            <span class="checkin-day">${label}</span>
            <span class="checkin-value">${sleep ? `${sleep}h` : "—"}</span>
            <span class="checkin-stress">${stress ? "•".repeat(stress) : ""}</span>
          </div>
        `;
      })
      .join("");

    const logged = Object.values(entries).filter((e) => e.sleep);
    const summary = document.getElementById("checkin-summary");
    if (!logged.length) {
      summary.innerHTML = `<span class="field-tag">nothing logged yet</span>`;
      return;
    }
    const avg = logged.reduce((a, e) => a + e.sleep, 0) / logged.length;
    const cls = avg >= 7 ? "ok" : avg >= 6 ? "warn" : "high";
    summary.innerHTML = `<span class="field-tag ${cls}">${avg.toFixed(1)}h average across ${logged.length} logged ${
      logged.length === 1 ? "night" : "nights"
    }</span>`;
  }

  function saveToday(patch) {
    const data = loadLog();
    data.days = data.days || {};
    data.days[todayKey()] = { ...data.days[todayKey()], ...patch };
    saveLog(data);
    renderCheckIn();
  }

  Object.entries(inputs).forEach(([key, input]) => {
    input.addEventListener("input", () => {
      const data = loadLog();
      data[key] = input.value;
      saveLog(data);
      renderSchedule();
    });
  });

  document.getElementById("input-sleep").addEventListener("input", (e) => {
    const value = parseFloat(e.target.value);
    saveToday({ sleep: Number.isFinite(value) ? value : undefined });
  });

  document.getElementById("stress-picker").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-stress]");
    if (!btn) return;
    const value = Number(btn.dataset.stress);
    saveToday({ stress: value });
    document
      .querySelectorAll("#stress-picker button")
      .forEach((b) => b.classList.toggle("active", Number(b.dataset.stress) === value));
  });

  form.addEventListener("submit", (e) => e.preventDefault());

  document.getElementById("clear-day-data").addEventListener("click", () => {
    try {
      localStorage.removeItem(LOG_KEY);
    } catch {
      /* nothing stored to clear */
    }
    Object.values(inputs).forEach((i) => (i.value = ""));
    document.getElementById("input-sleep").value = "";
    document.querySelectorAll("#stress-picker button").forEach((b) => b.classList.remove("active"));
    renderSchedule();
    renderCheckIn();
  });

  /* restore */
  const data = loadLog();
  Object.entries(inputs).forEach(([key, input]) => {
    if (data[key]) input.value = data[key];
  });
  const today = (data.days || {})[todayKey()] || {};
  if (today.sleep) document.getElementById("input-sleep").value = today.sleep;
  if (today.stress) {
    document
      .querySelectorAll("#stress-picker button")
      .forEach((b) => b.classList.toggle("active", Number(b.dataset.stress) === today.stress));
  }
  renderSchedule();
  renderCheckIn();
}
