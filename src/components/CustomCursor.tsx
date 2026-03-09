import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const hovered = useRef(false);
  const label = useRef("");
  const rafId = useRef(0);
  const isMobile = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = useCallback(() => {
    pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
    pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

    if (ringRef.current) {
      const size = hovered.current ? 72 : 28;
      ringRef.current.style.transform = `translate3d(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px, 0)`;
      ringRef.current.style.width = `${size}px`;
      ringRef.current.style.height = `${size}px`;
      ringRef.current.style.borderColor = hovered.current
        ? "hsla(30, 5%, 35%, 0.3)"
        : "hsl(var(--foreground))";
      ringRef.current.style.backgroundColor = hovered.current
        ? "hsla(30, 5%, 35%, 0.06)"
        : "transparent";
      ringRef.current.style.backdropFilter = hovered.current ? "blur(12px)" : "none";

      const span = ringRef.current.firstElementChild as HTMLElement;
      if (span) {
        span.style.opacity = hovered.current && label.current ? "1" : "0";
        span.textContent = label.current;
      }
    }

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${target.current.x - 3}px, ${target.current.y - 3}px, 0)`;
    }

    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    isMobile.current = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile.current) return;

    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor-hover], [data-cursor-view]");
      if (el) {
        hovered.current = true;
        label.current = el.hasAttribute("data-cursor-view") ? "View" : "";
      }
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor-hover], [data-cursor-view]");
      if (el) {
        hovered.current = false;
        label.current = "";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId.current);
      document.head.removeChild(style);
      document.documentElement.style.cursor = "";
    };
  }, [tick]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border"
        style={{
          willChange: "transform, width, height",
          transition: "width 0.35s cubic-bezier(0.23,1,0.32,1), height 0.35s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, background-color 0.3s ease, backdrop-filter 0.3s ease",
          borderWidth: "1.5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className="text-[9px] font-medium tracking-[0.2em] uppercase text-foreground"
          style={{ transition: "opacity 0.2s ease", opacity: 0 }}
        />
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-foreground"
        style={{ width: 6, height: 6, willChange: "transform" }}
      />
    </>
  );
};

export default CustomCursor;
