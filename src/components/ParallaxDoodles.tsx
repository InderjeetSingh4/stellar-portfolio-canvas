import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Subtle light-themed sketch/doodle background that scrolls upward
 * slightly faster than the page for a buttery parallax effect.
 * Container is 120vh tall so it never clips during the scroll.
 */
const ParallaxDoodles = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // Move upward ~200px as user scrolls the first viewport — faster than page.
  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.35]);

  const stroke = "text-slate-400/60";

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      aria-hidden
      className="absolute inset-x-0 top-0 h-[120vh] pointer-events-none select-none overflow-hidden will-change-transform"
    >
      {/* Soft radial wash to keep it airy */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0)_0%,rgba(248,249,250,0.6)_70%,rgba(248,249,250,1)_100%)]" />

      {/* Doodle set — mix-blend-multiply so they read like pencil on paper */}
      <svg
        className={`absolute top-[8%] left-[6%] w-40 h-40 ${stroke} mix-blend-multiply`}
        viewBox="0 0 160 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M20 120 C 40 40, 120 40, 140 120" />
        <circle cx="80" cy="80" r="42" strokeDasharray="3 5" />
      </svg>

      <svg
        className={`absolute top-[14%] right-[8%] w-48 h-32 ${stroke} mix-blend-multiply`}
        viewBox="0 0 200 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M10 100 Q 60 10, 110 70 T 190 40" />
        <path d="M20 115 Q 70 30, 120 85 T 195 60" opacity="0.6" />
      </svg>

      <svg
        className={`absolute top-[42%] left-[3%] w-56 h-56 ${stroke} mix-blend-multiply`}
        viewBox="0 0 220 220"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="110" cy="110" r="90" />
        <circle cx="110" cy="110" r="60" />
        <circle cx="110" cy="110" r="30" />
      </svg>

      <svg
        className={`absolute top-[50%] right-[6%] w-64 h-48 ${stroke} mix-blend-multiply`}
        viewBox="0 0 260 180"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        <path d="M10 160 L 60 60 L 110 130 L 160 40 L 250 120" />
        <circle cx="60" cy="60" r="3" fill="currentColor" />
        <circle cx="110" cy="130" r="3" fill="currentColor" />
        <circle cx="160" cy="40" r="3" fill="currentColor" />
      </svg>

      <svg
        className={`absolute bottom-[12%] left-[22%] w-40 h-40 ${stroke} mix-blend-multiply`}
        viewBox="0 0 160 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="20" y="20" width="120" height="120" rx="10" />
        <path d="M20 60 H140 M60 20 V140" />
      </svg>

      <svg
        className={`absolute bottom-[18%] right-[26%] w-32 h-32 ${stroke} mix-blend-multiply`}
        viewBox="0 0 128 128"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M20 90 Q 64 10, 108 90" />
        <path d="M30 100 L 98 100" strokeDasharray="2 4" />
      </svg>

      <svg
        className={`absolute top-[24%] left-[42%] w-24 h-24 ${stroke} mix-blend-multiply`}
        viewBox="0 0 96 96"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M10 48 L 48 10 L 86 48 L 48 86 Z" />
      </svg>
    </motion.div>
  );
};

export default ParallaxDoodles;
