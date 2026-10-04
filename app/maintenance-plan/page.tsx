import type { Metadata } from "next";
import DemoForm from "@/components/DemoForm";
import Icon from "@/components/Icon";
import { planFaq, planReasons, plans, tuneUpSteps } from "@/data/plans";

export const metadata: Metadata = {
  title: "Maintenance plan",
  description:
    "Two tune-ups a year: a furnace check in the fall, an AC check in the spring, and priority when something breaks.",
};

export default function MaintenancePlanPage() {
  return (
    <>
      {/* 1. Header */}
      <section className="pt-10 pb-8 md:pt-16">
        <div className="wrap max-w-3xl">
          <p className="eyebrow">Maintenance plan</p>
          <h1 className="t-hero mt-4">Two tune-ups a year. No surprises.</h1>
          <p className="t-lede mt-5">
            A furnace check in the fall, an AC check in the spring, and priority when something breaks.
          </p>
        </div>
      </section>

      {/* 2. Plans */}
      <section className="pb-14">
        <ul className="wrap grid gap-5 md:grid-cols-2">
          {plans.map((p) => (
            <li key={p.id} className={`card flex flex-col p-6 sm:p-8 ${p.featured ? "border-2 border-pine" : ""}`}>
              {p.featured && (
                <p className="mb-3 w-fit rounded-full bg-pine px-3 py-1 text-sm font-bold text-white">Most complete</p>
              )}
              <h2 className="text-2xl">{p.name}</h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-pine">{p.price}</p>
              <p className="mt-4 font-bold">{p.blurb}</p>
              <ul className="mt-3 grid flex-1 content-start gap-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Icon name="check" className="mt-1 h-5 w-5 text-pine" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#signup" className={`btn mt-7 ${p.featured ? "btn-pine" : "btn-line"}`}>
                Choose {p.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="wrap mt-4 text-base text-slate">
          Sample prices for a concept site. Real prices depend on the system and the home.
        </p>
      </section>

      {/* 3. What happens at a tune-up */}
      <section className="section bg-sand">
        <div className="wrap">
          <h2 className="t-h2">What happens at a tune-up</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="card border-t-4 border-t-ember">
              <h3 className="t-h3 flex items-center gap-2.5">
                <Icon name="flame" className="h-6 w-6 text-ember-deep" /> Furnace, in the fall
              </h3>
              <ul className="mt-4 grid gap-2.5">
                {tuneUpSteps.furnace.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <Icon name="check" className="mt-1 h-5 w-5 text-ember-deep" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card border-t-4 border-t-sky">
              <h3 className="t-h3 flex items-center gap-2.5">
                <Icon name="snow" className="h-6 w-6 text-sky-deep" /> AC, in the spring
              </h3>
              <ul className="mt-4 grid gap-2.5">
                {tuneUpSteps.ac.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <Icon name="check" className="mt-1 h-5 w-5 text-sky-deep" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why a plan pays for itself */}
      <section className="section">
        <div className="wrap">
          <h2 className="t-h2">Why a plan pays for itself</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
            {planReasons.map((r, i) => (
              <li key={r.title} className="flex gap-4 md:block">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine font-extrabold text-white">
                  {i + 1}
                </span>
                <div className="md:mt-4">
                  <h3 className="t-h3">{r.title}</h3>
                  <p className="mt-1.5 text-slate">{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="section bg-sand">
        <div className="wrap max-w-3xl">
          <h2 className="t-h2">Questions people ask</h2>
          <div className="mt-6 grid gap-3">
            {planFaq.map((f) => (
              <details key={f.q} className="group card p-0">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-lg font-bold text-pine [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Icon name="chevron" className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sign-up */}
      <section id="signup" className="section">
        <div className="wrap max-w-3xl">
          <h2 className="t-h2">Sign up</h2>
          <p className="t-lede mt-3 mb-7">Pick a plan and leave a number. The office calls to set your first tune-up.</p>
          <DemoForm variant="plan" />
        </div>
      </section>
    </>
  );
}
