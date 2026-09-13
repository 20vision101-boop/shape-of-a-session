# Four Curves

Four scroll-driven visual essays about things you can measure and change:
glucose, training, cortisol, and testosterone. Each one shows the curve
rather than the average, explains the mechanism underneath it, lists what
actually moves it, and gives you somewhere to put your own numbers.

Plain HTML/CSS/JS. No build step, no framework, no dependencies, no backend.

## The pages

| Page | Title | What's in it |
| --- | --- | --- |
| `index.html` | Four Curves | Landing page — the four essays and how they connect |
| `glucose.html` | The Shape of a Spike | Post-meal curves, glycemic load, food pairing, HOMA-IR calculator |
| `training.html` | The Shape of a Session | Intensity zones, four schools, 36 movements with instructions and evidence notes, four weekly templates, 1RM calculator |
| `cortisol.html` | The Shape of a Day | Diurnal rhythm, the HPA axis, 14 practices, a daily template, caffeine maths and a seven-day check-in |
| `testosterone.html` | The Shape of a Signal | Total vs free vs SHBG, evidence-ranked levers, the clinical workup, the TRT ledger, a Vermeulen free-T calculator |

Every panel stores to `localStorage` on the reader's own device. Nothing is
sent anywhere.

## Design

The visual language comes from the reference hero in `spaceedu-hero.html`:
navy ground, cyan rules, Prata over Hanken Grotesk, glossy white pills, and
one scale unit. `--u` is that unit — one design pixel from a 1353-wide
reference — so hero geometry is written as `calc(N * var(--u))` and the whole
composition scales as a piece. Body copy below the fold uses ordinary type
scales, because an essay has to reflow as it grows; only the hero is a fixed
composition.

Each essay carries its own accent through `data-essay` on `<body>`: glucose
cyan, training orange, cortisol amber, testosterone green. The eyebrow, the
hero rule, the chapter dots and the nav underline all read `--essay`, so a
page's identity is one attribute.

Each hero shows two neighbouring essays as orbs cropped by the screen edges —
the planet-switcher composition from the reference, with navigation in place
of the swap. The orbs are CSS gradients, so there is no artwork to ship.

## Structure

```
index.html  glucose.html  training.html  cortisol.html  testosterone.html
style.css        base theme, hero, reveal-on-scroll, chapter nav, footer
components.css   everything else: site nav, cards, libraries, tables, grids
js/
  shared/        reveal.js · chapter-nav.js · library.js · palette.js ·
                 entrance.js · hero/
  glucose/       main.js + the nutrition modules
  training/      main.js + exercise-data.js and the training modules
  cortisol/      main.js + practices-data.js and the cortisol modules
  testosterone/  main.js + levers-data.js, free-t.js and the panel modules
```

Each page has one `main.js` that calls each module's `init`. Three things
are genuinely shared:

- **`js/shared/reveal.js`** — the `IntersectionObserver` that fades sections in
- **`js/shared/chapter-nav.js`** — the chapter navigator; it reads its sections
  from the nav dots in the markup, so a page can have any number of parts
- **`js/shared/library.js`** — the filterable, expandable card library used by
  the movement library, the practice library and the lever library. Each page
  supplies an adapter that maps its own data onto the component's item shape
- **`js/shared/palette.js`** — one palette for every hand-drawn chart and
  diagram, so a retune is one file rather than thirty-two edits
- **`js/shared/entrance.js`** — plays the hero entrance once, then removes its
  own classes and leaves the page in its authored static state

## Editing the content

Each essay keeps its content in one data module, and the interactive parts
read from it:

- `js/training/exercise-data.js` — `CATEGORIES`, `SCHOOLS`, `EXERCISES`
- `js/cortisol/practices-data.js` — `CATEGORIES`, `WINDOWS`, `INPUTS`, `PRACTICES`
- `js/testosterone/levers-data.js` — `CATEGORIES`, `TIERS`, `MARKERS`, `LEVERS`

Add an entry and the filters, counts and cards pick it up with no other
change.

## Run it locally

You need to serve it over HTTP — the pages load ES modules, and browsers
block those on `file://`.

```bash
npx serve .
```

## Deploy

Static site: no build command, no output directory, no environment
variables. On Vercel, import the repo and pick **Other** as the framework
preset; `vercel.json` is already here.

## Disclaimer

General information, not medical advice or personalized guidance. Curves,
reference bands, doses and prescriptions throughout are illustrative
starting points, and physiology varies. Talk to a doctor about your own
results before acting on any of it.
