import { motion, useSpring } from "framer-motion";
import { useRef } from "react";
import Magnetic from "./Magnetic";

const navItems = ["About", "Projects", "Experience", "Contact"];

const ResumeButton = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 25, mass: 0.8 });
  const y = useSpring(0, { stiffness: 150, damping: 25, mass: 0.8 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href="https://drive.google.com/file/d/1BvynBA6M4QLlECahaVZlpJsdRWoBupC0/view?usp=drive_link"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide text-foreground transition-colors duration-300"
      css-style={{
        background: "hsla(var(--glass-bg), 0.35)",
        border: "1px solid hsla(var(--glass-border), 0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span>Resume</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 ease-out group-hover:translate-y-[2px]"
      >
        <path d="M7 1v9" />
        <path d="M3.5 7.5 7 11l3.5-3.5" />
        <line
          x1="2"
          y1="13"
          x2="12"
          y2="13"
          className="origin-center transition-all duration-300 ease-out group-hover:scale-x-125"
        />
      </svg>
    </motion.a>
  );
};

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-5"
      style={{
        background: "hsla(var(--background), 0.8)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Magnetic strength={0.15}>
        <span className="text-foreground font-semibold text-lg tracking-tight-custom">
          portfolio<span className="text-muted-foreground">.</span>
        </span>
      </Magnetic>
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item}>
            <Magnetic strength={0.25}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item}
              </a>
            </Magnetic>
          </li>
        ))}
        <li>
          <ResumeButton />
        </li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
