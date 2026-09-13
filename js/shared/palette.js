/* One palette for every hand-drawn chart and diagram on the site.
   The SVG modules import from here rather than carrying hex literals, so a
   retune is one file rather than thirty-two edits. Values mirror the CSS
   custom properties in style.css. */
export const C = {
  ground: "#04101f",   /* page ground — used for node fills that punch out */
  ink: "#ffffff",
  cyan: "#79dce8",     /* the site accent, and the default series colour */
  warm: "#ff9e7c",
  amber: "#ffd27c",
  green: "#7cffb2",
  red: "#ff7c92",
  gridline: "rgba(255,255,255,0.06)",
  hair: "rgba(255,255,255,0.16)",
  wash: "rgba(121,220,232,0.07)",
};

/* Each essay's own accent, for the series that represents "this page". */
export const ESSAY = {
  glucose: C.cyan,
  training: C.warm,
  cortisol: C.amber,
  testosterone: C.green,
};
