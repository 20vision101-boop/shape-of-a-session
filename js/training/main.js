/* Entry point for exercise.html — reuses the shared reveal, chapter-nav and
   hero behaviour from the companion page, then wires up the exercise modules.
   The two cross-module hooks: school cards filter the library, and switching
   weekly template redraws the session checkboxes in the log. */
import { initReveal } from "../shared/reveal.js";
import { initChapterNav } from "../shared/chapter-nav.js";
import { initHero } from "../shared/hero/index.js";
import { initZonesChart } from "./zones-chart.js";
import { initUptakeDiagram } from "./uptake-diagram.js";
import { initSchools } from "./schools.js";
import { initLibrary, setSchool } from "./library.js";
import { initWeekPlan } from "./week-plan.js";
import { initTrainingLog } from "./training-log.js";

initReveal();
initZonesChart();
initUptakeDiagram();
initLibrary();
initSchools(setSchool);

const refreshSessions = initTrainingLog();
initWeekPlan(refreshSessions);

initChapterNav();
initHero();
