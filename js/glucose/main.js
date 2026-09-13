/* Entry point for glucose.html — the nutrition essay. */
import { initReveal } from "../shared/reveal.js";
import { initChapterNav } from "../shared/chapter-nav.js";
import { initHero } from "../shared/hero/index.js";
import { initEntrance } from "../shared/entrance.js";
import { initGlucoseChart } from "./glucose-chart.js";
import { initFoodBars } from "./food-bars.js";
import { initLabsPanel } from "./labs-panel.js";
import { initDiagrams } from "./diagrams.js";

initReveal();
initGlucoseChart();
initFoodBars();
initLabsPanel();
initDiagrams();
initChapterNav();
initHero();
initEntrance();
