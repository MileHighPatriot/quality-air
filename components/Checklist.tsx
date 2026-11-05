"use client";

import { useId, useState } from "react";
import Icon from "@/components/Icon";
import { site } from "@/data/site";
import type { Step } from "@/data/troubleshoot";

/** Tick-off checklist. When everything's ticked and it still isn't fixed, it points to the phone. */
export default function Checklist({ steps, tone }: { steps: Step[]; tone: "ember" | "sky" }) {
  const id = useId();
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));
  const count = done.filter(Boolean).length;
  const accent = tone === "ember" ? "accent-[#9c4212]" : "accent-[#1f66b0]";
  const bar = tone === "ember" ? "bg-ember" : "bg-sky";

  return (
    <div>
      <div className="flex items-center gap-3" aria-live="polite">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className={`h-full rounded-full ${bar} transition-[width] duration-300`} style={{ width: `${(count / steps.length) * 100}%` }} />
        </div>
        <p className="text-sm font-bold text-slate">
          {count} of {steps.length} checked
        </p>
      </div>

      <ol className="mt-5 grid gap-3">
        {steps.map((s, i) => (
          <li key={s.title}>
            <label
              htmlFor={`${id}-${i}`}
              className={`card flex cursor-pointer gap-4 p-4 transition-colors sm:p-5 ${done[i] ? "border-pine/40 bg-pine-soft" : "hover:border-pine/40"}`}
            >
              <input
                id={`${id}-${i}`}
                type="checkbox"
                checked={done[i]}
                onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                className={`mt-1 h-6 w-6 shrink-0 ${accent}`}
              />
              <span>
                <span className="block text-lg font-bold text-ink">
                  {i + 1}. {s.title}
                </span>
                <span className="mt-1 block text-slate">{s.body}</span>
              </span>
            </label>
          </li>
        ))}
      </ol>

      {count === steps.length && (
        <div role="status" className="on-dark mt-5 rounded-[1.25rem] bg-pine p-5 text-white sm:p-6">
          <p className="text-lg font-bold">All checked and still not working? That&apos;s our job now.</p>
          <a href={site.phoneHref} className="btn btn-ember mt-4">
            <Icon name="phone" className="h-4 w-4" /> Call {site.phone}
          </a>
        </div>
      )}
    </div>
  );
}
