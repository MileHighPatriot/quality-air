import { site } from "@/data/site";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#1f4d3a" />
      <circle cx="28.5" cy="12.5" r="4" fill="#e06a2b" />
      <path d="M6 26.5 14 15l5 6.5 4-4.5 11 9.5" fill="none" stroke="#faf8f4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 32.5h24" stroke="#3a8dde" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ tone = "pine" }: { tone?: "pine" | "paper" }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-none">
        <span className={`block text-[1.3rem] font-extrabold tracking-tight ${tone === "paper" ? "text-white" : "text-pine"}`}>
          {site.name}
        </span>
        <span className={`mt-1 block text-sm font-semibold ${tone === "paper" ? "text-white/75" : "text-slate"}`}>
          {site.descriptor}
        </span>
      </span>
    </span>
  );
}
