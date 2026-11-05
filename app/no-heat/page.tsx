import type { Metadata } from "next";
import Checklist from "@/components/Checklist";
import Icon from "@/components/Icon";
import OfficeStatus from "@/components/OfficeStatus";
import Photo from "@/components/Photo";
import { site } from "@/data/site";
import { noCool, noHeat, stopAndCall } from "@/data/troubleshoot";

export const metadata: Metadata = {
  title: "No heat or no cool? Check these first",
  description:
    "Six quick checks before you call for furnace or AC repair, from the thermostat to snow on the vent pipes. Plus what to do if you smell gas.",
};

export default function NoHeatPage() {
  return (
    <>
      <section className="bg-card">
        <div className="wrap grid items-center gap-8 pt-10 pb-10 md:pt-14 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div>
            <p className="eyebrow">Before you call</p>
            <h1 className="t-hero mt-4">No heat? No cool? Check these first.</h1>
            <p className="t-lede mt-5 max-w-xl">
              Plenty of no-heat calls turn out to be something you can fix in a few minutes. If none of these work, call. We
              answer 24/7.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href={site.phoneHref} className="btn btn-pine">
                <Icon name="phone" className="h-4 w-4" /> Call {site.phone}
              </a>
              <OfficeStatus long className="text-slate" />
            </div>
            <nav aria-label="Jump to" className="mt-6 flex flex-wrap gap-2">
              <a href="#no-heat" className="btn btn-line min-h-11 py-2">
                <Icon name="flame" className="h-4 w-4 text-ember-deep" /> No heat
              </a>
              <a href="#no-cool" className="btn btn-line min-h-11 py-2">
                <Icon name="snow" className="h-4 w-4 text-sky-deep" /> No cool
              </a>
            </nav>
          </div>
          <Photo
            name="frontSteps"
            priority
            sizes="(min-width: 1024px) 30rem, 100vw"
            className="hidden aspect-[4/3] w-full rounded-[2rem] object-cover lg:block"
          />
        </div>
      </section>

      {/* Safety first, above the checklists. */}
      <section className="wrap pt-8">
        <div className="on-dark rounded-[1.25rem] bg-alert p-5 text-white sm:p-7">
          <p className="flex items-center gap-2.5 text-lg font-extrabold tracking-wide uppercase">
            <Icon name="alert" className="h-6 w-6" /> Smell gas, or the CO alarm is going off?
          </p>
          <p className="mt-3 max-w-3xl text-lg">
            Skip the checklist. Leave the house now and move away. Don&apos;t flip switches or use anything that could
            spark. From outside, call 911 and Xcel Energy&apos;s gas emergency line.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="tel:911" className="btn btn-white">
              <Icon name="phone" className="h-4 w-4" /> Call 911
            </a>
            <a href={site.xcelGasEmergencyHref} className="btn btn-white">
              <Icon name="phone" className="h-4 w-4" /> Xcel gas emergency {site.xcelGasEmergency}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-10">
          <div id="no-heat">
            <h2 className="t-h2 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-soft text-ember-deep">
                <Icon name="flame" className="h-6 w-6" />
              </span>
              No heat
            </h2>
            <div className="mt-6">
              <Checklist steps={noHeat} tone="ember" />
            </div>
          </div>
          <div id="no-cool">
            <h2 className="t-h2 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-soft text-sky-deep">
                <Icon name="snow" className="h-6 w-6" />
              </span>
              No cool
            </h2>
            <div className="mt-6">
              <Checklist steps={noCool} tone="sky" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="wrap grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <h2 className="t-h2">Stop and call if you see any of these.</h2>
            <p className="t-lede mt-4">Don&apos;t keep resetting it. These need a tech.</p>
          </div>
          <ul className="grid gap-3">
            {stopAndCall.map((s) => (
              <li key={s} className="card flex items-center gap-3 py-4 font-bold">
                <Icon name="alert" className="h-5 w-5 text-ember-deep" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
