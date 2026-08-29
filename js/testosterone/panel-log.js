/* Part Six — enter your panel, get a calculated free testosterone and see
   your values land on the reference bands in Part Two. Stored only in
   localStorage on this device.

   Reference bands here are typical adult male intervals; your lab's own
   ranges are the ones that apply, and none of this interprets a result —
   that's a conversation with a doctor. */
import { freeTestosterone } from "./free-t.js";
import { setPanelValues } from "./panel-chart.js";
import { MARKERS } from "./levers-data.js";

const PANEL_KEY = "shape-of-a-signal:panel";

function loadPanel() {
  try {
    return JSON.parse(localStorage.getItem(PANEL_KEY)) || {};
  } catch {
    return {};
  }
}

function savePanel(data) {
  try {
    localStorage.setItem(PANEL_KEY, JSON.stringify(data));
  } catch {
    /* private mode — the page works, nothing persists */
  }
}

function band(value, marker) {
  if (value < marker.low) return { cls: "high", label: "below the usual range" };
  if (value > marker.high) return { cls: "warn", label: "above the usual range" };
  return { cls: "ok", label: "within the usual range" };
}

export function initPanelLog() {
  const form = document.getElementById("panel-form");
  if (!form) return;

  const inputs = {
    total: document.getElementById("input-total"),
    shbg: document.getElementById("input-shbg"),
    albumin: document.getElementById("input-albumin"),
    lh: document.getElementById("input-lh"),
  };

  function render() {
    const total = parseFloat(inputs.total.value);
    const shbg = parseFloat(inputs.shbg.value);
    const albumin = parseFloat(inputs.albumin.value) || 4.3;
    const lh = parseFloat(inputs.lh.value);

    const values = {};
    if (Number.isFinite(total)) values["Total testosterone"] = total;
    if (Number.isFinite(shbg)) values["SHBG"] = shbg;
    if (Number.isFinite(lh)) values["LH"] = lh;

    const result = document.getElementById("free-t-result");
    const readout = document.getElementById("panel-readout");

    if (!Number.isFinite(total) || !Number.isFinite(shbg)) {
      result.innerHTML = Number.isFinite(total)
        ? `<span class="field-tag warn">add SHBG to calculate free testosterone</span>`
        : "";
      readout.innerHTML = "";
      setPanelValues(values);
      return;
    }

    const { freePgMl, freePercent, bioavailablePgMl } = freeTestosterone(total, shbg, albumin);
    values["Free testosterone"] = freePgMl;

    const freeMarker = MARKERS.find((m) => m.name === "Free testosterone");
    const freeBand = band(freePgMl, freeMarker);
    const totalBand = band(total, MARKERS.find((m) => m.name === "Total testosterone"));

    result.innerHTML = `
      Calculated free testosterone:
      <span class="field-tag ${freeBand.cls}">${freePgMl.toFixed(0)} pg/mL — ${freeBand.label}</span>
    `;

    const mismatch =
      totalBand.cls === "ok" && freeBand.cls === "high"
        ? `<p class="caption">Total looks fine and free doesn't — the classic high-SHBG picture, and the reason total alone can mislead.</p>`
        : totalBand.cls === "high" && freeBand.cls === "ok"
        ? `<p class="caption">Total is under the band while free isn't, which low SHBG can do. Worth showing a doctor rather than acting on the total alone.</p>`
        : "";

    readout.innerHTML = `
      <table class="pct-table">
        <thead><tr><th>Value</th><th>Result</th><th>Typical band</th></tr></thead>
        <tbody>
          <tr><td>Total testosterone</td><td class="pct-weight">${total} ng/dL</td><td class="pct-use">300-1000</td></tr>
          <tr><td>SHBG</td><td class="pct-weight">${shbg} nmol/L</td><td class="pct-use">10-57</td></tr>
          <tr><td>Free (calculated)</td><td class="pct-weight">${freePgMl.toFixed(0)} pg/mL</td><td class="pct-use">50-210</td></tr>
          <tr><td>Free fraction</td><td class="pct-weight">${freePercent.toFixed(2)}%</td><td class="pct-use">roughly 1-2.5%</td></tr>
          <tr><td>Bioavailable</td><td class="pct-weight">${(bioavailablePgMl / 1000).toFixed(1)} ng/mL</td><td class="pct-use">free plus albumin-bound</td></tr>
          ${
            Number.isFinite(lh)
              ? `<tr><td>LH</td><td class="pct-weight">${lh} IU/L</td><td class="pct-use">1.7-8.6 — locates the problem, see Part Four</td></tr>`
              : ""
          }
        </tbody>
      </table>
      ${mismatch}
    `;

    setPanelValues(values);
  }

  Object.entries(inputs).forEach(([key, input]) => {
    input.addEventListener("input", () => {
      const data = loadPanel();
      data[key] = input.value;
      savePanel(data);
      render();
    });
  });

  form.addEventListener("submit", (e) => e.preventDefault());

  document.getElementById("clear-panel-data").addEventListener("click", () => {
    try {
      localStorage.removeItem(PANEL_KEY);
    } catch {
      /* nothing to clear */
    }
    Object.values(inputs).forEach((i) => (i.value = ""));
    render();
  });

  const data = loadPanel();
  Object.entries(inputs).forEach(([key, input]) => {
    if (data[key]) input.value = data[key];
  });
  render();
}
