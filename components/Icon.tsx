import type { ReactNode } from "react";

const paths = {
  phone: (
    <path d="M5 4h3.2l1.8 4.6-2.3 1.5a11.5 11.5 0 0 0 6.2 6.2l1.5-2.3L20 15.8V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  back: <path d="M19 12H5M11 6l-6 6 6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  flame: (
    <path d="M12 2.5c.6 3.2 4.8 5.6 4.8 10.6a4.8 4.8 0 0 1-9.6 0c0-1.9.8-3.3 1.9-4.3.2 1.5 1 2.4 2 2.6-.6-3.2-.2-6.5.9-8.9z" />
  ),
  snow: (
    <path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2 3.8 16.8M9.4 4.4 12 7l2.6-2.6M9.4 19.6 12 17l2.6 2.6" />
  ),
  swap: <path d="M4 8.5h14l-3.5-3.5M20 15.5H6l3.5 3.5" />,
  home: <path d="M3.5 11.5 12 4l8.5 7.5M6 10v9.5h12V10M10 19.5v-5.5h4v5.5" />,
  wrench: (
    <path d="M15.2 3.8a4.6 4.6 0 0 0-5.7 5.7L3.8 15.2a2.1 2.1 0 0 0 3 3l5.7-5.7a4.6 4.6 0 0 0 5.7-5.7l-2.9 2.9-2.3-.7-.7-2.3 2.9-2.9z" />
  ),
  tag: (
    <>
      <path d="M3.5 12.3V4.5a1 1 0 0 1 1-1h7.8l8.2 8.2a1.4 1.4 0 0 1 0 2l-6.8 6.8a1.4 1.4 0 0 1-2 0l-8.2-8.2z" />
      <circle cx="8" cy="8" r="1.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20.5c.9-4 3.9-5.8 7.5-5.8s6.6 1.8 7.5 5.8" />
    </>
  ),
  alert: <path d="M12 3.5 21.5 20h-19L12 3.5zM12 10v4.5M12 17.2v.3" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

/** Simple line icons, drawn on a 24px grid. */
export default function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
