// Explicit, subtle SVG doodle layer for the light background.
const iconClass = "absolute text-slate-400 opacity-[0.25] mix-blend-multiply select-none pointer-events-none";
const iconStyle = { opacity: 0.25, mixBlendMode: "multiply" } as const;

const BackgroundDoodles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <svg className={`${iconClass} top-10 left-10 w-20 h-20`} style={iconStyle} viewBox="0 0 80 80" fill="none" aria-hidden>
        <text x="8" y="55" fill="currentColor" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="42" fontWeight="500">{"{ }"}</text>
      </svg>

      <svg className={`${iconClass} top-24 right-8 w-24 h-16`} style={iconStyle} viewBox="0 0 96 64" fill="none" aria-hidden>
        <text x="6" y="42" fill="currentColor" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="32" fontWeight="500">{"</>"}</text>
      </svg>

      <svg className={`${iconClass} bottom-20 right-20 w-16 h-16`} style={iconStyle} viewBox="0 0 64 64" fill="none" aria-hidden>
        <text x="24" y="46" fill="currentColor" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="44" fontWeight="500">;</text>
      </svg>

      <svg className={`${iconClass} top-[38%] left-6 w-16 h-20`} style={iconStyle} viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <ellipse cx="32" cy="14" rx="24" ry="8" />
        <path d="M8 14v48c0 4.4 10.7 8 24 8s24-3.6 24-8V14" />
        <path d="M8 30c0 4.4 10.7 8 24 8s24-3.6 24-8" />
        <path d="M8 46c0 4.4 10.7 8 24 8s24-3.6 24-8" />
      </svg>

      <svg className={`${iconClass} bottom-32 left-12 w-20 h-16`} style={iconStyle} viewBox="0 0 80 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <line x1="8" y1="56" x2="72" y2="56" />
        <rect x="14" y="34" width="8" height="22" />
        <rect x="30" y="20" width="8" height="36" />
        <rect x="46" y="28" width="8" height="28" />
        <rect x="62" y="12" width="8" height="44" />
      </svg>

      <svg className={`${iconClass} top-[54%] right-[12%] w-28 h-20`} style={iconStyle} viewBox="0 0 112 80" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <circle cx="12" cy="18" r="4" />
        <circle cx="12" cy="58" r="4" />
        <circle cx="56" cy="40" r="4" />
        <circle cx="100" cy="18" r="4" />
        <circle cx="100" cy="58" r="4" />
        <path d="M16 18L52 40M16 58L52 40M60 40L96 18M60 40L96 58" />
      </svg>

      <svg className={`${iconClass} top-[18%] left-[48%] w-24 h-24`} style={iconStyle} viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
        <circle cx="48" cy="48" r="38" />
        <circle cx="48" cy="48" r="24" />
        <path d="M20 48h56M48 20v56" />
      </svg>
    </div>
  );
};

export default BackgroundDoodles;
