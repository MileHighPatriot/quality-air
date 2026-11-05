"use client";

import { site } from "@/data/site";
import { statusText, useOfficeStatus } from "@/lib/useOfficeStatus";

/** Small live dot plus "Office open now" or "After hours", in Denver time. */
export default function OfficeStatus({ className = "", long = false }: { className?: string; long?: boolean }) {
  const status = useOfficeStatus();
  const text = status ? statusText[status][long ? "long" : "short"] : `Hours: ${site.hours.label}`;

  return (
    <p className={`flex items-center gap-2 text-sm leading-tight font-bold ${className}`}>
      <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
        {status && <span className="status-ping absolute inset-0 rounded-full bg-current opacity-60" />}
        <span className={`relative h-2.5 w-2.5 rounded-full ${status === "open" ? "bg-[#2f9e5f]" : status ? "bg-ember" : "bg-slate"}`} />
      </span>
      <span>{text}</span>
    </p>
  );
}
