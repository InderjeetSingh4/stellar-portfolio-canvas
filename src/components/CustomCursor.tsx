import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const hovered = useRef(false);
  const label = useRef("");
  const rafId = useRef(0);
  const isMobile = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const tick = useCallback(() => {
    pos.current.x = lerp(pos.current.x, target.current.x, 0.18);
    pos.current.y = lerp(pos.current.y, target.current.y, 0.18);
    glowPos.current.x = lerp(glowPos.current.x, target.current.x, 0.08);
    glowPos.current.y = lerp(glowPos.current.y, target.current.y, 0.08);

    if (ringRef.current) {
      const size = hovered.current ? 72 : 28;
      ringRef.current.style.transform = `translate3d(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px, 0)`;
      ringRef.current.style.width = `${size}px`;
      ringRef.current.style.height = `${size}px`;
      ringRef.current.style.borderColor = hovered.current
        ? "hsla(0, 0%, 100%, 0.55)"
        : "hsla(0, 0%, 100%, 0.7)";
      ringRef.current.style.backgroundColor = "transparent";

      const span = ringRef.current.firstElementChild as HTMLElement;
      if (span) {
        span.style.opacity = hovered.current && label.current ? "1" : "0";
        span.textContent = label.current;
      }
    }

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${target.current.x - 3}px, ${target.current.y - 3}px, 0)`;
    }

    if (glowRef.current) {
      const size = hovered.current ? 200 : 130;
      glowRef.current.style.transform = `translate3d(${glowPos.current.x - size / 2}px, ${glowPos.current.y - size / 2}px, 0)`;
      glowRef.current.style.width = `${size}px`;
      glowRef.current.style.height = `${size}px`;
      glowRef.current.style.opacity = hovered.current ? "0.25" : "0.14";
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
      {/* Subtle silver halo */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          width: 130,
          height: 130,
          background:
            "radial-gradient(circle, hsla(220, 8%, 70%, 0.22) 0%, hsla(220, 8%, 70%, 0.06) 35%, transparent 70%)",
          filter: "blur(22px)",
          willChange: "transform, opacity, width, height",
          transition: "opacity 0.35s ease, width 0.35s ease, height 0.35s ease",
          mixBlendMode: "screen",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border"
        style={{
          willChange: "transform, width, height",
          transition:
            "width 0.35s cubic-bezier(0.23,1,0.32,1), height 0.35s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, background-color 0.3s ease",
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
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          width: 6,
          height: 6,
          willChange: "transform",
          background: "hsl(var(--foreground))",
          boxShadow: "0 0 10px hsla(0, 0%, 0%, 0.6)",
        }}
      />
    </>
  );
};

export default CustomCursor;
