const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// A stylized year: cold, hot, cold. Month i sits at x = 50 + i * 100.
const curve =
  "M50 190C120 190 180 176 250 150S390 78 450 56 590 30 650 30 790 44 850 70 990 150 1050 172 1110 190 1150 190";

/**
 * The year as one temperature line, with the two tune-ups marked where they happen: the AC
 * check in spring before the heat, the furnace check in fall before the cold. Decorative
 * picture of what the text beside it already says; the line draws as it scrolls into view.
 */
export default function YearCurve() {
  return (
    <figure className="year card overflow-hidden p-4 sm:p-6">
      <svg viewBox="0 0 1200 276" className="block h-auto w-full" role="img" aria-label="A line showing the year going from cold to hot and back, with the AC check marked in April and the furnace check marked in October.">
        <defs>
          <linearGradient id="year-line" x1="0" x2="1">
            <stop offset="0" stopColor="#3a8dde" />
            <stop offset=".3" stopColor="#3a8dde" />
            <stop offset=".5" stopColor="#e06a2b" />
            <stop offset=".72" stopColor="#e06a2b" />
            <stop offset="1" stopColor="#3a8dde" />
          </linearGradient>
          <linearGradient id="year-wash" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e06a2b" stopOpacity=".16" />
            <stop offset="1" stopColor="#3a8dde" stopOpacity=".05" />
          </linearGradient>
        </defs>
        <path className="year-wash" d={`${curve}V216H50z`} fill="url(#year-wash)" />
        <path d="M50 216h1100" stroke="#e3ddd0" strokeWidth="2" />
        <path className="year-line" pathLength={100} d={curve} fill="none" stroke="url(#year-line)" strokeWidth="6" strokeLinecap="round" />
        <g className="year-months" fontFamily="var(--font-sans)" fontWeight="700" fill="#4d5c55" textAnchor="middle">
          {months.map((m, i) => (
            <text key={m} x={50 + i * 100} y="254">
              {m[0]}
              <tspan className="year-rest">{m.slice(1)}</tspan>
            </text>
          ))}
        </g>
        <g className="year-mark" style={{ "--at": "30%" } as React.CSSProperties}>
          <path d="M350 104V216" stroke="#1f66b0" strokeWidth="2" strokeDasharray="5 6" />
          <circle cx="350" cy="104" r="11" fill="#fff" stroke="#1f66b0" strokeWidth="5" />
          <text className="year-label" x="370" y="188" fontFamily="var(--font-display)" fontWeight="800" fill="#1f66b0">
            AC check
          </text>
        </g>
        <g className="year-mark" style={{ "--at": "78%" } as React.CSSProperties}>
          <path d="M950 112V216" stroke="#9c4212" strokeWidth="2" strokeDasharray="5 6" />
          <circle cx="950" cy="112" r="11" fill="#fff" stroke="#9c4212" strokeWidth="5" />
          <text className="year-label" x="930" y="188" textAnchor="end" fontFamily="var(--font-display)" fontWeight="800" fill="#9c4212">
            Furnace check
          </text>
        </g>
      </svg>
    </figure>
  );
}
