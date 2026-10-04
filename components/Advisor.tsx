"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "@/components/Icon";
import {
  ageHintFallback,
  ages,
  getResult,
  rangesNote,
  sample,
  symptoms,
  systems,
  type AgeId,
  type SystemId,
} from "@/data/advisor";
import { plans } from "@/data/plans";
import { site } from "@/data/site";

const systemIcon: Record<SystemId, IconName> = { furnace: "flame", ac: "snow", "heat-pump": "swap" };
const systemTone: Record<SystemId, string> = {
  furnace: "bg-ember-soft text-ember-deep",
  ac: "bg-sky-soft text-sky-deep",
  "heat-pump": "bg-pine-soft text-pine",
};

const questions = ["What kind of system is it?", "About how old is it?", "What's it doing?"];

const optionClass =
  "flex min-h-16 w-full items-center gap-3.5 rounded-2xl border-2 border-line bg-card px-4 py-3 text-left text-lg font-bold text-ink transition-colors hover:border-pine hover:bg-pine-soft";

export default function Advisor() {
  const [step, setStep] = useState(0);
  const [system, setSystem] = useState<SystemId>();
  const [age, setAge] = useState<AgeId>();
  const [symptomId, setSymptomId] = useState<string>();

  // Move focus to the new question (or the result) after each step, but not on first load.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  useEffect(() => {
    if (moved.current) headingRef.current?.focus();
  }, [step]);

  const go = (next: number) => {
    moved.current = true;
    setStep(next);
  };
  const restart = () => {
    setSystem(undefined);
    setAge(undefined);
    setSymptomId(undefined);
    go(0);
  };

  const systemLabel = systems.find((s) => s.id === system)?.label;
  const ageLabel = ages.find((a) => a.id === age)?.label;
  const symptomLabel = system && symptoms[system].find((s) => s.id === symptomId)?.label;
  const answers = [systemLabel, ageLabel, symptomLabel].filter(Boolean).slice(0, step);

  const backButton = (
    <button type="button" className="btn btn-line" onClick={() => go(step - 1)}>
      <Icon name="back" className="h-4 w-4" /> Back
    </button>
  );

  if (step < 3) {
    return (
      <div className="card p-5 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-bold text-slate">Question {step + 1} of 3</p>
          <div className="flex gap-1.5" aria-hidden="true">
            {questions.map((q, i) => (
              <span key={q} className={`h-2 w-8 rounded-full ${i <= step ? "bg-pine" : "bg-line"}`} />
            ))}
          </div>
        </div>

        {answers.length > 0 && <p className="mt-3 text-slate">So far: {answers.join(", ")}</p>}

        <h2 ref={headingRef} tabIndex={-1} className="t-h2 mt-4 outline-none">
          {questions[step]}
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {step === 0 &&
            systems.map((s) => (
              <button
                key={s.id}
                type="button"
                className={optionClass}
                onClick={() => {
                  // The symptom list depends on the system, so a new system clears it.
                  if (s.id !== system) setSymptomId(undefined);
                  setSystem(s.id);
                  go(1);
                }}
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${systemTone[s.id]}`}>
                  <Icon name={systemIcon[s.id]} className="h-6 w-6" />
                </span>
                {s.label}
              </button>
            ))}

          {step === 1 &&
            ages.map((a) => (
              <button
                key={a.id}
                type="button"
                className={optionClass}
                onClick={() => {
                  setAge(a.id);
                  go(2);
                }}
              >
                {a.label}
              </button>
            ))}

          {step === 2 &&
            system &&
            symptoms[system].map((s) => (
              <button
                key={s.id}
                type="button"
                className={optionClass}
                onClick={() => {
                  setSymptomId(s.id);
                  go(3);
                }}
              >
                {s.label}
              </button>
            ))}
        </div>

        {step > 0 && <div className="mt-6">{backButton}</div>}
      </div>
    );
  }

  if (!system || !age || !symptomId) return null;
  const result = getResult(system, age, symptomId);

  if (result.kind === "safety") {
    return (
      <div className="on-dark rounded-[1.25rem] bg-alert p-6 text-white sm:p-10">
        <p className="flex items-center gap-2.5 text-lg font-extrabold tracking-wide uppercase">
          <Icon name="alert" className="h-7 w-7" /> {result.label}
        </p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-4 text-[1.75rem] leading-tight text-white outline-none sm:text-4xl">
          {result.verdict}
        </h2>
        <p className="mt-5 text-lg text-white/90">
          No price and no questions on this one. Get everyone outside first.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={site.phoneHref} className="btn btn-white">
            <Icon name="phone" className="h-4 w-4" /> Call {site.phone}
          </a>
          <button type="button" className="btn border-white text-white hover:bg-white/10" onClick={() => go(2)}>
            <Icon name="back" className="h-4 w-4" /> Back
          </button>
          <button type="button" className="btn border-white text-white hover:bg-white/10" onClick={restart}>
            Start over
          </button>
        </div>
      </div>
    );
  }

  const tone =
    result.kind === "replace" ? "bg-ember-soft text-ember-deep" : result.kind === "tune-up" ? "bg-sky-soft text-sky-deep" : "bg-pine-soft text-pine";

  return (
    <div className="card p-5 sm:p-8">
      <p className="text-slate">
        {systemLabel}, {ageLabel}, {symptomLabel}
      </p>
      <p className={`mt-4 w-fit rounded-full px-3.5 py-1.5 text-sm font-extrabold tracking-wide uppercase ${tone}`}>
        {result.label}
      </p>
      <h2 ref={headingRef} tabIndex={-1} className="mt-3 text-[1.625rem] leading-snug outline-none sm:text-3xl">
        {result.verdict}
      </h2>

      {result.ageHint && (
        <p className="mt-5 rounded-xl bg-sand p-4">
          <strong>Not sure how old it is?</strong> {result.ageHint} {ageHintFallback}
        </p>
      )}

      <div className="mt-7 grid gap-7 md:grid-cols-2">
        <div>
          <h3 className="t-h3">What we&apos;d check first</h3>
          <ul className="mt-3 grid gap-2.5">
            {result.checks.map((c) => (
              <li key={c} className="flex gap-2.5">
                <Icon name="check" className="mt-1 h-5 w-5 text-pine" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="t-h3">Sample price range</h3>
          <dl className="mt-3 grid gap-3">
            {result.prices.map((p) => (
              <div key={p.label} className="rounded-xl border border-line bg-paper px-4 py-3">
                <dt className="text-slate">{p.label}</dt>
                <dd className="mt-0.5 text-xl font-extrabold text-pine">{sample(p.range)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-base text-slate">{rangesNote}</p>
        </div>
      </div>

      {result.pushPlan && (
        <div className="mt-7 rounded-xl bg-pine-soft p-5">
          <h3 className="t-h3">A plan covers this, twice a year.</h3>
          <p className="mt-2">
            The maintenance plan includes a furnace tune-up in the fall and an AC tune-up in the spring, from{" "}
            {plans[0].price}.
          </p>
          <Link href="/maintenance-plan/" className="btn btn-pine mt-4">
            See the maintenance plan <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={site.phoneHref} className="btn btn-pine">
          <Icon name="phone" className="h-4 w-4" /> Call {site.phone}
        </a>
        <a href="#book" className="btn btn-line">
          Book a visit
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
        {backButton}
        <button type="button" className="btn text-pine underline underline-offset-4 hover:bg-pine-soft" onClick={restart}>
          Start over
        </button>
      </div>
    </div>
  );
}
