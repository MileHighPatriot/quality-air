/**
 * Repair-or-replace advisor: the questions, the sample price ranges, and the
 * rules that turn three answers into a verdict. Everything the tool says is
 * edited here. No imports on purpose, so the rules stay easy to read and test.
 */

export type SystemId = "furnace" | "ac" | "heat-pump";
export type AgeId = "under-8" | "8-14" | "15-plus" | "not-sure";
/** major = the system isn't doing its job. minor = it runs, but badly. */
export type Severity = "major" | "minor" | "check" | "safety";
export type VerdictKind = "safety" | "tune-up" | "repair" | "repair-note" | "replace";

export type Symptom = {
  id: string;
  label: string;
  severity: Severity;
  /** "What we'd check first", 2 to 3 bullets. */
  checks: string[];
};

export type PriceRange = { label: string; range: string };

export type Result = {
  kind: VerdictKind;
  label: string;
  verdict: string;
  /** Shown when the visitor picked "Not sure" for age. */
  ageHint?: string;
  checks: string[];
  prices: PriceRange[];
  pushPlan: boolean;
};

export const systems: { id: SystemId; label: string }[] = [
  { id: "furnace", label: "Furnace" },
  { id: "ac", label: "Central AC" },
  { id: "heat-pump", label: "Heat pump" },
];

export const ages: { id: AgeId; label: string }[] = [
  { id: "under-8", label: "Under 8 years" },
  { id: "8-14", label: "8–14 years" },
  { id: "15-plus", label: "15+ years" },
  { id: "not-sure", label: "Not sure" },
];

const coolingSymptoms: Symptom[] = [
  {
    id: "not-cooling",
    label: "Not cooling",
    severity: "major",
    checks: ["Thermostat settings and the air filter", "Capacitor and contactor at the outdoor unit", "Refrigerant level and leaks"],
  },
  {
    id: "runs-constantly",
    label: "Running all the time, bills up",
    severity: "minor",
    checks: ["A dirty outdoor coil", "Low refrigerant", "Leaky ducts or a clogged filter"],
  },
  {
    id: "frozen-or-leaking",
    label: "Frozen lines or leaking water",
    severity: "major",
    checks: ["Airflow: the filter and the blower", "Refrigerant level", "A clogged drain line"],
  },
  {
    id: "wont-turn-on",
    label: "Won't turn on",
    severity: "major",
    checks: ["The breaker and the outdoor disconnect", "The signal from the thermostat", "Capacitor and contactor"],
  },
  {
    id: "check",
    label: "Just want a check",
    severity: "check",
    checks: ["Coils cleaned", "Refrigerant and electrical check", "Drain line cleared"],
  },
];

export const symptoms: Record<SystemId, Symptom[]> = {
  furnace: [
    {
      id: "no-heat",
      label: "No heat at all",
      severity: "major",
      checks: ["Thermostat settings and the furnace power switch", "Igniter and flame sensor", "Air filter and inducer motor"],
    },
    {
      id: "short-cycles",
      label: "Short cycles or blows cold",
      severity: "minor",
      checks: ["A clogged air filter", "Flame sensor and limit switch", "Blocked vents or returns"],
    },
    {
      id: "loud-noises",
      label: "Loud bangs or squeals",
      severity: "minor",
      checks: ["Blower motor and bearings", "Burners lighting late (the bang)", "Loose panels or ductwork"],
    },
    { id: "gas-smell", label: "Gas smell", severity: "safety", checks: [] },
    {
      id: "check",
      label: "Just want a check",
      severity: "check",
      checks: ["Burner and flame sensor", "Heat exchanger check", "Carbon monoxide (CO) test"],
    },
  ],
  ac: coolingSymptoms,
  "heat-pump": [
    ...coolingSymptoms.slice(0, -1),
    {
      id: "struggles-below-30",
      label: "Struggles below 30°F",
      severity: "major",
      checks: ["The defrost cycle and outdoor sensor", "Backup heat strips", "Refrigerant charge"],
    },
    ...coolingSymptoms.slice(-1),
  ],
};

/** Sample ranges. The page adds "(sample)" after every one. */
export const ranges = {
  diagnostic: { label: "Diagnostic visit", range: "$89–$129" },
  tuneUp: { label: "Tune-up", range: "$129–$179" },
  furnaceRepair: { label: "Common furnace repair (igniter, flame sensor, inducer motor)", range: "$180–$650" },
  acRepair: { label: "Common AC repair (capacitor, contactor, refrigerant leak fix)", range: "$150–$900" },
  heatPumpRepair: { label: "Common heat pump repair (capacitor, contactor, refrigerant leak fix)", range: "$150–$900" },
  newFurnace: { label: "New furnace installed", range: "$4,500–$8,500" },
  newAc: { label: "New central AC installed", range: "$5,500–$10,000" },
  newHeatPump: { label: "New heat pump installed", range: "$8,000–$15,000" },
} satisfies Record<string, PriceRange>;

const repairRange: Record<SystemId, PriceRange> = {
  furnace: ranges.furnaceRepair,
  ac: ranges.acRepair,
  "heat-pump": ranges.heatPumpRepair,
};

const replaceRange: Record<SystemId, PriceRange> = {
  furnace: ranges.newFurnace,
  ac: ranges.newAc,
  "heat-pump": ranges.newHeatPump,
};

export const verdicts: Record<VerdictKind, { label: string; verdict: string }> = {
  safety: {
    label: "Safety first",
    verdict:
      "Leave the house, don't flip switches, and call Xcel Energy's gas emergency line from outside. Then call us.",
  },
  "tune-up": {
    label: "Tune-up",
    verdict: "Nothing's broken, so a tune-up is the right call.",
  },
  repair: {
    label: "Repair",
    verdict: "Almost always worth fixing at this age.",
  },
  "repair-note": {
    label: "Repair, with a note",
    verdict:
      "Usually worth repairing. If the fix is over about a third of a new system, ask for a replace quote too.",
  },
  replace: {
    label: "Replace conversation",
    verdict: "At this age, a big repair is often money into an old system. Get both numbers.",
  },
};

export const ageHint = "Look for the date on the label inside the furnace door or on the outdoor unit.";
export const ageHintFallback = "Until you find it, we've treated your system as 8–14 years old.";
export const rangesNote = "Sample ranges for a concept site. Real prices depend on the system and the home.";

export const sample = (range: string) => `${range} (sample)`;

/** The rules, top to bottom. The first one that matches wins. */
function pickVerdict(age: AgeId, severity: Severity): VerdictKind {
  if (severity === "safety") return "safety";
  if (severity === "check") return "tune-up";
  // "Not sure" is treated as the middle age band.
  const band = age === "not-sure" ? "8-14" : age;
  if (band === "under-8") return "repair";
  if (band === "8-14") return "repair-note";
  return severity === "major" ? "replace" : "repair-note";
}

export function getResult(system: SystemId, age: AgeId, symptomId: string): Result {
  const symptom = symptoms[system].find((s) => s.id === symptomId) ?? symptoms[system][0];
  const kind = pickVerdict(age, symptom.severity);

  const prices: PriceRange[] =
    kind === "safety"
      ? []
      : kind === "tune-up"
        ? [ranges.tuneUp]
        : kind === "repair"
          ? [ranges.diagnostic, repairRange[system]]
          : [ranges.diagnostic, repairRange[system], replaceRange[system]];

  return {
    kind,
    ...verdicts[kind],
    ageHint: age === "not-sure" && kind !== "safety" && kind !== "tune-up" ? ageHint : undefined,
    checks: symptom.checks,
    prices,
    pushPlan: kind === "tune-up",
  };
}
