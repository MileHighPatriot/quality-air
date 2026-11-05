"use client";

import { useId, useState } from "react";
import { ranges } from "@/data/advisor";
import { plans, secondSystemMonthly } from "@/data/plans";

// Low ends of the sample ranges, so the math never oversells the plan.
const low = (range: string) => Number(range.replace(/[^0-9–]/g, "").split("–")[0]);
const TUNE_UP = low(ranges.tuneUp.range);
const OVERTIME = low(ranges.afterHours.range);

const repairChoices = [
  { label: "None", value: 0 },
  { label: "Small, about $300", value: 300 },
  { label: "Bigger, about $800", value: 800 },
];
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** "What the plan saves": tune-ups you'd pay for anyway, repair discount, and waived after-hours fees. */
export default function PlanCalculator() {
  const id = useId();
  const [systems, setSystems] = useState(1);
  const [repair, setRepair] = useState(300);
  const [weekday, setWeekday] = useState(0);
  const [weekend, setWeekend] = useState(1);

  const rows = plans.map((p) => {
    const cost = (p.monthly + (systems - 1) * secondSystemMonthly) * 12;
    const tuneUps = TUNE_UP * 2 * systems;
    const discount = repair * p.repairDiscount;
    const overtime = OVERTIME * (weekday + (p.noOvertime === "all" ? weekend : 0));
    const value = tuneUps + discount + overtime;
    return { plan: p, cost, tuneUps, discount, overtime, net: value - cost };
  });

  const counter = (label: string, value: number, set: (n: number) => void, max: number) => (
    <div>
      <p className="field-label" id={`${id}-${label}`}>
        {label}
      </p>
      <div className="flex items-center gap-2" role="group" aria-labelledby={`${id}-${label}`}>
        <button type="button" className="btn btn-line h-12 w-12 px-0" onClick={() => set(Math.max(0, value - 1))} aria-label={`Fewer: ${label}`}>
          −
        </button>
        <output className="w-10 text-center text-2xl font-extrabold text-pine" aria-live="polite">
          {value}
        </output>
        <button type="button" className="btn btn-line h-12 w-12 px-0" onClick={() => set(Math.min(max, value + 1))} aria-label={`More: ${label}`}>
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="card grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1.15fr]">
      <div className="grid content-start gap-6">
        <fieldset>
          <legend className="field-label">Systems in the house</legend>
          <div className="flex gap-2">
            {[1, 2].map((n) => (
              <label key={n} className={`btn flex-1 cursor-pointer ${systems === n ? "btn-pine" : "btn-line"}`}>
                <input type="radio" name={`${id}-systems`} className="sr-only" checked={systems === n} onChange={() => setSystems(n)} />
                {n === 1 ? "One furnace + AC" : "Two"}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="field-label">A repair this year?</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {repairChoices.map((c) => (
              <label key={c.value} className={`btn cursor-pointer px-3 text-base ${repair === c.value ? "btn-pine" : "btn-line"}`}>
                <input type="radio" name={`${id}-repair`} className="sr-only" checked={repair === c.value} onChange={() => setRepair(c.value)} />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-6 sm:grid-cols-2">
          {counter("Weeknight calls", weekday, setWeekday, 4)}
          {counter("Weekend calls", weekend, setWeekend, 4)}
        </div>
      </div>

      <div className="grid content-start gap-4 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.plan.id} className={`rounded-2xl border-2 p-5 ${r.plan.featured ? "border-pine" : "border-line"}`}>
            <h3 className="t-h3">{r.plan.name}</h3>
            <dl className="mt-3 grid gap-1.5 text-base">
              <Row label="Tune-ups included" value={usd(r.tuneUps)} />
              <Row label={`${r.plan.repairDiscount * 100}% off the repair`} value={usd(r.discount)} />
              <Row label="After-hours fees waived" value={usd(r.overtime)} />
              <Row label="Plan for a year" value={`−${usd(r.cost)}`} />
            </dl>
            <p className={`mt-4 border-t border-line pt-3 font-display text-3xl font-extrabold ${r.net >= 0 ? "text-pine" : "text-slate"}`}>
              {r.net >= 0 ? `You keep ${usd(r.net)}` : `Costs ${usd(-r.net)} more`}
            </p>
          </div>
        ))}
        <p className="text-base text-slate sm:col-span-2">
          Sample math using the low end of each sample price, so it never oversells. Priority scheduling and the
          free filters aren&apos;t counted.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-slate">{label}</dt>
      <dd className="font-bold whitespace-nowrap">{value}</dd>
    </div>
  );
}
