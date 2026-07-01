import { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = ['IS.', 'About', 'Projects', 'Experience', 'Contact'];

const RESUME_URL =
  "https://drive.google.com/file/d/1-txpQWlRfcHm45_5WIqCD75JhyR0krkC/view?usp=drive_link";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    if (tab === 'IS.') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = tab.toLowerCase();
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 sm:gap-2 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-lg rounded-full px-1.5 py-1 sm:px-3 sm:py-1.5 w-[94vw] max-w-[450px] sm:w-auto sm:max-w-fit overflow-x-auto no-scrollbar sm:overflow-visible">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className="relative px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm lg:text-base font-medium transition-colors text-slate-900 whitespace-nowrap shrink-0"
        >
          {activeTab === tab && (
            <motion.div
              layoutId="active-pill-background"
              className="absolute inset-0 bg-slate-200/80 rounded-full z-0 shadow-sm"
              transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}

      <div className="w-px h-5 sm:h-6 bg-slate-300 mx-0.5 sm:mx-1 shrink-0" />

      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-900 text-white text-xs sm:text-sm lg:text-base font-medium rounded-full hover:bg-slate-800 transition-colors shrink-0"
      >
        Resume
      </a>
    </nav>
  );
}
