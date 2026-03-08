import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });

  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor-hover], [data-cursor-view]");
      if (interactive) {
        setHovered(true);
        if (interactive.hasAttribute("data-cursor-view")) {
          setLabel("View");
        } else {
          setLabel("");
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor-hover], [data-cursor-view]");
      if (interactive) {
        setHovered(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 80 : 8,
          height: hovered ? 80 : 8,
          backgroundColor: hovered ? "hsla(220, 10%, 75%, 0.08)" : "hsl(var(--foreground))",
          border: hovered ? "1px solid hsla(220, 10%, 75%, 0.2)" : "none",
          backdropFilter: hovered ? "blur(12px)" : "none",
          mixBlendMode: hovered ? "normal" : "difference",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 0.4s cubic-bezier(0.23,1,0.32,1), height 0.4s cubic-bezier(0.23,1,0.32,1), background-color 0.4s cubic-bezier(0.23,1,0.32,1), border 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        {hovered && label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-[10px] font-medium tracking-widest uppercase"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
