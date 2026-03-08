import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  const finish = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    let frame: number;
    let current = 0;
    const tick = () => {
      // Accelerating ease curve
      const remaining = 100 - current;
      const step = Math.max(0.5, remaining * 0.06);
      current = Math.min(100, current + step);
      setProgress(Math.round(current));
      if (current < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(finish, 300);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
        >
          <div className="relative">
            <motion.span
              className="text-5xl md:text-7xl font-extralight tracking-tight text-foreground tabular-nums"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {progress}
              <span className="text-muted-foreground">%</span>
            </motion.span>
          </div>
          {/* Thin progress line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border">
            <motion.div
              className="h-full bg-foreground/30"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
