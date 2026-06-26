import { motion, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { User, FolderGit2, Briefcase, Mail, FileText, type LucideIcon } from "lucide-react";

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1-txpQWlRfcHm45_5WIqCD75JhyR0krkC/view?usp=drive_link";

const NavPill = ({
  active,
  onClick,
  icon: Icon,
  label,
  href,
  external,
}: {
  active?: boolean;
  onClick?: () => void;
  icon: LucideIcon;
  label: string;
  href?: string;
  external?: boolean;
}) => {
  const content = (
    <motion.span
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="relative flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium text-slate-700"
    >
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute inset-0 rounded-full bg-gray-200/60 border border-gray-300/50 shadow-sm"
        />
      )}
      <Icon size={15} strokeWidth={2} className="relative z-10" />
      <span className="relative z-10 hidden sm:inline">{label}</span>
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="outline-none"
      >
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="outline-none">
      {content}
    </button>
  );
};

const Navbar = () => {
  const [active, setActive] = useState("about");
  const x = useSpring(0, { stiffness: 150, damping: 22 });
  const y = useSpring(0, { stiffness: 150, damping: 22 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-spy
  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.04);
    y.set((e.clientY - cy) * 0.04);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-4 md:top-5 left-1/2 -translate-x-1/2 z-50 w-[90vw] md:w-auto md:max-w-[95vw] mx-auto transform-gpu"
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x, y, scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        className="flex items-center gap-1 sm:gap-1.5 pl-2 pr-1.5 py-1.5 rounded-full bg-white/45 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 shadow-xl shadow-black/5 overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {/* Brand mark */}
        <motion.a
          href="#top"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="px-3 py-2 rounded-full text-sm font-semibold tracking-tight-custom text-slate-900"
        >
          IS<span className="text-slate-400">.</span>
        </motion.a>

        <span className="h-5 w-px bg-slate-900/10 mx-0.5" />

        {/* Nav items */}
        {navItems.map((item) => (
          <NavPill
            key={item.id}
            icon={item.icon}
            label={item.label}
            href={`#${item.id}`}
            onClick={() => setActive(item.id)}
            active={active === item.id}
          />
        ))}

        <span className="h-5 w-px bg-slate-900/10 mx-0.5" />

        {/* Resume capsule */}
        <motion.a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium text-white bg-slate-900/90 hover:bg-slate-900 transition-colors"
          style={{
            boxShadow:
              "0 1px 0 0 hsla(0,0%,100%,0.15) inset, 0 6px 18px -6px hsla(222,33%,20%,0.35)",
          }}
        >
          <FileText size={14} strokeWidth={2} />
          <span className="hidden sm:inline">Resume</span>
        </motion.a>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
