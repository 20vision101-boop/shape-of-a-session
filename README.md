# The Shape of a Session

A scroll-driven visual essay about training: the intensity zones worth
training in, the four schools most training advice descends from, a
32-movement exercise library with step-by-step instructions, four weekly
templates, and a local-only training log.

Plain HTML/CSS/JS. No build step, no framework, no dependencies.

## The page

| Part | What's in it |
| --- | --- |
| 01 · The premise | Why skeletal muscle is the largest glucose sink you own |
| 02 · The zones | The five %HRmax bands, and the two routes to GLUT4 translocation |
| 03 · The schools | Starting Strength, hardstyle kettlebell, box conditioning, fascial elasticity |
| 04 · The library | 32 movements — description, numbered instructions, cues, prescription |
| 05 · The week | Four weekly templates, one per school, with a clickable day detail |
| 06 · The log | An Epley 1RM estimate, %-based working weights, and session ticks |

## The code

- `index.html` — the page: hero + 6 sections + footer
- `style.css` — dark theme, reveal-on-scroll, shared components
- `exercise.css` — school cards, exercise cards, the week grid, the percentage table
- `js/main.js` is `js/exercise/main.js`; each module exports one `init`:

  | Module | What it does |
  | --- | --- |
  | `exercise/exercise-data.js` | The content layer: `CATEGORIES`, `SCHOOLS`, and the 32-entry `EXERCISES` array |
  | `exercise/zones-chart.js` | Hand-drawn SVG chart of the five training zones |
  | `exercise/uptake-diagram.js` | SVG diagram of the insulin- and contraction-mediated paths |
  | `exercise/schools.js` | The four tradition cards; clicking one filters the library |
  | `exercise/library.js` | The filterable, expandable exercise library |
  | `exercise/week-plan.js` | Four weekly templates with a clickable day detail |
  | `exercise/training-log.js` | 1RM estimate, working weights, session ticks — all `localStorage` |
  | `reveal.js` | `IntersectionObserver` that reveals each section on scroll |
  | `chapter-nav.js` | Chapter navigator, driven by the nav dots in the markup |
  | `hero/` | The procedurally animated canvas hero |

Everything in Part Six stays in `localStorage` on the device. Nothing is
sent anywhere; there is no backend.

## Editing the content

`js/exercise/exercise-data.js` is the whole content layer. Add an entry to
`EXERCISES` — name, `schools`, `category`, `equipment`, `bodyweight`,
`level`, `focus`, `prescription`, `why`, `steps`, `cues` — and the filters,
counts and school cards pick it up with no other change. Adding a fifth
entry to `SCHOOLS` works the same way.

## Run it locally

You need to serve it over HTTP — the page loads ES modules, and browsers
block those on `file://`.

```bash
npx serve .
```

## Deploy

It's a static site: no build command, no output directory, no environment
variables. On Vercel, import the repo and pick **Other** as the framework
preset. `vercel.json` is already here.

## Disclaimer

General training information, not medical advice or personalized
programming. Loads, rep ranges and zone models are illustrative starting
points. Talk to a doctor before starting a new program, especially with
existing cardiac, metabolic or joint conditions.
