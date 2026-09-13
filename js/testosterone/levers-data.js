/* The testosterone page's content layer.
   General information, not medical advice — and the honest framing matters
   more here than anywhere else on this site, because the gap between what
   the evidence supports and what gets sold is enormous. Each lever carries
   an `evidence` line and a realistic `effect`; nothing here promises a
   number, because the studies don't. */

export const CATEGORIES = [
  { slug: "foundation", name: "The foundations" },
  { slug: "body", name: "Body composition" },
  { slug: "intake", name: "What you take in" },
  { slug: "medical", name: "Medical causes" },
];

/* How well the evidence holds up — drives the second filter row. */
export const TIERS = [
  { slug: "strong", name: "Well supported", color: "#7cffb2" },
  { slug: "moderate", name: "Reasonable", color: "#79dce8" },
  { slug: "weak", name: "Thin or oversold", color: "#ffd27c" },
];

/* Part Two's reference bands. Adult male ranges vary by assay and by lab —
   these are typical adult reference intervals, not decision thresholds, and
   your own lab's ranges are the ones that apply to your results. */
export const MARKERS = [
  { name: "Total testosterone", unit: "ng/dL", low: 300, high: 1000, scaleMax: 1200,
    note: "Diurnal: peaks in the morning. Draw before 10am, twice, before concluding anything." },
  { name: "Free testosterone", unit: "pg/mL", low: 50, high: 210, scaleMax: 250,
    note: "The unbound fraction — usually 1-2% of total. Calculated from total, SHBG and albumin." },
  { name: "SHBG", unit: "nmol/L", low: 10, high: 57, scaleMax: 80,
    note: "The carrier protein. High SHBG can leave free T low while total looks fine." },
  { name: "LH", unit: "IU/L", low: 1.7, high: 8.6, scaleMax: 12,
    note: "The pituitary's signal. High with low T points at the testes; low or normal points upstream." },
  { name: "Estradiol", unit: "pg/mL", low: 10, high: 40, scaleMax: 60,
    note: "Converted from testosterone by aromatase. Men need some — it's not a number to drive to zero." },
];

export const LEVERS = [
  {
    name: "Sleep, 7-9 hours",
    category: "foundation",
    tier: "strong",
    effect: "Large in the sleep-deprived",
    cost: "Free, and the hardest one to actually do",
    why:
      "Most daily testosterone release happens during sleep, tied to the night's sleep architecture. In the well-known Chicago experiment, a week of five-hour nights cut daytime testosterone in healthy young men by 10-15% — an effect roughly equivalent to aging a decade. If you're short on sleep, nothing else on this page competes with fixing it.",
    steps: [
      "Set a wake time you can hold seven days a week; build the bedtime backwards from it.",
      "Aim for 7-9 hours in bed, consistently, rather than catching up at weekends.",
      "Treat the cortisol page's wind-down and light protocols as the mechanism for getting there.",
      "If you snore, wake unrefreshed, or your partner notices you stop breathing, get screened for sleep apnoea — see the lever below.",
    ],
    cues: [
      "One bad night doesn't do much. A month of six-hour nights does.",
      "This is the lever with the best evidence and the least marketing behind it.",
    ],
  },
  {
    name: "Get to a healthy body fat level",
    category: "body",
    tier: "strong",
    effect: "Large in obesity; small if you're already lean",
    cost: "Months, and the usual difficulty of fat loss",
    why:
      "Adipose tissue expresses aromatase, which converts testosterone to estradiol, and obesity suppresses the whole axis — the association between higher BMI and lower total testosterone is one of the most consistent findings in the field. Weight loss reliably raises it, proportional to how much is lost.",
    steps: [
      "Target a modest, sustained deficit rather than a crash — 0.5-1% of bodyweight a week.",
      "Keep protein high and keep lifting, so what you lose is fat rather than muscle.",
      "Expect the hormonal change to follow the fat loss over months, not weeks.",
      "If you're already lean, this lever isn't yours to pull — see the next caution.",
    ],
    cues: [
      "Going too lean does the opposite: very low body fat with low energy availability suppresses the axis hard.",
      "The dose-response is real but not linear. Most of the benefit is in the first stretch.",
    ],
  },
  {
    name: "Resistance training",
    category: "foundation",
    tier: "moderate",
    effect: "Acute spikes; small chronic change",
    cost: "3 sessions a week",
    why:
      "Heavy compound lifting produces a sharp post-session rise that lasts under an hour, and that acute spike is routinely oversold as the point. The durable benefit is indirect and larger: more muscle, less fat, better insulin sensitivity, better sleep. Train for those.",
    steps: [
      "Three sessions a week of compound work — squat, hinge, press, pull.",
      "Progress the load over months; that's the part that changes body composition.",
      "Don't chase the post-workout spike with heroic single sessions. It doesn't accumulate.",
      "The training page has the movements and templates.",
    ],
    cues: [
      "Acute post-exercise hormone spikes have repeatedly failed to predict muscle growth in controlled studies.",
      "Overreaching in the other direction — very high volume, poor recovery — lowers resting testosterone.",
    ],
  },
  {
    name: "Don't under-eat",
    category: "body",
    tier: "strong",
    effect: "Large, if you're in a chronic deficit",
    cost: "Eating more, which some people find harder than dieting",
    why:
      "Low energy availability suppresses the gonadal axis directly — this is well characterised in endurance athletes under the name RED-S, and it happens in men, not just women. Prolonged aggressive dieting, high training volume, and very low fat intake together are a reliable way to drive the axis down.",
    steps: [
      "If you've been dieting for months, take a planned break at maintenance for a few weeks.",
      "Keep dietary fat above roughly 20% of calories — very low fat diets are associated with lower testosterone.",
      "Match intake to training load; more training weeks need more food, not more restriction.",
      "Watch the markers that come with it: libido, morning erections, mood, training performance, cold hands.",
    ],
    cues: [
      "'Lean and under-fuelled' looks like discipline and behaves like a deficiency.",
      "Recovery from this is usually a matter of months of adequate intake, not a supplement.",
    ],
  },
  {
    name: "Cut chronic heavy alcohol",
    category: "intake",
    tier: "moderate",
    effect: "Large at heavy intake; unclear at light",
    cost: "Depends entirely on your baseline",
    why:
      "Heavy, sustained drinking suppresses testosterone through several routes at once — direct testicular toxicity, liver effects on SHBG and clearance, and wrecked sleep. The evidence at one or two drinks is genuinely equivocal; the evidence at heavy chronic intake is not.",
    steps: [
      "Establish an honest baseline for a fortnight — count units rather than occasions.",
      "If it's heavy, reducing is the intervention; there's no supplement that substitutes.",
      "Keep any drinking well clear of bedtime, for the sleep half of the effect.",
    ],
    cues: [
      "Most of the acute damage runs through sleep, which makes it the same lever as the cortisol page's.",
    ],
  },
  {
    name: "Treat sleep apnoea",
    category: "medical",
    tier: "strong",
    effect: "Large where it's the cause",
    cost: "A sleep study, then a device you have to tolerate",
    why:
      "Obstructive sleep apnoea fragments sleep and drops overnight oxygen, and it's independently associated with suppressed testosterone. It's common, frequently undiagnosed, and one of the few items here that a treatment actually fixes rather than nudges.",
    steps: [
      "Flag it with a doctor if you snore, wake unrefreshed, wake gasping, or someone has watched you stop breathing.",
      "A home sleep study is usually the first step and is not a big undertaking.",
      "If treated, give it months and re-test — improvements in the axis follow the sleep, not the diagnosis.",
    ],
    cues: [
      "Risk rises with body weight, so this and the body-composition lever often travel together.",
      "Testosterone therapy can worsen untreated apnoea, which is why this gets checked first.",
    ],
  },
  {
    name: "Fix a vitamin D or zinc deficiency",
    category: "intake",
    tier: "moderate",
    effect: "Real if deficient; nothing if you're not",
    cost: "A blood test and a cheap supplement",
    why:
      "Correcting a genuine deficiency can help; supplementing on top of adequate status does essentially nothing. This is the shape of almost every micronutrient claim in this space, and it's why the honest version is 'test, then treat' rather than 'take this'.",
    steps: [
      "Test 25-OH vitamin D rather than guessing, especially at northern latitudes in winter.",
      "Treat a documented deficiency at the dose your doctor recommends, then re-test.",
      "Zinc matters for the axis, but frank deficiency is uncommon on a varied diet — don't megadose it, which causes copper deficiency.",
      "Magnesium is worth adequacy for sleep quality; the direct hormonal claims are thin.",
    ],
    cues: [
      "Studies showing an effect are mostly in deficient populations. Extrapolating them to replete people is where the marketing happens.",
      "More is not better. Fat-soluble vitamins accumulate.",
    ],
  },
  {
    name: "Manage chronic stress",
    category: "foundation",
    tier: "moderate",
    effect: "Modest, and mostly via sleep",
    cost: "Structural, usually",
    why:
      "Sustained cortisol elevation suppresses the gonadal axis at the level of the hypothalamus — the two systems are wired to trade off. Most of the practical benefit you can get here arrives through sleep and training load rather than through stress techniques on their own.",
    steps: [
      "Work the cortisol page: wake-time regularity, morning light, caffeine timing, evening wind-down.",
      "Audit total load — work, training, and life stress draw on one account.",
      "Deload training when life gets heavy, rather than adding to it.",
    ],
    cues: [
      "Breathing protocols change state in minutes and weekly averages much less. Both facts are true.",
    ],
  },
  {
    name: "Testosterone boosters",
    category: "intake",
    tier: "weak",
    effect: "Near zero for most products",
    cost: "Money, mostly",
    why:
      "The category is largely marketing. Tribulus does not raise testosterone in controlled studies. Ashwagandha and fenugreek have small trials with modest, inconsistent results and real methodological limits. D-aspartic acid showed early promise and then failed to replicate. If a product's evidence is one small industry-funded trial, treat it as a hypothesis.",
    steps: [
      "Check whether the evidence is more than one small trial funded by the seller.",
      "Check whether the population studied resembles you — infertile, deficient, or elderly cohorts often don't.",
      "Spend the money on sleep, food and a gym membership first; they have the better evidence.",
      "Tell your doctor about anything you do take — interactions and liver effects are real.",
    ],
    cues: [
      "Some products have been found to contain undeclared anabolic steroids. That's the actual risk, not wasted money.",
      "If a supplement genuinely raised testosterone meaningfully, it would be a regulated drug.",
    ],
  },
  {
    name: "Testosterone replacement therapy",
    category: "medical",
    tier: "strong",
    effect: "Large — it's exogenous hormone",
    cost: "Fertility, monitoring, and probably permanence",
    why:
      "TRT works, in the sense that taking a hormone raises that hormone. What it isn't is a lifestyle optimisation: it suppresses your own production and sperm output, often irreversibly after long use, raises haematocrit, and commits you to indefinite monitoring. It's a treatment for diagnosed hypogonadism, made with a doctor, after causes have been looked for.",
    steps: [
      "Confirm the diagnosis first: two morning total testosterone draws, with symptoms, plus LH/FSH to locate the problem.",
      "Look for reversible causes — apnoea, obesity, opioids, alcohol, under-eating, thyroid, prolactinoma.",
      "If you want children now or later, raise fertility before starting, not after.",
      "Expect ongoing monitoring: haematocrit, PSA where appropriate, symptoms, and levels.",
    ],
    cues: [
      "Sourcing it outside medical care means no diagnosis, no monitoring, and no idea what's in the vial.",
      "Coming off after years is often difficult and sometimes doesn't fully recover.",
      "The cardiovascular safety picture has improved with recent trial data, but 'not shown to be harmful in treated hypogonadism' is not the same as 'safe for anyone who wants more'.",
    ],
  },
];
