/** A Front Range ridge line. Stretches to any width; the stroke stays 2px. */
export default function Ridge({ className = "", fill = "none" }: { className?: string; fill?: string }) {
  const line =
    "M0 92 96 70l70 14L290 34l84 40 96-22 120 38 118-50 92 34L928 22l112 46 104-24 126 36 170-30";
  return (
    <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className={`block w-full ${className}`} aria-hidden="true">
      {fill !== "none" && <path d={`${line}V110H0z`} fill={fill} />}
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
