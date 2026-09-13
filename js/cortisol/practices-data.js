/* The cortisol page's content layer.
   Everything here is general information, not medical advice. Effect sizes
   in physiology are noisy and much of the stress literature is short-term
   and small-n, so each practice carries an honest `evidence` line rather
   than a number implying more precision than exists. */

export const CATEGORIES = [
  { slug: "light", name: "Light & rhythm" },
  { slug: "breath", name: "Breath & nervous system" },
  { slug: "sleep", name: "Sleep" },
  { slug: "intake", name: "What you take in" },
  { slug: "load", name: "Training & load" },
  { slug: "mind", name: "Attention & boundaries" },
];

/* Where in the day each practice belongs — drives the timeline in Part Five
   and the "when" filter in Part Four. */
export const WINDOWS = [
  { slug: "morning", name: "Morning", color: "#ffd27c" },
  { slug: "midday", name: "Midday", color: "#79dce8" },
  { slug: "evening", name: "Evening", color: "#ff9e7c" },
  { slug: "anytime", name: "Any time", color: "#7cffb2" },
];

/* What moves the curve, and in which direction. Part Three renders these. */
export const INPUTS = [
  {
    name: "Waking up",
    direction: "up",
    wanted: true,
    detail:
      "Cortisol climbs 40-60% in the 30-45 minutes after you wake — the cortisol awakening response. That spike is supposed to happen. A flat morning is the abnormal pattern, not a calm one.",
  },
  {
    name: "Bright morning light",
    direction: "up",
    wanted: true,
    detail:
      "Light in the first hour after waking anchors the circadian clock, which sharpens the morning peak and, downstream, the evening drop. The steepness of the slope is the thing you're training.",
  },
  {
    name: "Acute exercise",
    direction: "up",
    wanted: true,
    detail:
      "Hard training raises cortisol for hours — that's the adaptive signal, not damage. It becomes a problem only when the load never lets up and the curve stops recovering between sessions.",
  },
  {
    name: "Short sleep",
    direction: "up",
    wanted: false,
    detail:
      "Sleep restriction reliably raises evening cortisol and blunts the next morning's rise. It's the single most consistent way to break the rhythm in an otherwise healthy person.",
  },
  {
    name: "Caffeine, late",
    direction: "up",
    wanted: false,
    detail:
      "Caffeine raises cortisol acutely, and its half-life of roughly 5-6 hours means an afternoon coffee is still measurably present at bedtime, where its real cost is to sleep depth.",
  },
  {
    name: "Alcohol",
    direction: "up",
    wanted: false,
    detail:
      "Sedating at first, then disruptive: alcohol fragments the second half of the night, suppresses REM, and raises cortisol during the rebound. The evening drink shows up in tomorrow's curve.",
  },
  {
    name: "Chronic psychological stress",
    direction: "flat",
    wanted: false,
    detail:
      "The signature of long-term stress usually isn't a high number — it's a flattened slope: a weak morning rise and an evening that never comes down. Flat slopes track with worse health outcomes across a lot of cohort data.",
  },
  {
    name: "Slow breathing",
    direction: "down",
    wanted: true,
    detail:
      "Breathing at around six breaths a minute raises heart-rate variability and shifts autonomic balance within minutes. The acute effect is well documented; the size of any lasting change to the cortisol curve is not.",
  },
  {
    name: "Zone 2 aerobic work",
    direction: "down",
    wanted: true,
    detail:
      "Easy aerobic training lowers resting sympathetic tone over weeks. It costs far less recovery than intervals, which is the point — you're trying to add fitness without adding load.",
  },
  {
    name: "Darkness and routine",
    direction: "down",
    wanted: true,
    detail:
      "Dim light and a consistent bedtime let melatonin rise on schedule, which is what allows cortisol to reach its nadir near midnight. Regularity matters more than duration for the shape of the curve.",
  },
];

export const PRACTICES = [
  {
    name: "Morning light exposure",
    category: "light",
    windows: ["morning"],
    dose: "10-30 min, within an hour of waking",
    equipment: "Outdoors, or a 10,000-lux lamp",
    evidence: "Strong for circadian entrainment",
    why:
      "The single highest-leverage thing on this page. Outdoor light is 10-100× brighter than a lit room even on an overcast day, and morning light is what tells the clock when 'day' starts — which sets when the evening drop is allowed to happen.",
    steps: [
      "Get outside within an hour of waking, ideally within 30 minutes.",
      "Stay out 10 minutes on a bright day, 20-30 if it's overcast.",
      "Don't wear sunglasses; prescription glasses and contacts are fine.",
      "Never look directly at the sun — ambient light through open eyes is the mechanism.",
      "If you wake before sunrise or can't get out, use a 10,000-lux light box at arm's length for 20-30 minutes.",
    ],
    cues: [
      "Through a window is much weaker than outside — glass cuts most of the intensity.",
      "Pair it with something you already do: coffee on the step, the first walk, the commute.",
      "Consistency beats duration. Ten minutes every day outperforms an hour on Sundays.",
    ],
  },
  {
    name: "Physiological sigh",
    category: "breath",
    windows: ["anytime"],
    dose: "1-3 breaths, as needed",
    equipment: "None",
    evidence: "Good for acute state change",
    why:
      "The fastest tool here: a double inhale followed by a long exhale, which reinflates collapsed alveoli and offloads CO₂ quickly. It's what your body already does when you sob or before you fall asleep, done deliberately.",
    steps: [
      "Inhale through the nose until your lungs feel about full.",
      "Add a second, short sip of air on top of that inhale.",
      "Let a long, slow exhale out through the mouth until your lungs are empty.",
      "Repeat once or twice. Most of the effect arrives in the first three breaths.",
    ],
    cues: [
      "The exhale should be roughly twice the length of the inhale — that's where the parasympathetic shift comes from.",
      "Use it in the moment: before a hard conversation, between meetings, in traffic.",
      "It changes state, not circumstance. It won't fix a schedule that produces the state.",
    ],
  },
  {
    name: "Resonance breathing",
    category: "breath",
    windows: ["midday", "evening"],
    dose: "5-20 min, most days",
    equipment: "A timer, optionally an HRV app",
    evidence: "Good acute; modest for lasting change",
    why:
      "Breathing at about six breaths a minute lines your breathing rhythm up with the baroreflex, which produces the largest heart-rate variability response most people can generate voluntarily. Reliable acutely; the evidence for weeks-later changes is thinner.",
    steps: [
      "Sit upright somewhere quiet. Hands on your lap, jaw loose.",
      "Breathe in through your nose for a count of four, letting your belly move first.",
      "Breathe out, also through the nose, for a count of six. No pauses at either end.",
      "That's a ten-second cycle — six breaths a minute. Keep it smooth rather than deep.",
      "Continue for 5-20 minutes.",
    ],
    cues: [
      "If four-in six-out feels short of air, try five-in seven-out. The ratio matters more than the numbers.",
      "Strain is a sign you're breathing too deeply. Aim for quiet, easy, and slow.",
      "The evening session is the one that shows up in your sleep.",
    ],
  },
  {
    name: "Non-sleep deep rest (NSDR)",
    category: "breath",
    windows: ["midday"],
    dose: "10-20 min, early afternoon",
    equipment: "A guided audio track",
    evidence: "Modest, small studies",
    why:
      "A body-scan protocol — yoga nidra by another name — that puts you in a state between wakefulness and sleep. Useful specifically in the afternoon dip, where the alternative is usually another coffee that then costs you the night.",
    steps: [
      "Lie down somewhere you won't be interrupted. Set a timer for 20 minutes.",
      "Follow a guided body scan: attention moves slowly through each part of the body.",
      "Let the breath be slow and nasal; nothing needs controlling.",
      "If you fall asleep, keep it under 20-25 minutes so you wake before deep sleep.",
    ],
    cues: [
      "Before 3pm. Later than that and it starts eating into sleep pressure for the night.",
      "Not the same as a nap and not a replacement for one — it's a way to get rest without adding sleep debt.",
      "The evidence base here is small and short-term. It's cheap and low-risk, which is the honest case for it.",
    ],
  },
  {
    name: "Caffeine curfew",
    category: "intake",
    windows: ["midday"],
    dose: "Nothing after ~8-10 hours before bed",
    equipment: "None",
    evidence: "Strong on sleep depth",
    why:
      "Caffeine's half-life is roughly 5-6 hours, so a quarter of a 2pm coffee is still circulating at midnight. It blocks adenosine — the molecule that makes you sleepy — which is why it can leave sleep duration untouched while quietly cutting deep sleep.",
    steps: [
      "Work backwards from your usual bedtime and set a cutoff 8-10 hours earlier.",
      "Delay the first cup 60-90 minutes after waking, so it doesn't blunt the natural morning rise.",
      "Keep the total under about 400mg a day — roughly four cups of coffee.",
      "Count the hidden sources: tea, pre-workout, dark chocolate, some painkillers.",
    ],
    cues: [
      "Caffeine metabolism varies several-fold between people. If you sleep badly, assume you're a slow metaboliser and test a two-week cutoff.",
      "The afternoon crash you're treating is often yesterday's caffeine cutting last night's sleep.",
      "Decaf after the cutoff keeps the ritual without the dose.",
    ],
  },
  {
    name: "Alcohol audit",
    category: "intake",
    windows: ["evening"],
    dose: "Two weeks off, then decide",
    equipment: "None",
    evidence: "Strong on sleep architecture",
    why:
      "Alcohol gets you to sleep faster and makes the second half of the night worse: suppressed REM, more waking, higher heart rate, and a cortisol rebound as it clears. Most people can't feel the cost until they take it away for a fortnight.",
    steps: [
      "Go two weeks with none, and note morning resting heart rate and how you feel on waking.",
      "Reintroduce deliberately, one or two drinks, and compare the same measures the morning after.",
      "If you drink, finish at least three hours before bed.",
      "Keep water alongside — dehydration compounds the same-night effects.",
    ],
    cues: [
      "A wearable makes this obvious: resting heart rate and HRV respond to a single drink.",
      "'It helps me sleep' is true for sleep onset and false for everything after.",
    ],
  },
  {
    name: "Consistent sleep window",
    category: "sleep",
    windows: ["evening"],
    dose: "Same ±30 min, seven days a week",
    equipment: "None",
    evidence: "Strong",
    why:
      "Regularity turns out to matter as much as duration. A stable wake time is what keeps the clock anchored, and a stable clock is what produces a steep morning rise and a low midnight nadir.",
    steps: [
      "Pick a wake time you can hold on a Sunday, not just a Tuesday.",
      "Work back 8-8.5 hours to set the bedtime that supports it.",
      "Hold the wake time even after a bad night — the temptation to sleep in is what keeps the cycle unstable.",
      "Keep weekend drift under an hour.",
    ],
    cues: [
      "Fix the wake time first. Bedtime follows once sleep pressure builds naturally.",
      "A short, early nap is fine. A long, late one moves tonight's bedtime.",
    ],
  },
  {
    name: "Wind-down routine",
    category: "sleep",
    windows: ["evening"],
    dose: "30-60 min before bed",
    equipment: "Dimmable lights",
    evidence: "Moderate",
    why:
      "Cortisol should be at its lowest around midnight, and bright light plus stimulation in the last hour is the most common reason it isn't. The routine matters less than its predictability — you're giving the system a reliable signal.",
    steps: [
      "Drop the lights an hour before bed. Lamps rather than overheads; warm rather than white.",
      "Get the work and the phone out of the bedroom, or at least out of the last 30 minutes.",
      "Do the same low-stimulation thing each night: reading, stretching, a shower, tidying.",
      "Keep the bedroom cool — around 18°C suits most people.",
    ],
    cues: [
      "Screens matter mostly because of what's on them. A tense email is worse than the brightness.",
      "If you're lying awake more than 20 minutes, get up and do something dull in dim light rather than lying there.",
    ],
  },
  {
    name: "Worry window",
    category: "mind",
    windows: ["evening"],
    dose: "10-15 min, same time daily",
    equipment: "Pen and paper",
    evidence: "Good — a standard CBT technique",
    why:
      "Rather than trying not to think about it, you give the thinking a scheduled slot earlier in the evening. It's a well-established insomnia technique precisely because bedtime rumination is what keeps the evening curve up.",
    steps: [
      "Pick a fixed 10-15 minutes, at least two hours before bed.",
      "Write down what's on your mind — every open loop, no editing.",
      "For each item, write the single next action, or explicitly note that there isn't one yet.",
      "Close the notebook at the end of the window.",
      "When the thoughts show up later, note them for tomorrow's window instead of solving them.",
    ],
    cues: [
      "The point is the written next action, not the venting.",
      "Doing it in bed defeats the purpose — the bed should not become the place where problems get solved.",
    ],
  },
  {
    name: "Post-work decompression walk",
    category: "mind",
    windows: ["evening"],
    dose: "10-20 min, right after work",
    equipment: "None",
    evidence: "Moderate",
    why:
      "A physical boundary between work and the rest of the day. It combines easy movement, outdoor light and a change of context, which is three separate levers on this page bought with one twenty-minute habit.",
    steps: [
      "Leave straight after you close the laptop, before you sit down at home.",
      "Walk at a conversational pace for 10-20 minutes.",
      "Outdoors, without a podcast or a call, at least some of the time.",
      "Come back and start the evening — the walk is the transition, not an errand.",
    ],
    cues: [
      "If it happens after dinner instead, you still get the movement and the light; you lose the boundary.",
      "This also doubles as the post-meal walk on the glucose page.",
    ],
  },
  {
    name: "Zone 2 aerobic base",
    category: "load",
    windows: ["anytime"],
    dose: "2-4 × 30-60 min weekly",
    equipment: "None, or any cardio machine",
    evidence: "Strong for fitness; indirect for cortisol",
    why:
      "Aerobic fitness lowers resting sympathetic tone and improves how fast you recover from acute stressors. It's the cheapest training stress there is — real adaptation, minimal recovery cost.",
    steps: [
      "Pick anything continuous: brisk walking uphill, easy cycling, rowing.",
      "Hold a pace where you could speak a full sentence but wouldn't want to chat — around 60-70% of max heart rate.",
      "30-60 minutes, two to four times a week.",
      "Keep it genuinely easy. Drifting into the middle zone is what turns recovery into load.",
    ],
    cues: [
      "The training page covers this in more detail — same practice, different lens.",
      "If your sleep or resting heart rate is getting worse as your training volume climbs, that's the signal to cut, not push.",
    ],
  },
  {
    name: "Deload week",
    category: "load",
    windows: ["anytime"],
    dose: "One week every 4-6",
    equipment: "None",
    evidence: "Standard practice; modest direct evidence",
    why:
      "Training stress and life stress draw on the same account. A planned light week is how you find out whether the fatigue you're carrying is from training — and it's much cheaper than finding out by breaking down.",
    steps: [
      "Every fourth to sixth week, keep the same movements and cut the sets by about 40%.",
      "Keep intensity roughly the same; it's volume that comes down.",
      "Hold the easy aerobic work — that part is recovery, not load.",
      "Note sleep, resting heart rate and mood across the week.",
    ],
    cues: [
      "If you feel dramatically better by day four, the previous block was too much.",
      "Deloads are scheduled, not earned. Waiting until you need one means you're already late.",
    ],
  },
  {
    name: "Sauna",
    category: "load",
    windows: ["evening"],
    dose: "15-20 min, 2-4× weekly",
    equipment: "A sauna",
    evidence: "Suggestive; mostly Finnish cohort data",
    why:
      "Acutely a stressor — heart rate and cortisol both rise — and the case for it rests on the adaptation and on large observational cohorts linking frequent sauna use with better cardiovascular outcomes. Pleasant, plausible, not proven.",
    steps: [
      "15-20 minutes at 80-100°C, or longer at lower temperatures.",
      "Two to four sessions a week is the range most of the cohort data covers.",
      "Drink water before and after; expect to lose a noticeable amount of fluid.",
      "Finish at least 90 minutes before bed so core temperature can fall again.",
    ],
    cues: [
      "Observational data can't separate 'sauna helps' from 'people who sauna four times a week have time and health to do so'.",
      "Skip it if you're pregnant, have unstable cardiovascular disease, or have been drinking.",
    ],
  },
  {
    name: "Cold exposure — with a caveat",
    category: "load",
    windows: ["morning"],
    dose: "1-3 min, if at all",
    equipment: "A cold shower or a tub",
    evidence: "Mixed; acutely raises stress hormones",
    why:
      "Included because it's ubiquitous in this conversation and frequently mis-sold. Cold raises noradrenaline sharply and is an acute stressor; the alertness afterwards is real. If your problem is that your system is already over-activated, adding a daily stressor is a strange prescription.",
    steps: [
      "If you do it, do it in the morning, not the evening.",
      "One to three minutes is plenty; longer isn't better for this purpose.",
      "Breathe slowly and deliberately through it — the breathing is most of the practice.",
      "Get out if you start shivering uncontrollably or lose feeling in your hands or feet.",
    ],
    cues: [
      "Cold immediately after lifting appears to blunt some hypertrophy adaptations — separate them by several hours.",
      "Avoid entirely with cardiac conditions or uncontrolled blood pressure, and never in open water alone.",
      "If you find it miserable and it doesn't help you, not doing it is a legitimate conclusion.",
    ],
  },
];
