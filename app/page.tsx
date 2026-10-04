import Link from "next/link";
import DemoForm from "@/components/DemoForm";
import Icon from "@/components/Icon";
import Ridge from "@/components/Ridge";
import { reviews, services, toolQuestions, trustPoints } from "@/data/home";
import { plans } from "@/data/plans";
import { site } from "@/data/site";

const toneClass = {
  ember: "bg-ember-soft text-ember-deep",
  sky: "bg-sky-soft text-sky-deep",
  pine: "bg-pine-soft text-pine",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="overflow-hidden bg-card">
        <div className="wrap grid items-center gap-10 pt-12 pb-10 md:pt-20 md:pb-14 lg:grid-cols-[2fr_1fr]">
          <div>
            <p className="eyebrow">Heating and cooling in {site.homeCity}</p>
            <h1 className="t-hero mt-4">
              Heat that shows up. <span className="block">Cool that keeps up.</span>
            </h1>
            <p className="t-lede mt-5 max-w-xl">{site.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/repair-or-replace/" className="btn btn-pine">
                Repair or replace? Find out in 30 seconds
              </Link>
              <a href={site.phoneHref} className="btn btn-line">
                <Icon name="phone" className="h-4 w-4" /> Call {site.phone}
              </a>
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true">
            <ComfortDial />
          </div>
        </div>
        <Ridge className="h-14 text-pine md:h-24" fill="#faf8f4" />
      </section>

      {/* 2. Trust points */}
      <section className="pt-10 pb-4 md:pt-14">
        <ul className="wrap grid gap-6 md:grid-cols-3 md:gap-8">
          {trustPoints.map((t) => (
            <li key={t.title} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pine-soft text-pine">
                <Icon name={t.icon} className="h-6 w-6" />
              </span>
              <div>
                <h2 className="t-h3">{t.title}</h2>
                <p className="mt-1 text-slate">{t.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Services */}
      <section id="services" className="section">
        <div className="wrap">
          <p className="eyebrow">What we do</p>
          <h2 className="t-h2 mt-3">Four things, done well.</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.title} className="card">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${toneClass[s.tone]}`}>
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="t-h3 mt-4">{s.title}</h3>
                <p className="mt-2 text-slate">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Tool teaser */}
      <section className="section bg-pine-soft">
        <div className="wrap grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className="eyebrow">Free tool</p>
            <h2 className="t-h2 mt-3">Repair or replace?</h2>
            <p className="t-lede mt-4">
              Answer 3 questions. You&apos;ll get a straight answer and a sample price range, before anyone comes to the
              house.
            </p>
            <Link href="/repair-or-replace/" className="btn btn-pine mt-7">
              Try it: 30 seconds <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <ol className="grid gap-3">
            {toolQuestions.map((q, i) => (
              <li key={q} className="card flex items-center gap-4 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine font-extrabold text-white">
                  {i + 1}
                </span>
                <span className="text-lg font-bold">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Maintenance plan teaser */}
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Maintenance plan</p>
          <h2 className="t-h2 mt-3">Two tune-ups a year. No surprises.</h2>
          <p className="t-lede mt-4 max-w-2xl">
            A furnace check in the fall, an AC check in the spring, and priority when something breaks.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:max-w-3xl">
            {plans.map((p) => (
              <li key={p.id} className={`card ${p.featured ? "border-2 border-pine" : ""}`}>
                <h3 className="t-h3">{p.name}</h3>
                <p className="mt-1 text-2xl font-extrabold text-pine">{p.price}</p>
              </li>
            ))}
          </ul>
          <Link href="/maintenance-plan/" className="btn btn-pine mt-7">
            Compare the plans <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 6. Sample reviews */}
      <section className="section bg-sand">
        <div className="wrap">
          <h2 className="t-h2">What a good service call sounds like.</h2>
          <p className="mt-3 font-bold text-slate">{site.reviewsLabel}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.by} className="card">
                <figure className="flex h-full flex-col">
                  <blockquote className="flex-1">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 font-bold text-pine">{r.by}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Service area */}
      <section id="service-area" className="section pb-0 md:pb-0">
        <div className="wrap">
          <p className="eyebrow">Service area</p>
          <h2 className="t-h2 mt-3">Aurora and the east metro.</h2>
          <p className="t-lede mt-4 max-w-2xl">
            Our techs work in {site.cities.slice(0, -1).join(", ")}, and {site.cities.at(-1)}. Not sure if you&apos;re
            in range? Call and ask.
          </p>
        </div>
      </section>

      {/* 8. Contact form */}
      <section id="contact" className="section">
        <div className="wrap grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-14">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="t-h2 mt-3">Tell us what&apos;s going on.</h2>
            <p className="t-lede mt-4">Leave a number and the office calls you back. Or skip the form and call.</p>
            <a href={site.phoneHref} className="btn btn-line mt-6">
              <Icon name="phone" className="h-4 w-4" /> Call {site.phone}
            </a>
          </div>
          <DemoForm variant="contact" />
        </div>
      </section>
    </>
  );
}

/** Decorative thermostat: ember on the heat side, sky on the cool side. */
function ComfortDial() {
  return (
    <svg viewBox="0 0 240 240" className="mx-auto w-full max-w-[18rem]">
      <circle cx="120" cy="120" r="112" fill="#faf8f4" stroke="#e3ddd0" strokeWidth="2" />
      <path d="M120 28a92 92 0 0 0 0 184" fill="none" stroke="#e06a2b" strokeWidth="14" strokeLinecap="round" />
      <path d="M120 28a92 92 0 0 1 0 184" fill="none" stroke="#3a8dde" strokeWidth="14" strokeLinecap="round" />
      <text x="120" y="138" textAnchor="middle" fontSize="64" fontWeight="800" fill="#1f4d3a" letterSpacing="-2">
        70°
      </text>
      <text x="76" y="170" textAnchor="middle" fontSize="15" fontWeight="700" fill="#9c4212">
        HEAT
      </text>
      <text x="164" y="170" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1f66b0">
        COOL
      </text>
    </svg>
  );
}
