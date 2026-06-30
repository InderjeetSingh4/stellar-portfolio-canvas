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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-[400px] md:w-auto md:max-w-fit bg-white/40 backdrop-blur-md sm:backdrop-blur-2xl border border-white/60 shadow-lg shadow-black/5 rounded-full transform-gpu will-change-transform"
      style={{ willChange: "transform" } as React.CSSProperties}
    >
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap w-full px-1.5 py-1 md:px-3 md:py-1.5 md:gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => handleTabClick(tab)}
            className="relative px-3 py-1.5 md:px-4 md:py-2 text-xs sm:text-sm lg:text-base font-medium transition-colors text-slate-900 flex-shrink-0 transform-gpu will-change-transform"
          >
            {activeTab === tab.label && (
              <motion.div
                layoutId="active-pill-background"
                layout
                className="absolute inset-0 bg-slate-200/80 rounded-full z-0 shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}

        <div className="w-px h-5 md:h-6 bg-slate-300 mx-1 flex-shrink-0" />

        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-900 text-white text-xs sm:text-sm lg:text-base font-medium rounded-full hover:bg-slate-800 transition-colors flex-shrink-0 transform-gpu will-change-transform"
        >
          Resume
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
