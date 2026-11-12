import { useEffect, useRef } from "react";

/**
 * Soft warm golden-rose bokeh motes drifting gently over the Ladakh scenery.
 * Respects prefers-reduced-motion.
 */
export default function StarlightCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationId = null;
    let width = 0;
    let height = 0;
    let motes = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((width * height) / 26000), 48);
      motes = Array.from({ length: count }, (_, idx) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.4 + 1.1,
        vy: -(Math.random() * 0.22 + 0.08),
        vx: (Math.random() - 0.5) * 0.14,
        phase: Math.random() * Math.PI * 2,
        rose: idx % 2 === 0,
      }));
    };

    const drawFrame = (tick) => {
      ctx.clearRect(0, 0, width, height);
      for (const m of motes) {
        if (!prefersReducedMotion) {
          m.y += m.vy;
          m.x += m.vx + Math.sin(tick * 0.01 + m.phase) * 0.08;
          if (m.y < -10) m.y = height + 10;
          if (m.x < -10) m.x = width + 10;
          if (m.x > width + 10) m.x = -10;
        }
        const alpha = 0.22 + 0.18 * Math.sin(tick * 0.02 + m.phase);
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 3.2);
        const rgb = m.rose ? "242, 166, 141" : "244, 192, 122";
        grad.addColorStop(0, `rgba(${rgb}, ${alpha})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if (prefersReducedMotion) {
      drawFrame(0);
      return () => window.removeEventListener("resize", resize);
    }

    let tick = 0;
    const loop = () => {
      tick += 1;
      drawFrame(tick);
      animationId = requestAnimationFrame(loop);
    };
    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10"
    />
  );
}
