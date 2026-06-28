import { motion } from "framer-motion";
import { useState } from "react";

const tabs = [
  { label: "IS.", target: "top" },
  { label: "About", target: "about" },
  { label: "Projects", target: "projects" },
  { label: "Experience", target: "experience" },
  { label: "Contact", target: "contact" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1-txpQWlRfcHm45_5WIqCD75JhyR0krkC/view?usp=drive_link";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleTabClick = (tab: (typeof tabs)[number]) => {
    setActiveTab(tab.label);

    if (tab.target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(tab.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-fit z-50 flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap bg-white/40 backdrop-blur-md sm:backdrop-blur-2xl border border-white/60 shadow-lg shadow-black/5 px-2 py-1.5 rounded-full transform-gpu will-change-transform"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none", willChange: "transform" } as React.CSSProperties}
    >
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => handleTabClick(tab)}
          className="relative px-4 py-2 text-sm font-medium transition-colors text-slate-900 flex-shrink-0 transform-gpu will-change-transform"
        >
          {activeTab === tab.label && (
            <motion.div
              layoutId="active-pill-background"
              className="absolute inset-0 bg-slate-200/80 rounded-full z-0 shadow-sm"
              transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}

      <div className="w-px h-6 bg-slate-300 mx-1 flex-shrink-0" />

      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-colors flex-shrink-0 transform-gpu will-change-transform"
      >
        Resume
      </a>
    </motion.nav>
  );
};

export default Navbar;
