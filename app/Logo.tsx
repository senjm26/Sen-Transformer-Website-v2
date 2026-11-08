// The Sen Engineering Solutions mark: two circled S's joined by a spring with orange contact dots.
// Coordinates measured directly from the reference logo artwork.
const BLUE = "#3366FF";
const DOT = "#FBB034";

// Stroked S, centred on 0,0, sized to sit inside a circle of radius 167
const S_PATH =
  "M57 -85 C40 -112 -5 -118 -35 -108 C-65 -98 -72 -65 -60 -45 C-48 -25 -15 -18 15 -8 C50 4 75 20 72 55 C69 92 30 115 -5 113 C-35 112 -55 100 -62 88";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="83 112 400 1256" role="img" aria-label="Sen Engineering Solutions logo">
      <g fill="none" stroke={BLUE} strokeLinecap="round">
        <g strokeWidth="22">
          <circle cx="283" cy="295" r="167" />
          <circle cx="283" cy="1185" r="167" />
          <path d={S_PATH} transform="translate(283 295)" />
          <path d={S_PATH} transform="translate(283 1185)" />
        </g>
        {/* the spring: zig-zag between the two contact dots */}
        <path
          strokeWidth="20"
          strokeLinejoin="miter"
          strokeLinecap="butt"
          d="M283 462 V505 L450 553 L120 648 L450 743 L120 838 L450 933 L283 980 V1018"
        />
      </g>
      <circle cx="283" cy="505" r="20" fill={DOT} />
      <circle cx="283" cy="980" r="20" fill={DOT} />
    </svg>
  );
}
