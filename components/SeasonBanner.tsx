"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import Icon from "@/components/Icon";
import { seasonForMonth, seasons, type Season } from "@/data/season";

// The season comes from the visitor's own clock, so it can only be known in the
// browser. The static HTML (the server snapshot) always says furnace season.
const subscribe = () => () => {};
const browserSeason = (): Season => seasonForMonth(new Date().getMonth());
const staticSeason = (): Season => "furnace";

export default function SeasonBanner() {
  const season = useSyncExternalStore(subscribe, browserSeason, staticSeason);
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const { icon, text, tone } = seasons[season];

  return (
    <aside aria-label="Seasonal notice" className={`${tone} text-ink`}>
      <div className="wrap flex items-center gap-2">
        <Link
          href="/maintenance-plan/"
          className="group flex min-h-12 flex-1 items-center gap-2.5 py-2 text-base leading-snug font-bold"
        >
          <Icon name={icon} />
          <span className="underline decoration-ink/40 underline-offset-4 group-hover:decoration-ink">{text}</span>
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-ink/10"
        >
          <Icon name="close" />
          <span className="sr-only">Dismiss seasonal notice</span>
        </button>
      </div>
    </aside>
  );
}
