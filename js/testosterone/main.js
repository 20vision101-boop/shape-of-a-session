/* Entry point for testosterone.html. */
import { initReveal } from "../shared/reveal.js";
import { initChapterNav } from "../shared/chapter-nav.js";
import { initHero } from "../shared/hero/index.js";
import { initEntrance } from "../shared/entrance.js";
import { initPanelChart } from "./panel-chart.js";
import { initHpgDiagram } from "./hpg-diagram.js";
import { initLeverLibrary } from "./library.js";
import { initWorkupDiagram } from "./workup-diagram.js";
import { initPanelLog } from "./panel-log.js";

initReveal();
initPanelChart();
initHpgDiagram();
initLeverLibrary();
initWorkupDiagram();
initPanelLog();
initChapterNav();
initHero();
initEntrance();
