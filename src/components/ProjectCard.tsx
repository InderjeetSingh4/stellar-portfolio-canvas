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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 8);
    setRotateY(x * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card glass-card-hover p-8 cursor-pointer"
        style={{
          transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight-custom">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
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
