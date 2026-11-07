import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ranges, rangesNote, sample, type PriceRange } from "@/data/advisor";
import { plans } from "@/data/plans";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Prices",
  description:
    "Sample price ranges for furnace and AC repair, tune-ups, and new systems in Aurora. The same ranges the repair-or-replace tool uses.",
  path: "/pricing/",
});

const groups: { title: string; icon: "wrench" | "flame" | "home"; note: string; items: PriceRange[] }[] = [
  {
    title: "Visits",
    icon: "wrench",
    note: "The diagnostic fee goes toward the repair if you go ahead.",
    items: [ranges.diagnostic, ranges.tuneUp, ranges.afterHours],
  },
  {
    title: "Repairs",
    icon: "flame",
    note: "You get a firm number before any work starts.",
    items: [ranges.furnaceRepair, ranges.acRepair, ranges.heatPumpRepair],
  },
  {
    title: "New systems",
    icon: "home",
    note: "Installed, with haul-away and the permit. Written quote you can compare.",
    items: [ranges.newFurnace, ranges.newAc, ranges.newHeatPump, ranges.thermostat, ranges.ductClean],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-10 pb-8 md:pt-16">
        <div className="wrap max-w-3xl">
          <p className="eyebrow">Prices</p>
          <h1 className="t-hero mt-4">The price, before we show up.</h1>
          <p className="t-lede mt-5">
            These are the ranges we quote on the phone. The repair-or-replace tool uses the same numbers.
          </p>
          <p className="mt-4 w-fit rounded-full bg-sand px-3 py-1 text-sm font-bold text-slate">{rangesNote}</p>
        </div>
      </section>

      <section className="pb-14">
        <div className="wrap grid gap-5 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title} className="card flex flex-col p-6">
              <h2 className="t-h3 flex items-center gap-2.5 text-2xl">
                <Icon name={g.icon} className="h-6 w-6 text-ember-deep" /> {g.title}
              </h2>
              <dl className="mt-4 grid flex-1 content-start">
                {g.items.map((p) => (
                  <div key={p.label} className="border-b border-line py-3 last:border-b-0">
                    <dt className="text-slate">{p.label}</dt>
                    <dd className="mt-0.5 text-xl font-extrabold text-pine">{sample(p.range)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 rounded-xl bg-pine-soft px-4 py-3 text-base font-bold text-pine">{g.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-sand">
        <div className="wrap grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="t-h2">Not sure which line is yours?</h2>
            <p className="t-lede mt-4">
              Three questions about your system and what it&apos;s doing, and you&apos;ll get the range that fits.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href="/repair-or-replace/" className="btn btn-pine">
              Repair or replace? Find out <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a href={site.phoneHref} className="btn btn-line">
              <Icon name="phone" className="h-4 w-4" /> Or call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="t-h2">Plan members pay less.</h2>
          <p className="t-lede mt-4 max-w-2xl">
            {plans.map((p) => `${p.name} takes ${p.repairDiscount * 100}% off repairs`).join(" and ")}, and
            the tune-ups are included.
          </p>
          <Link href="/maintenance-plan/#savings" className="btn btn-line mt-6">
            See what a plan saves you <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
