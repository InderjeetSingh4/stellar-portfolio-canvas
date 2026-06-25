import { useEffect, useRef } from "react";

/**
 * Fluid gradient mesh background — three soft radial blobs that drift
 * with their own sine wave AND react to the pointer with eased follow.
 * GPU-friendly: pure CSS radial-gradients on absolutely positioned divs,
 * driven by transform via rAF (no React re-renders).
 */
const HeroGradientMesh = () => {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      target.current.x = nx;
      target.current.y = ny;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;

      // ease pointer
      pointer.current.x += (target.current.x - pointer.current.x) * 0.06;
      pointer.current.y += (target.current.y - pointer.current.y) * 0.06;
      const px = pointer.current.x;
      const py = pointer.current.y;

      if (blob1.current) {
        const x = Math.sin(t * 0.18) * 80 + px * 60;
        const y = Math.cos(t * 0.22) * 60 + py * 40;
        blob1.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (blob2.current) {
        const x = Math.cos(t * 0.14) * 90 - px * 50;
        const y = Math.sin(t * 0.19) * 70 - py * 35;
        blob2.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (blob3.current) {
        const x = Math.sin(t * 0.11 + 1.2) * 100 + px * 30;
        const y = Math.cos(t * 0.16 + 0.8) * 80 + py * 25;
        blob3.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (!reduce) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsla(230, 8%, 12%, 1) 0%, #0f0f11 70%)",
        }}
      />
      {/* Slate blob */}
      <div
        ref={blob1}
        className="absolute top-[10%] left-[15%] w-[55vw] h-[55vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, hsla(220, 18%, 35%, 0.18) 0%, transparent 60%)",
          filter: "blur(70px)",
          willChange: "transform",
        }}
      />
      {/* Muted indigo blob */}
      <div
        ref={blob2}
        className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, hsla(235, 14%, 32%, 0.14) 0%, transparent 60%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      {/* Pale silver blob */}
      <div
        ref={blob3}
        className="absolute bottom-[5%] left-[35%] w-[45vw] h-[45vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, hsla(220, 6%, 50%, 0.1) 0%, transparent 60%)",
          filter: "blur(90px)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 60%, #0f0f11 100%)",
        }}
      />
    </div>
  );
};

export default HeroGradientMesh;
