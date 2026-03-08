import { motion } from "framer-motion";

const items = [
  "FULL-STACK DEVELOPER",
  "DATA ANALYST",
  "PROBLEM SOLVER",
  "FULL-STACK DEVELOPER",
  "DATA ANALYST",
  "PROBLEM SOLVER",
];

const Marquee = () => {
  const text = items.join(" • ") + " • ";

  return (
    <div className="relative overflow-hidden py-16 md:py-24 border-y border-border">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight-custom mr-4"
            style={{
              WebkitTextStroke: "1.5px hsl(var(--muted-foreground))",
              WebkitTextFillColor: "transparent",
              opacity: 0.3,
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
