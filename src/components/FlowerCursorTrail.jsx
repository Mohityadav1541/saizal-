import { useEffect, useRef } from "react";

const PETAL_COLORS = ["#F28B82", "#F2A68D", "#F4C07A", "#E8B4D9", "#FFF6EE"];

/**
 * Interactive flower & rose-petal cursor trail (and touch burst on iPhone/Android).
 * Respects prefers-reduced-motion and caps active particles for 60fps mobile smoothness.
 */
export default function FlowerCursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let lastSpawn = 0;
    let rafId = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnFlower = (x, y, burst = false) => {
      const count = burst ? 4 : 1;
      for (let i = 0; i < count; i++) {
        if (particles.length >= 28) particles.shift();
        particles.push({
          x: x + (Math.random() - 0.5) * (burst ? 20 : 8),
          y: y + (Math.random() - 0.5) * (burst ? 20 : 8),
          vx: (Math.random() - 0.5) * (burst ? 1.4 : 0.65),
          vy: (Math.random() * 0.6 + 0.35) * (burst ? 1.1 : 1),
          size: Math.random() * 5 + 6,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.05,
          life: 1,
          decay: burst ? 0.018 : 0.022,
          color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
          isHeart: Math.random() < 0.25,
        });
      }
    };

    const onPointerMove = (e) => {
      const now = performance.now();
      if (now - lastSpawn < 42) return;
      lastSpawn = now;
      spawnFlower(e.clientX, e.clientY, false);
    };

    const onPointerDown = (e) => {
      spawnFlower(e.clientX, e.clientY, true);
    };

    const drawFlower = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(p.life, 0);

      if (p.isHeart) {
        const s = p.size * 0.55;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.4);
        ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.4, s * 0.6, 0, s * 1.4);
        ctx.bezierCurveTo(s * 1.4, s * 0.6, s, -s * 0.5, 0, s * 0.4);
        ctx.fill();
      } else {
        // 5-petal blossom
        const petalR = p.size * 0.42;
        ctx.fillStyle = p.color;
        for (let k = 0; k < 5; k++) {
          const angle = (k * Math.PI * 2) / 5;
          ctx.beginPath();
          ctx.ellipse(
            Math.cos(angle) * petalR,
            Math.sin(angle) * petalR,
            petalR * 0.72,
            petalR * 0.46,
            angle,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        ctx.fillStyle = "#FFF6EE";
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      particles = particles.filter((p) => p.life > 0.02);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;
        p.life -= p.decay;
        drawFlower(p);
      }
      rafId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}

