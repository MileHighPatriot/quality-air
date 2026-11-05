"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";

export type OfficeStatus = "open" | "after-hours";

/** Day of week (0 = Sunday) and hour in Denver, whatever the visitor's own time zone is. */
export function denverClock(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 12);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
  return { day, hour };
}

export function officeStatus(now = new Date()): OfficeStatus {
  const { day, hour } = denverClock(now);
  const { days, open, close } = site.hours;
  return days.includes(day) && hour >= open && hour < close ? "open" : "after-hours";
}

// Re-check once a minute so a page left open flips at closing time.
const subscribe = (onChange: () => void) => {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
};

/** `null` in the static HTML, then the real status once the page runs in a browser. */
export function useOfficeStatus(): OfficeStatus | null {
  return useSyncExternalStore(subscribe, () => officeStatus(), () => null);
}

export const statusText: Record<OfficeStatus, { short: string; long: string }> = {
  open: { short: "Office open now", long: "Office open now. A real person answers." },
  "after-hours": { short: "After hours: emergency line on", long: "After hours. The emergency line is on." },
};
