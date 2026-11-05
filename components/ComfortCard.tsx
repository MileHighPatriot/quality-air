"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import Icon from "@/components/Icon";
import { seasonForMonth, seasons } from "@/data/season";
import { site } from "@/data/site";
import { modeFor, useWeather, type Weather } from "@/lib/useWeather";

// The gauge runs from -10°F (far left, heat) to 100°F (far right, cool) over a 240° sweep.
const MIN = -10;
const MAX = 100;
const angleFor = (temp: number) => 150 + 240 * Math.min(1, Math.max(0, (temp - MIN) / (MAX - MIN)));
const point = (deg: number, r = 78) => {
  const rad = (deg * Math.PI) / 180;
  return [100 + r * Math.cos(rad), 100 + r * Math.sin(rad)] as const;
};
const [sx, sy] = point(150);
const [ex, ey] = point(390);

const subscribe = () => () => {};

/** Live "Aurora right now" card: outdoor temperature on a heat/cool gauge, plus what to do about it. */
export default function ComfortCard({ className = "" }: { className?: string }) {
  const state = useWeather();
  const month = useSyncExternalStore(subscribe, () => new Date().getMonth(), () => 10);
  const weather = state.status === "ok" ? state.weather : null;
  const angle = angleFor(weather?.now ?? 50);

  return (
    <div className={`comfort-card rounded-[1.5rem] border border-line bg-card p-5 shadow-xl shadow-ink/10 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow !text-pine">Aurora right now</p>
        <p className="flex items-center gap-1.5 text-xs font-bold text-slate">
          <span className={`h-2 w-2 rounded-full ${weather ? "bg-[#2f9e5f]" : "bg-line"}`} aria-hidden="true" />
          {weather ? "Live" : state.status === "error" ? "Offline" : "Loading"}
        </p>
      </div>

      <div className="mt-2 grid grid-cols-[8.5rem_1fr] items-center gap-4">
        <svg viewBox="0 0 200 172" className="w-full" aria-hidden="true">
          <defs>
            <linearGradient id="qa-gauge" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#e06a2b" />
              <stop offset="0.5" stopColor="#e3ddd0" />
              <stop offset="1" stopColor="#3a8dde" />
            </linearGradient>
          </defs>
          <path
            d={`M${sx} ${sy}A78 78 0 1 1 ${ex} ${ey}`}
            fill="none"
            stroke="url(#qa-gauge)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <g className="comfort-needle" style={{ transform: `rotate(${angle}deg)` }}>
            <circle cx="178" cy="100" r="13" fill="#ffffff" stroke="#10201a" strokeWidth="4" />
          </g>
          <text x="100" y="114" textAnchor="middle" className="font-display" fontSize="50" fontWeight="800" fill="#1f4d3a">
            {weather ? `${weather.now}°` : "--"}
          </text>
          <text x="38" y="166" textAnchor="middle" fontSize="15" fontWeight="700" fill="#9c4212">
            HEAT
          </text>
          <text x="162" y="166" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1f66b0">
            COOL
          </text>
        </svg>

        <dl className="grid gap-2 text-sm">
          <div>
            <dt className="font-bold text-slate">Tonight</dt>
            <dd className="font-display text-2xl font-extrabold text-ember-deep">{weather ? `${weather.tonightLow}°` : "--"}</dd>
          </div>
          <div>
            <dt className="font-bold text-slate">Tomorrow</dt>
            <dd className="font-display text-2xl font-extrabold text-sky-deep">{weather ? `${weather.tomorrowHigh}°` : "--"}</dd>
          </div>
        </dl>
      </div>

      <p className="sr-only" aria-live="polite">
        {weather ? `Aurora is ${weather.now} degrees now, ${weather.tonightLow} tonight, ${weather.tomorrowHigh} tomorrow.` : ""}
      </p>
      <Advice weather={weather} fallback={seasons[seasonForMonth(month)].text} />
    </div>
  );
}

function Advice({ weather, fallback }: { weather: Weather | null; fallback: string }) {
  const cta = "mt-3 inline-flex min-h-11 items-center gap-1.5 font-bold text-pine underline underline-offset-4 hover:text-ember-deep";
  if (!weather) {
    return (
      <div className="mt-3 border-t border-line pt-3">
        <p className="font-bold">{fallback}</p>
        <Link href="/maintenance-plan/" className={cta}>
          See the tune-up plans <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const mode = modeFor(weather);
  if (mode === "heat" && weather.tonightLow <= 20) {
    return (
      <div className="mt-3 border-t border-line pt-3">
        <p className="font-bold">Hard freeze tonight. If the furnace quits, don&apos;t wait for morning.</p>
        <a href={site.phoneHref} className={cta}>
          <Icon name="phone" className="h-4 w-4" /> We answer 24/7: {site.phone}
        </a>
      </div>
    );
  }
  const copy = {
    heat: { text: `Down to ${weather.tonightLow}° tonight. Is the furnace ready?`, link: "Book a furnace tune-up" },
    cool: { text: `${weather.tomorrowHigh}° tomorrow. Is the AC keeping up?`, link: "Book an AC check" },
    mild: { text: "Mild weather. A good week to get ahead of the season.", link: "Book a tune-up" },
  }[mode];
  return (
    <div className="mt-3 border-t border-line pt-3">
      <p className="font-bold">{copy.text}</p>
      <Link href="/maintenance-plan/" className={cta}>
        {copy.link} <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </div>
  );
}
