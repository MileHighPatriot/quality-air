import type { Metadata } from "next";
import Link from "next/link";
import Airflow from "@/components/Airflow";
import ComfortCard from "@/components/ComfortCard";
import DemoForm from "@/components/DemoForm";
import Icon from "@/components/Icon";
import OfficeStatus from "@/components/OfficeStatus";
import Photo from "@/components/Photo";
import YearCurve from "@/components/YearCurve";
import { reviews, services, toolQuestions, trustPoints } from "@/data/home";
import { plans } from "@/data/plans";
import { liveUrl, site } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({ path: "/" });

/** Structured data for the fictional business, so the concept shows what a real client's site would include. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: `${site.name} (concept project)`,
  description: `Concept project. ${site.name} is a fictional Aurora furnace and AC company built as a portfolio piece. It is not a real company.`,
  url: `${liveUrl}/`,
  telephone: site.phoneHref.replace(/^tel:\+1(\d{3})(\d{3})(\d{4})$/, "+1-$1-$2-$3"),
  email: site.email,
  image: `${liveUrl}/og.jpg`,
  areaServed: { "@type": "Place", name: "Aurora and the east Denver metro, Colorado (example area)" },
  slogan: "Concept project",
  disambiguatingDescription: "Fictional business for a concept website. No real address, license, or reviews.",
};

const toneClass = {
  ember: "bg-ember-soft text-ember-deep",
  sky: "bg-sky-soft text-sky-deep",
  pine: "bg-pine-soft text-pine",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* 1. Hero */}
      <section className="hero-wash relative isolate overflow-hidden bg-card">
        <Airflow className="-z-10" />
        <div className="wrap grid grid-cols-1 items-center gap-10 pt-10 pb-12 md:pt-16 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:pt-20 lg:pb-20">
          <div className="min-w-0">
            <p className="eyebrow">Heating and cooling in {site.homeCity}</p>
            <h1 className="t-hero mt-4">
              <span className="line-mask">
                <span className="line-rise">
                  <span className="text-ember-deep">Heat</span> that shows up.
                </span>
              </span>{" "}
              <span className="line-mask">
                <span className="line-rise" style={{ "--d": "120ms" } as React.CSSProperties}>
                  <span className="text-sky-deep">Cool</span> that keeps up.
                </span>
              </span>
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
            <a
              href={site.phoneHref}
              className="mt-6 flex w-fit flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-ember/30 bg-ember-soft px-4 py-3 text-ink hover:border-ember"
            >
              <Icon name="flame" className="h-5 w-5 text-ember-deep" />
              <span className="font-bold">{site.emergency}</span>
              <OfficeStatus className="text-ember-deep" />
            </a>
          </div>

          <div className="relative pb-0 lg:pb-10">
            <div className="hero-photo photo-in overflow-hidden rounded-[2rem] bg-sand shadow-[0_40px_80px_-40px_rgb(16_32_26/0.45)]">
              <Photo
                name="snowyHouse"
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="aspect-[16/11] h-full w-full object-cover lg:aspect-[5/5.4]"
              />
            </div>
            <ComfortCard className="card-in relative mx-3 -mt-16 sm:mx-auto sm:max-w-sm lg:absolute lg:bottom-0 lg:-left-12 lg:mx-0 lg:mt-0 lg:w-[22rem]" />
          </div>
        </div>
      </section>

      {/* 2. Trust points */}
      <section className="on-dark bg-pine text-white">
        <ul className="wrap grid gap-8 py-10 md:grid-cols-3 md:py-12">
          {trustPoints.map((t) => (
            <li key={t.title} className="reveal flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#ffb38a]">
                <Icon name={t.icon} className="h-6 w-6" />
              </span>
              <div>
                <h2 className="t-h3 !text-white">{t.title}</h2>
                <p className="mt-1 text-white/80">{t.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Services */}
      <section id="services" className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-12">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="t-h2 mt-3">Four things, done well.</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.title} className="card reveal lift">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${toneClass[s.tone]}`}>
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="t-h3 mt-4">{s.title}</h3>
                  <p className="mt-2 text-slate">{s.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/pricing/" className="btn btn-pine">
                See the prices <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/no-heat/" className="btn btn-line">
                No heat right now? Check these first
              </Link>
            </div>
          </div>
          <figure className="relative hidden lg:block">
            <Photo
              name="heatPump"
              sizes="20rem"
              className="h-full max-h-[40rem] w-full rounded-[2rem] object-cover object-[22%_55%]"
            />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-card/95 p-4 text-base shadow-lg shadow-ink/10">
              <strong className="block font-display text-pine">Heat pumps, too.</strong>
              Sized for Colorado winters, with backup heat for the coldest nights.
            </figcaption>
          </figure>
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
              <li key={q} className="card reveal-side flex items-center gap-4 py-4" style={{ "--i": i } as React.CSSProperties}>
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
          <div className="mt-8">
            <YearCurve />
          </div>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:max-w-3xl">
            {plans.map((p) => (
              <li key={p.id} className={`card reveal lift ${p.featured ? "border-2 border-pine" : ""}`}>
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
              <li key={r.by} className="card reveal lift">
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
            <figure className="relative mt-8">
              <Photo
                name="techPanel"
                sizes="(min-width: 1024px) 26rem, (min-width: 768px) 40vw, 100vw"
                className="aspect-[4/4.4] w-full rounded-[2rem] object-cover object-[60%_45%] md:aspect-[4/4.2]"
              />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-card/95 p-4 text-base shadow-lg shadow-ink/10">
                <strong className="block font-display text-pine">Paid hourly, not on commission.</strong>
                The tech fixes what&apos;s broken. Nobody earns more by selling you a bigger repair.
              </figcaption>
            </figure>
          </div>
          <DemoForm variant="contact" />
        </div>
      </section>
    </>
  );
}
