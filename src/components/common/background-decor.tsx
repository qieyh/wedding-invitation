function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main vine */}
      <path
        d="M10 5C25 45 60 90 145 140"
        stroke="#AA820A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      <path
        d="M5 25C40 60 70 85 130 115"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />

      {/* Flower bud 1 */}
      <circle cx="35" cy="40" r="10" fill="#E8D7C3" fillOpacity="0.6" />
      <circle cx="35" cy="40" r="6" fill="#D4AF37" fillOpacity="0.4" />
      <circle cx="35" cy="40" r="2.5" fill="#AA820A" fillOpacity="0.8" />

      {/* Flower bud 2 */}
      <circle cx="85" cy="90" r="12" fill="#E8D7C3" fillOpacity="0.6" />
      <circle cx="85" cy="90" r="7" fill="#D4AF37" fillOpacity="0.45" />
      <circle cx="85" cy="90" r="3" fill="#AA820A" fillOpacity="0.8" />

      {/* Leaves */}
      <path
        d="M20 20C28 12 40 16 38 26C35 34 24 30 20 20Z"
        fill="#C5A869"
        fillOpacity="0.45"
      />
      <path
        d="M50 55C62 46 72 52 68 62C63 70 52 66 50 55Z"
        fill="#D4AF37"
        fillOpacity="0.4"
      />
      <path
        d="M70 70C82 62 90 70 85 80C80 87 72 82 70 70Z"
        fill="#AA820A"
        fillOpacity="0.35"
      />
      <path
        d="M105 105C118 96 128 104 122 115C116 122 106 116 105 105Z"
        fill="#C5A869"
        fillOpacity="0.4"
      />
      <path
        d="M125 125C136 118 144 124 140 133C135 139 127 134 125 125Z"
        fill="#D4AF37"
        fillOpacity="0.4"
      />

      {/* Little sparkling dots */}
      <circle cx="25" cy="12" r="2" fill="#AA820A" fillOpacity="0.6" />
      <circle cx="58" cy="42" r="2.5" fill="#D4AF37" fillOpacity="0.6" />
      <circle cx="100" cy="85" r="2" fill="#AA820A" fillOpacity="0.6" />
      <circle cx="145" cy="120" r="2.5" fill="#D4AF37" fillOpacity="0.6" />
    </svg>
  );
}

export function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Four Corner Swaying Flowers like SatuMomen */}
      <div className="absolute -left-2 -top-2 h-36 w-36 animate-sway-right">
        <FloralCorner className="h-full w-full" />
      </div>
      <div className="absolute -right-2 -top-2 h-36 w-36 animate-sway-right scale-x-[-1]">
        <FloralCorner className="h-full w-full" />
      </div>
      <div className="absolute -bottom-2 -left-2 h-36 w-36 animate-sway-left scale-y-[-1]">
        <FloralCorner className="h-full w-full" />
      </div>
      <div className="absolute -bottom-2 -right-2 h-36 w-36 animate-sway-left scale-x-[-1] scale-y-[-1]">
        <FloralCorner className="h-full w-full" />
      </div>

      <div className="absolute -right-16 top-1/3 select-none font-display text-[180px] font-light leading-none text-gold-300/10">
        W&amp;A
      </div>
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold-300/15 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-nude-200/40 blur-3xl" />
    </div>
  );
}