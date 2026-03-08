import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
}

const ProjectCard = ({ title, description, tags, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouseX(x);
    setMouseY(y);
    setRotateX(-(y - 0.5) * 12);
    setRotateY((x - 0.5) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const contentTranslateX = isHovered ? (mouseX - 0.5) * -8 : 0;
  const contentTranslateY = isHovered ? (mouseY - 0.5) * -8 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 25,
        delay: index * 0.1,
      }}
    >
      <div
        ref={cardRef}
        data-cursor-view
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="glass-card glass-card-hover p-8 cursor-pointer"
        style={{
          transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Inner glow following mouse */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.6 : 0,
            background: `radial-gradient(300px circle at ${mouseX * 100}% ${mouseY * 100}%, hsla(var(--glass-glow), 0.08), transparent 60%)`,
          }}
        />

        {/* Content with inner parallax */}
        <div
          className="relative z-10"
          style={{
            transform: `translate3d(${contentTranslateX}px, ${contentTranslateY}px, ${isHovered ? 20 : 0}px)`,
            transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight-custom">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {description}
          </p>
          <div
            className="flex flex-wrap gap-2"
            style={{
              transform: `translate3d(${contentTranslateX * 0.5}px, ${contentTranslateY * 0.5}px, ${isHovered ? 30 : 0}px)`,
              transition: "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
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
