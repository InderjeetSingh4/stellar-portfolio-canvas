import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  offset?: [number, number];
}

const WordWrapper = ({
  children,
  progress,
  index,
  total,
}: {
  children: ReactNode;
  progress: any;
  index: number;
  total: number;
}) => {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);

  return (
    <motion.span
      style={{ opacity, y, display: "inline-block" }}
      className="mr-[0.3em] last:mr-0"
    >
      {children}
    </motion.span>
  );
};

const TextReveal = ({ children, className = "", as: Tag = "h2", offset }: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset || ["start 0.9", "start 0.4"],
  });

  const words = children.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((word, i) => (
          <WordWrapper key={`${word}-${i}`} progress={scrollYProgress} index={i} total={words.length}>
            {word}
          </WordWrapper>
        ))}
      </Tag>
    </div>
  );
};

export default TextReveal;
