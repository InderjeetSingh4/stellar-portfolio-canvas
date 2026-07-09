import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Seamless faint line-art doodle pattern that parallax-scrolls
 * upward slightly faster than the page. Flat, 2D, minimalist.
 */
const ParallaxDoodles = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -260]);

  // A 240x240 tile of hand-drawn-style line doodles. Repeats seamlessly.
  const tile = `
    <svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240' fill='none' stroke='%23475569' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'>
      <circle cx='40' cy='40' r='18' />
      <path d='M90 30 q 15 -20 30 0 t 30 0' />
      <path d='M180 40 l 10 -10 l 10 10 l -10 10 z' />
      <path d='M20 100 l 40 0 M30 90 l 0 20' />
      <path d='M80 110 q 20 -30 40 0' />
      <circle cx='170' cy='105' r='10' />
      <path d='M195 95 l 20 20 M215 95 l -20 20' />
      <path d='M30 170 c 10 -20 30 -20 40 0 s 30 20 40 0' />
      <rect x='130' y='160' width='24' height='24' rx='4' />
      <path d='M180 165 l 25 0 l -12 20 z' />
      <path d='M50 210 q 15 15 30 0 t 30 0 t 30 0' />
      <circle cx='200' cy='215' r='6' />
      <path d='M215 210 l 10 10 M225 210 l -10 10' />
    </svg>
  `;
  const dataUrl = `url("data:image/svg+xml;utf8,${tile.replace(/\n\s*/g, "")}")`;

  return (
    <motion.div
      ref={ref}
      style={{ y, backgroundImage: dataUrl, backgroundSize: "240px 240px" }}
      aria-hidden
      className="absolute inset-x-0 top-0 h-[120vh] pointer-events-none select-none opacity-[0.13] bg-repeat will-change-transform"
    />
  );
};

export default ParallaxDoodles;
