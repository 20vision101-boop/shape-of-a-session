/* Entry point for cortisol.html. */
import { initReveal } from "../shared/reveal.js";
import { initChapterNav } from "../shared/chapter-nav.js";
import { initHero } from "../shared/hero/index.js";
import { initEntrance } from "../shared/entrance.js";
import { initRhythmChart } from "./rhythm-chart.js";
import { initHpaDiagram } from "./hpa-diagram.js";
import { initInputsGrid } from "./inputs-grid.js";
import { initPracticeLibrary } from "./library.js";
import { initDayTimeline } from "./day-timeline.js";
import { initDayLog } from "./day-log.js";

initReveal();
initRhythmChart();
initHpaDiagram();
initInputsGrid();
initPracticeLibrary();
initDayTimeline();
initDayLog();
initChapterNav();
initHero();
initEntrance();
