import { useRef, useCallback, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ExternalLink } from "lucide-react";


interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  visual: "dashboard" | "vision";
  index: number;
  link?: string;
}

/* Minimalist dashboard wireframe */
const DashboardVisual = () => (
  <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden border border-white/[0.05] bg-white/[0.015] p-4">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-white/15" />
      <div className="w-2 h-2 rounded-full bg-white/10" />
      <div className="w-2 h-2 rounded-full bg-white/[0.07]" />
      <div className="flex-1" />
      <div className="w-12 h-1.5 rounded-full bg-white/10" />
    </div>
    <div className="grid grid-cols-3 gap-2 h-[calc(100%-32px)]">
      <div className="col-span-2 rounded-lg bg-white/[0.02] border border-white/[0.05] flex flex-col justify-end p-2">
        <div className="flex items-end gap-1 h-full pt-2">
          {[40, 65, 50, 80, 55, 70, 90, 60].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: "easeOut" }}
              className="flex-1 rounded-sm"
              style={{ background: "linear-gradient(180deg, hsla(220,10%,65%,0.55) 0%, hsla(220,10%,55%,0.15) 100%)" }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
          <span className="text-[10px] text-white/50 font-mono">2.4K</span>
        </div>
        <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
          <span className="text-[10px] text-white/50 font-mono">98%</span>
        </div>
      </div>
    </div>
  </div>
);

/* Minimalist camera lens / bounding-box visual */
const VisionVisual = () => (
  <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden border border-white/[0.05] bg-white/[0.015] flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute w-28 h-28 rounded-full border border-white/10"
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute w-20 h-20 rounded-full border border-white/15"
    />
    <div className="absolute w-12 h-12 rounded-full border border-white/20 bg-white/[0.03]" />
    <div className="absolute w-4 h-4 rounded-full bg-white/20" style={{ boxShadow: "0 0 16px hsla(220,8%,70%,0.25)" }} />
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="absolute top-5 right-8 w-16 h-12 border border-white/30 rounded-sm"
    >
      <span className="absolute -top-3 left-0 text-[8px] text-white/60 font-mono">obj_01</span>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="absolute bottom-6 left-10 w-20 h-10 border border-white/25 rounded-sm"
    >
      <span className="absolute -top-3 left-0 text-[8px] text-white/60 font-mono">obj_02</span>
    </motion.div>
    {["top-2 left-3", "top-2 right-3", "bottom-2 left-3", "bottom-2 right-3"].map((pos, i) => (
      <div key={i} className={`absolute ${pos} w-3 h-3`}>
        <div className={`absolute ${i < 2 ? "top-0" : "bottom-0"} ${i % 2 === 0 ? "left-0" : "right-0"} w-full h-px bg-white/15`} />
        <div className={`absolute ${i < 2 ? "top-0" : "bottom-0"} ${i % 2 === 0 ? "left-0" : "right-0"} w-px h-full bg-white/15`} />
      </div>
    ))}
  </div>
);

const ProjectCard = ({ title, subtitle, description, tags, visual, index, link }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0.5, y: 0.5, hovered: false });
  const [scrollSkew, setScrollSkew] = useState(0);

  // Scroll skew effect
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    const velocity = scrollY.getVelocity();
    const skew = Math.max(-3, Math.min(3, velocity * 0.003));
    setScrollSkew(skew);
  });

  // Reset skew when scroll stops
  const skewTimeout = useRef<ReturnType<typeof setTimeout>>();
  useMotionValueEvent(scrollY, "change", () => {
    clearTimeout(skewTimeout.current);
    skewTimeout.current = setTimeout(() => setScrollSkew(0), 150);
  });

  const update = useCallback(() => {
    const { x, y, hovered } = state.current;
    if (cardRef.current) {
      const rx = -(y - 0.5) * 12;
      const ry = (x - 0.5) * 12;
      cardRef.current.style.transform = `perspective(900px) rotateX(${hovered ? rx : 0}deg) rotateY(${hovered ? ry : 0}deg)`;
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = hovered ? "1" : "0";
      glowRef.current.style.background = `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, hsla(218, 30%, 60%, 0.12), hsla(150, 18%, 50%, 0.05) 35%, transparent 65%)`;
    }
    if (glareRef.current) {
      const pos = x * 100;
      glareRef.current.style.background = `linear-gradient(105deg, transparent ${Math.max(0, pos - 25)}%, hsla(0,0%,100%,0.05) ${pos}%, transparent ${Math.min(100, pos + 25)}%)`;
      glareRef.current.style.opacity = hovered ? "1" : "0";
    }
    if (contentRef.current) {
      const tx = hovered ? (x - 0.5) * -10 : 0;
      const ty = hovered ? (y - 0.5) * -10 : 0;
      contentRef.current.style.transform = `translate3d(${tx}px, ${ty}px, ${hovered ? 24 : 0}px)`;
    }
    if (tagsRef.current) {
      const tx = hovered ? (x - 0.5) * -5 : 0;
      const ty = hovered ? (y - 0.5) * -5 : 0;
      tagsRef.current.style.transform = `translate3d(${tx}px, ${ty}px, ${hovered ? 32 : 0}px)`;
    }
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    state.current.x = (e.clientX - rect.left) / rect.width;
    state.current.y = (e.clientY - rect.top) / rect.height;
    update();
  }, [update]);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 80, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 20,
        delay: index * 0.15,
      }}
      style={{
        willChange: "transform, opacity",
        perspective: 1200,
        skewY: scrollSkew,
        transition: "skewY 0.3s ease-out",
      }}
    >
      <div
        ref={cardRef}
        data-cursor-view
        onMouseMove={onMouseMove}
        onMouseEnter={() => { state.current.hovered = true; update(); }}
        onMouseLeave={() => { state.current.hovered = false; update(); }}
        className="project-card-glass p-8 cursor-pointer"
        style={{ transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease, border-color 0.5s ease" }}
      >
        {/* Glow follow */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-2xl pointer-events-none z-[2]"
          style={{ opacity: 0, transition: "opacity 0.5s ease" }}
        />
        {/* Moving diagonal glare */}
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-2xl pointer-events-none z-[3]"
          style={{ opacity: 0, transition: "opacity 0.4s ease", mixBlendMode: "overlay" }}
        />
        <div className="relative z-10">
          {visual === "dashboard" ? <DashboardVisual /> : <VisionVisual />}
        </div>
        <div
          ref={contentRef}
          className="relative z-10"
          style={{ transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)" }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-1 tracking-tight-custom">{title}</h3>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80 mb-3">{subtitle}</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>
          <div
            ref={tagsRef}
            className="flex flex-wrap gap-2 items-center"
            style={{ transition: "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)" }}
          >
            {tags.map((tag) => (
              <span key={tag} className="text-[11px] px-3 py-1 rounded-full border border-white/[0.07] text-muted-foreground bg-white/[0.015]">
                {tag}
              </span>
            ))}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-foreground border border-white/[0.1] bg-white/[0.03] rounded-full px-3 py-1 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.18]"
              >
                View Live
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
