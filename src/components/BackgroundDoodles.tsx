// Subtle decorative doodles for the light background.
// Pure SVG, fixed-position, pointer-events-none, very low opacity.
const Doodle = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => (
  <div
    className={`absolute text-slate-400/25 select-none pointer-events-none ${className}`}
    aria-hidden
  >
    {children}
  </div>
);

const BackgroundDoodles = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Curly braces */}
      <Doodle className="top-[8%] left-[4%] text-7xl font-mono opacity-30 hidden md:block">
        {"{ }"}
      </Doodle>
      <Doodle className="top-[68%] right-[5%] text-6xl font-mono opacity-25 hidden md:block">
        {"</>"}
      </Doodle>
      <Doodle className="top-[22%] right-[8%] text-5xl font-mono opacity-25">
        {"[ ]"}
      </Doodle>
      <Doodle className="bottom-[8%] left-[6%] text-5xl font-mono opacity-20 hidden md:block">
        {"=>"}
      </Doodle>

      {/* Database cylinder */}
      <Doodle className="top-[38%] left-[3%] opacity-30 hidden lg:block">
        <svg width="56" height="64" viewBox="0 0 56 64" fill="none" stroke="currentColor" strokeWidth="1.2">
          <ellipse cx="28" cy="10" rx="22" ry="6" />
          <path d="M6 10v44c0 3.3 9.8 6 22 6s22-2.7 22-6V10" />
          <path d="M6 24c0 3.3 9.8 6 22 6s22-2.7 22-6" />
          <path d="M6 38c0 3.3 9.8 6 22 6s22-2.7 22-6" />
        </svg>
      </Doodle>

      {/* Neural network nodes */}
      <Doodle className="top-[55%] left-[42%] opacity-25 hidden md:block">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="10" cy="14" r="3" />
          <circle cx="10" cy="40" r="3" />
          <circle cx="10" cy="66" r="3" />
          <circle cx="60" cy="20" r="3" />
          <circle cx="60" cy="60" r="3" />
          <circle cx="110" cy="40" r="3" />
          <path d="M13 14L57 20M13 40L57 20M13 40L57 60M13 66L57 60M63 20L107 40M63 60L107 40" />
        </svg>
      </Doodle>

      {/* Bar chart */}
      <Doodle className="bottom-[18%] right-[12%] opacity-25">
        <svg width="70" height="60" viewBox="0 0 70 60" fill="none" stroke="currentColor" strokeWidth="1.2">
          <line x1="4" y1="56" x2="68" y2="56" />
          <rect x="10" y="36" width="8" height="20" />
          <rect x="24" y="22" width="8" height="34" />
          <rect x="38" y="30" width="8" height="26" />
          <rect x="52" y="14" width="8" height="42" />
        </svg>
      </Doodle>

      {/* Function snippet */}
      <Doodle className="top-[4%] right-[20%] text-xs font-mono opacity-25 hidden lg:block">
        const data = await fetch()
      </Doodle>
      <Doodle className="bottom-[32%] left-[18%] text-xs font-mono opacity-25 hidden lg:block">
        SELECT * FROM users
      </Doodle>

      {/* Geometric ring */}
      <Doodle className="top-[14%] left-[48%] opacity-20 hidden md:block">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="45" cy="45" r="40" />
          <circle cx="45" cy="45" r="28" />
          <circle cx="45" cy="45" r="14" />
        </svg>
      </Doodle>
    </div>
  );
};

export default BackgroundDoodles;
