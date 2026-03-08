import { useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
}

const ProjectCard = ({ title, description, tags, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0.5, y: 0.5, hovered: false });

  const update = useCallback(() => {
    const { x, y, hovered } = state.current;
    if (cardRef.current) {
      const rx = -(y - 0.5) * 10;
      const ry = (x - 0.5) * 10;
      cardRef.current.style.transform = `perspective(800px) rotateX(${hovered ? rx : 0}deg) rotateY(${hovered ? ry : 0}deg)`;
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = hovered ? "0.7" : "0";
      glowRef.current.style.background = `radial-gradient(350px circle at ${x * 100}% ${y * 100}%, hsla(220, 10%, 80%, 0.1), transparent 60%)`;
    }
    if (contentRef.current) {
      const tx = hovered ? (x - 0.5) * -6 : 0;
      const ty = hovered ? (y - 0.5) * -6 : 0;
      contentRef.current.style.transform = `translate3d(${tx}px, ${ty}px, ${hovered ? 16 : 0}px)`;
    }
    if (tagsRef.current) {
      const tx = hovered ? (x - 0.5) * -3 : 0;
      const ty = hovered ? (y - 0.5) * -3 : 0;
      tagsRef.current.style.transform = `translate3d(${tx}px, ${ty}px, ${hovered ? 24 : 0}px)`;
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 50, damping: 25, delay: index * 0.1 }}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        ref={cardRef}
        data-cursor-view
        onMouseMove={onMouseMove}
        onMouseEnter={() => { state.current.hovered = true; update(); }}
        onMouseLeave={() => { state.current.hovered = false; update(); }}
        className="glass-card glass-card-hover p-8 cursor-pointer"
        style={{ transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)" }}
      >
        {/* Inner glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ opacity: 0, transition: "opacity 0.5s ease" }}
        />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10"
          style={{ transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)" }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight-custom">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {description}
          </p>
          <div
            ref={tagsRef}
            className="flex flex-wrap gap-2"
            style={{ transition: "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)" }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
