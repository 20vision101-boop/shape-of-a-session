/* The Vermeulen calculation for free testosterone.
   Total testosterone measures everything in the blood, but ~98% of it is
   bound — tightly to SHBG, loosely to albumin — and only the unbound
   fraction is active. Vermeulen's 1999 equation solves the binding
   equilibrium for that fraction. It's an estimate: it assumes fixed
   association constants and a single SHBG binding site, and it disagrees
   with equilibrium dialysis (the reference method) at the extremes.

   Association constants, litres per mole. */
const K_ALBUMIN = 3.6e4;
const K_SHBG = 1.0e9;
const MW_TESTOSTERONE = 288.42;   // g/mol
const MW_ALBUMIN = 66500;          // g/mol
const NG_DL_TO_MOL = 3.467e-11;    // 1 ng/dL of testosterone, in mol/L

/* totalNgDl: ng/dL · shbgNmolL: nmol/L · albuminGdl: g/dL
   Returns { freeMolL, freePgMl, freePercent, bioavailablePgMl }. */
export function freeTestosterone(totalNgDl, shbgNmolL, albuminGdl = 4.3) {
  const total = totalNgDl * NG_DL_TO_MOL;
  const shbg = shbgNmolL * 1e-9;
  const albumin = (albuminGdl * 10) / MW_ALBUMIN;

  const n = 1 + K_ALBUMIN * albumin;
  const a = n * K_SHBG;
  const b = n + K_SHBG * (shbg - total);

  const free = (-b + Math.sqrt(b * b + 4 * a * total)) / (2 * a);
  const freePgMl = free * MW_TESTOSTERONE * 1e9;

  return {
    freeMolL: free,
    freePgMl,
    freePercent: total > 0 ? (free / total) * 100 : 0,
    /* Bioavailable = free plus the loosely albumin-bound fraction. */
    bioavailablePgMl: free * n * MW_TESTOSTERONE * 1e9,
  };
}
