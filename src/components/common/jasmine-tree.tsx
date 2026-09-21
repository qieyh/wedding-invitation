import { cn } from "@/lib/utils";

// A single flower cluster SVG (5-petal jasmine)
function JasmineBlossom({
  x,
  y,
  scale = 1,
  opacity = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity={opacity}>
      {/* 5 petals */}
      <path d="M0,-1.5 C3,-9 0,-14 0,-14 C0,-14 -3,-9 0,-1.5" fill="white" />
      <path d="M1.4,-0.5 C8,-4 11,-1 11,-1 C11,-1 8,2 1.4,-0.5" fill="white" />
      <path d="M0.9,1.2 C6,6 6,11 6,11 C6,11 2,8 0.9,1.2" fill="white" />
      <path d="M-0.9,1.2 C-6,6 -6,11 -6,11 C-6,11 -2,8 -0.9,1.2" fill="white" />
      <path d="M-1.4,-0.5 C-8,-4 -11,-1 -11,-1 C-11,-1 -8,2 -1.4,-0.5" fill="white" />
      {/* Center stamen */}
      <circle cx="0" cy="0" r="2.2" fill="#f59e0b" />
      <circle cx="0" cy="0" r="1" fill="#d97706" />
    </g>
  );
}

// Elegant watercolor-style leaf
function Leaf({
  x,
  y,
  rotation = 0,
  scale = 1,
  opacity = 0.75,
  color = "#7a9e8e",
}: {
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
  opacity?: number;
  color?: string;
}) {
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      opacity={opacity}
    >
      {/* Leaf body - soft teardrop with subtle midrib */}
      <path
        d="M0,0 C-8,-18 -6,-32 0,-38 C6,-32 8,-18 0,0"
        fill={color}
      />
      {/* Midrib */}
      <path
        d="M0,-2 C0,-15 0,-28 0,-36"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.4"
        fill="none"
      />
    </g>
  );
}

// Tiny berry accent
function Berry({
  x,
  y,
  r = 2.5,
  opacity = 0.8,
}: {
  x: number;
  y: number;
  r?: number;
  opacity?: number;
}) {
  return (
    <circle cx={x} cy={y} r={r} fill="#4a6741" opacity={opacity} />
  );
}

// Thin, organic winding stem
function Stem({
  d,
  opacity = 0.45,
  width = 1,
}: {
  d: string;
  opacity?: number;
  width?: number;
}) {
  return (
    <path
      d={d}
      stroke="#6b7c5c"
      strokeWidth={width}
      fill="none"
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

export function JasmineTree({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
    >
      {/* ── TOP-LEFT CORNER ── */}
      <div className="absolute -left-2 -top-2 h-52 w-52 animate-sway-right origin-top-left drop-shadow-sm">
        <svg viewBox="-10 -10 160 160" className="h-full w-full overflow-visible">
          {/* Stems spreading from corner */}
          <Stem d="M0,0 Q30,10 60,35" width={1.2} opacity={0.4} />
          <Stem d="M0,0 Q15,35 30,65" width={1.2} opacity={0.4} />
          <Stem d="M60,35 Q80,25 100,30" opacity={0.3} />
          <Stem d="M60,35 Q75,55 80,80" opacity={0.3} />
          <Stem d="M30,65 Q50,70 75,75" opacity={0.3} />
          <Stem d="M30,65 Q35,85 40,105" opacity={0.25} />

          {/* Leaves - fanned out naturally */}
          <Leaf x={20} y={22} rotation={-60} scale={0.9} color="#8ab5a0" />
          <Leaf x={32} y={12} rotation={-30} scale={0.75} color="#7a9e8e" />
          <Leaf x={10} y={42} rotation={-85} scale={0.85} color="#6b8e7e" />
          <Leaf x={55} y={40} rotation={20} scale={0.8} color="#8ab5a0" opacity={0.6} />
          <Leaf x={45} y={25} rotation={-10} scale={0.65} color="#9ec4b2" />
          <Leaf x={70} y={32} rotation={45} scale={0.7} color="#7a9e8e" opacity={0.55} />
          <Leaf x={82} y={24} rotation={60} scale={0.55} color="#6b8e7e" opacity={0.5} />
          <Leaf x={20} y={72} rotation={-100} scale={0.75} color="#8ab5a0" />
          <Leaf x={38} y={68} rotation={-70} scale={0.65} color="#9ec4b2" opacity={0.6} />
          <Leaf x={58} y={62} rotation={-45} scale={0.6} color="#7a9e8e" opacity={0.55} />
          <Leaf x={75} y={78} rotation={-20} scale={0.55} color="#8ab5a0" opacity={0.45} />
          <Leaf x={55} y={88} rotation={-60} scale={0.5} color="#6b8e7e" opacity={0.5} />
          <Leaf x={28} y={95} rotation={-110} scale={0.6} color="#7a9e8e" opacity={0.5} />
          <Leaf x={42} y={110} rotation={-80} scale={0.5} color="#8ab5a0" opacity={0.4} />

          {/* Jasmine flowers */}
          <JasmineBlossom x={62} y={38} scale={1.1} />
          <JasmineBlossom x={33} y={68} scale={0.9} />
          <JasmineBlossom x={80} y={80} scale={0.8} opacity={0.85} />
          <JasmineBlossom x={48} y={28} scale={0.75} opacity={0.9} />
          <JasmineBlossom x={100} y={33} scale={0.7} opacity={0.75} />
          <JasmineBlossom x={22} y={100} scale={0.85} opacity={0.8} />

          {/* Berries */}
          <Berry x={92} y={28} r={2} />
          <Berry x={96} y={24} r={1.5} opacity={0.6} />
          <Berry x={99} y={30} r={1.5} opacity={0.6} />
          <Berry x={58} y={95} r={2} />
          <Berry x={63} y={100} r={1.5} opacity={0.65} />
        </svg>
      </div>

      {/* ── TOP-RIGHT CORNER ── */}
      <div className="absolute -right-2 -top-2 h-52 w-52 animate-sway-left origin-top-right drop-shadow-sm scale-x-[-1]">
        <svg viewBox="-10 -10 160 160" className="h-full w-full overflow-visible">
          <Stem d="M0,0 Q30,10 60,35" width={1.2} opacity={0.4} />
          <Stem d="M0,0 Q15,35 30,65" width={1.2} opacity={0.4} />
          <Stem d="M60,35 Q80,25 100,30" opacity={0.3} />
          <Stem d="M60,35 Q75,55 80,80" opacity={0.3} />
          <Stem d="M30,65 Q50,70 75,75" opacity={0.3} />
          <Stem d="M30,65 Q35,85 40,105" opacity={0.25} />

          <Leaf x={20} y={22} rotation={-60} scale={0.9} color="#8ab5a0" />
          <Leaf x={32} y={12} rotation={-30} scale={0.75} color="#7a9e8e" />
          <Leaf x={10} y={42} rotation={-85} scale={0.85} color="#6b8e7e" />
          <Leaf x={55} y={40} rotation={20} scale={0.8} color="#8ab5a0" opacity={0.6} />
          <Leaf x={45} y={25} rotation={-10} scale={0.65} color="#9ec4b2" />
          <Leaf x={70} y={32} rotation={45} scale={0.7} color="#7a9e8e" opacity={0.55} />
          <Leaf x={82} y={24} rotation={60} scale={0.55} color="#6b8e7e" opacity={0.5} />
          <Leaf x={20} y={72} rotation={-100} scale={0.75} color="#8ab5a0" />
          <Leaf x={38} y={68} rotation={-70} scale={0.65} color="#9ec4b2" opacity={0.6} />
          <Leaf x={58} y={62} rotation={-45} scale={0.6} color="#7a9e8e" opacity={0.55} />
          <Leaf x={75} y={78} rotation={-20} scale={0.55} color="#8ab5a0" opacity={0.45} />
          <Leaf x={55} y={88} rotation={-60} scale={0.5} color="#6b8e7e" opacity={0.5} />
          <Leaf x={28} y={95} rotation={-110} scale={0.6} color="#7a9e8e" opacity={0.5} />
          <Leaf x={42} y={110} rotation={-80} scale={0.5} color="#8ab5a0" opacity={0.4} />

          <JasmineBlossom x={62} y={38} scale={1.1} />
          <JasmineBlossom x={33} y={68} scale={0.9} />
          <JasmineBlossom x={80} y={80} scale={0.8} opacity={0.85} />
          <JasmineBlossom x={48} y={28} scale={0.75} opacity={0.9} />
          <JasmineBlossom x={100} y={33} scale={0.7} opacity={0.75} />
          <JasmineBlossom x={22} y={100} scale={0.85} opacity={0.8} />

          <Berry x={92} y={28} r={2} />
          <Berry x={96} y={24} r={1.5} opacity={0.6} />
          <Berry x={99} y={30} r={1.5} opacity={0.6} />
          <Berry x={58} y={95} r={2} />
          <Berry x={63} y={100} r={1.5} opacity={0.65} />
        </svg>
      </div>

      {/* ── BOTTOM-LEFT CORNER ── */}
      <div className="absolute -left-2 -bottom-2 h-52 w-52 animate-sway-left origin-bottom-left drop-shadow-sm scale-y-[-1]">
        <svg viewBox="-10 -10 160 160" className="h-full w-full overflow-visible">
          <Stem d="M0,0 Q30,10 60,35" width={1.2} opacity={0.4} />
          <Stem d="M0,0 Q15,35 30,65" width={1.2} opacity={0.4} />
          <Stem d="M60,35 Q80,25 100,30" opacity={0.3} />
          <Stem d="M60,35 Q75,55 80,80" opacity={0.3} />
          <Stem d="M30,65 Q50,70 75,75" opacity={0.3} />
          <Stem d="M30,65 Q35,85 40,100" opacity={0.25} />

          <Leaf x={20} y={22} rotation={-60} scale={0.85} color="#8ab5a0" />
          <Leaf x={32} y={12} rotation={-30} scale={0.7} color="#7a9e8e" />
          <Leaf x={10} y={42} rotation={-85} scale={0.8} color="#6b8e7e" />
          <Leaf x={55} y={40} rotation={20} scale={0.75} color="#8ab5a0" opacity={0.6} />
          <Leaf x={45} y={25} rotation={-10} scale={0.6} color="#9ec4b2" />
          <Leaf x={70} y={32} rotation={45} scale={0.65} color="#7a9e8e" opacity={0.55} />
          <Leaf x={20} y={72} rotation={-100} scale={0.7} color="#8ab5a0" />
          <Leaf x={38} y={68} rotation={-70} scale={0.6} color="#9ec4b2" opacity={0.6} />
          <Leaf x={58} y={62} rotation={-45} scale={0.55} color="#7a9e8e" opacity={0.55} />
          <Leaf x={75} y={78} rotation={-20} scale={0.5} color="#8ab5a0" opacity={0.45} />
          <Leaf x={28} y={95} rotation={-110} scale={0.55} color="#7a9e8e" opacity={0.5} />

          <JasmineBlossom x={62} y={38} scale={1} />
          <JasmineBlossom x={33} y={68} scale={0.85} />
          <JasmineBlossom x={80} y={80} scale={0.75} opacity={0.8} />
          <JasmineBlossom x={48} y={28} scale={0.7} opacity={0.85} />
          <JasmineBlossom x={22} y={98} scale={0.8} opacity={0.75} />

          <Berry x={92} y={28} r={2} />
          <Berry x={96} y={24} r={1.5} opacity={0.6} />
          <Berry x={58} y={95} r={2} />
          <Berry x={63} y={100} r={1.5} opacity={0.65} />
        </svg>
      </div>

      {/* ── BOTTOM-RIGHT CORNER ── */}
      <div className="absolute -right-2 -bottom-2 h-52 w-52 animate-sway-right origin-bottom-right drop-shadow-sm scale-x-[-1] scale-y-[-1]">
        <svg viewBox="-10 -10 160 160" className="h-full w-full overflow-visible">
          <Stem d="M0,0 Q30,10 60,35" width={1.2} opacity={0.4} />
          <Stem d="M0,0 Q15,35 30,65" width={1.2} opacity={0.4} />
          <Stem d="M60,35 Q80,25 100,30" opacity={0.3} />
          <Stem d="M60,35 Q75,55 80,80" opacity={0.3} />
          <Stem d="M30,65 Q50,70 75,75" opacity={0.3} />
          <Stem d="M30,65 Q35,85 40,100" opacity={0.25} />

          <Leaf x={20} y={22} rotation={-60} scale={0.85} color="#8ab5a0" />
          <Leaf x={32} y={12} rotation={-30} scale={0.7} color="#7a9e8e" />
          <Leaf x={10} y={42} rotation={-85} scale={0.8} color="#6b8e7e" />
          <Leaf x={55} y={40} rotation={20} scale={0.75} color="#8ab5a0" opacity={0.6} />
          <Leaf x={45} y={25} rotation={-10} scale={0.6} color="#9ec4b2" />
          <Leaf x={70} y={32} rotation={45} scale={0.65} color="#7a9e8e" opacity={0.55} />
          <Leaf x={20} y={72} rotation={-100} scale={0.7} color="#8ab5a0" />
          <Leaf x={38} y={68} rotation={-70} scale={0.6} color="#9ec4b2" opacity={0.6} />
          <Leaf x={58} y={62} rotation={-45} scale={0.55} color="#7a9e8e" opacity={0.55} />
          <Leaf x={75} y={78} rotation={-20} scale={0.5} color="#8ab5a0" opacity={0.45} />
          <Leaf x={28} y={95} rotation={-110} scale={0.55} color="#7a9e8e" opacity={0.5} />

          <JasmineBlossom x={62} y={38} scale={1} />
          <JasmineBlossom x={33} y={68} scale={0.85} />
          <JasmineBlossom x={80} y={80} scale={0.75} opacity={0.8} />
          <JasmineBlossom x={48} y={28} scale={0.7} opacity={0.85} />
          <JasmineBlossom x={22} y={98} scale={0.8} opacity={0.75} />

          <Berry x={92} y={28} r={2} />
          <Berry x={96} y={24} r={1.5} opacity={0.6} />
          <Berry x={58} y={95} r={2} />
          <Berry x={63} y={100} r={1.5} opacity={0.65} />
        </svg>
      </div>
    </div>
  );
}
