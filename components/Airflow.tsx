import type { CSSProperties } from "react";

// Five wavy streams: warm at the top, cooling toward the bottom.
const streams = [
  ["M-40 60c180-46 300 46 480 0s300-46 480 0 300 46 480 0", "#e06a2b"],
  ["M-40 150c160 40 320-40 480 0s320 40 480 0 320-40 480 0", "#e98f4d"],
  ["M-40 240c200-34 280 34 480 0s280-34 480 0 280 34 480 0", "#9aa8b4"],
  ["M-40 330c150 44 330-44 480 0s330 44 480 0 330-44 480 0", "#62a5e4"],
  ["M-40 420c190-38 290 38 480 0s290-38 480 0 290 38 480 0", "#3a8dde"],
];

/** Air moving across the hero: decorative, faint, and still under reduced motion. */
export default function Airflow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1400 480"
      preserveAspectRatio="xMidYMid slice"
      className={`airflow pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      {streams.map(([d, color], i) => (
        <g key={i} fill="none" stroke={color} strokeLinecap="round">
          <path d={d} strokeWidth="1.5" opacity=".22" />
          <path className="airflow-gust" d={d} strokeWidth="2.5" opacity=".6" style={{ "--i": i } as CSSProperties} />
        </g>
      ))}
    </svg>
  );
}
